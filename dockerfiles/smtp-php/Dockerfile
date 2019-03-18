FROM php:7.2-apache
RUN apt-get update && apt-get install -y \
    git \
    libzip-dev \
    zip \
    unzip \
  && docker-php-ext-configure zip --with-libzip \
  && docker-php-ext-install zip

WORKDIR /usr/lib
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php \
    && php -r "unlink('composer-setup.php');"

RUN php /usr/lib/composer.phar require swiftmailer/swiftmailer @stable
RUN php /usr/lib/composer.phar require phpmailer/phpmailer @stable
RUN ls -al vendor/

# RUN mkdir /phpmailer
# WORKDIR /phpmailer
COPY . .
RUN php -f mailer.php
