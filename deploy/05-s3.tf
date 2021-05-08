resource "aws_s3_bucket" "node_app" {
  bucket        = var.app_name
  acl           = "private"
  force_destroy = true
}

resource "aws_s3_bucket" "upload" {
  bucket        = var.upload_bucket_name
  acl           = "private"
  force_destroy = true
}
