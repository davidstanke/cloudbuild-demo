FROM node:12-alpine
COPY . .
RUN npm install --only=production
CMD node app.js
EXPOSE 8080