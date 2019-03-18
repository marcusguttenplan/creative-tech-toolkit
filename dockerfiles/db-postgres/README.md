# Using multiple databases with the official PostgreSQL Docker image

### Usage

Quickly refactored to use the same user with multiple databases, for deploying a Rails application quickly.

**Note:** requires docker to run with -id to force the entrypoint script into the background, otherwise the container will only stay up as long as the current terminal window is open.

```
git clone <this-repo> db
docker build db -t db #tag the built image to find it better
docker run -id --name rails-db -e POSTGRES_MULTIPLE_DATABASES="db-dev","db-test","db-prod" -e POSTGRES_USER=<user> -e POSTGRES_PASSWORD=<pw> -p 5435:5432 db:latest
```
