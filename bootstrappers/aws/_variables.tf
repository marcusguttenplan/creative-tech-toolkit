##
##
## Define project-wide variables for templates
##
##

# Generate local variables
locals {
    client = "sparks"
    jobName = "virtu"
    env = "staging"
    project-prefix = "${local.client}-${local.jobName}-${local.env}"
}

# Generate the tags to attach to all resources
variable "tags" {
    default = {
        "Name" = "sparks-virtu-staging"
        "client" = "sparks"
        "jobName" = "virtu"
        "env" = "staging"
    }
}

variable "database_username" {
    default = "foo"
}

variable "database_password" {
    default = "barbatbaz"
}

variable "database_size" {
    default = "db.t2.small"
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
