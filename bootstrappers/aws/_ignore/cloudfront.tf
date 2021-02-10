##
##
## Create CDN
##
##

resource "aws_cloudfront_distribution" "s3_distribution" {
  depends_on = [
    aws_instance.webserver_1
  ]
  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    viewer_protocol_policy = "allow-all"
  }

  enabled = true

  origin {
    domain_name = aws_s3_bucket.image-bucket.bucket_domain_name
    origin_id   = local.s3_origin_id
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  connection {
    type        = "ssh"
    user        = "ec2-user"
    host        = aws_instance.webserver_1.public_ip
    port        = 22
    private_key = tls_private_key.webserver_key.private_key_pem
  }

  provisioner "remote-exec" {
    inline = [
      "sudo su << EOF",
      "echo \"<img src='http://${self.domain_name}/${aws_s3_bucket_object.image-upload.key}'>\" >> /var/www/html/test.html",
      "EOF"
    ]
  }
}
