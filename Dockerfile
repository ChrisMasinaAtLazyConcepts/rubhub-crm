# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --verbose
COPY . .
RUN npm run build  # This creates /app/dist

# Production stage with NGINX
FROM nginx:alpine

# Remove default NGINX files
RUN rm -rf /usr/share/nginx/html/*

# Copy your React build to NGINX directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy your custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Verify files were copied (debug step - optional)
RUN echo "Files in NGINX directory:" && ls -la /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]