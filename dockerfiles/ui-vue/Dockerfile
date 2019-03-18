FROM node:lts-alpine
RUN npm install -g http-server
WORKDIR /vue
COPY app/package*.json ./
RUN npm install
COPY app/ .
RUN npm run build
EXPOSE 5050
CMD [ "http-server", "-p5050", "dist" ]
