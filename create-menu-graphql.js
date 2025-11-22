#!/usr/bin/env node

const https = require('https');

const STORE = 'p1pmt1-zi.myshopify.com';
const ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

// Versuche Menü über GraphQL zu erstellen
const mutation = `
  mutation menuCreate($title: String!, $handle: String!, $items: [MenuItemInput!]!) {
    menuCreate(title: $title, handle: $handle, items: $items) {
      menu {
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
  title: "Test Menu",
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
};

const data = JSON.stringify({ query: mutation, variables });

if (!ACCESS_TOKEN) {
  console.error('❌ Fehler: SHOPIFY_ADMIN_API_ACCESS_TOKEN Umgebungsvariable ist nicht gesetzt!');
  console.error('   Bitte setzen Sie: export SHOPIFY_ADMIN_API_ACCESS_TOKEN="shpat_ihr-token"');
  process.exit(1);
}

console.log('🍔 Erstelle Test-Menü über GraphQL...');
console.log('Mutation:', mutation);
console.log('Variables:', JSON.stringify(variables, null, 2));

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
    console.log('\nStatus Code:', res.statusCode);
    console.log('Response Body:');
    try {
      const response = JSON.parse(body);
      console.log(JSON.stringify(response, null, 2));
      
      if (res.statusCode >= 400 || response.errors) {
        console.error('\n❌ Fehler beim Erstellen des Menüs');
        if (response.errors) {
          console.error('Errors:', JSON.stringify(response.errors, null, 2));
        }
        if (response.data && response.data.menuCreate && response.data.menuCreate.userErrors) {
          console.error('User Errors:', JSON.stringify(response.data.menuCreate.userErrors, null, 2));
        }
      } else if (response.data && response.data.menuCreate && response.data.menuCreate.menu) {
        console.log('\n✅ Test-Menü erfolgreich erstellt!');
        console.log('Menu ID:', response.data.menuCreate.menu.id);
        console.log('Menu Title:', response.data.menuCreate.menu.title);
        console.log('Menu Handle:', response.data.menuCreate.menu.handle);
      }
    } catch (e) {
      console.log('Raw body:', body);
      console.error('Parse error:', e.message);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.write(data);
req.end();

