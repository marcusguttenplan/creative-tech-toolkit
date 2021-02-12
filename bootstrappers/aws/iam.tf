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


# IAM Policy for CloudWatch
resource "aws_iam_policy" "cloudwatch-policy" {
  depends_on = [aws_iam_role.role]

  name = "${local.project-prefix}-cloudwatch"

  policy = <<-EOF
  {
  	"Version": "2012-10-17",
  	"Statement": [{
  			"Action": [
  				"autoscaling:Describe*",
  				"cloudwatch:*",
  				"logs:*",
  				"sns:*",
  				"iam:GetPolicy",
  				"iam:GetPolicyVersion",
  				"iam:GetRole"
  			],
  			"Effect": "Allow",
  			"Resource": "*"
  		},
  		{
  			"Effect": "Allow",
  			"Action": "iam:CreateServiceLinkedRole",
  			"Resource": "arn:aws:iam::*:role/aws-service-role/events.amazonaws.com/AWSServiceRoleForCloudWatchEvents*",
  			"Condition": {
  				"StringLike": {
  					"iam:AWSServiceName": "events.amazonaws.com"
  				}
  			}
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

# Create a Profile to Attach to EC2
resource "aws_iam_instance_profile" "profile" {
  depends_on = [aws_iam_role.role, aws_iam_policy.dynamo-policy, aws_iam_policy.s3-policy, aws_iam_policy.cloudwatch-policy]

  name = "${local.project-prefix}-role"
  role = "${aws_iam_role.role.name}"
}

# Attach Policies to Role
resource "aws_iam_role_policy_attachment" "attach-s3" {
  depends_on = [aws_iam_role.role, aws_iam_policy.dynamo-policy, aws_iam_policy.s3-policy, aws_iam_policy.cloudwatch-policy]

  role       = aws_iam_role.role.name
  policy_arn = aws_iam_policy.s3-policy.arn
}

# Attach Policies to Role
resource "aws_iam_role_policy_attachment" "attach-dynamo" {
  depends_on = [aws_iam_role.role, aws_iam_policy.dynamo-policy, aws_iam_policy.s3-policy, aws_iam_policy.cloudwatch-policy]

  role       = aws_iam_role.role.name
  policy_arn = aws_iam_policy.dynamo-policy.arn
}

# Attach Policies to Role
resource "aws_iam_role_policy_attachment" "attach-cloudwatch" {
  depends_on = [aws_iam_role.role, aws_iam_policy.cloudwatch-policy, aws_iam_policy.s3-policy, aws_iam_policy.cloudwatch-policy]

  role       = aws_iam_role.role.name
  policy_arn = aws_iam_policy.cloudwatch-policy.arn
}
