resource "google_container_cluster" "gke-cluster" {
  name               = "${var.instance-name-base}-cluster"
  network            = "${var.network_name}"
  zone               = "${var.zone}"
  initial_node_count = 3
}


provisioner "local-exec" {
    command = "gcloud container clusters get-credentials ${google_container_cluster.gke-cluster.name} --zone  ${google_container_cluster.gke-cluster.zone} --project ${var.project}"
}
