FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS build
RUN npm run build

FROM nginx:alpine AS frontend
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

FROM base AS backend
EXPOSE 3000
CMD ["node", "src/api/server.js"]