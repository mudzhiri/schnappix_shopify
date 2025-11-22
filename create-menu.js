#!/usr/bin/env node

const https = require('https');

const STORE = 'p1pmt1-zi.myshopify.com';
const ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

// Zuerst das Menü erstellen
const menuData = JSON.stringify({
  menu: {
    name: "Test Menu",
    handle: "test-menu"
  }
});

if (!ACCESS_TOKEN) {
  console.error('❌ Fehler: SHOPIFY_ADMIN_API_ACCESS_TOKEN Umgebungsvariable ist nicht gesetzt!');
  console.error('   Bitte setzen Sie: export SHOPIFY_ADMIN_API_ACCESS_TOKEN="shpat_ihr-token"');
  process.exit(1);
}

console.log('🍔 Erstelle Test-Menü...');
console.log('Menu data:', menuData);

const menuOptions = {
  hostname: STORE,
  port: 443,
  path: '/admin/api/2024-01/navigation_menus.json',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(menuData),
    'X-Shopify-Access-Token': ACCESS_TOKEN
  }
};

const menuReq = https.request(menuOptions, (res) => {
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    console.log('\nStatus Code:', res.statusCode);
    console.log('Response Headers:', JSON.stringify(res.headers, null, 2));
    console.log('Response Body:');
    try {
      const response = JSON.parse(body);
      console.log(JSON.stringify(response, null, 2));
      
      if (res.statusCode >= 400) {
        console.error('\n❌ Fehler beim Erstellen des Menüs');
        process.exit(1);
      } else {
        const menuId = response.navigation_menu?.id;
        if (menuId) {
          console.log('\n✅ Menü erstellt! ID:', menuId);
          console.log('\n📝 Jetzt füge Menüpunkte hinzu...');
          addMenuItems(menuId);
        } else {
          console.log('\n⚠️  Menü wurde erstellt, aber keine ID gefunden');
        }
      }
    } catch (e) {
      console.log('Raw body:', body);
      console.error('Parse error:', e.message);
    }
  });
});

menuReq.on('error', (e) => {
  console.error('Request error:', e);
});

menuReq.write(menuData);
menuReq.end();

// Menüpunkte hinzufügen
function addMenuItems(menuId) {
  const items = [
    { title: "Startseite", url: "/" },
    { title: "Test Kollektion", url: "/collections/test-kollektion" },
    { title: "Alle Produkte", url: "/collections/all" }
  ];

  items.forEach((item, index) => {
    const itemData = JSON.stringify({
      menu_item: {
        title: item.title,
        url: item.url,
        menu_id: menuId
      }
    });

    const itemOptions = {
      hostname: STORE,
      port: 443,
      path: '/admin/api/2024-01/navigation_menus/' + menuId + '/menu_items.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(itemData),
        'X-Shopify-Access-Token': ACCESS_TOKEN
      }
    };

    const itemReq = https.request(itemOptions, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 400) {
          console.error(`❌ Fehler beim Hinzufügen von "${item.title}": HTTP ${res.statusCode} - ${body}`);
        } else {
          console.log(`✅ "${item.title}" hinzugefügt`);
        }
      });
    });

    itemReq.on('error', (e) => {
      console.error(`Fehler bei "${item.title}":`, e);
    });

    itemReq.write(itemData);
    itemReq.end();
  });
}

