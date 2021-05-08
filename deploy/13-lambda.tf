resource "aws_lambda_function" "process_es" {
  function_name = "ProcessElasticsearch"

  s3_bucket = "matlau-aws-es-lambda-bucket2"
  s3_key    = "v1.0.0/processElasticsearch.zip"
  handler   = "index.handler"
  runtime   = "nodejs10.x"

  role   = aws_iam_role.process_es.arn
  layers = [aws_lambda_layer_version.app.arn]

  vpc_config {
    subnet_ids = [
      aws_subnet.nated_1.id,
      aws_subnet.nated_2.id
    ]

    security_group_ids = [
      aws_security_group.es.id
    ]
  }

  environment {
    variables = {
      ES_HOST_URL = aws_elasticsearch_domain.es.endpoint
    }
  }
}

resource "aws_iam_role_policy_attachment" "process_es_attach" {
  role       = aws_iam_role.process_es.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
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

  s3_bucket  = "matlau-aws-es-lambda-bucket2"
  s3_key     = "v1.0.0/layer.zip"
  layer_name = "process-es-layer"

  compatible_runtimes = ["nodejs10.x"]
}

resource "aws_lambda_function" "process_s3_upload" {
  function_name = "ProcessS3Upload"

  s3_bucket = "matlau-aws-es-lambda-bucket2"
  s3_key    = "v1.0.0/processS3Upload.zip"
  handler   = "index.handler"
  runtime   = "nodejs10.x"

  role = aws_iam_role.process_s3_upload.arn

  vpc_config {
    subnet_ids = [
      aws_subnet.nated_1.id,
      aws_subnet.nated_2.id
    ]

    security_group_ids = [
      aws_security_group.es.id
    ]
  }

  environment {
    variables = {
      ES_HOST_URL = aws_elasticsearch_domain.es.endpoint
    }
  }

}

resource "aws_s3_bucket_notification" "upload" {
  bucket = aws_s3_bucket.upload.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.process_s3_upload.arn
    events              = ["s3:ObjectCreated:*"]
    filter_suffix       = ".csv"
  }

  depends_on = [aws_lambda_permission.allow_bucket]
}

resource "aws_lambda_permission" "allow_bucket" {
  statement_id  = "AllowExecutionFromS3Bucket"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.process_s3_upload.arn
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.upload.arn
}

resource "aws_iam_role_policy_attachment" "process_s3_upload_attach" {
  role       = aws_iam_role.process_s3_upload.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

resource "aws_iam_role" "process_s3_upload" {
  name               = "${var.app_name}-process-s3-upload-role"
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

resource "aws_iam_role_policy" "process_s3_lambda" {
  name = "prcoess-s3-upload-lambda-policy"
  role = aws_iam_role.process_s3_upload.id

  policy = data.aws_iam_policy_document.process_s3_lambda.json

}

data "aws_iam_policy_document" "process_s3_lambda" {
  statement {
    effect = "Allow"
    actions = [
      "s3:GetObject"
    ]
    resources = [
      "${aws_s3_bucket.upload.arn}*"
    ]
  }

  statement {
    effect = "Allow"
    actions = [
      "es:ESHttpPost"
    ]
    resources = [
      "${aws_elasticsearch_domain.es.arn}*"
    ]
  }
}