resource "google_cloudbuild_trigger" "image" {
  project = google_sourcerepo_repository.repo.project

  trigger_template {
    branch_name = "master"
    repo_name   = google_sourcerepo_repository.repo.name
  }

  filename = "cloudbuild.yaml"
}
