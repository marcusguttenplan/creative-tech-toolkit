resource "aws_acm_certificate" "cert" {
  domain_name               = "${var.domain}"
  subject_alternative_names = ["www.${var.domain}"]
  validation_method         = "DNS"
  provider                  = "aws.virginia"

  tags = local.tags
}
