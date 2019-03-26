##
## Create New Network
##

resource "google_compute_network" "default" {
  name = "internal-net"
}

##
## Manage Firewall Rules
##

resource "google_compute_firewall" "icmp" {
  name    = "${google_compute_network.default.name}-firewall-icmp"
  network = "default"

  allow {
    protocol = "icmp"
  }

  # target_tags   = ["${google_compute_network.default.name}-firewall-icmp"]
  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_firewall" "ssh" {
  name    = "${google_compute_network.default.name}-firewall-ssh"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = ["0.0.0.0/0"]
}

# resource "google_compute_firewall" "http" {
#   name    = "${google_compute_network.default.name}-firewall-http"
#   network = "default"
#
#   allow {
#     protocol = "tcp"
#     ports    = ["80"]
#   }
#
#   target_tags   = ["web"]
#   source_ranges = ["0.0.0.0/0"]
# }
# resource "google_compute_firewall" "https" {
#   name    = "${google_compute_network.internal-net.name}-firewall-https"
#   network = "${google_compute_network.internal-net.name}"
#
#   allow {
#     protocol = "tcp"
#     ports    = ["443"]
#   }
#   target_tags   = ["web"]
#   source_ranges = ["0.0.0.0/0"]
# }
# resource "google_compute_firewall" "postgresql" {
#   name    = "${google_compute_network.internal-net.name}-firewall-postgresql"
#   network = "${google_compute_network.internal-net.name}"
#
#   allow {
#     protocol = "tcp"
#     ports    = ["5432"]
#   }
#   target_tags   = ["database"]
#   source_ranges = ["0.0.0.0/0"]
# }
