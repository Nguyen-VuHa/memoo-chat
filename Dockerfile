# Stage 1: Build the Vue application
FROM node:16 as build-stage

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files and folders to the current working directory (i.e., 'app' folder)
COPY . .

# Build the app
RUN npm run build
# Or if you use yarn, uncomment the next line:
# RUN yarn build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine as production-stage

# Copy built assets from 'build-stage' to the default Nginx serve folder
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Define the command to run your app using CMD which defines your runtime
CMD ["nginx", "-g", "daemon off;"]