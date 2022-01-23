FROM node:16
ENV NODE_ENV production
WORKDIR /usr/src/app

#COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD [ "node", "start.js" ]