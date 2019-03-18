# GCP Tools

Set up `gcloud` binary:

https://cloud.google.com/sdk/docs/quickstart-macos

```
gcloud init
gcloud projects config set <name>
```

#### BigQuery

Sample `node` and `python` queries from the client docs

#### Cloud Functions

Easy `node` functions for some good serverless use-cases:

* Boilerplate
* Post Data to Sheets
* Post Data to Slack Webhook
* Post Data to Storage

```
gcloud functions deploy <function> --runtime nodejs8 --trigger-http
```

#### Firebase

node server that uses firebase as a back end.

#### Kubernetes

Very basic `node` server and `nginx` setup for connecting services to each other via GKE or Knative (serverless containers)

#### PubSub

Simple `node` API for interacting with PubSub topics and subscriptions

#### App Engine

Boilerplates for deploying to App Engine:
* Simple `node` server
* Simple `socketio` server

```
gcloud app create <app>
```

```
gcloud app deploy app.yaml
```

```
gcloud app update <app>
```

#### Google Assistant

Instructions for developing custom voice commands
