FROM node:17

WORKDIR /app

COPY src ./

RUN npm install 
RUN npm install -g ts-node nodemon

ENV Env prod

EXPOSE 8080
CMD nodemon