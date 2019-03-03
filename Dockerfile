FROM node:8

EXPOSE 3000
WORKDIR .
COPY ./api /api
COPY ./test /test
COPY ./node_modules /node_modules
COPY ./package.json .
COPY ./package-lock.json .
COPY ./server.js .
COPY ./config.js .
COPY ./cache.js .
COPY ./swagger.yaml .

RUN npm install
RUN npm run build

ENV PORT=3000

USER node
CMD ["npm","start"]

