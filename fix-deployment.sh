#!/bin/bash

echo "========================================"
echo "Fixing Vercel Deployment Issues"
echo "========================================"

echo
echo "1. Cleaning up node_modules and cache..."
rm -rf node_modules
rm -rf .next
rm -f package-lock.json
echo "Cleanup completed."

echo
echo "2. Installing fresh dependencies..."
npm install

echo
echo "3. Running type check..."
npm run type-check

echo
echo "4. Running lint check..."
npm run lint

echo
echo "5. Testing build..."
npm run build

echo
echo "========================================"
echo "Fix completed!"
echo "You can now try deploying to Vercel again."
echo "========================================"