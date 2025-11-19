#!/bin/bash
# Build script for Vercel - Vite + React
echo "Starting Vite build for static deployment..."

# Install dependencies including dev dependencies
npm install --include=dev

# Run the Vite build using npx to ensure vite is found
echo "Running Vite build..."
npx vite build

echo "Build completed successfully"
exit 0