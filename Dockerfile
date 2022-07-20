FROM node:lts-alpine
WORKDIR /nodejs2022Q2-service
COPY package*.json ./
COPY ./.env.example ./.env
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build 
EXPOSE ${PORT}
CMD [  "npm", "run", "start:dev" ]