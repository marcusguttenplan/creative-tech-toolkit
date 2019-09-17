##
## Global Vars
##
variable "project" {
  default = "<aws project name>"
}

variable "region" {
  default = "eu-west-3"
}

variable "profile" {
  default = "terraform"
}

variable "env" {
  type = "string"
}


##
## Compute Vars
##
variable "instance-name-base" {
  default = "sparks-interactive"
}
