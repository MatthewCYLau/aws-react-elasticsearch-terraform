# resource "aws_elasticsearch_domain" "app" {
#   domain_name           = "aws-react-elasticsearch-app"
#   elasticsearch_version = "7.9"

#   cluster_config {
#     instance_type = "t2.small.elasticsearch"
#   }

#   tags = {
#     Environment = var.environment
#     Application = var.app_name
#   }

#     access_policies = <<POLICY
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Action": "es:*",
#       "Principal": "*",
#       "Effect": "Allow",
#       "Resource": "arn:aws:es:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:domain/${var.domain}/*",
#       "Condition": {
#         "IpAddress": {"aws:SourceIp": ["66.193.100.22/32"]}
#       }
#     }
#   ]
# }
# POLICY
# }