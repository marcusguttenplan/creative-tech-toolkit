##
##
## Project init
##
##

# Set provider
# TODO export keys
provider "aws" {
  region     = "us-west-2"
  # export AWS_ACCESS_KEY_ID=
  # export AWS_SECRET_ACCESS_KEY=
}

# Set backend
terraform {
    backend "s3" {
        bucket = "sparks-tf-state"
        key    = "terraform.tfstate"
        region = "us-east-1"
    }
}
