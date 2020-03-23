data "google_iam_policy" "admin" {
  binding {
    role    = "roles/source.reader"
    members = []
  }

  binding {
    role    = "roles/source.writer"
    members = ["user:${var.email}"]
  }

  # binding {
  #   role = "roles/source.admin"
  #   members = [
  #     "serviceAccount:${data.google_project.current.number}@cloudbuild.gserviceaccount.com",
  #   ]
  # }
}


resource "google_sourcerepo_repository" "repo" {
  name       = "${var.repo}"
}


resource "google_sourcerepo_repository_iam_policy" "repo" {
  project     = google_sourcerepo_repository.repo.project
  repository  = google_sourcerepo_repository.repo.name
  policy_data = data.google_iam_policy.admin.policy_data
}
