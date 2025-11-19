#!/bin/bash
# Build script for Vercel - Vite + React
echo "Starting Vite build for static deployment..."

# Ensure we're in the correct directory
cd "$(dirname "$0")"

# Install dependencies including dev dependencies
echo "Installing dependencies..."
npm install --include=dev

# Verify vite is available
echo "Checking if vite is available..."
npx vite --version

# Run the Vite build using npx to ensure vite is found
echo "Running Vite build..."
npx vite build

echo "Build completed successfully"
exit 0