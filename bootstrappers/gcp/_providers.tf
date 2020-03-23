# Specify whether to use GCP, Azure, AWS, etc. We will use GCP.
provider "google" {
  # credentials = "${env.TF_CREDS}"
  credentials = "${file("./creds.json")}"
  project = "${var.project}"
  region = "${var.region}"
}


# List of APIs to Enable
resource "google_project_service" "service" {
  for_each = toset([
      "cloudresourcemanager.googleapis.com",
      "oslogin.googleapis.com",
      "compute.googleapis.com",
      "container.googleapis.com",
      "containerregistry.googleapis.com",
      "cloudbuild.googleapis.com",
      "deploymentmanager.googleapis.com",
      "dns.googleapis.com",
      "logging.googleapis.com",
      "monitoring.googleapis.com",
      "pubsub.googleapis.com",
      "replicapool.googleapis.com",
      "replicapoolupdater.googleapis.com",
      "resourceviews.googleapis.com",
      "servicemanagement.googleapis.com",
      "servicenetworking.googleapis.com",
      "sql-component.googleapis.com",
      "sqladmin.googleapis.com",
      "storage-api.googleapis.com",
    ])

  service = each.key

  project = "${var.project}"
  disable_on_destroy = false
}
