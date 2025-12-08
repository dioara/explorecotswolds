#!/bin/bash

# Script to replace all Hull references with Cotswolds branding

echo "🔄 Updating branding from Hull to Cotswolds..."

# Replace "Hull" with "Cotswolds" in all relevant files
find client/src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's/Hull/Cotswolds/g' {} +

# Replace "hull" with "cotswolds" (lowercase)
find client/src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's/hull/cotswolds/g' {} +

# Replace specific Hull-related content
find client/src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s/East Yorkshire/Gloucestershire/g" {} +
find client/src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s/01482/01451/g" {} +

# Rename Hull-specific component files
if [ -f "client/src/components/HullNews.tsx" ]; then
  mv client/src/components/HullNews.tsx client/src/components/CotswoldsNews.tsx
fi

if [ -f "client/src/components/HullRadioPlayer.tsx" ]; then
  mv client/src/components/HullRadioPlayer.tsx client/src/components/CotswoldsRadioPlayer.tsx
fi

echo "✅ Branding update complete!"
echo "Note: Some files may need manual review for context-specific changes"
