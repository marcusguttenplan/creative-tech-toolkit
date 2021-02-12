##
##
## Define project-wide variables for templates
##
##

# Generate local variables
locals {
  client  = "ihs"
  jobName = "cera"
  env     = "prod"

  project-prefix = "${local.client}-${local.jobName}-${local.env}"
  tags = {
    "Name"    = "${local.client}-${local.jobName}-${local.env}"
    "client"  = "${local.client}"
    "jobName" = "${local.jobName}"
    "env"     = "${local.env}"
  }
}

# Generate the tags to attach to all resources
# variable "tags" {
#   default = {
#     "Name"    = "ihs-cera-prod"
#     "client"  = "ihs"
#     "jobName" = "cera"
#     "env"     = "prod"
#   }
# }

# Spec domain
variable "domain" {
  default = "virtual.ceraweek.com"
}

# Spec Database Admin User
variable "database_username" {
  default = "foo"
}

# Spec Database Admin PW
variable "database_password" {
  default = "barbatbaz"
}

# Spec Number of Database Instances
variable "database_count" {
  default = 2
}

# Spec Database Instance Size
variable "database_size" {
  default = "db.r5.large"
}

# Spec Region
variable "region" {
  default = "us-west-2"
}

# TODO: Update to match Region
variable "ami" {
  default = "ami-0873b46c45c11058d"
}

# Build VM Instance Size
variable "instance" {
  default = "t2.micro"
}

# SSH Public Keys to Add to Server
variable "pubkeys" {
  default = <<-EOT
  key
  EOT
}
