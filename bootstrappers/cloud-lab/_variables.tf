variable "gcloud-region" {
  default = "us-west1-a"
}

variable "gcloud-zone" {
  default = "us-west1-a"
}

variable "gcloud-project" {
  default = "devlab-235506"
}

variable "instances" {
  default = ["floor", "office", "backoffice"]
}

variable "instance-name-base" {
  default = "jumpbox"
}

variable "gce_ssh_key" {
  default = "~/.ssh/id_rsa"
}

variable "gce_ssh_pub_key_file" {
  default = "~/.ssh/id_rsa.pub"
}

variable "gce_ssh_user" {
  default = "marcusguttenplan"
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

# variable "platform-name"    { default = "sample-platform"  }
