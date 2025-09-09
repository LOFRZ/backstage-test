FROM node:18-bullseye-slim

WORKDIR /app

# Copy package files
COPY package*.json yarn.lock ./
COPY packages/app/package.json ./packages/app/
COPY plugins/ma-premiere-page/package.json ./plugins/ma-premiere-page/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the frontend
RUN yarn build:frontend

# Serve the static files
RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", "packages/app/dist", "-l", "8080"]