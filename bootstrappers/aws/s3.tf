##
##
## Create S3 Bucket
##
##

resource "aws_s3_bucket" "bucket" {
  bucket = local.project-prefix
  acl = "public-read-write"

  tags = var.tags
}


resource "aws_s3_bucket" "placeholder" {
  bucket = "${local.project-prefix}-cloudfront"
  acl = "private"

  tags = var.tags
}
