# SCHNAPPIX Hero Section - Anleitung

## ✅ Dateien erstellt

1. **`sections/schnappix-hero.liquid`** - Die Hero Section
2. **`assets/schnappix-hero.css`** - Das Styling

## 📋 CSS Import

Die CSS-Datei wird automatisch in der Section-Datei importiert:
```liquid
{{ 'schnappix-hero.css' | asset_url | stylesheet_tag }}
```

**Keine manuellen Änderungen am `theme.liquid` nötig!** Die Section importiert ihre CSS-Datei selbst.

## 🎨 Section im Theme Editor hinzufügen

### Schritt 1: Theme Editor öffnen
1. Gehen Sie zu: **Online Store → Themes → Anpassen**
2. Wählen Sie die Seite aus, auf der die Hero Section erscheinen soll (z.B. Homepage)

### Schritt 2: Section hinzufügen
1. Klicken Sie auf **"Sections hinzufügen"** (Add section)
2. Suchen Sie nach **"SCHNAPPIX Hero"**
3. Klicken Sie darauf, um die Section hinzuzufügen

### Schritt 3: Section konfigurieren

#### Media (Hintergrund)
- **Hero Image**: Laden Sie ein hochwertiges Hintergrundbild hoch (empfohlen: 1920x1080px oder größer)
- **Hero Video URL (MP4)**: Optional - Direkte URL zu einem MP4-Video (überschreibt das Bild, falls gesetzt)

#### Logo
- **Logo Image**: Optional - Laden Sie das SCHNAPPIX Logo hoch

#### Content (Inhalt)
- **Headline**: Standard: "Premium Snacks & Drinks 24/7"
- **Subheadline**: Standard: "Moderne Selbstbedienungsautomaten an öffentlichen Plätzen..."

#### Buttons
- **Button 1 Text**: Standard: "Standorte finden"
- **Button 1 Link**: URL für Button 1
- **Button 2 Text**: Standard: "B2B Anfrage"
- **Button 2 Link**: URL für Button 2

#### Style (Stil)
- **Primary Color**: Standard: #E45521 (Schnappix Orange)
- **Text Color**: Standard: #FFFFFF (Weiß)
- **Overlay Opacity**: Standard: 50% (Dunkler Gradient-Overlay für Lesbarkeit)
- **Content Alignment**: Links oder Zentriert

## 🎯 Empfohlene Verwendung

### Homepage
1. Fügen Sie die Section als **erste Section** auf der Homepage hinzu
2. Positionieren Sie sie ganz oben in der Section-Liste
3. Verwenden Sie ein starkes, urbanes Hintergrundbild

### Beispiel-Konfiguration
```
Headline: "Premium Snacks & Drinks 24/7"
Subheadline: "Moderne Selbstbedienungsautomaten an öffentlichen Plätzen, Bahnhöfen und Wohngebieten. Immer verfügbar, immer frisch."
Button 1: "Standorte finden" → /pages/standorte
Button 2: "B2B Anfrage" → /pages/b2b-kontakt
Primary Color: #E45521
Overlay Opacity: 50%
Content Alignment: Center
```

## 🎨 Design-Features

- ✅ **Full-width, hochwertiger Hintergrund** (Bild oder Video)
- ✅ **Dunkler Gradient-Overlay** für optimale Textlesbarkeit
- ✅ **Logo-Platzierung** (optional)
- ✅ **Große, fette Typografie** für maximale Wirkung
- ✅ **2 CTA-Buttons** (Primary & Secondary)
- ✅ **Mobile-first responsive** Design
- ✅ **Smooth Fade-in Animationen** beim Scrollen
- ✅ **WCAG AA konform** (ausreichender Kontrast)
- ✅ **Reduced Motion Support** für Barrierefreiheit

## 📱 Responsive Verhalten

- **Mobile**: Zentrierter Inhalt, vertikale Buttons, optimierte Schriftgrößen
- **Tablet**: Größere Schrift, horizontale Buttons
- **Desktop**: Maximale Wirkung mit großen Schriften und großzügigem Abstand

## 🔧 Technische Details

- Verwendet Shopify Image Filters für responsive Bilder
- Unterstützt Dawn Utility Classes
- Kompatibel mit Dawn Animation System
- Keine inline CSS (außer dynamischen Variablen)
- Vollständig Liquid-kompatibel

## 🎬 Animationen

Die Section nutzt:
- **Fade-in Animationen** beim Laden
- **Scroll-triggered Animations** (wenn in Theme aktiviert)
- **Hover-Effekte** auf Buttons
- **Staggered Animations** (Logo → Headline → Subheadline → Buttons)

## ⚠️ Wichtige Hinweise

1. **Video-Format**: Nur MP4 wird unterstützt. Verwenden Sie direkte URLs zu Video-Dateien.
2. **Bildgröße**: Verwenden Sie große, hochwertige Bilder (mindestens 1920px Breite) für beste Qualität.
3. **Overlay**: Passen Sie die Overlay-Opacity an, um die Lesbarkeit zu optimieren.
4. **Logo**: Das Logo sollte transparent sein (PNG/SVG) für beste Ergebnisse.

## 🚀 Performance

- Bilder werden lazy-loaded (außer Hero-Bild, das eager geladen wird)
- CSS wird nur geladen, wenn die Section verwendet wird
- Optimierte Animationen mit `prefers-reduced-motion` Support

