FROM node:12
COPY . .
RUN npm install --only=production
CMD npm start
EXPOSE 8080