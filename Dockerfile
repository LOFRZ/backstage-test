FROM node:18

RUN corepack enable

WORKDIR /app

COPY . .

RUN yarn install --immutable

RUN yarn workspace app build

RUN npm install -g serve

CMD ["serve", "-s", "packages/app/dist", "-p", "8080"]