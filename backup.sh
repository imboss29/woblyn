#!/bin/bash

# Charge la DATABASE_URL depuis .env
export $(cat .env | grep DATABASE_URL | xargs)

# Crée le dossier backups s'il n'existe pas
mkdir -p backups

# Nom du fichier avec la date
FILENAME="backups/woblyn_$(date +%Y-%m-%d_%H-%M-%S).sql"

echo "📦 Backup en cours..."

# Export complet
/opt/homebrew/opt/postgresql@18/bin/pg_dump "$DATABASE_URL" > "$FILENAME"

if [ $? -eq 0 ]; then
  SIZE=$(du -h "$FILENAME" | cut -f1)
  echo "✅ Backup réussi : $FILENAME ($SIZE)"
else
  echo "❌ Erreur lors du backup"
  rm -f "$FILENAME"
  exit 1
fi

# Garder seulement les 10 derniers backups (supprime les plus vieux)
cd backups && ls -t *.sql | tail -n +11 | xargs -r rm -f
echo "🧹 Anciens backups nettoyés (max 10 conservés)"