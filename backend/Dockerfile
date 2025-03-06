FROM node:22.14.0-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci
COPY . .

EXPOSE 3000

CMD npm run migration:run && npm run start:dev
