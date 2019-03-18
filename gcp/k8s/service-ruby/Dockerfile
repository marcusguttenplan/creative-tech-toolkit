FROM ruby:alpine

RUN set -ex \
    && apk update \
    && apk --no-cache add \
        build-base \
    && gem install mechanize \
    && gem install mail \
    && apk del build-base \
    && rm -rf /var/cache/apk/*

CMD ["/bin/sh"]
