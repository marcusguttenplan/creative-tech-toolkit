# Node + Firebase API Boilerplate for App Engine

A barebones boilerplate for bootstrapping a node app that will run on App Engine, with Firebase as a realtime datastore.

### Requirements
* nodejs
* Firebase Project [https://console.firebase.google.com/](https://console.firebase.google.com/)
* app.yaml
* GCP account + Creds

### Setup
Environmental variables are stored in an .env file and parsed with `dotenv`. The default necessary fields are:
```
PROJECT_ID=<gcp-project-id i.e. tree-beard-220201>
GOOGLE_APPLICATION_CREDENTIALS="./creds.json"
DEBUG=true
DEBUGLEVEL=5
PORT=8080
```
