FROM alpine:3.19.1
ENV NODE_VERSION 20.11.1

RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm ci

COPY src /app

RUN npm install -g ts-node

ENV Env prod

EXPOSE 8088
CMD ["ts-node", "app/index.js"]