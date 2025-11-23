# Vertical Section Navigation Bar v1 - Installation Guide

## 📦 Dateien

Die Vertical Navigation besteht aus 3 Dateien:

1. `sections/section-navigation-vertical.liquid` - Haupt-Section
2. `assets/section-navigation-vertical.css` - Stylesheet
3. `assets/section-navigation-vertical.js` - JavaScript

Alle Dateien sind bereits im Repository vorhanden.

## 🚀 Installation

### Schritt 1: Section zum Theme hinzufügen

1. **Theme Editor öffnen**
   - Gehe zu: Online Store → Themes → Customize

2. **Section hinzufügen**
   - Klicke auf "Add section"
   - Wähle "Vertical Section Navigation v1"
   - Die Section wird automatisch als Fixed-Element positioniert

### Schritt 2: Section IDs zu Homepage-Sections hinzufügen

Um die Navigation funktionsfähig zu machen, müssen deine Homepage-Sections IDs haben:

#### Option A: Im Theme Editor (Einfach)

1. Öffne jede Section, die du navigieren möchtest
2. Suche nach "Section ID" oder "Custom CSS ID" Setting
3. Füge eine eindeutige ID hinzu (z.B. `hero-section`, `products-section`)

#### Option B: In den Liquid-Dateien (Erweitert)

Füge `id` Attribute zu deinen Sections hinzu:

**Beispiel für `sections/hero.liquid`:**
```liquid
<section id="shopify-section-hero" class="hero-section">
  <!-- Section content -->
</section>
```

**Beispiel für `sections/featured-collection.liquid`:**
```liquid
<section id="shopify-section-featured-collection" class="featured-collection">
  <!-- Section content -->
</section>
```

### Schritt 3: Navigation Items konfigurieren

1. **Vertical Section Navigation v1** Section öffnen
2. **"Add block"** → **"Navigation Item"**
3. Für jedes Item:
   - **Section ID**: Die ID der Section (z.B. `shopify-section-hero`)
   - **Label**: Name für Tooltip/Accessibility
   - **Custom Color**: Optional, überschreibt Standard-Farbe
   - **Enable Item**: Ein/Aus

## ⚙️ Konfiguration

### Position
- **Center Left**: Links vom Bildschirm
- **Center Right**: Rechts vom Bildschirm (Standard)
- **Horizontal Offset**: Abstand vom Bildschirmrand (0-100px)

