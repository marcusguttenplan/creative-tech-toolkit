# AWS Infrastructure as Code

Terraform scripts for quickly spinning up project resources, including the basic template:

* 1 VM (to use as a build VM)
* Load Balancer, Target Group
* Security Groups
* VPC, Subnets, Gateway, Routing Tables
* RDS Database Cluster and Instances
* Cloudfront Distribution
* AWS Certificate for Domain
* DyanmoDB Table
* Storage Buckets for Assets and Cloudfront Static Site
* IAM Policies and Role

## Prerequisites

* Terraform `brew install terraform`
* S3 Bucket for Terraform Backend

### Usage

* Set variables in `_variables.tf`
* Download AWS access key and export variables
* `terraform plan`
* `terraform apply`
