resource google_sourcerepo_repository image {
  name       = "paas-monitor"
  depends_on = [google_project_service.sourcerepo]
}


resource google_sourcerepo_repository_iam_policy image {
  project     = google_sourcerepo_repository.image.project
  repository  = google_sourcerepo_repository.image.name
  policy_data = data.google_iam_policy.image.policy_data
}

data google_iam_policy image {
  binding {
    role    = "roles/source.reader"
    members = []
  }

  binding {
    role    = "roles/source.writer"
    members = ["user:${var.email}"]
  }

  binding {
    role = "roles/source.admin"
    members = [
      "serviceAccount:${data.google_project.current.number}@cloudbuild.gserviceaccount.com",
    ]
  }
}
