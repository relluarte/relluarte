# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source files
COPY . .

# Build the application with Vite
RUN npx vite build

# Debug: Check if index.html exists and list files
RUN ls -la /app/dist
RUN test -f /app/dist/index.html || (echo "CRITICAL ERROR: index.html not found in /app/dist!" && exit 1)

# Production stage
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set permissive permissions for debugging
RUN chmod -R 777 /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
