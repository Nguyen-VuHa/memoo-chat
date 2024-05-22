# Stage 1: Build the Vue.js application
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./

# Retry npm install up to 3 times in case of network failures
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the built application using a simple Node.js server
FROM node:18-alpine AS production-stage
WORKDIR /app
COPY --from=build-stage /app/dist ./dist
COPY server.js .
COPY package*.json ./

# Retry npm install up to 3 times in case of network failures
RUN npm install --only=production

EXPOSE 4500
CMD ["node", "server.js"]