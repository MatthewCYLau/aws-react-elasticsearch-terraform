resource "aws_ecr_repository" "app" {
  name = var.app_name
}