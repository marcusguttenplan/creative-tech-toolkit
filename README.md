# Creative Tech Toolkit

A collection of tools that I often find myself reusing for bootstrapping quick proof of concept ideas, helpful for easing unnecessary legwork. Most all are built on `node.js` and are as simple as possible. There may also be bits of `python`, arduino, bash, and ruby.

Includes:
* Dev Machine Bootstrappers
* Dockerfiles
* Google Cloud Platform tools
* Maps for Front End
* ML tools
* Physical Computing I/O
* RasPi Bootsrappers
* Basic Back End Servers
* Snippets for web scraping, working with CSV, file system
* UI Boilerplate

### Setup

Install Homebrew:

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Set up dev machine

```sh
sh ./Bootstrappers/mac/bootstrapper.sh
```

### Contents


```
.
├── bootstrappers
|   ├── cloud-lab
│   └── mac
├── dockerfiles
│   ├── api-django
│   ├── api-flask
│   ├── api-java
│   ├── api-node
│   ├── api-rails
│   ├── db-postgres
│   ├── db-redis
│   ├── docker-compose.yml
│   ├── smtp-go
│   ├── smtp-php
│   ├── smtp-ruby
│   ├── ui-react
│   ├── ui-static
│   ├── ui-vue
│   └── web-nginx
├── gcp
│   ├── bigquery
│   ├── cloud-functions
│   │   ├── boilerplate
│   │   ├── sheets
│   │   ├── slack
│   │   └── storage
│   ├── firebase
│   ├── googleassist.md
│   ├── k8s
│   ├── node-server-appengine
│   ├── pubsub-appengine
│   └── sockets-appengine
├── maps
│   ├── gmaps
│   └── osm
├── ml
│   ├── DCGAN-tensorflow
│   ├── nlp
│   ├── python-face-recognition
│   ├── tfjs
│   │   ├── emotion
│   │   └── pose
│   └── vision
├── physical-computing
│   ├── arduino-io
│   ├── phidget
│   └── rpi
├── servers
│   ├── express
│   ├── express-redis
│   ├── express-socketio
│   ├── express-sse
│   └── rails.md
├── snippets
│   ├── csv
│   ├── rm_by_filecount.sh
│   ├── scraper
│   ├── update_all_repos.sh
│   └── wav2sox.sh
├── social
│   ├── tumblr
│   └── twitter
└── web-boilerplate
```
