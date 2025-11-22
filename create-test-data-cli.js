#!/usr/bin/env node

/**
 * Script zum Erstellen von Test-Daten in Shopify
 * Verwendet Shopify CLI für Authentifizierung
 */

const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');

const STORE = 'p1pmt1-zi.myshopify.com';

// Versuche Access Token aus verschiedenen Quellen zu bekommen
async function getAccessToken() {
  // 1. Versuche aus Umgebungsvariable
  if (process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN) {
    return process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
  }

  // 2. Versuche aus Shopify CLI Config zu lesen
  try {
    const configPath = path.join(process.env.HOME, '.config', 'shopify', 'config.toml');
    if (fs.existsSync(configPath)) {
      const config = fs.readFileSync(configPath, 'utf8');
      // Versuche Token aus Config zu extrahieren (falls vorhanden)
      const tokenMatch = config.match(/access_token\s*=\s*"([^"]+)"/);
      if (tokenMatch) {
        return tokenMatch[1];
      }
    }
  } catch (e) {
    // Ignoriere Fehler
  }

  // 3. Versuche über shopify auth status
  try {
    const output = execSync('shopify auth status --store ' + STORE, { encoding: 'utf8', stdio: 'pipe' });
    // Parse output falls Token enthalten
    console.log('Shopify CLI ist authentifiziert');
  } catch (e) {
    // Ignoriere Fehler
  }

  return null;
}

