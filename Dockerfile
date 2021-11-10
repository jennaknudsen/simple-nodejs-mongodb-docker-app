# Node.js image
# use alpine linux as base
FROM alpine:latest as node-img
# install node.js
RUN apk add --update nodejs npm
# set the working directory in the image to /app (also creates this folder)
WORKDIR /app
# copy all files here into /app in image
COPY . /app
# install missing node packages
RUN npm install
# set environment variables
ENV DB_HOSTNAME=mongo-container
# run the node app
CMD ["npm", "start"]

# MongoDB image
# use alpine linux as base
FROM mongo:latest as mongo-img
