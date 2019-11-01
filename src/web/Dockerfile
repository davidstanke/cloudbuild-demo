FROM node:12-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install

ENV PORT 8080
EXPOSE 8080
CMD ["npm","start"]