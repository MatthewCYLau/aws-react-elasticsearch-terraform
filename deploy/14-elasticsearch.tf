resource "aws_security_group" "es" {
  name        = "${local.common_prefix}-es-sg"
  description = "Allow inbound traffic to ElasticSearch from VPC CIDR"
  vpc_id      = aws_vpc.demo.id

  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = [
      aws_vpc.demo.cidr_block
    ]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_elasticsearch_domain" "es" {
  domain_name           = local.elk_domain
  elasticsearch_version = "7.7"

  cluster_config {
    instance_count         = 1
    instance_type          = "t2.medium.elasticsearch"
    zone_awareness_enabled = false

  }

  vpc_options {
    subnet_ids = [
      aws_subnet.nated_1.id
    ]

    security_group_ids = [
      aws_security_group.es.id
    ]
  }

  ebs_options {
    ebs_enabled = true
    volume_size = 10
  }

  access_policies = <<CONFIG
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Action": "es:*",
          "Principal": "*",
          "Effect": "Allow",
          "Resource": "arn:aws:es:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:domain/${local.elk_domain}/*"
      }
  ]
}
  CONFIG

  snapshot_options {
    automated_snapshot_start_hour = 23
  }

  tags = {
    Domain = local.elk_domain
  }
}

output "elk_endpoint" {
  value = aws_elasticsearch_domain.es.endpoint
}

output "elk_kibana_endpoint" {
  value = aws_elasticsearch_domain.es.kibana_endpoint
}