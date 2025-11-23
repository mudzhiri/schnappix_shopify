# Schnappix Hero Section v1 - Installation & Usage Guide

## 📦 Installation

Die Hero-Section v1 besteht aus 3 Dateien:

1. `sections/schnappix-hero-v1.liquid` - Haupt-Section-Datei
2. `assets/schnappix-hero-v1.css` - Stylesheet
3. `assets/schnappix-hero-v1.js` - JavaScript für Animationen

Alle Dateien sind bereits im Repository vorhanden und zu Shopify gepusht.

## 🚀 Verwendung im Theme Editor

1. **Theme Editor öffnen**
   - Gehe zu: Online Store → Themes → Customize

2. **Section hinzufügen**
   - Klicke auf "Add section"
   - Wähle "Schnappix Hero v1"

3. **Content anpassen**
   - **Title**: Hauptüberschrift
   - **Subtitle**: Untertitel (Richtext unterstützt)
   - **Button 1 & 2**: CTA-Buttons mit Links

## 🎨 Layout-Einstellungen

### Content Alignment
- **Left**: Text linksbündig
- **Center**: Text zentriert (Standard)
- **Right**: Text rechtsbündig

### Vertical Position
- **Top**: Content oben
- **Middle**: Content mittig (Standard)
- **Bottom**: Content unten

### Text Direction
- **Horizontal**: Elemente nebeneinander
- **Vertical**: Elemente untereinander (Standard)

### Content Width
- **Fixed**: Feste Breite (Max Width einstellbar)
- **Fluid**: Volle Breite

## 🖼️ Background-Einstellungen

### Image Background
- **Background Image**: Hauptbild (Desktop)
- **Background Image Mobile**: Optionales Mobile-Bild
- **Focal Point**: CSS object-position (z.B. "center center", "left top")
- **Image Fit**: Cover oder Contain

### Gradient Background
- **Gradient**: Color Picker mit Gradient-Optionen
- Standard: Dark Blue-Black Gradient

### Video Background
- **Video URL**: Direkter Link zu MP4-Datei
- **Ken-Burn Effect**: Optional aktivierbar

## ✨ Animation-Einstellungen

### Load Animation
- **Fade**: Einfacher Fade-In
- **Slide Up**: Von unten nach oben
- **Slide Left**: Von links nach rechts
- **Zoom In**: Zoom-Effekt
- **Fly In**: Mehrere Richtungen (Title oben, Subtitle links, Buttons rechts)
- **None**: Keine Animation

### Animation Controls
- **Duration**: 200-2000ms (Standard: 800ms)
- **Delay**: 0-1000ms (Standard: 0ms)
- **Easing**: Verschiedene Easing-Funktionen

### Spezial-Effekte
- **Parallax**: Parallax-Effekt für Background-Images
- **Ken-Burn**: Ken-Burn-Effekt für Videos

## 🎨 Style-Einstellungen

### Color Scheme
- **Dark**: Weißer Text auf dunklem Hintergrund (Standard)
- **Light**: Schwarzer Text auf hellem Hintergrund

### Overlay
- **Overlay Opacity**: 0-100% (Standard: 40%)
- Erhöht Text-Lesbarkeit über Bildern

### Neon Glow
- **Enable Neon Glow**: Aktiviert Neon-Glow-Effekt auf Title
- Orange Glow (#F15A29) mit Puls-Animation

## 📏 Spacing-Einstellungen

Alle Padding-Werte sind individuell einstellbar:
- **Padding Top**: 0-200px (Standard: 80px)
- **Padding Bottom**: 0-200px (Standard: 80px)
- **Padding Left**: 0-100px (Standard: 24px)
- **Padding Right**: 0-100px (Standard: 24px)
- **Gap**: Abstand zwischen Elementen 0-80px (Standard: 24px)

### Min Height
- **Desktop**: 300-1000px (Standard: 600px)
- **Mobile**: 200-800px (Standard: 400px)

## 🔧 Advanced-Einstellungen

- **Hide on Mobile**: Section auf Mobile verstecken
- **Hide on Desktop**: Section auf Desktop verstecken

## 📱 Responsive Verhalten

- **Mobile**: Automatisches Stacking der Buttons
- **Mobile Image Override**: Optional separates Bild für Mobile
- **Responsive Typography**: Clamp() für flüssige Schriftgrößen

## 🎯 Version Upgrade Guide

### Von v1 zu v2 (Zukünftig)

1. **Dateien duplizieren**:
   ```bash
   cp sections/schnappix-hero-v1.liquid sections/schnappix-hero-v2.liquid
   cp assets/schnappix-hero-v1.css assets/schnappix-hero-v2.css
   cp assets/schnappix-hero-v1.js assets/schnappix-hero-v2.js
   ```

2. **Prefix ändern**:
   - Suche & Ersetze: `shx-hero-v1` → `shx-hero-v2`
   - Suche & Ersetze: `hero-v1` → `hero-v2`

3. **Schema anpassen**:
   - Name: "Schnappix Hero v2"
   - Neue Features hinzufügen

4. **Version-Kommentare aktualisieren**:
   - Version: 2.0
   - Changelog dokumentieren

## 🐛 Troubleshooting

### Animationen funktionieren nicht
- Prüfe Browser-Konsole auf Fehler
- Stelle sicher, dass `schnappix-hero-v1.js` geladen wird
- Prüfe Intersection Observer Support

### Parallax funktioniert nicht
- Stelle sicher, dass "Enable Parallax" aktiviert ist
- Prüfe, ob Background-Image vorhanden ist

### Video wird nicht abgespielt
- Prüfe Video-URL (muss direkter MP4-Link sein)
- Stelle sicher, dass Video autoplay-fähig ist
- Prüfe Browser-Kompatibilität

## 📚 Code-Struktur

```
schnappix-hero-v1.liquid
├── CSS Variables (Inline Styles)
├── Background Layer
│   ├── Image / Gradient / Video
│   └── Overlay
├── Content Layer
│   ├── Title
│   ├── Subtitle
│   └── Buttons
└── Schema (Settings)

schnappix-hero-v1.css
├── CSS Variables
├── Hero Container
├── Background Layer
├── Content Container
├── Typography
├── Buttons
├── Animations
└── Responsive

schnappix-hero-v1.js
├── SchnappixHeroV1 Class
├── Intersection Observer
├── Animation Methods
├── Parallax Handler
└── Ken-Burn Handler
```

## ✅ Best Practices

1. **Performance**:
   - Verwende optimierte Bilder (WebP wenn möglich)
   - Videos sollten komprimiert sein
   - Lazy Loading für nicht-kritische Assets

2. **Accessibility**:
   - Stelle sicher, dass Text kontrastreich ist
   - Verwende semantisches HTML
   - Teste mit Screen Readern

3. **SEO**:
   - Title sollte H1 sein (bereits implementiert)
   - Alt-Text für Bilder (automatisch)
   - Strukturierte Daten wenn nötig

## 🎨 Design-Tipps

- **Neon Glow**: Funktioniert am besten auf dunklem Hintergrund
- **Overlay**: Erhöhe Opacity bei hellem Hintergrundbild
- **Focal Point**: Wähle den wichtigsten Teil des Bildes
- **Animation**: "Fly In" für dynamischere Wirkung

## 📞 Support

Bei Fragen oder Problemen:
1. Prüfe Browser-Konsole auf Fehler
2. Teste in verschiedenen Browsern
3. Prüfe Theme Editor Settings
4. Stelle sicher, dass alle Dateien gepusht wurden

