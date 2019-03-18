# Specify whether to use GCP, Azure, AWS, etc. We will use GCP.
provider "google" {
  # credentials = "${env.TF_CREDS}"
  credentials = "${file("./creds.json")}"
  project = "${var.gcloud-project}"
  region = "${var.gcloud-region}"
}
