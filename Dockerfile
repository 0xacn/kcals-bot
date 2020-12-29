FROM node:12

WORKDIR /kcals-bot /

COPY . .

RUN npm i

RUN cd src

RUN node src/index.js
