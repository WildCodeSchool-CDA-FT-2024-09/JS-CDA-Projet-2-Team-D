FROM node:lts-alpine AS dev

WORKDIR /app
COPY *.json ./
RUN npm install
COPY src src
COPY ./jest.config.ts .
COPY tests tests
EXPOSE 4000

# CMD ["npm", "run", "devseed"]
CMD ["npm", "run", "initdataset"]