# Schnellstart: Test-Daten erstellen

## Problem: Tokens funktionieren nicht

Die bereitgestellten Tokens sind keine Admin API Access Tokens. Wir benötigen einen Token, der mit `shpat_` beginnt.

## Lösung: Admin API Token erstellen

### Schritt 1: Private App erstellen

1. Gehen Sie zu: **https://p1pmt1-zi.myshopify.com/admin/settings/apps/development**
2. Klicken Sie auf **"Private App erstellen"**
3. Geben Sie einen Namen ein (z.B. "Test Data Creator")
4. Aktivieren Sie folgende **Admin API access scopes**:
   - ✅ `read_products`
   - ✅ `write_products`
   - ✅ `read_collections`
   - ✅ `write_collections`
   - ✅ `read_navigation`
   - ✅ `write_navigation`
5. Klicken Sie auf **"Speichern"**
6. Kopieren Sie den **"Admin API access token"** (beginnt mit `shpat_`)

### Schritt 2: Test-Daten erstellen

```bash
cd schnappix_shopify
export SHOPIFY_ADMIN_API_ACCESS_TOKEN="shpat_ihr-token-hier"
node create-test-data-cli.js
```

## Alternative: App verwenden

Falls Sie die App verwenden möchten:

```bash
cd schnappix_shopify/test-data-creator
npm run dev
```

Dann die App im Shopify Admin installieren und zur Route `/app/create-test-data` navigieren.

## Was wird erstellt?

- ✅ Test-Produkt ("Test Produkt")
- ✅ Test-Collection ("Test Kollektion" mit Handle `test-kollektion`)
- ✅ Produkt wird zur Collection hinzugefügt
- ⚠️ Menü muss manuell im Shopify Admin erstellt werden

