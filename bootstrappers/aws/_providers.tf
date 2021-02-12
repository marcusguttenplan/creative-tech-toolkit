##
##
## Project init
##
##

# Set provider
# TODO export keys
provider "aws" {
  region = "us-west-2"
  # export AWS_ACCESS_KEY_ID=
  # export AWS_SECRET_ACCESS_KEY=
}

# Provider Alias for Certificate Only (CloudFront requires Certs in us-east-1)
provider "aws" {
  alias  = "virginia"
  region = "us-east-1"
}

# Set backend
terraform {
  backend "s3" {
    bucket = "sparks-tf-state"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}
