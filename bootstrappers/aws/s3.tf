##
##
## Create S3 Bucket
##
##

# Create Main Asset Bucket
resource "aws_s3_bucket" "bucket" {
  bucket = local.project-prefix
  acl = "public-read-write"

  tags = var.tags
}
