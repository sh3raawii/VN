FROM node:12.1.0-alpine

RUN apk update && apk add bash python make gcc g++ && rm -rf /var/cache/apk/*

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .

ARG RELEASE
ENV RELEASE="${RELEASE}"

EXPOSE 8080

CMD ["yarn", "start"]