FROM node:lts-alpine AS dev

WORKDIR /app
COPY *.json ./
RUN npm install
COPY src src
EXPOSE 3000

CMD ["npm", "run", "dev"]