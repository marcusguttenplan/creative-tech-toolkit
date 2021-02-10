##
##
## Create CDN
##
##

# Create a Cloudfront Placeholder
resource "aws_s3_bucket" "placeholder" {
  bucket = "${local.project-prefix}-cloudfront"
  acl = "private"

  website {
      index_document = "index.html"
  }

  tags = var.tags
}


# Upload an object to Cloudfront Placeholder
resource "aws_s3_bucket_object" "object" {
    depends_on = [aws_s3_bucket.placeholder]
  bucket = aws_s3_bucket.placeholder.id
  key    = "index.html"
  acl    = "public-read"  # or can be "public-read"
  source = "_placeholder/index.html"
  etag = filemd5("_placeholder/index.html")
  content_type = "text/html"
}


resource "aws_s3_bucket_policy" "placeholder" {
    depends_on = [aws_s3_bucket.placeholder]
  bucket = aws_s3_bucket.placeholder.id
  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
      {
          "Sid": "PublicReadGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": [
             "s3:GetObject"
          ],
          "Resource": [
             "arn:aws:s3:::${aws_s3_bucket.placeholder.id}/*"
          ]
      }
    ]
}
POLICY
}


# Create Cloudfront distribution
resource "aws_cloudfront_distribution" "prod_distribution" {
    depends_on = [
        aws_s3_bucket.placeholder
    ]

    origin {
        domain_name = "${aws_s3_bucket.placeholder.bucket_regional_domain_name}"
        origin_id = "S3-${aws_s3_bucket.placeholder.bucket}"

        custom_origin_config {
            http_port = 80
            https_port = 443
            origin_protocol_policy = "match-viewer"
            origin_ssl_protocols = ["TLSv1", "TLSv1.1", "TLSv1.2"]
        }
    }

    # By default, show index.html file
    default_root_object = "index.html"
    enabled = true
    comment = "${local.project-prefix}"
    tags = var.tags

    # If there is a 404, return index.html with a HTTP 200 Response
    custom_error_response {
        error_caching_min_ttl = 3000
        error_code = 404
        response_code = 200
        response_page_path = "/index.html"
    }

    default_cache_behavior {
        allowed_methods = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
        cached_methods = ["GET", "HEAD"]
        target_origin_id = "S3-${aws_s3_bucket.placeholder.bucket}"

        # Forward all query strings, cookies and headers
        forwarded_values {
            query_string = true
            cookies {
                forward = "all"
              }
        }

        min_ttl                = 0
        default_ttl            = 86400
        max_ttl                = 31536000
        compress               = true
        viewer_protocol_policy = "redirect-to-https"
    }

    # # Distributes content to US and Europe
    # price_class = "PriceClass_100"
    # # Restricts who is able to access this content

    restrictions {
        geo_restriction {
            # type of restriction, blacklist, whitelist or none
            restriction_type = "none"
        }
    }

    # SSL certificate for the service.
    viewer_certificate {
        cloudfront_default_certificate = true
    }
}
