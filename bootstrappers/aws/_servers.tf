resource "aws_instance" "web" {
  ami = "ami-0e55e373"
  instance_type = "t1.micro"
  tags {
    name = "${var.instance-name-base}"
  }
}
