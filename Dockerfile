FROM node:18-alpine3.18

WORKDIR /app
COPY package*.json /app/
RUN npm install
RUN npm i -g nodemon
COPY . .
CMD npm run devstart