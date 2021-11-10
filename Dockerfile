# use alpine linux as base
FROM alpine:latest
# install node.js
RUN apk add --update nodejs npm
# set the working directory in the image to /app (also creates this folder)
WORKDIR /app
# copy all files here into /app in image
COPY . /app
# install missing node packages
RUN npm install
# run the node app
CMD ["npm", "start"]
