npm run build && \
aws s3 cp layer.zip \
    s3://matlau-aws-es-lambda-bucket2/v1.0.0/layer.zip 