// GraphQL Request Helper
function makeGraphQLRequest(query, variables, accessToken) {
  return new Promise((resolve, reject) => {
    const requestBody = { query, variables };
    const data = JSON.stringify(requestBody);

    const options = {
      hostname: STORE,
      port: 443,
      path: '/admin/api/2024-01/graphql.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'X-Shopify-Access-Token': accessToken
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 400) {
          let errorMessage = `HTTP ${res.statusCode}`;
          try {
            const errorJson = JSON.parse(body);
            // Log full error for debugging
            console.error('\n🔍 Full error response:', JSON.stringify(errorJson, null, 2));
            if (errorJson.errors && errorJson.errors.length > 0) {
              errorMessage = `HTTP ${res.statusCode}: ${JSON.stringify(errorJson.errors, null, 2)}`;
            } else if (errorJson.data) {
              // Check for userErrors in the response
              const data = errorJson.data;
              if (data.productCreate && data.productCreate.userErrors && data.productCreate.userErrors.length > 0) {
                errorMessage = `HTTP ${res.statusCode}: ${JSON.stringify(data.productCreate.userErrors, null, 2)}`;
              } else if (data.collectionCreate && data.collectionCreate.userErrors && data.collectionCreate.userErrors.length > 0) {
                errorMessage = `HTTP ${res.statusCode}: ${JSON.stringify(data.collectionCreate.userErrors, null, 2)}`;
              } else {
                errorMessage = `HTTP ${res.statusCode}: ${JSON.stringify(errorJson, null, 2)}`;
              }
            } else {
              errorMessage = `HTTP ${res.statusCode}: ${body}`;
            }
          } catch (e) {
            errorMessage = `HTTP ${res.statusCode}: ${body}`;
          }
          reject(new Error(errorMessage));
          return;
        }
        try {
          const response = JSON.parse(body);
          if (response.errors) {
            reject(new Error(JSON.stringify(response.errors, null, 2)));
          } else {
            resolve(response.data);
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}\nBody: ${body}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(data);
    req.end();
  });
}

// Test API Connection
async function testConnection(accessToken) {
  console.log('🔍 Teste API-Verbindung...');
  const query = `query { shop { name } }`;
  try {
    const result = await makeGraphQLRequest(query, {}, accessToken);
    console.log('✅ API-Verbindung erfolgreich!');
    return true;
  } catch (error) {
    console.error('❌ API-Verbindung fehlgeschlagen:', error.message);
    return false;
  }
}

// 1. Test-Produkt erstellen
async function createTestProduct(accessToken) {
  console.log('📦 Erstelle Test-Produkt...');
  
  const mutation = `
    mutation productCreate($product: ProductCreateInput!) {
      productCreate(product: $product) {
        product {
          id
          title
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    product: {
      title: "Test Produkt",
      descriptionHtml: "<p>Dies ist ein Test-Produkt zur Überprüfung der Theme-Funktionalität</p>",
      vendor: "Schnappix",
      productType: "Test"
    }
  };

  try {
    const result = await makeGraphQLRequest(mutation, variables, accessToken);
    
    if (!result || !result.productCreate) {
      throw new Error('Unexpected response format: ' + JSON.stringify(result, null, 2));
    }
    
    if (result.productCreate.userErrors && result.productCreate.userErrors.length > 0) {
      throw new Error(JSON.stringify(result.productCreate.userErrors, null, 2));
    }
    
    if (!result.productCreate.product) {
      throw new Error('Product was not created. Response: ' + JSON.stringify(result, null, 2));
    }
    
    console.log('✅ Test-Produkt erstellt:', result.productCreate.product.title);
    return result.productCreate.product;
  } catch (error) {
    console.error('❌ Fehler beim Erstellen des Produkts:', error.message);
    throw error;
  }
}

// 2. Test-Collection erstellen
async function createTestCollection(accessToken) {
  console.log('📚 Erstelle Test-Collection...');
  
  const mutation = `
    mutation collectionCreate($input: CollectionInput!) {
      collectionCreate(input: $input) {
        collection {
          id
          title
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      title: "Test Kollektion",
      descriptionHtml: "<p>Test-Collection für Theme-Tests</p>",
      handle: "test-kollektion"
    }
  };

  try {
    const result = await makeGraphQLRequest(mutation, variables, accessToken);
    
    if (result.collectionCreate.userErrors && result.collectionCreate.userErrors.length > 0) {
      throw new Error(JSON.stringify(result.collectionCreate.userErrors, null, 2));
    }
    
    console.log('✅ Test-Collection erstellt:', result.collectionCreate.collection.title);
    return result.collectionCreate.collection;
  } catch (error) {
    console.error('❌ Fehler beim Erstellen der Collection:', error.message);
    throw error;
  }
}

// 3. Produkt zur Collection hinzufügen
async function addProductToCollection(accessToken, productId, collectionId) {
  console.log('🔗 Füge Produkt zur Collection hinzu...');
  
  const mutation = `
    mutation collectionAddProducts($id: ID!, $productIds: [ID!]!) {
      collectionAddProducts(id: $id, productIds: $productIds) {
        collection {
          id
          title
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    id: collectionId,
    productIds: [productId]
  };

  try {
    const result = await makeGraphQLRequest(mutation, variables, accessToken);
    
    if (result.collectionAddProducts.userErrors && result.collectionAddProducts.userErrors.length > 0) {
      throw new Error(JSON.stringify(result.collectionAddProducts.userErrors, null, 2));
    }
    
    console.log('✅ Produkt zur Collection hinzugefügt');
  } catch (error) {
    console.error('❌ Fehler beim Hinzufügen des Produkts:', error.message);
    throw error;
  }
}

// 4. Test-Menü erstellen (REST API)
async function createTestMenu(accessToken) {
  console.log('🍔 Erstelle Test-Menü...');
  
  return new Promise((resolve, reject) => {
    const menuData = JSON.stringify({
      menu: {
        name: "Test Menu",
        handle: "test-menu",
        items: [
          {
            title: "Startseite",
            url: "/"
          },
          {
            title: "Test Kollektion",
            url: "/collections/test-kollektion"
          },
          {
            title: "Alle Produkte",
            url: "/collections/all"
          }
        ]
      }
    });

    const options = {
      hostname: STORE,
      port: 443,
      path: '/admin/api/2024-01/navigation_menus.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': menuData.length,
        'X-Shopify-Access-Token': accessToken
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
          return;
        }
        try {
          const response = JSON.parse(body);
          console.log('✅ Test-Menü erstellt:', response.navigation_menu?.name || 'Test Menu');
          resolve(response.navigation_menu);
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}\nBody: ${body}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(menuData);
    req.end();
  });
}

// Hauptfunktion
async function main() {
  console.log('🚀 Starte Erstellung der Test-Daten...\n');
  console.log(`Store: ${STORE}\n`);

  // Versuche Access Token zu bekommen
  let accessToken = await getAccessToken();

  // Falls kein Token gefunden, frage nach
  if (!accessToken) {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    accessToken = await new Promise((resolve) => {
      console.log('⚠️  Kein Access Token gefunden.');
      console.log('\nBitte geben Sie Ihren Shopify Admin API Access Token ein:');
      console.log('(Erstellen Sie eine Private App unter: https://' + STORE + '/admin/settings/apps/development)');
      rl.question('Token: ', (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    });
  }

  if (!accessToken) {
    console.error('❌ Access Token ist erforderlich!');
    process.exit(1);
  }

  // Teste Verbindung
  const connectionOk = await testConnection(accessToken);
  if (!connectionOk) {
    console.error('\n❌ Bitte überprüfen Sie Ihren Access Token und die Berechtigungen.');
    process.exit(1);
  }

  try {
    // 1. Produkt erstellen
    const product = await createTestProduct(accessToken);
    
    // 2. Collection erstellen
    const collection = await createTestCollection(accessToken);
    
    // 3. Produkt zur Collection hinzufügen
    await addProductToCollection(accessToken, product.id, collection.id);
    
    // 4. Menü erstellen
    await createTestMenu(accessToken);
    
    console.log('\n✅ Alle Test-Daten wurden erfolgreich erstellt!');
    console.log('\n📋 Zusammenfassung:');
    console.log(`   - Produkt: ${product.title} (Handle: ${product.handle})`);
    console.log(`   - Collection: ${collection.title} (Handle: ${collection.handle})`);
    console.log(`   - Menü: Test Menu (Handle: test-menu)`);
    console.log('\n✨ Sie können jetzt im Shopify Admin überprüfen, ob alles funktioniert!');
    console.log('\n📝 Wichtig: Weisen Sie das Menü im Theme Editor zu:');
    console.log('   Online Store → Themes → Anpassen → Header → Menu → "Test Menu"');
    
  } catch (error) {
    console.error('\n❌ Fehler beim Erstellen der Test-Daten:', error.message);
    process.exit(1);
  }
}

// Script ausführen
if (require.main === module) {
  main();
}

module.exports = { createTestProduct, createTestCollection, createTestMenu };

