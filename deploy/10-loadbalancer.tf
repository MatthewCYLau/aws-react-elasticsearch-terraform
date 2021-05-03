resource "aws_lb" "staging" {
  name               = "alb"
  subnets            = [aws_subnet.pub_subnet.id, aws_subnet.pub_subnet2.id]
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb.id]

  tags = {
    Environment = var.environment
    Application = var.app_name
  }
}

resource "aws_lb_listener" "https_forward" {
  load_balancer_arn = aws_lb.staging.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.staging.arn
  }
}

resource "aws_lb_target_group" "staging" {
  name        = "${var.app_name}-alb-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.vpc.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "90"
    protocol            = "HTTP"
    matcher             = "200-299"
    timeout             = "20"
    path                = "/"
    unhealthy_threshold = "2"
  }
}