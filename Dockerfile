FROM node:10-alpine

WORKDIR /backend

EXPOSE 8080

ENV NODE_ENV=development
ENV JWT_SECRET=HelloWorld
ENV JWT_EXPIRY=24
ENV PORT=8080
ENV SESSION_SECRET=SessSecret
ENV COOKIE_SECRET=CookSecret

COPY package.json yarn.lock ./

RUN yarn install

COPY tsconfig.json ./
COPY knexfile.js ./
COPY ./migrations migrations
COPY ./seeds seeds
COPY ./src src
COPY ./test test

CMD ["yarn", "start"]