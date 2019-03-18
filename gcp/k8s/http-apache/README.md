# Httpd proxy minimal docker image

[![Build Status](https://travis-ci.org/bertrandmartel/httpd-proxy.svg?branch=master)](https://travis-ci.org/bertrandmartel/httpd-proxy) [![](https://images.microbadger.com/badges/image/bertrandmartel/httpd-proxy.svg)](https://microbadger.com/images/bertrandmartel/httpd-proxy) [![](https://images.microbadger.com/badges/version/bertrandmartel/httpd-proxy.svg)](https://microbadger.com/images/bertrandmartel/httpd-proxy)

A minimal httpd docker image to be run with an already existing configuration

## Build image

```
docker build -t httpd-proxy .
```

## Usage

* edit default configuration : `000-default.conf` :

```
ServerName www.example.com

<VirtualHost *:443>
    SSLEngine on
    SSLCertificateFile "/usr/local/apache2/conf/key/fullchain.pem"
    SSLCertificateKeyFile "/usr/local/apache2/conf/key/privkey.pem"
    SSLProxyEngine On
    RequestHeader set Front-End-Https "On"
    ProxyPass / https://www.google.com/
    ProxyPassReverse / https://www.google.com/
</VirtualHost>
```

* place your server certificate/key in a `key` folder

* start httpd proxy  :

```
docker run -dit --name httpd-proxy -p 443:443 \
                                   -v "$PWD/apache2.conf":/usr/local/apache2/conf/httpd.conf \
                                   -v "$PWD/000-default.conf":/etc/apache2/sites-enabled/000-default.conf \
                                   -v "$PWD/key":/usr/local/apache2/conf/key apache-php
```

## Docker-compose

```
docker-compose up
```

## Docker-cloud

```
export USER_PATH=/home/bobby
```

* revise your `stackfile.yml` file before creating/updating the stack :

```
# create the stack :

docker-cloud stack create --name httpd-proxy -f stackfile.yml

# or update :

docker-cloud stack update -f stackfile.yml httpd-proxy
```

* start/deploy :

```
# start the stack :

docker-cloud stack start httpd-proxy

# or redeploy :

docker-cloud stack redeploy httpd-proxy
```

## Debug 

```
docker exec -it httpd-proxy  bash
```