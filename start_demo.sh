#!/bin/bash
echo "🌸 Запуск демонстраційного промо-лендінгу LioraShop..."
echo "📍 Відкриття у веббраузері..."

# Визначаємо шлях до preview.html
PREVIEW_FILE="$(pwd)/frontend/preview.html"

# Відкриваємо у системному браузері (macOS / Linux / Windows)
if which open > /dev/null; then
  open "$PREVIEW_FILE"
elif which xdg-open > /dev/null; then
  xdg-open "$PREVIEW_FILE"
elif which start > /dev/null; then
  start "$PREVIEW_FILE"
else
  echo "Відкрийте цей файл вручну у браузері: $PREVIEW_FILE"
fi

echo "✅ Демо відкрито! Для повноцінної розробки запустіть: npm run dev"
