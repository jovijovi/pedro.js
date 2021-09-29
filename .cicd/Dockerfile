ARG NODE_VER

FROM node:${NODE_VER} as builder
MAINTAINER pedro

ADD conf /opt/app_src/conf
ADD lib /opt/app_src/lib
ADD server /opt/app_src/server
COPY package.json /opt/app_src/
COPY tsconfig.json /opt/app_src/
COPY yarn.lock /opt/app_src/
COPY git.json /opt/app_src/

WORKDIR /opt/app_src
RUN yarn install --frozen-lockfile && yarn build

FROM node:${NODE_VER}-alpine as runtime

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    && apk add --no-cache bash \
    && addgroup -S pedro && adduser -S -G pedro pedro

COPY --from=builder /opt/app_src/dist /opt/app
COPY --from=builder /opt/app_src/node_modules /opt/app/node_modules
COPY --from=builder /opt/app_src/git.json /opt/app/

USER pedro
WORKDIR /opt/app
ENTRYPOINT [ "node" ]
CMD ["server/index.js", "--config", "./conf/app.config.yaml"]
