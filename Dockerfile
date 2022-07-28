FROM node:lts-alpine
WORKDIR /usr/src/nodejs2022q2-service
COPY package*.json ./
COPY .env.example .env
RUN npm install && npm cache clean --force
COPY . .
EXPOSE ${PORT}
RUN npm run prebuild
RUN npm run build
USER node
RUN npm run typeorm:migration
CMD [  "npm", "run", "start:dev" ]