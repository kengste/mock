FROM node:12.13.1
WORKDIR /app
COPY package.json /app
RUN npm install

COPY . /app

CMD ["npm", "run", "prod"]