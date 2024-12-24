FROM node:lts-alpine AS dev

WORKDIR /app
COPY package*.json ./
RUN npm ping
RUN npm install
COPY . .
EXPOSE 5173

CMD ["npm", "run", "dev"]