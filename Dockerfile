# Stage 1: Build the Vue.js application
FROM node:16-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the built application using a simple Node.js server
FROM node:16-alpine AS production-stage
WORKDIR /app
COPY --from=build-stage /app/dist ./dist
COPY server.js .
COPY package*.json ./
RUN npm install

EXPOSE 4500
CMD ["node", "server.js"]