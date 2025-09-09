FROM node:18-bullseye-slim

WORKDIR /app

# Copy package files
COPY package*.json yarn.lock ./

# Copy all packages and plugins structure
COPY packages/ ./packages/
COPY plugins/ ./plugins/

# Install dependencies
RUN yarn install --frozen-lockfile

# Build the frontend
RUN yarn build:frontend

# Serve the static files
RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", "packages/app/dist", "-l", "8080"]