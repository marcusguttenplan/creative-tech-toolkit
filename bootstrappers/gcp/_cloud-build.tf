resource google_cloudbuild_trigger image {
  project = google_sourcerepo_repository.image.project

  trigger_template {
    branch_name = "master"
    repo_name   = google_sourcerepo_repository.image.name
  }

  filename = "cloudbuild.yaml"
  depends_on = [
    google_project_service.cloudbuild
  ]
}
