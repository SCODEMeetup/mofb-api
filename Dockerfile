FROM gcr.io/distroless/nodejs
EXPOSE 3000
WORKDIR .
COPY ./api /api
COPY ./node_modules /node_modules
COPY ./package.json .
COPY ./package-lock.json .
COPY ./server.js .

ENV PORT=3000
CMD ["./server.js"]
