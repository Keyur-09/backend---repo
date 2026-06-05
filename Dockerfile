#-----------BUILD-----------
FROM node:22-alpine AS builder
WORKDIR /app

#COPY DEPENDENCIES
COPY package*.json ./
RUN npm ci



#------------RUN TIME-----------
FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production

#COPY DEPENDENCIES AND INSTALL ONLY PRODUCTION DENPENDENCIES
COPY package*.json ./
RUN npm ci --omit=dev

#COPY COMPLIED APP FROM BUILDER
COPY . .

EXPOSE 5000

#START THE APP
CMD ["node", "index.js"]
