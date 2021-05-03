const AWS = require('aws-sdk');
const awsHttpClient = require('http-aws-es');
const elasticsearch = require('elasticsearch');

exports.handler = async function(event, context) {
    const client = elasticsearch.Client({
        host: process.env.ES_HOST_URL,
        connectionClass: awsHttpClient,
        amazonES: {
            region: 'us-east-1',
            credentials: new AWS.EnvironmentCredentials('AWS')
        }
    });
    const res = await client.search({
        index: 'lambda-s3-index',
        type: 'lambda-type',
        body: {
            query: {
                match_all: {}
            }
        }
    });

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(res)
    };
};
