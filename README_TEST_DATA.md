# Test-Daten automatisch erstellen

Dieses Script erstellt automatisch Test-Produkt, Test-Collection und Test-Menü in Ihrem Shopify Store.

## Voraussetzungen

1. **Shopify Admin API Access Token**
   - Gehen Sie zu: `https://[IHR-STORE].myshopify.com/admin/settings/apps/development`
   - Erstellen Sie eine **Private App** (oder verwenden Sie eine bestehende)
   - Aktivieren Sie folgende Admin API access scopes:
     - `read_products`, `write_products`
     - `read_collections`, `write_collections`
     - `read_navigation`, `write_navigation`
   - Kopieren Sie den **Admin API access token**

## Verwendung

### Option 1: Mit Umgebungsvariable (empfohlen)

```bash
export SHOPIFY_ADMIN_API_ACCESS_TOKEN="ihr-access-token-hier"
export SHOPIFY_STORE="p1pmt1-zi.myshopify.com"  # Optional, Standard ist bereits gesetzt
node create-test-data.js
```

### Option 2: Interaktiv

```bash
node create-test-data.js
```

Das Script fragt dann nach dem Access Token.

## Was wird erstellt?

1. **Test-Produkt**
   - Titel: "Test Produkt"
   - Preis: 9.99
   - Vendor: Schnappix

2. **Test-Collection**
   - Titel: "Test Kollektion"
   - Handle: `test-kollektion` (wichtig für Theme-Konfiguration)
   - Enthält das Test-Produkt

3. **Test-Menü**
   - Name: "Test Menu"
   - Handle: `test-menu` (wichtig für Theme-Konfiguration)
   - Menüpunkte:
     - Startseite (/)
     - Test Kollektion (/collections/test-kollektion)
     - Alle Produkte (/collections/all)

## Nach dem Erstellen

1. **Menü zuweisen:**
   - Gehen Sie zu: Online Store → Themes → Anpassen
   - Header Section → Menu auswählen → "Test Menu" wählen
   - Speichern

2. **Überprüfung:**
   - Homepage sollte die "Test Kollektion" anzeigen
   - Navigation sollte das "Test Menu" zeigen
   - Collection-Seite `/collections/test-kollektion` sollte funktionieren

## Fehlerbehebung

### "Access Token ist erforderlich"
- Stellen Sie sicher, dass Sie einen gültigen Admin API Access Token haben
- Überprüfen Sie die Scopes in Ihrer Private App

### "Collection/Menu nicht gefunden"
- Überprüfen Sie, ob die Handles korrekt sind:
  - Collection: `test-kollektion`
  - Menu: `test-menu`

### "Permission denied"
- Überprüfen Sie, ob alle erforderlichen Scopes aktiviert sind
- Stellen Sie sicher, dass die Private App aktiviert ist

