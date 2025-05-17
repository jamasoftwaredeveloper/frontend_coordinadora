# Etapa 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: Servir con Nginx — ahora con alias "final"
FROM nginx:alpine AS final

# Copiar los archivos estáticos generados
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 5174
CMD ["nginx", "-g", "daemon off;"]
