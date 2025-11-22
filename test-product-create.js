#!/usr/bin/env node

const https = require('https');

const STORE = 'p1pmt1-zi.myshopify.com';
const ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

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
    descriptionHtml: "<p>Dies ist ein Test-Produkt</p>",
    vendor: "Schnappix",
    productType: "Test"
  }
};

const data = JSON.stringify({ query: mutation, variables });

const options = {
  hostname: STORE,
  port: 443,
  path: '/admin/api/2024-01/graphql.json',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'X-Shopify-Access-Token': ACCESS_TOKEN
  }
};

if (!ACCESS_TOKEN) {
  console.error('❌ Fehler: SHOPIFY_ADMIN_API_ACCESS_TOKEN Umgebungsvariable ist nicht gesetzt!');
  console.error('   Bitte setzen Sie: export SHOPIFY_ADMIN_API_ACCESS_TOKEN="shpat_ihr-token"');
  process.exit(1);
}

console.log('Sending request...');
console.log('Mutation:', mutation);
console.log('Variables:', JSON.stringify(variables, null, 2));

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
    } catch (e) {
      console.log(body);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.write(data);
req.end();

