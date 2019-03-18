FROM ruby:2.5.1
RUN apt-get update -qq && apt-get install -y build-essential postgresql
RUN mkdir /life-of-code
WORKDIR /life-of-code
ADD ./Gemfile /life-of-code/Gemfile
ADD ./Gemfile.lock /life-of-code/Gemfile.lock
RUN bundle install
RUN rails new api --api --database=postgresql --skip-bundle
RUN ls -a
WORKDIR /life-of-code/api
COPY database.yml ./config/
# ADD ./api /life-of-code
# EXPOSE 3000
# RUN bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
