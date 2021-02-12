##
##
## Values to output
##
##

output "domain" {
    value = var.domain
}

output "domain-validation" {
    value = aws_acm_certificate.cert.domain_validation_options
}

output "ec2" {
  value = aws_instance.vm.public_ip
}

output "s3" {
  value = aws_s3_bucket.bucket.id
}

output "s3region" {
  value = aws_s3_bucket.bucket.region
}

output "dynamo" {
  value = aws_dynamodb_table.dynamo.id
}

output "DB_HOST" {
  value = aws_rds_cluster.default.endpoint
}

output "DB_DATABASE" {
    value = aws_rds_cluster.default.database_name
}

output "DB_USER" {
    value = var.database_username
}

output "DB_PASSWORD" {
    value = var.database_password
}

output "cdn" {
  value = aws_cloudfront_distribution.prod_distribution.domain_name
}
