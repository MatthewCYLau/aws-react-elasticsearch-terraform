data "template_file" "app" {
  template = file("task-definitions/service.json.tpl")
  vars = {
    aws_ecr_repository            = aws_ecr_repository.app.repository_url
    tag                           = "latest"
    container_name                = var.app_name
    aws_cloudwatch_log_group_name = aws_cloudwatch_log_group.app.name
    react_app_api_endpoint        = aws_api_gateway_deployment.app.invoke_url
  }
}

resource "aws_ecs_task_definition" "service" {
  family                   = "${var.app_name}-${var.environment}"
  network_mode             = "awsvpc"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  cpu                      = 256
  memory                   = 2048
  requires_compatibilities = ["FARGATE"]
  container_definitions    = data.template_file.app.rendered
  tags = {
    Environment = var.environment
    Application = var.app_name
  }
}

resource "aws_ecs_service" "staging" {
  name                       = var.environment
  cluster                    = aws_ecs_cluster.staging.id
  task_definition            = aws_ecs_task_definition.service.arn
  desired_count              = 1
  deployment_maximum_percent = 250
  launch_type                = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = [aws_subnet.pub_subnet.id, aws_subnet.pub_subnet2.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.staging.arn
    container_name   = var.app_name
    container_port   = 3001
  }

  depends_on = [aws_lb_listener.https_forward, aws_iam_role_policy.ecs_task_execution_role]

  tags = {
    Environment = var.environment
    Application = var.app_name
  }
}

resource "aws_ecs_cluster" "staging" {
  name = "${var.app_name}-cluster"
}