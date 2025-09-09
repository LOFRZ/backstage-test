# Dockerfile
FROM node:18-bullseye-slim

WORKDIR /app

# Copy package files first
COPY package*.json yarn.lock ./

# Copy packages
COPY packages/ ./packages/

# Copy plugins if they exist
COPY plugins* ./plugins/

# Install dependencies
RUN yarn install --frozen-lockfile

# Build the frontend only
RUN yarn build:frontend

# Install serve globally
RUN npm install -g serve

# Expose port
EXPOSE 8080

# Start the app
CMD ["serve", "-s", "packages/app/dist", "-l", "8080"]