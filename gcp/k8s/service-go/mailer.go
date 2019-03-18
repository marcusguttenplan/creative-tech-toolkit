package main

import (
  "github.com/kataras/go-mailer"
  "fmt"
  "io/ioutil"
  "net/http"
  "log"
)

type Page struct {
  Title string
  Body []byte
}

func (p *Page) save() error {
  filename := p.Title + ".txt"
  return ioutil.WriteFile(filename, p.Body, 0600)
}

func loadPage(title string) (*Page, error) {
  filename := title + ".txt"
  body, err := ioutil.ReadFile(filename)
  if err != nil {
    return nil, err
  }
  return &Page{Title: title, Body: body}, nil
}

func handler(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintf(w, "Life of your Code, Go Mailer! We Love %s!", r.URL.Path[1:])
}

func main() {
  println("server started")
  p1 := &Page{Title: "Emailer", Body: []byte("go get 'em!")}
  p1.save()
  p2, _ := loadPage("Emailer")
  fmt.Println(string(p2.Body))

  http.HandleFunc("/", handler)
  log.Fatal(http.ListenAndServe(":6060", nil))

  println("Mailer Launched!")
  config := mailer.Config{
    Host: "smtp.gmail.com",
    Username: "lorem",
    Password: "foobarbat",
    FromAddr: "no-reply@gmail.com",
    Port: 587,
  }

  sender := mailer.New(config)
  subject := "Subject Line"
  content := `<h1>Email</h1>`
  to := []string{"recipientemailaddress@hotmail.com","no2@gmail.com"}
  err := sender.Send(subject, content, to...)

  println("config:")
  println(sender, subject, content, to)

  if err != nil {
    println("error!!!: " + err.Error())
  }
}
