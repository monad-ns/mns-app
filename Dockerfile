FROM node:23.7.0 as build

WORKDIR /usr/local/app

COPY package.json ./
RUN yarn install

COPY src  ./src
COPY public ./public

RUN yarn build