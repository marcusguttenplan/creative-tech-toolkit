FROM ruby:2.5.1
RUN apt-get update -qq && apt-get install -y build-essential postgresql
RUN mkdir /app
WORKDIR /app
ADD ./api/Gemfile /app/Gemfile
ADD ./api/Gemfile.lock /app/Gemfile.lock
RUN bundle install
ADD ./api /app
# RUN rake db:migrate
