FROM node:8
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /react
COPY . .
WORKDIR /react/app
RUN npm i -g serve
RUN yarn add global serve
RUN yarn install
RUN yarn build
CMD serve -s build
EXPOSE 5000
