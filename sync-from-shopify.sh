#!/bin/bash

# Skript zum automatischen Pullen von Shopify und Pushen zu GitHub
# Dieses Skript kann manuell ausgeführt werden oder als Cron-Job eingerichtet werden

echo "🔄 Starte Synchronisation von Shopify zu GitHub..."

# Prüfe ob Shopify CLI installiert ist
if ! command -v shopify &> /dev/null; then
    echo "❌ Shopify CLI ist nicht installiert!"
    exit 1
fi

# Prüfe ob wir in einem Git-Repository sind
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Dies ist kein Git-Repository!"
    exit 1
fi

# Hole die neuesten Änderungen von Shopify
echo "📥 Lade Änderungen von Shopify..."
shopify theme pull --store=$SHOPIFY_STORE --theme=$SHOPIFY_THEME_ID --only=config/**,layout/**,sections/**,snippets/**,templates/**,locales/**,assets/**,blocks/**

# Prüfe ob es Änderungen gibt
if git diff --quiet && git diff --cached --quiet; then
    echo "✅ Keine Änderungen gefunden. Alles ist synchronisiert."
    exit 0
fi

# Füge alle Änderungen hinzu
echo "📝 Füge Änderungen zu Git hinzu..."
git add -A

# Committe die Änderungen
echo "💾 Committe Änderungen..."
git commit -m "🔄 Auto-sync from Shopify: $(date '+%Y-%m-%d %H:%M:%S')"

# Pushe zu GitHub
echo "🚀 Pushe zu GitHub..."
git push origin main

echo "✅ Synchronisation abgeschlossen!"

