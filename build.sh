#!/bin/bash
# Build script for Vercel - Vite + React
echo "Starting Vite build for static deployment..."

# Install dependencies if needed
npm install

# Run the Vite build
npm run build

echo "Build completed successfully"
exit 0