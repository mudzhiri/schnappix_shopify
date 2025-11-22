# Anleitung: Test-Daten in Shopify Admin erstellen

Nach dem Push der Theme-Änderungen müssen Sie die folgenden Test-Daten im Shopify Admin erstellen:

## 📦 1. Test-Produkt erstellen

1. Gehen Sie zu **Produkte → Alle Produkte** im Shopify Admin
2. Klicken Sie auf **Produkt hinzufügen**
3. Geben Sie folgende Daten ein:
   - **Titel:** `Test Produkt`
   - **Beschreibung:** `Dies ist ein Test-Produkt zur Überprüfung der Theme-Funktionalität`
   - **Preis:** z.B. `9.99`
   - **Bestand:** Aktivieren Sie "Bestand verfolgen" (optional)
4. Fügen Sie mindestens ein Produktbild hinzu
5. Klicken Sie auf **Speichern**

## 📚 2. Test-Collection erstellen

1. Gehen Sie zu **Produkte → Collections** im Shopify Admin
2. Klicken Sie auf **Collection erstellen**
3. Geben Sie folgende Daten ein:
   - **Titel:** `Test Kollektion`
   - **Beschreibung:** `Test-Collection für Theme-Tests` (optional)
   - **Collection-Typ:** Wählen Sie "Manuell" oder "Automatisch"
4. **WICHTIG:** Der **Handle** muss genau `test-kollektion` sein
   - Der Handle wird automatisch aus dem Titel generiert
   - Falls nötig, können Sie den Handle manuell anpassen
5. Fügen Sie das **Test Produkt** zu dieser Collection hinzu
6. Klicken Sie auf **Speichern**

### Handle überprüfen/anpassen:
- Nach dem Erstellen der Collection, klicken Sie auf die Collection
- Scrollen Sie nach unten zu "SEO"
- Dort können Sie den Handle sehen und anpassen
- Stellen Sie sicher, dass er genau `test-kollektion` lautet (ohne Leerzeichen, klein geschrieben)

## 🍔 3. Test-Menü erstellen

1. Gehen Sie zu **Online Store → Navigation** im Shopify Admin
2. Klicken Sie auf **Menü hinzufügen**
3. Geben Sie folgende Daten ein:
   - **Name:** `Test Menu`
   - **WICHTIG:** Der **Handle** muss genau `test-menu` sein
4. Fügen Sie Menüpunkte hinzu:
   - Klicken Sie auf **Menüpunkt hinzufügen**
   - **Name:** z.B. `Startseite`
   - **Link:** Wählen Sie `/` (Homepage)
   - Fügen Sie weitere Menüpunkte hinzu:
     - `Test Kollektion` → Link zur Collection `/collections/test-kollektion`
     - `Alle Produkte` → Link `/collections/all`
5. Klicken Sie auf **Speichern**

### Menü dem Header zuweisen:
1. Gehen Sie zu **Online Store → Themes**
2. Klicken Sie auf **Anpassen** bei Ihrem aktiven Theme
3. Gehen Sie zu **Header** Section
4. Wählen Sie unter "Menu" das **Test Menu** aus
5. Klicken Sie auf **Speichern**

## ✅ Überprüfung nach dem Push

Nachdem Sie die Test-Daten erstellt haben, überprüfen Sie:

### 1. Homepage
- Öffnen Sie Ihre Shop-URL
- Die Featured Collection Section sollte "Test Kollektion" anzeigen
- Das Test-Produkt sollte sichtbar sein

### 2. Collection-Seite
- Gehen Sie zu `/collections/test-kollektion`
- Das Test-Produkt sollte angezeigt werden

### 3. Produktseite
- Klicken Sie auf das Test-Produkt
- Die Produktseite sollte korrekt geladen werden

### 4. Navigation
- Das Test-Menü sollte im Header sichtbar sein
- Alle Menüpunkte sollten funktionieren

## 🔧 Falls etwas nicht funktioniert

### Collection wird nicht angezeigt:
- Überprüfen Sie, ob der Collection-Handle genau `test-kollektion` ist
- Überprüfen Sie, ob die Collection veröffentlicht ist
- Überprüfen Sie, ob Produkte in der Collection sind

### Menü wird nicht angezeigt:
- Überprüfen Sie, ob der Menü-Handle genau `test-menu` ist
- Überprüfen Sie im Theme Editor, ob das richtige Menü ausgewählt ist
- Überprüfen Sie, ob das Menü veröffentlicht ist

### Produkt wird nicht angezeigt:
- Überprüfen Sie, ob das Produkt veröffentlicht ist
- Überprüfen Sie, ob das Produkt zur Collection hinzugefügt wurde
- Überprüfen Sie die Produktverfügbarkeit

---

**Wichtig:** Die Handles müssen genau übereinstimmen:
- Collection Handle: `test-kollektion`
- Menü Handle: `test-menu`

Diese Handles sind in den Theme-Dateien konfiguriert:
- `templates/index.json` → Collection: `test-kollektion`
- `sections/header-group.json` → Menu: `test-menu`

