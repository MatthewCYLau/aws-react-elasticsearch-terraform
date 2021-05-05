resource "aws_api_gateway_rest_api" "app" {
  name        = "${var.app_name}-api"
  description = "React Elasticsearch App API"
  body        = data.template_file.api_definition.rendered
}

data "template_file" "api_definition" {
  template = file("api/openapi.yaml")
  vars = {
    lambda_uri_process_es = aws_lambda_function.process_es.invoke_arn
  }
}

resource "aws_api_gateway_deployment" "app" {
  depends_on = [
    aws_api_gateway_rest_api.app
  ]
  rest_api_id = aws_api_gateway_rest_api.app.id
  stage_name  = var.environment
}

resource "aws_lambda_permission" "lambda_permission_get_todos" {
  statement_id  = "AllowExecutionFromAPIGatewayUCI"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.process_es.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.app.execution_arn}/*/GET/todos"
}