FROM node:12.10.0-alpine
EXPOSE 8000
WORKDIR /app

COPY ./node_modules node_modules/
COPY ./package.json .
COPY ./dist dist/

ENV PORT=8000

USER node
CMD node ./dist/server.js
