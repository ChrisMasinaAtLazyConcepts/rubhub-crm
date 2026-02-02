# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
# Production stage
FROM node:18-alpine
RUN npm install -g serve
COPY --from=build /app/dist ./dist

EXPOSE 80

# Serve the built files
CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:80"]