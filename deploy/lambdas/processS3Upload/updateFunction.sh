#!/bin/bash

npm i && zip -r processS3Upload.zip index.js node_modules && \
aws s3 cp processS3Upload.zip \
    s3://matlau-aws-es-lambda-bucket2/v1.0.0/processS3Upload.zip && \
aws lambda update-function-code \
    --function-name ProcessS3Upload \
    --s3-bucket matlau-aws-es-lambda-bucket2 \
    --s3-key v1.0.0/processS3Upload.zip