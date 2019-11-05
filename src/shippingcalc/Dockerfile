FROM node:12-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install

# default to port 3001, for running locally in
ARG PORT=3001

ENV PORT=$PORT
EXPOSE $PORT
CMD ["npm","start"]