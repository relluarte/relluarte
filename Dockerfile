# Build stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npx vite build

# Production stage - Using unprivileged nginx image
FROM nginxinc/nginx-unprivileged:alpine

# Switch to root temporarily to set permissions
USER root

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Create a test file to verify server is working
RUN echo "<html><body><h1>Server is working!</h1><p>If you see this, Nginx is fine.</p></body></html>" > /usr/share/nginx/html/test.html

# Ensure permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Switch back to nginx user
USER nginx

# Copy custom config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port (default for this image is 8080)
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
