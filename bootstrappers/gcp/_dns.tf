##
## Manage DNS
##

resource "google_dns_managed_zone" "preview-dns-zone" {
  name        = "sparkscreativetech-zone"
  dns_name    = "sparkscreativetech.com."
  description = "sparkscreativetech.com DNS zone"
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
