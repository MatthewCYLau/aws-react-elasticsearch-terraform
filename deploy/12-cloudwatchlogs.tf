resource "aws_cloudwatch_log_group" "app" {
  name = "AWS-Elasticsearch-App/${var.environment}"

  tags = {
    Environment = var.environment
    Application = var.app_name
  }
}