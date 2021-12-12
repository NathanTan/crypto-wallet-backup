FROM node:latest

WORKDIR .

COPY package*.json ./

RUN npm install
# RUN npm ci --only=production

COPY . .

# Expose the port the service in the container will use
EXPOSE 3000


CMD [ "npx", "ts-node", "./src/server/server.ts"]
