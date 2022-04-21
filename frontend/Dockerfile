FROM node:16.14.0-alpine

WORKDIR /app
COPY package*.json ./

RUN npm i

COPY . .
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]

CMD [ "npm", "run", "dev" ]
