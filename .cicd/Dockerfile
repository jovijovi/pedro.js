FROM node:14 as builder
MAINTAINER pedro

ADD conf /opt/app_src/conf
ADD lib /opt/app_src/lib
ADD server /opt/app_src/server
COPY package.json /opt/app_src/
COPY tsconfig.json /opt/app_src/
COPY yarn.lock /opt/app_src/

WORKDIR /opt/app_src
RUN yarn install --frozen-lockfile && yarn build
ADD node_modules /opt/app_src/dist/node_modules

FROM node:14-alpine as runtime

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    && apk add --no-cache bash

WORKDIR /opt/app

COPY --from=builder /opt/app_src/dist /opt/app

ENTRYPOINT [ "node" ]
CMD ["server/index.js"]