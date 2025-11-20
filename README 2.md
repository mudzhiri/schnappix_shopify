# Schnappix Shopify Theme

Shopify Theme Repository mit automatischer Synchronisation zwischen Cursor, GitHub und Shopify.

## 🔄 Automatische Synchronisation

### Cursor → GitHub → Shopify
Wenn du in Cursor Änderungen machst und zu GitHub pushst, werden diese **automatisch** zu Shopify gepusht via GitHub Actions.

### Shopify → GitHub → Cursor
Um Änderungen von Shopify zu holen und zu GitHub zu pushen, führe aus:
```bash
./sync-from-shopify.sh
```

## 🚀 Setup

### 1. GitHub Secrets konfigurieren
Gehe zu GitHub Repository → Settings → Secrets and variables → Actions und füge hinzu:

- `SHOPIFY_CLI_THEME_TOKEN`: Dein Shopify Theme Token
- `SHOPIFY_STORE`: Dein Store Name (z.B. `dein-store.myshopify.com`)
- `SHOPIFY_THEME_ID`: Deine Theme ID (optional, falls nicht gesetzt wird das Live Theme verwendet)

### 2. Shopify CLI Token erstellen
```bash
shopify auth login
shopify theme token
```

### 3. Environment Variables für lokales Skript
Erstelle eine `.env` Datei (wird nicht zu Git hinzugefügt):
```bash
SHOPIFY_STORE=dein-store.myshopify.com
SHOPIFY_THEME_ID=123456789
```

### 4. Skript ausführbar machen
```bash
chmod +x sync-from-shopify.sh
```

## 📋 Workflow

### Änderungen in Cursor machen:
1. Dateien in Cursor bearbeiten
2. `git add .`
3. `git commit -m "Deine Nachricht"`
4. `git push origin main`
5. ✅ Automatisch zu Shopify gepusht!

### Änderungen in Shopify Theme Editor:
1. Änderungen in Shopify machen
2. `./sync-from-shopify.sh` ausführen
3. ✅ Automatisch zu GitHub gepusht und in Cursor verfügbar!

## 🔧 Automatisches Polling (Optional)

Um regelmäßig von Shopify zu pullen, kannst du einen Cron-Job einrichten:

```bash
# Öffne crontab
crontab -e

# Füge hinzu (prüft alle 5 Minuten):
*/5 * * * * cd /pfad/zum/repo && ./sync-from-shopify.sh >> sync.log 2>&1
```

## 📝 Hinweise

- Das GitHub Actions Workflow pusht nur bei Änderungen am `main` Branch
- Markdown-Dateien werden ignoriert (um Endlosschleifen zu vermeiden)
- Das Sync-Skript prüft automatisch, ob es Änderungen gibt

