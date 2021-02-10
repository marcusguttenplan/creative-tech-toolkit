##
##
## Values to output
##
##

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

output "rds" {
    value = aws_rds_cluster.default.endpoint
}

output "cdn" {
    value = aws_cloudfront_distribution.prod_distribution.domain_name
}
