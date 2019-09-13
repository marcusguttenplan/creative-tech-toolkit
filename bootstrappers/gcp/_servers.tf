# Define New GCP Compute VM Instances
resource "google_compute_instance" "frontend" {
  # count = "${length(var.instances)}"
  # name = "${var.instance-name-base}-${count.index+1}"
  name = "${var.instance-name-base}"

  machine_type = "f1-micro"
  zone = "${var.gcloud-zone}"

  tags = ["dev", "lab", "ssh", "internal"]
  # tags = ["prod", "ssh", "client", "<job no.>"]

  boot_disk {
    initialize_params {
      image = "ubuntu-1604-lts"
    }
  }

  network_interface {
    network = "${google_compute_network.default.name}"
    subnetwork = "${google_compute_subnetwork.default.name}"
    # network = "${google_compute_subnetwork.default.name}"
    access_config {}
  }

  service_account {
    # scopes = ["userinfo-email", "compute-ro", "storage-ro"]
    scopes = ["cloud-platform"]
  }

  metadata = {
   sshKeys = "${var.gce_ssh_user}:${file(var.gce_ssh_pub_key_file)} \n${var.gce_ssh_user}:${file(var.pub_key_2)}"
  }

  provisioner "remote-exec" {
      connection {
        type        = "ssh"
        agent       = false
        host        = "${self.network_interface.0.access_config.0.nat_ip}"
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
