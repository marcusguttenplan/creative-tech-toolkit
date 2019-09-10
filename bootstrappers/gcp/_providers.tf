# Specify whether to use GCP, Azure, AWS, etc. We will use GCP.
provider "google" {
  # credentials = "${env.TF_CREDS}"
  credentials = "${file("./mguttenplan-creds.json")}"
  project = "${var.gcloud-project}"
  region = "${var.gcloud-region}"
}


# List of APIs to Enable
resource "google_project_services" "project" {
  project = "${var.gcloud-project}"
  services = [
      "bigquery-json.googleapis.com",
      "compute.googleapis.com",
      "container.googleapis.com",
      "containerregistry.googleapis.com",
      "deploymentmanager.googleapis.com",
      "dns.googleapis.com",
      "logging.googleapis.com",
      "monitoring.googleapis.com",
      "oslogin.googleapis.com",
      "pubsub.googleapis.com",
      "replicapool.googleapis.com",
      "replicapoolupdater.googleapis.com",
      "resourceviews.googleapis.com",
      "sql-component.googleapis.com",
      "sqladmin.googleapis.com",
      "storage-api.googleapis.com",
    ]
}
