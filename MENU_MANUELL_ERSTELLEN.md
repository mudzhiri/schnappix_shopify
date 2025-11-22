# Test-Menü manuell erstellen

Die Navigation Menu API ist über die Admin API nicht verfügbar. Bitte erstellen Sie das Menü manuell im Shopify Admin:

## Schritt-für-Schritt Anleitung:

### 1. Menü erstellen

1. **Gehen Sie zu:** Online Store → Navigation (oder Content → Menus)
2. **Klicken Sie auf:** "Create menu" (oder "Menü hinzufügen")
3. **Geben Sie ein:**
   - **Name:** `Test Menu`
   - **Handle:** `test-menu` (wird automatisch generiert, kann aber manuell geändert werden)

### 2. Menüpunkte hinzufügen

Klicken Sie auf "Add menu item" (oder "Menüpunkt hinzufügen") und fügen Sie folgende Punkte hinzu:

**Menüpunkt 1:**
- **Name:** `Startseite`
- **Link:** `/` (oder wählen Sie "Homepage" aus der Dropdown-Liste)

**Menüpunkt 2:**
- **Name:** `Test Kollektion`
- **Link:** `/collections/test-kollektion` (oder wählen Sie "Collections" → "Test Kollektion")

**Menüpunkt 3:**
- **Name:** `Alle Produkte`
- **Link:** `/collections/all` (oder wählen Sie "Collections" → "All")

### 3. Menü speichern

Klicken Sie auf **"Save"** (oder "Speichern")

### 4. Menü im Theme zuweisen

1. **Gehen Sie zu:** Online Store → Themes → Anpassen (Customize)
2. **Klicken Sie auf:** Header Section
3. **Suchen Sie:** Die Einstellung "Menu" (oder "Navigation menu")
4. **Wählen Sie:** "Test Menu" aus der Dropdown-Liste
5. **Klicken Sie auf:** "Save" (Speichern)

## ✅ Fertig!

Das Test-Menü sollte jetzt im Header Ihrer Website angezeigt werden.

## Alternative: Überprüfen Sie die Berechtigungen

Falls Sie das Menü programmatisch erstellen möchten, stellen Sie sicher, dass Ihre App folgende Scopes hat:
- `read_navigation`
- `write_navigation`

Diese Scopes sind möglicherweise nicht in der Standard-App-Konfiguration enthalten.

