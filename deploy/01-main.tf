provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket = "elasticsearch-app-tf-state"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}

data "aws_caller_identity" "current" {}

variable "region" {
  type    = string
  default = "us-east-1"
}

locals {
  common_prefix = "stag"
  elk_domain    = "${local.common_prefix}-elk-domain"
}

data "aws_region" "current" {}

data "aws_availability_zones" "available" {
  state = "available"
}