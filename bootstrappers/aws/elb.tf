##
##
## Load Balancer and Dependencies
##
##


# Create target group for load balancer
resource "aws_lb_target_group" "tg" {
  depends_on = [
    aws_instance.vm, aws_vpc.vpc
  ]
  name        = "${local.project-prefix}-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.vpc.id
  target_type = "instance"

  tags = var.tags
}


# Create load balancer
resource "aws_lb" "lb" {
  depends_on = [
    aws_lb_target_group.tg
  ]
  name               = "${local.project-prefix}-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.sg.id]
  subnets            = data.aws_subnet_ids.subnets.ids

  tags = var.tags
}


# Create lister for load balancer
resource "aws_lb_listener" "front_end" {
  depends_on = [
    aws_lb.lb
  ]
  load_balancer_arn = aws_lb.lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.tg.arn
  }
}
