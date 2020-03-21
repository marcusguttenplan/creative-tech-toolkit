##
## Global Vars
##
variable "region" {
  default = "us-central1"
}


variable "project" {
  default = "next18-industrysolutions-trax"
}

variable "instances" {
  default = ["dev", "prod", "bastion"]
}

variable "env" {
  default="dev"
  type = "string"
}

variable "repo" {
  default = "sandbox"
}

variable "email" {
  default = "mguttenplan@wearesparks.com"
}


##
## Compute Vars
##
variable "instance-name-base" {
  default = "sparks-interactive"
}


##
## Network Vars
##
variable "network" {
  default = "default"
}

variable "network_name" {
  default = "sparks-interactive-internal-net"
}

variable "zone" {
  default = "us-central1-b"
}

##
## Database Vars
##
variable "mysql_version" {
  default = "MYSQL_5_6"
}

variable "postgresql_version" {
  default = "POSTGRES_9_6"
}


##
## Admin Vars
##
variable "gce_ssh_key" {
  default = "~/.ssh/id_rsa"
}

variable "gce_ssh_pub_key_file" {
  default = "~/.ssh/id_rsa.pub"
}

variable "gce_ssh_user" {
  default = "mguttenplan"
}

variable "user_2" {
  default = "mguttenplan-ipad"
}

variable "pub_key_2" {
  default = "~/.ssh/mguttenplan-ipad.pub"
}

variable "gce_ssh_port" {
  default = "22"
}
