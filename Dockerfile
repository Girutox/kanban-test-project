# Stage 1: Build Angular app
FROM node:18-alpine as builder

WORKDIR /app

# Copy Angular project files
COPY package*.json ./
RUN npm install

COPY . .

# Build Angular app for production with base href
RUN npm run build -- --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app to Nginx HTML folder under subdirectory
COPY --from=builder /app/dist/kanban-app/browser/ /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf