##
##
## Generate Keys for SSH
##
##

# Generates RSA Keypair
resource "tls_private_key" "key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Save Private key locally
resource "local_file" "private_key" {
  depends_on = [
    tls_private_key.key,
  ]
  content  = tls_private_key.key.private_key_pem
  filename = "${local.project-prefix}.pem"
}

# Upload public key to create keypair on AWS
resource "aws_key_pair" "keypair" {
  depends_on = [
    tls_private_key.key,
  ]
  key_name   = "${local.project-prefix}-key"
  public_key = tls_private_key.key.public_key_openssh
}



##
##
## Generate EC2 and Dependencies
##
##

# Create Security Group
resource "aws_security_group" "sg" {
    depends_on = [ aws_vpc.vpc ]

  name = "${local.project-prefix}-sg"
  description = "${local.project-prefix}-sg"
  vpc_id = aws_vpc.vpc.id # link to vpc.tf

  # Allow SSH
  ingress {
    from_port = 22
    protocol = "tcp"
    to_port = 22
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow HTTP
  ingress {
    from_port = 80
    protocol = "tcp"
    to_port = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow HTTPS
  ingress {
    from_port = 443
    protocol = "tcp"
    to_port = 443
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow Egress
  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }
}


# Allow Client to Client in Same Security Group
resource "aws_security_group_rule" "sg" {
    depends_on = [aws_security_group.sg]
  type              = "ingress"
  from_port         = 0
  to_port           = 65535
  protocol          = "tcp"
  # cidr_blocks       = [aws_vpc.vpc.cidr_block]
  source_security_group_id = aws_security_group.sg.id
  security_group_id = aws_security_group.sg.id
}


# Create VM
resource "aws_instance" "vm" {
    depends_on = [ aws_security_group.sg, aws_subnet.subnet, aws_key_pair.keypair ]

  ami = var.ami
  instance_type = var.instance
  subnet_id = aws_subnet.subnet[2].id
  associate_public_ip_address = true
  key_name = aws_key_pair.keypair.key_name # Link to keys.tf


  vpc_security_group_ids = [
    aws_security_group.sg.id # Link to sg
  ]

  root_block_device {
    delete_on_termination = true
    volume_size = 20
    volume_type = "gp2"
  }

  tags = var.tags

}
