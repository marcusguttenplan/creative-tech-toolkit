FROM golang
ADD . /go/src/mailer
RUN go get -u github.com/kataras/go-mailer
RUN go install /go/src/mailer
ENTRYPOINT /go/bin/mailer
EXPOSE 2000
ENV PORT 2000
