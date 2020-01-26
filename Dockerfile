FROM node:12.10.0-alpine
EXPOSE 8000
WORKDIR /app

COPY ./api api
COPY ./node_modules node_modules
COPY ./package.json .
COPY ./package-lock.json .
COPY ./swagger.config.json .
COPY ./tsconfig.json .

RUN npm run build
RUN npx tsc

ENV PORT=8000

USER node
CMD node ./dist/server.js
