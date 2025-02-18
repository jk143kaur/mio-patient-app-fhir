# Step 1: Build the app
FROM node:20.18.2 AS build

WORKDIR /app

# Copy package.json and package-lock.json separately for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the app for production
RUN npm run build

# Debug: List the contents after build
RUN ls -la /app/dist

# Step 2: Serve the app
FROM node:20.18.2
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/dist /app/dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
