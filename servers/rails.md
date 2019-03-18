# Bootstrapping a Ruby on Rails Application

### API Only

Generate new app:

```sh
rails new <app-name> --api
```

* Configure Database Connections `config/database.yml`

Generate new Model + Controller 

```sh
rails generate scaffold <name> <field>:<fieldtype> # i.e. rails generate scaffold User username:string registered:boolean
```

### Full Web Framework

Generate new app:

```sh
rails new <app-name>
```

* Configure Database Connections `config/database.yml`


### Database Setup

`<app-name>/config/database.yml`

##### Docker + Postgres


```
docker pull postgres
docker run --name <container-name> -p 5432:5432 -e POSTGRES_USER=<user-name> -e POSTGRES_PASSWORD=<user-password> -e POSTGRES_DB=<database-name> -d postgres
```

Use the values given to docker in rails:
```
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  timeout: 5000
  username: <user-name>
  password: <user-password>
  host: 127.0.0.1

development:
  <<: *default
  database: <database-name>
```

##### local sqlite

##### Google Cloud SQL for Postgres

```
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  timeout: 5000
  username: <user-name>
  password: <user-password>
  database: <database-name>
  host: "/cloudsql/<instance-connection-name>" # returned via gcloud sql instances describe <gcp-project-id>
```
