FROM node:23.7.0 AS build

WORKDIR /usr/local/app

COPY package.json ./
RUN yarn install

COPY src  ./src
COPY public ./public

RUN yarn build

FROM nginx:latest AS production
COPY --from=build /usr/local/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
