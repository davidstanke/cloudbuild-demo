FROM node:12-alpine
COPY . .
RUN npm install --only=production
CMD npm start
EXPOSE 8080
