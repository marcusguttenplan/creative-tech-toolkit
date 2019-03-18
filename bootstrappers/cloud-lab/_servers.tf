# Define New GCP Compute VM Instances
resource "google_compute_instance" "frontend" {
  # count = "${length(var.instances)}"
  # name = "${var.instance-name-base}-${count.index+1}"
  name = "${var.instance-name-base}"
  machine_type = "f1-micro"
  zone = "${var.gcloud-zone}"

  tags = ["dev", "lab", "http-server"]

  boot_disk {
    initialize_params {
      image = "ubuntu-1604-lts"
    }
  }

  network_interface {
    network = "default"
    access_config {}
  }

  service_account {
    scopes = ["userinfo-email", "compute-ro", "storage-ro"]
  }

  metadata {
   sshKeys = "${var.gce_ssh_user}:${file(var.gce_ssh_pub_key_file)}"
  }

  provisioner "remote-exec" {
      connection {
        type        = "ssh"
        agent       = false
        user        = "${var.gce_ssh_user}"
        port        = "${var.gce_ssh_port}"
        timeout     = "5m"
        private_key = "${file("${var.gce_ssh_key}")}"
      }

      inline = [
          "sleep 10",
          "sudo apt-get update",
          "sleep 20",
          "sudo apt-get install -y nginx",
          "sleep 10",
          "sudo service nginx start",
          "echo 'SUCCESFUL START' > load.txt",
      ]
  }
}


##
## Manage DNS
##

resource "google_dns_managed_zone" "preview-dns-zone" {
  name        = "sparks-preview-zone"
  dns_name    = "sparks-interactive.com."
  description = "sparks-interactive.com DNS zone"
}

resource "google_dns_record_set" "preview-dns-record" {
    name = "${google_dns_managed_zone.preview-dns-zone.dns_name}"
    type = "A"
    ttl = 300

    managed_zone = "${google_dns_managed_zone.preview-dns-zone.name}"
    rrdatas=["${google_compute_instance.frontend.network_interface.0.access_config.0.nat_ip}"]

    depends_on = ["google_compute_instance.frontend"]
}

resource "google_dns_record_set" "dev-dns-record" {
    name = "dev.${google_dns_managed_zone.preview-dns-zone.dns_name}"
    type = "A"
    ttl = 300

    managed_zone = "${google_dns_managed_zone.preview-dns-zone.name}"
    rrdatas=["${google_compute_instance.frontend.network_interface.0.access_config.0.nat_ip}"]

    depends_on = ["google_compute_instance.frontend"]
}


resource "google_dns_record_set" "prod-dns-record" {
    name = "prod.${google_dns_managed_zone.preview-dns-zone.dns_name}"
    type = "A"
    ttl = 300

    managed_zone = "${google_dns_managed_zone.preview-dns-zone.name}"
    rrdatas=["${google_compute_instance.frontend.network_interface.0.access_config.0.nat_ip}"]

    depends_on = ["google_compute_instance.frontend"]
}




# resource "google_compute_instance" "database" {
#     name = "preview-database"
#     machine_type = "f1-micro"
#     zone = "${var.gcloud-zone}"
#
#     tags = ["database"]
#
#     boot_disk {
#       initialize_params {
#         image = "ubuntu-1604-lts"
#       }
#     }
#
#     network_interface {
#       network = "default"
#       access_config {}
#     }
#
#     service_account {
#       scopes = ["userinfo-email", "compute-ro", "storage-ro"]
#     }
#
#     # provisioner "remote-exec" {
#     #     connection {
#     #       type        = "ssh"
#     #       agent       = false
#     #       user        = "${var.gce_ssh_user}"
#     #       port        = "${var.gce_ssh_port}"
#     #       timeout     = "5m"
#     #       private_key = "${file("${var.gce_ssh_key}")}"
#     #     }
#     #
#     #     inline = [
#     #         "sleep 20",
#     #         "sudo apt-get install -y postgresql",
#     #         "sleep 10",
#     #         "sudo service postgres start",
#     #         "echo 'SUCCESFUL START' > load.txt",
#     #     ]
#     # }
# }
