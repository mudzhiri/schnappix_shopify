#!/usr/bin/env node

/**
 * Script zum Erstellen von Test-Daten in Shopify
 * Erstellt: Test-Produkt, Test-Collection und Test-Menü
 */

const https = require('https');
const readline = require('readline');

// Store-Informationen (wird vom theme dev command verwendet)
const STORE = process.env.SHOPIFY_STORE || process.env.SHOP || 'p1pmt1-zi.myshopify.com';
const STORE_URL = `https://${STORE}`;

// Versuche Access Token aus Umgebungsvariablen zu lesen
const ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN || process.env.SHOPIFY_ACCESS_TOKEN;

// GraphQL Endpoint
const GRAPHQL_ENDPOINT = `${STORE_URL}/admin/api/2024-01/graphql.json`;

// Helper function für GraphQL Requests
function makeGraphQLRequest(requestBody, accessToken) {
  return new Promise((resolve, reject) => {
    const data = typeof requestBody === 'string' ? requestBody : JSON.stringify(requestBody);

    const options = {
      hostname: STORE.replace('https://', '').replace('http://', ''),
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

// 1. Test-Produkt erstellen
async function createTestProduct(accessToken) {
  console.log('📦 Erstelle Test-Produkt...');
  
  const mutation = `
    mutation productCreate($input: ProductInput!) {
      productCreate(input: $input) {
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
    input: {
      title: "Test Produkt",
      descriptionHtml: "<p>Dies ist ein Test-Produkt zur Überprüfung der Theme-Funktionalität</p>",
      vendor: "Schnappix",
      productType: "Test",
      variants: [
        {
          price: "9.99",
          inventoryPolicy: "DENY",
          inventoryManagement: "SHOPIFY"
        }
      ]
    }
  };

  try {
    const requestBody = { query: mutation, variables };
    const result = await makeGraphQLRequest(requestBody, accessToken);
    
    if (result.productCreate.userErrors.length > 0) {
      throw new Error(JSON.stringify(result.productCreate.userErrors, null, 2));
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
    const requestBody = { query: mutation, variables };
    const result = await makeGraphQLRequest(requestBody, accessToken);
    
    if (result.collectionCreate.userErrors.length > 0) {
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
    const requestBody = { query: mutation, variables };
    const result = await makeGraphQLRequest(requestBody, accessToken);
    
    if (result.collectionAddProducts.userErrors.length > 0) {
      throw new Error(JSON.stringify(result.collectionAddProducts.userErrors, null, 2));
    }
    
    console.log('✅ Produkt zur Collection hinzugefügt');
  } catch (error) {
    console.error('❌ Fehler beim Hinzufügen des Produkts:', error.message);
    throw error;
  }
}

// 4. Test-Menü erstellen (über REST API, da GraphQL für Menüs limitiert ist)
async function createTestMenu(accessToken) {
  console.log('🍔 Erstelle Test-Menü...');
  
  // Für Menüs müssen wir die REST API verwenden
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
      hostname: STORE.replace('https://', '').replace('http://', ''),
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
        try {
          const response = JSON.parse(body);
          if (res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode}: ${body}`));
          } else {
            console.log('✅ Test-Menü erstellt:', response.navigation_menu?.name || 'Test Menu');
            resolve(response.navigation_menu);
          }
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

  // Access Token abfragen
  let accessToken = ACCESS_TOKEN;
  
  if (!accessToken) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    accessToken = await new Promise((resolve) => {
      rl.question('Bitte geben Sie Ihren Shopify Admin API Access Token ein: ', (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    });
  }

  if (!accessToken) {
    console.error('❌ Access Token ist erforderlich!');
    console.log('\nSo erhalten Sie einen Access Token:');
    console.log('1. Gehen Sie zu: https://' + STORE + '/admin/settings/apps/development');
    console.log('2. Erstellen Sie eine Private App');
    console.log('3. Aktivieren Sie Admin API access scopes:');
    console.log('   - read_products, write_products');
    console.log('   - read_collections, write_collections');
    console.log('   - read_navigation, write_navigation');
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

