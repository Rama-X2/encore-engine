#!/bin/bash

echo "🚀 Starting deployment fix process..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Type check
echo "🔍 Running type check..."
npm run type-check

# Lint check
echo "🧽 Running lint check..."
npm run lint --fix

# Build project
echo "🏗️ Building project..."
npm run build

echo "✅ Deployment preparation completed!"
echo "🎯 Ready for Vercel deployment!"
