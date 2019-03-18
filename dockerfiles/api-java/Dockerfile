# fetch basic image
FROM maven

# application placed into /opt/app
RUN mkdir -p /opt/app
WORKDIR /opt/app

# selectively add the POM file and
# install dependencies
COPY pom.xml /opt/app/
RUN mvn install

# rest of the project
COPY src /opt/app/src
RUN mvn package

# local application port
EXPOSE 8080
ENV PORT 8080

# execute it
CMD ["mvn", "exec:java"]
# RUN nohup mvn exec:java &
