# 🔧 Setup-Anleitung für automatische Synchronisation

## Deine Credentials:
⚠️ **WICHTIG**: Du hast bereits deine Credentials erhalten. Verwende diese für:
- GitHub Secrets (siehe Schritt 2)
- Lokale .env Datei (siehe Schritt 1)

## 📋 Schritt-für-Schritt Einrichtung:

### 1. Lokale .env Datei erstellen

Erstelle eine `.env` Datei im Repository-Verzeichnis:

```bash
cat > .env << EOF
SHOPIFY_STORE=DEIN-STORE-NAME.myshopify.com
SHOPIFY_THEME_ID=DEINE_THEME_ID
SHOPIFY_CLI_THEME_TOKEN=DEIN_SHOPIFY_TOKEN
EOF
```

**Hinweis**: Die tatsächlichen Werte wurden dir bereits mitgeteilt. Verwende diese für die .env Datei.

**Wichtig**: Ersetze `DEIN-STORE-NAME` mit deinem tatsächlichen Store-Namen!

### 2. GitHub Secrets konfigurieren

Gehe zu: https://github.com/mudzhiri/schnappix_shopify/settings/secrets/actions

Klicke auf "New repository secret" und füge folgende Secrets hinzu:

#### Secret 1: `SHOPIFY_CLI_THEME_TOKEN`
```
DEIN_SHOPIFY_TOKEN
```
(Verwende den Token, der dir mitgeteilt wurde)

#### Secret 2: `SHOPIFY_STORE`
```
DEIN-STORE-NAME.myshopify.com
```
(Ersetze DEIN-STORE-NAME mit deinem tatsächlichen Store-Namen)

#### Secret 3: `SHOPIFY_THEME_ID`
```
DEINE_THEME_ID
```
(Verwende die Theme ID, die dir mitgeteilt wurde)

### 3. Store-Namen finden

Falls du deinen Store-Namen nicht kennst:
- Gehe zu deinem Shopify Admin
- Der Store-Name steht in der URL: `https://DEIN-STORE-NAME.myshopify.com/admin`
- Oder führe aus: `shopify theme list` (zeigt auch den Store-Namen)

### 4. Testen

#### Test 1: Shopify → GitHub
```bash
./sync-from-shopify.sh
```

#### Test 2: GitHub → Shopify
```bash
# Mache eine kleine Änderung
echo "# Test" >> test.md
git add test.md
git commit -m "Test sync"
git push origin main
# Prüfe GitHub Actions: https://github.com/mudzhiri/schnappix_shopify/actions
```

## ✅ Fertig!

Nach dem Setup:
- **Cursor → GitHub → Shopify**: Automatisch bei jedem Push
- **Shopify → GitHub → Cursor**: Führe `./sync-from-shopify.sh` aus

