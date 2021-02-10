##
##
## Create Private VPC
##
##

# Get AZs
data "aws_availability_zones" "available" {}

# Get the list of subnet ids in selected VPC
data "aws_subnet_ids" "subnets" {
    depends_on = [
      aws_vpc.vpc
    ]
  vpc_id = aws_vpc.vpc.id
}


# Create VPC
resource "aws_vpc" "vpc" {
    cidr_block = "10.0.0.0/16"
    enable_dns_support = "true" #gives you an internal domain name
    enable_dns_hostnames = "true" #gives you an internal host name
    enable_classiclink = "false"
    instance_tenancy = "default"

    tags = var.tags
}


# Create Subnet for each AZ
resource "aws_subnet" "subnet" {
    depends_on = [
      aws_vpc.vpc
    ]

    count = "${length(data.aws_availability_zones.available.names)}"

    vpc_id = "${aws_vpc.vpc.id}"
    cidr_block = "10.0.${10+count.index}.0/24"
    availability_zone = "${data.aws_availability_zones.available.names[count.index]}"
    map_public_ip_on_launch = true

    tags = {
        Name = "${local.project-prefix}-subnet-1"
    }
}


# Create an Internet Gateway for Public IPs
resource "aws_internet_gateway" "prod-igw" {
    depends_on = [
      aws_vpc.vpc
    ]

    vpc_id = "${aws_vpc.vpc.id}"

    tags = {
        Name = "${local.project-prefix}-igw"
    }
}


# Create Routing Table
resource "aws_route_table" "prod-public-crt" {
    depends_on = [
      aws_vpc.vpc, aws_internet_gateway.prod-igw
    ]

    vpc_id = aws_vpc.vpc.id

    route {
        //associated subnet can reach everywhere
        cidr_block = "0.0.0.0/0"
        //CRT uses this IGW to reach internet
        gateway_id = "${aws_internet_gateway.prod-igw.id}"
    }

    tags = {
        Name = "${local.project-prefix}-public-crt"
    }
}


# Associate Routing Table to Subnets
resource "aws_route_table_association" "prod-crta-public-subnet-1"{
    depends_on = [
      aws_vpc.vpc, aws_subnet.subnet, aws_route_table.prod-public-crt
    ]
    count = "${length(data.aws_availability_zones.available.names)}"
    subnet_id = aws_subnet.subnet[count.index].id
    route_table_id = "${aws_route_table.prod-public-crt.id}"
}
