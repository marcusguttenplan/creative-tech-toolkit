##
##
## Create DynamoDB Table
##
##

resource "aws_dynamodb_table" "dynamo" {
  name           = "${local.project-prefix}-sessions"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "key"

  attribute {
    name = "key"
    type = "S"
  }

  ttl {
    attribute_name = "TimeToExist"
    enabled        = false
  }

  tags = var.tags
}
