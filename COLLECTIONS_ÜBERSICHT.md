# Übersicht der verwendeten Collections im Theme

## 📋 Zusammenfassung

Diese Übersicht zeigt alle Collections, die in den Theme-Dateien referenziert werden.

---

## 🎯 Aktuell verwendete Collections

### 1. **Homepage (index.json)**
- **Datei:** `templates/index.json`
- **Collection:** `"all"`
- **Verwendung:** Featured Collection Section
- **Details:**
  - Zeigt 8 Produkte an
  - Titel: "Featured products"
  - 4 Spalten auf Desktop, 2 auf Mobile
  - Quick Add: deaktiviert

### 2. **Collection-Liste (list-collections.json)**
- **Datei:** `templates/list-collections.json`
- **Verwendung:** Zeigt alle Collections als Übersicht
- **Details:**
  - Titel: "Collections"
  - Sortierung: alphabetisch
  - 3 Spalten auf Desktop, 2 auf Mobile
  - Bildverhältnis: quadratisch

---

## 🔧 Collection-Einstellungen in Sections

### Sections, die Collections verwenden können:

1. **`featured-collection`** (`sections/featured-collection.liquid`)
   - Kann jede Collection auswählen
   - Wird auf der Homepage verwendet

2. **`collection-list`** (`sections/collection-list.liquid`)
   - Zeigt mehrere Collections als Liste
   - Wird aktuell nicht in Templates verwendet

3. **`main-collection-product-grid`** (`sections/main-collection-product-grid.liquid`)
   - Wird auf Collection-Seiten verwendet
   - Zeigt alle Produkte einer Collection an
   - Standard: 16 Produkte pro Seite

4. **`main-collection-banner`** (`sections/main-collection-banner.liquid`)
   - Banner für Collection-Seiten
   - Zeigt Collection-Titel, Beschreibung und Bild

---

## 🛒 Weitere Collection-Referenzen

### Cart Drawer Collection
- **Einstellung:** `cart_drawer_collection` in `config/settings_data.json`
- **Aktueller Wert:** `""` (leer - keine Collection ausgewählt)
- **Verwendung:** Wird im Cart Drawer angezeigt, wenn eine Collection ausgewählt ist

---

## 📁 Dateien mit Collection-Referenzen

### Templates:
- ✅ `templates/index.json` - verwendet Collection "all" in featured-collection Section
- ✅ `templates/collection.json` - zeigt einzelne Collection-Seiten an
- ✅ `templates/list-collections.json` - zeigt alle Collections als Liste (alphabetisch sortiert)

### Sections:
- ✅ `sections/featured-collection.liquid` - Featured Collection Section
- ✅ `sections/collection-list.liquid` - Collection Liste
- ✅ `sections/main-collection-product-grid.liquid` - Produkt-Grid für Collections
- ✅ `sections/main-collection-banner.liquid` - Collection Banner
- ✅ `sections/main-list-collections.liquid` - Liste aller Collections

### Snippets:
- ✅ `snippets/card-collection.liquid` - Collection Card Komponente
- ✅ `snippets/cart-drawer.liquid` - kann Collection im Warenkorb anzeigen

---

## 💡 Hinweise

1. **Dynamische Collections:** Die meisten Collections werden dynamisch aus dem Shopify Admin geladen und sind nicht in den Dateien hardcodiert.

2. **"all" Collection:** Die Collection "all" zeigt standardmäßig alle Produkte im Shop an.

3. **Collection-Seiten:** Jede Collection im Shopify Admin hat automatisch eine eigene Seite, die das `collection.json` Template verwendet.

4. **Einstellungen ändern:** Collections können im Shopify Theme Editor ausgewählt werden, ohne die Dateien direkt zu bearbeiten.

---

## 🔍 So finden Sie alle Ihre Collections

Collections werden im **Shopify Admin** verwaltet:
- Gehen Sie zu: **Produkte → Collections**
- Dort sehen Sie alle erstellten Collections

Um zu sehen, welche Collections in welchen Sections verwendet werden:
1. Öffnen Sie den **Theme Editor** im Shopify Admin
2. Gehen Sie zu den jeweiligen Sections
3. Dort sehen Sie die ausgewählten Collections

---

*Erstellt am: $(date)*
*Theme: Schnappix Shopify*

