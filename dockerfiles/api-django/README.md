# Dockerized Django REST API + Postgres

Copy these files into the root of a django project and run `docker-compose up`.

This will bring up a postgres container, build and deploy the django application, and allow both communicators to communicate with each other.

`docker exec -it django_api /bin/bash && python manage.py createsuperuser` to create a new username/password combo to use with the API.

The application can then be accessed via `http://localhost:8000`; Django REST tokens can be retrieved by passing a username/password to `http://localhost:8000/get-token/`; and database objects can be created or destroyed using the returned token.


### Settings

**Postgres:**

Modify `settings.py` in Django App:

```py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': '<database-name>',
        'USER': '<database-username>',
        'PASSWORD': '<database-password>',
        'HOST': 'db',      # Container Name of Docker container from docker-compose.yml
        'PORT': '',
    }
}
```


### Docker

`Dockerfile` for Django App:

```sql
FROM python:2.7
ENV PYTHONUNBUFFERED 1

# Create Project Root in Parent
RUN mkdir /django-api

# Copy Local Dir into New Root
ADD . /django-api

# CWD
WORKDIR /django-api

# Install pip requirements.txt
RUN pip install -r requirements.txt
```

`docker-compose.yml`

```yaml
version: '3'

services:
  db:
    container_name: db
    image: postgres
    environment:
      - POSTGRES_USER=<database-username>       # Define Custom User
      - POSTGRES_PASSWORD=<database-password>       # Define Custom PW
      - POSTGRES_DB=<database-name>     # Define custom DB
    ports:
      - "5432:5432"
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
  web:
    build: .
    command: bash -c  "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"
    container_name: django_api
    volumes:
      - .:/django_api
    ports:
      - "8000:8000"
    depends_on:
      - db
    restart: on-failure
```
