resource "aws_lambda_function" "process_es" {
  function_name = "ProcessElasticsearch"

  s3_bucket = "matlau-aws-es-lambda-bucket"
  s3_key    = "v1.0.0/processElasticsearch.zip"
  handler   = "index.handler"
  runtime   = "nodejs10.x"

  role   = aws_iam_role.process_es.arn
  layers = [aws_lambda_layer_version.app.arn]

  # vpc_config {
  #   subnet_ids         = data.aws_subnet_ids.app.ids
  #   security_group_ids = [aws_security_group.redis.id]
  # }

}

resource "aws_iam_role" "process_es" {
  name               = "${var.app_name}-process-es-role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_lambda_layer_version" "app" {

  s3_bucket  = "matlau-aws-es-lambda-bucket"
  s3_key     = "v1.0.0/layer.zip"
  layer_name = "process-es-layer"

  compatible_runtimes = ["nodejs10.x"]
}