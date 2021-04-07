resource "aws_ecr_repository" "node_app" {
  name = var.app_name
}