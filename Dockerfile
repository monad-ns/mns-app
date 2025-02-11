FROM node:23.7.0

WORKDIR /usr/local/app

COPY package.json ./
RUN yarn install

COPY src  ./src
COPY public ./public

RUN yarn build 

CMD ["yarn", "start"]