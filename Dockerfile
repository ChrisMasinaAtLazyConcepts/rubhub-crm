# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build  # This must create a 'build', 'dist', or similar folder

# Production stage - Use official NGINX
FROM nginx:alpine

# Remove default NGINX files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder stage to NGINX directory
COPY --from=builder /app/build /usr/share/nginx/html  # For React (create-react-app)
# OR: COPY --from=builder /app/dist /usr/share/nginx/html  # For Vue/Angular/Vite

# Copy your custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (NGINX default)
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]