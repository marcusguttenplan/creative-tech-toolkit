##
## PostgresQL
##

resource "google_sql_database_instance" "psql-master" {
  name = "psql-master"
  database_version = "POSTGRES_9_6"
  region = "${var.gcloud-region}"

  settings {
    tier = "db-f1-micro"


    ip_configuration {
        ipv4_enabled = true

        authorized_networks {
          name  = "${var.network_name}"
          value = "${google_compute_subnetwork.default.ip_cidr_range}"
        }
      }
  }


}

resource "google_sql_database" "psql-database" {
  name      = "dev-psql"
  instance  = "${google_sql_database_instance.psql-master.name}"
}

resource "google_sql_user" "psql-users" {
  name     = "postgres"
  instance = "${google_sql_database_instance.psql-master.name}"
  host     = "*"
  password = ""
}


##
## MySQL
##

resource "google_sql_database_instance" "mysql-master" {
  name = "mysql-master"
  database_version = "MYSQL_5_7"
  region       = "${var.gcloud-region}"

  settings {
    tier = "db-f1-micro"


    # ip_configuration {
    #     ipv4_enabled = true
    #
    #     authorized_networks {
    #       name  = "${var.network_name}"
    #       value = "${google_compute_subnetwork.default.ip_cidr_range}"
    #     }
    #   }
  }
}

resource "google_sql_database" "mysql-database" {
  name      = "dev-mysql"
  instance  = "${google_sql_database_instance.mysql-master.name}"
}

resource "google_sql_user" "mysql-users" {
  name     = "root"
  instance = "${google_sql_database_instance.mysql-master.name}"
  host     = "%"
  password = ""
}