### Colors
- **Primary Color**: Farbe für aktive Linie (Standard: #F15A29)
- **Secondary Color**: Farbe für inaktive Linien (Standard: #FFFFFF)
- **Background Color**: Hintergrundfarbe (Standard: #000000)

### Line Styling
- **Gap Between Lines**: 8-24px (Standard: 14px)
- **Inactive Line**: 2-6px Breite, 16-40px Höhe (Standard: 4px × 24px)
- **Active Line**: 4-10px Breite, 32-80px Höhe (Standard: 6px × 48px)
- **Inactive Opacity**: 10-100% (Standard: 30%)

### Animation
- **Animation Duration**: 100-500ms (Standard: 220ms)

### Display
- **Show Labels**: Zeigt Labels neben Markern
- **Hide on Mobile**: Versteckt Navigation auf Mobile
- **Hide on Desktop**: Versteckt Navigation auf Desktop

## 🎯 Section IDs finden

### Methode 1: Browser DevTools
1. Öffne deine Homepage
2. Rechtsklick auf eine Section → "Inspect"
3. Suche nach `id` Attribut im HTML
4. Kopiere die ID (z.B. `shopify-section-hero`)

### Methode 2: Theme Code
1. Öffne die Section-Datei (z.B. `sections/hero.liquid`)
2. Suche nach `<section` Tag
3. Prüfe, ob `id` Attribut vorhanden ist
4. Falls nicht, füge es hinzu: `id="shopify-section-hero"`

### Standard Shopify Section IDs
Shopify generiert automatisch IDs im Format:
- `shopify-section-{section-type}`
- Beispiel: `shopify-section-hero`, `shopify-section-featured-collection`

## 📝 Beispiel-Konfiguration

### Navigation Items für typische Homepage:

1. **Hero Section**
   - Section ID: `shopify-section-hero`
   - Label: "Hero"

2. **Featured Collection**
   - Section ID: `shopify-section-featured-collection`
   - Label: "Products"

3. **Rich Text**
   - Section ID: `shopify-section-rich-text`
   - Label: "About"

4. **Newsletter**
   - Section ID: `shopify-section-newsletter`
   - Label: "Newsletter"

## 🔧 Erweiterte Nutzung

### Custom Colors pro Marker
- Jedes Navigation Item kann eine eigene Farbe haben
- Nützlich für farbcodierte Sections

### Smooth Scroll
- Klick auf Marker scrollt sanft zur Section
- Berücksichtigt Sticky Header (80px Offset)

### Intersection Observer
- Verwendet moderne Intersection Observer API
- Fallback für ältere Browser vorhanden
- Aktiviert Marker, wenn Section 20% im Viewport sichtbar ist

## 🐛 Troubleshooting

### Navigation erscheint nicht
- Prüfe, ob Section im Theme Editor aktiviert ist
- Prüfe "Hide on Mobile/Desktop" Settings
- Prüfe Browser-Konsole auf Fehler

### Marker werden nicht aktiv
- Prüfe, ob Section IDs korrekt sind
- Prüfe Browser-Konsole: `VerticalNav v1: No sections found`
- Stelle sicher, dass Sections auf der Seite vorhanden sind

### Smooth Scroll funktioniert nicht
- Prüfe, ob `scroll-behavior: smooth` in CSS aktiviert ist
- Prüfe Browser-Kompatibilität (IE11 benötigt Polyfill)

## 📱 Responsive Verhalten

- **Desktop**: Volle Größe, alle Features
- **Tablet**: Leicht reduzierte Opacity (0.8)
- **Mobile**: Weitere Reduktion (0.7), kleinere Marker

## ♿ Accessibility

- **ARIA Labels**: Alle Marker haben `aria-label`
- **Keyboard Navigation**: Tab-Navigation unterstützt
- **Focus States**: Sichtbare Focus-Outline
- **Screen Readers**: Labels werden vorgelesen

## 🎨 Customization

### CSS Variables überschreiben
Du kannst die CSS-Variablen in deinem Theme überschreiben:

```css
:root {
  --vnav-v1-primary: #FF0000; /* Eigene Farbe */
  --vnav-v1-gap: 20px; /* Größerer Abstand */
}
```

### Custom Styling
Füge Custom CSS im Theme Editor hinzu:

```css
.vnav-v1__line {
  border-radius: 4px; /* Abgerundete Ecken */
}
```

## 🔄 Version Upgrade (v1 → v2)

Wenn du zu v2 upgraden möchtest:

1. **Dateien duplizieren**:
   ```bash
   cp sections/section-navigation-vertical.liquid sections/section-navigation-vertical-v2.liquid
   cp assets/section-navigation-vertical.css assets/section-navigation-vertical-v2.css
   cp assets/section-navigation-vertical.js assets/section-navigation-vertical-v2.js
   ```

2. **Prefix ändern**:
   - Suche & Ersetze: `vnav-v1` → `vnav-v2`
   - Suche & Ersetze: `VerticalNavV1` → `VerticalNavV2`

3. **Schema anpassen**:
   - Name: "Vertical Section Navigation v2"
   - Neue Features hinzufügen

## ✅ Best Practices

1. **Performance**:
   - IntersectionObserver ist GPU-optimiert
   - `will-change` für bessere Animation-Performance
   - `transform: translateZ(0)` für Hardware-Beschleunigung

2. **Accessibility**:
   - Alle Marker haben Labels
   - Keyboard-Navigation funktioniert
   - Focus-States sind sichtbar

3. **Mobile**:
   - Reduzierte Opacity auf Mobile
   - Kleinere Marker für bessere Touch-Targets
   - Optional: Verstecken auf Mobile

## 📞 Support

Bei Problemen:
1. Prüfe Browser-Konsole auf Fehler
2. Prüfe, ob Section IDs korrekt sind
3. Teste in verschiedenen Browsern
4. Stelle sicher, dass alle Dateien gepusht wurden

