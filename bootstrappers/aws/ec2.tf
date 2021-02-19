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
  depends_on = [tls_private_key.key]

  content  = tls_private_key.key.private_key_pem
  filename = "${local.project-prefix}.pem"
}

# Upload public key to create keypair on AWS
resource "aws_key_pair" "keypair" {
  depends_on = [tls_private_key.key]

  key_name   = "${local.project-prefix}-key"
  public_key = tls_private_key.key.public_key_openssh
}



##
##
## Generate EC2 and Dependencies
##
##

# Create General Security Group
resource "aws_security_group" "sg" {
  depends_on = [aws_vpc.vpc]

  name        = "${local.project-prefix}-sg"
  description = "${local.project-prefix}-sg"
  vpc_id      = aws_vpc.vpc.id # link to vpc.tf

  # # Allow SSH
  # ingress {
  #   from_port   = 22
  #   protocol    = "tcp"
  #   to_port     = 22
  #   cidr_blocks = ["0.0.0.0/0"]
  # }

  # Allow HTTP
  ingress {
    from_port   = 80
    protocol    = "tcp"
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow HTTPS
  ingress {
    from_port   = 443
    protocol    = "tcp"
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow Egress
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

# Allow Client to Client in Same Security Group
resource "aws_security_group_rule" "sg" {
  depends_on = [aws_security_group.sg]

  type      = "ingress"
  from_port = 0
  to_port   = 65535
  protocol  = "tcp"
  # cidr_blocks       = [aws_vpc.vpc.cidr_block]
  source_security_group_id = aws_security_group.sg.id
  security_group_id        = aws_security_group.sg.id
}

resource "aws_security_group" "ssh" {
  depends_on = [aws_vpc.vpc]

  name        = "${local.project-prefix}-ssh-sg"
  description = "${local.project-prefix}-ssh-sg"
  vpc_id      = aws_vpc.vpc.id # link to vpc.tf

  # Allow SSH
  ingress {
    description = "MG Home"
    from_port   = 22
    protocol    = "tcp"
    to_port     = 22
    cidr_blocks = ["98.113.26.56/32"]
  }

  # Allow SSH
  ingress {
    description = "MG VPN"
    from_port   = 22
    protocol    = "tcp"
    to_port     = 22
    cidr_blocks = ["35.238.21.87/32"]
  }

  # Allow SSH
  ingress {
    description = "Jason Home"
    from_port   = 22
    protocol    = "tcp"
    to_port     = 22
    cidr_blocks = ["97.88.204.18/32"]
  }

  lifecycle {
    create_before_destroy = true
  }
}


# Create VM
resource "aws_instance" "vm" {
  depends_on = [aws_security_group.sg, aws_security_group.ssh, aws_subnet.subnet, aws_key_pair.keypair, aws_iam_role.role]

  ami                         = var.ami
  instance_type               = var.instance
  subnet_id                   = aws_subnet.subnet[1].id # Link to vpc.tf
  associate_public_ip_address = true
  key_name                    = aws_key_pair.keypair.key_name         # Link to keys.tf
  iam_instance_profile        = aws_iam_instance_profile.profile.name # link to iam.tf

  # Attach Security Groups
  vpc_security_group_ids = [
    aws_security_group.sg.id, # Link to sg
    aws_security_group.ssh.id # Link to ssh sg
  ]

  root_block_device {
    delete_on_termination = true
    volume_size           = 20
    volume_type           = "gp2"
  }

  # Run Any Commands Needed
  provisioner "remote-exec" {
    inline = [
      "echo '${var.pubkeys}' >> ~/.ssh/authorized_keys",    # Add pubkeys
      "sudo yum install -y git amazon-cloudwatch-agent",    # Install deps
      "sudo amazon-linux-extras install -y docker",
      "sudo service docker start",
      "sudo usermod -a -G docker ec2-user",
      "sudo chkconfig docker on",
      "sudo curl -L "https://github.com/docker/compose/releases/download/1.28.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose",
      "sudo chmod +x /usr/local/bin/docker-compose"
    ]

    connection {
      type        = "ssh"
      private_key = "${tls_private_key.key.private_key_pem}" # Use key from above
      user        = "ec2-user"
      timeout     = "1m"
      host        = aws_instance.vm.public_ip # Get public IP
    }
  }

  tags = local.tags

}
