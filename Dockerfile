# build environment
FROM node:14.15.4-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
# Add ENV vars from .env here


COPY package.json ./
COPY package-lock.json ./
COPY . ./

RUN npm ci
RUN npm run build

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]