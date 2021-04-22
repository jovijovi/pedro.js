FROM node:14-alpine

MAINTAINER pedro

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    && apk add --no-cache bash

ADD . /opt/app/
WORKDIR /opt/app/
RUN yarn build

ENTRYPOINT [ "/usr/local/bin/node" ]
CMD ["/opt/app/dist/index.js"]