#!/usr/bin/env node

const https = require('https');

const STORE = 'p1pmt1-zi.myshopify.com';
const ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

function makeGraphQLRequest(query, variables) {
  return new Promise((resolve, reject) => {
    const requestBody = { query, variables };
    const data = JSON.stringify(requestBody);
    
    // Debug output
    if (process.env.DEBUG) {
      console.log('Request body:', data);
    }

    const options = {
      hostname: STORE,
      port: 443,
      path: '/admin/api/2024-01/graphql.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'X-Shopify-Access-Token': ACCESS_TOKEN
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 400) {
          let errorMsg = `HTTP ${res.statusCode}: ${body}`;
          try {
            const errorJson = JSON.parse(body);
            errorMsg = `HTTP ${res.statusCode}: ${JSON.stringify(errorJson, null, 2)}`;
          } catch (e) {
            // Keep original error message
          }
          reject(new Error(errorMsg));
          return;
        }
        try {
          const response = JSON.parse(body);
          if (response.errors) {
            reject(new Error(`GraphQL errors: ${JSON.stringify(response.errors, null, 2)}`));
          } else if (response.data) {
            resolve(response.data);
          } else {
            reject(new Error(`Unexpected response: ${JSON.stringify(response, null, 2)}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}\nBody: ${body}\nStatus: ${res.statusCode}`));
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

async function main() {
  if (!ACCESS_TOKEN) {
    console.error('❌ Fehler: SHOPIFY_ADMIN_API_ACCESS_TOKEN Umgebungsvariable ist nicht gesetzt!');
    console.error('   Bitte setzen Sie: export SHOPIFY_ADMIN_API_ACCESS_TOKEN="shpat_ihr-token"');
    process.exit(1);
  }

  console.log('🚀 Starte Erstellung der Test-Daten...\n');
  console.log(`Store: ${STORE}\n`);

  try {
    // 1. Test-Produkt erstellen
    console.log('📦 Erstelle Test-Produkt...');
    const productMutation = `
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

    const productVariables = {
      product: {
        title: "Test Produkt",
        descriptionHtml: "<p>Dies ist ein Test-Produkt zur Überprüfung der Theme-Funktionalität</p>",
        vendor: "Schnappix",
        productType: "Test"
      }
    };
    
    console.log('Sending product mutation with variables:', JSON.stringify(productVariables, null, 2));

    const productResult = await makeGraphQLRequest(productMutation, productVariables);
    
    if (productResult.productCreate.userErrors && productResult.productCreate.userErrors.length > 0) {
      throw new Error(JSON.stringify(productResult.productCreate.userErrors, null, 2));
    }

    const product = productResult.productCreate.product;
    console.log('✅ Test-Produkt erstellt:', product.title);

    // 2. Test-Collection erstellen
    console.log('📚 Erstelle Test-Collection...');
    const collectionMutation = `
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

    const collectionVariables = {
      input: {
        title: "Test Kollektion",
        descriptionHtml: "<p>Test-Collection für Theme-Tests</p>",
        handle: "test-kollektion"
      }
    };

    const collectionResult = await makeGraphQLRequest(collectionMutation, collectionVariables);
    
    if (collectionResult.collectionCreate.userErrors && collectionResult.collectionCreate.userErrors.length > 0) {
      throw new Error(JSON.stringify(collectionResult.collectionCreate.userErrors, null, 2));
    }

    const collection = collectionResult.collectionCreate.collection;
    console.log('✅ Test-Collection erstellt:', collection.title);

    // 3. Produkt zur Collection hinzufügen
    console.log('🔗 Füge Produkt zur Collection hinzu...');
    const addMutation = `
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

    const addVariables = {
      id: collection.id,
      productIds: [product.id]
    };

    const addResult = await makeGraphQLRequest(addMutation, addVariables);
    
    if (addResult.collectionAddProducts.userErrors && addResult.collectionAddProducts.userErrors.length > 0) {
      throw new Error(JSON.stringify(addResult.collectionAddProducts.userErrors, null, 2));
    }

    console.log('✅ Produkt zur Collection hinzugefügt');

    // 4. Test-Menü erstellen (REST API)
    console.log('🍔 Erstelle Test-Menü...');
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

    const menuPromise = new Promise((resolve, reject) => {
      const menuOptions = {
        hostname: STORE,
        port: 443,
        path: '/admin/api/2024-01/navigation_menus.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': menuData.length,
          'X-Shopify-Access-Token': ACCESS_TOKEN
        }
      };

      const menuReq = https.request(menuOptions, (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          if (res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode}: ${body}`));
          } else {
            try {
              const response = JSON.parse(body);
              resolve(response);
            } catch (e) {
              reject(new Error(`Parse error: ${e.message}\nBody: ${body}`));
            }
          }
        });
      });

      menuReq.on('error', (e) => {
        reject(e);
      });

      menuReq.write(menuData);
      menuReq.end();
    });

    try {
      await menuPromise;
      console.log('✅ Test-Menü erstellt');
    } catch (error) {
      console.log('⚠️  Warnung beim Erstellen des Menüs:', error.message);
      console.log('   (Menü kann manuell im Shopify Admin erstellt werden)');
    }

    console.log('\n✅ Alle Test-Daten wurden erfolgreich erstellt!');
    console.log('\n📋 Zusammenfassung:');
    console.log(`   - Produkt: ${product.title} (Handle: ${product.handle}, ID: ${product.id})`);
    console.log(`   - Collection: ${collection.title} (Handle: ${collection.handle}, ID: ${collection.id})`);
    console.log(`   - Menü: Test Menu (Handle: test-menu)`);
    console.log('\n✨ Sie können jetzt im Shopify Admin überprüfen, ob alles funktioniert!');
    console.log('\n📝 Wichtig: Weisen Sie das Menü im Theme Editor zu:');
    console.log('   Online Store → Themes → Anpassen → Header → Menu → "Test Menu"');

  } catch (error) {
    console.error('\n❌ Fehler beim Erstellen der Test-Daten:', error.message);
    process.exit(1);
  }
}

main();

