FROM node:18-bullseye-slim

WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN yarn install --frozen-lockfile

# Build the frontend
RUN yarn build:frontend

# Install serve
RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", "packages/app/dist", "-l", "8080"]