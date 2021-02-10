# ##
# ##
# ## Generate IAM Roles and Policies
# ##
# ##
#
# resource "aws_iam_role_policy" "s3policy" {
#   name = "${local.project-prefix}-s3"
#   role = aws_iam_role.role.id
#
#   policy = <<-EOF
#   {
#     "Version": "2012-10-17",
#     "Statement": [
#       {
#         "Action": [
#           "ec2:Describe*"
#         ],
#         "Effect": "Allow",
#         "Resource": "*"
#       }
#     ]
#   }
#   EOF
# }
#
# resource "aws_iam_role_policy" "dynamopolicy" {
#   name = "${local.project-prefix}-s3"
#   role = aws_iam_role.role.id
#
#   policy = <<-EOF
#   {
#     "Version": "2012-10-17",
#     "Statement": [
#       {
#         "Action": [
#           "ec2:Describe*"
#         ],
#         "Effect": "Allow",
#         "Resource": "*"
#       }
#     ]
#   }
#   EOF
# }
#
# resource "aws_iam_role" "role" {
#   name = "${local.project-prefix}-role"
#
#   assume_role_policy = <<-EOF
#   {
#     "Version": "2012-10-17",
#     "Statement": [
#       {
#         "Action": "sts:AssumeRole",
#         "Principal": {
#           "Service": "ec2.amazonaws.com"
#         },
#         "Effect": "Allow",
#         "Sid": ""
#       }
#     ]
#   }
#   EOF
# }
#
#





##
##
## Generate IAM Roles and Policies
##
##

# IAM Policy for s3 Access
resource "aws_iam_policy" "s3-policy" {
    depends_on = [aws_iam_role.role, aws_s3_bucket.bucket]
  name = "${local.project-prefix}-s3"

  policy = <<-EOF
  {
  	"Version": "2012-10-17",
  	"Statement": [{
  			"Sid": "VisualEditor0",
  			"Effect": "Allow",
  			"Action": "s3:ListBucket",
  			"Resource": "${aws_s3_bucket.bucket.arn}"
  		},
  		{
  			"Sid": "VisualEditor1",
  			"Effect": "Allow",
  			"Action": [
  				"s3:*Object",
  				"s3:PutObjectAcl"
  			],
  			"Resource": "${aws_s3_bucket.bucket.arn}/*"
  		}
  	]
  }
  EOF
}

# IAM Policy for Dynamo
resource "aws_iam_policy" "dynamo-policy" {
    depends_on = [aws_iam_role.role, aws_dynamodb_table.dynamo]
  name = "${local.project-prefix}-dynamo"

  policy = <<-EOF
  {
  	"Version": "2012-10-17",
  	"Statement": [{
  			"Sid": "VisualEditor0",
  			"Effect": "Allow",
  			"Action": [
  				"dynamodb:ListContributorInsights",
  				"dynamodb:DescribeReservedCapacityOfferings",
  				"dynamodb:ListGlobalTables",
  				"dynamodb:ListTables",
  				"dynamodb:DescribeReservedCapacity",
  				"dynamodb:ListBackups",
  				"dynamodb:PurchaseReservedCapacityOfferings",
  				"dynamodb:DescribeTimeToLive",
  				"dynamodb:ListExports",
  				"dynamodb:DescribeLimits",
  				"dynamodb:ListStreams"
  			],
  			"Resource": "*"
  		},
  		{
  			"Sid": "VisualEditor1",
  			"Effect": "Allow",
  			"Action": "dynamodb:*",
  			"Resource": "${aws_dynamodb_table.dynamo.arn}"
  		}
  	]
  }
  EOF
}

# Create an IAM Role
resource "aws_iam_role" "role" {
  name = "${local.project-prefix}-role"

  assume_role_policy = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "sts:AssumeRole",
        "Principal": {
          "Service": "ec2.amazonaws.com"
        },
        "Effect": "Allow",
        "Sid": ""
      }
    ]
  }
  EOF
}

# Attach Policies to Role
resource "aws_iam_role_policy_attachment" "attach-s3" {
    depends_on = [aws_iam_role.role, aws_iam_policy.dynamo-policy, aws_iam_policy.s3-policy]
  role       = aws_iam_role.role.name
  policy_arn = aws_iam_policy.s3-policy.arn
}

# Attach Policies to Role
resource "aws_iam_role_policy_attachment" "attach-dynamo" {
  role       = aws_iam_role.role.name
  policy_arn = aws_iam_policy.dynamo-policy.arn
}
