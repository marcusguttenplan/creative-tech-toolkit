# Dockerize Django Application

FROM python:2.7

# Env Var for Python Buffering
ENV PYTHONUNBUFFERED 1

# Create Project Root in Parent
RUN mkdir /django-api

# Copy Local Dir into New Root
ADD . /django-api

# CWD
WORKDIR /django-api

# Install pip requirements.txt
RUN pip install -r requirements.txt
