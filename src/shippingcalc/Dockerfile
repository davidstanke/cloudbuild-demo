FROM node:12-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install

ARG PORT=3001

ENV PORT=$PORT
EXPOSE $PORT
CMD ["npm","start"]