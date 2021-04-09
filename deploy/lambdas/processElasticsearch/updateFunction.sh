#!/bin/bash

npm i && zip -r processElasticsearch.zip index.js node_modules && \
aws s3 cp processElasticsearch.zip \
    s3://matlau-aws-es-lambda-bucket/v1.0.0/processElasticsearch.zip && \
aws lambda update-function-code \
    --function-name ProcessElasticsearch \
    --s3-bucket matlau-aws-es-lambda-bucket \
    --s3-key v1.0.0/processElasticsearch.zip