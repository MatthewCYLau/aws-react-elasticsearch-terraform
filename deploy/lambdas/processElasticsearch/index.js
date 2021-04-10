const AWS = require('aws-sdk');
const awsHttpClient = require('http-aws-es');
const elasticsearch = require('elasticsearch');

exports.handler = async function(event, context) {
    const client = elasticsearch.Client({
        host: '<YOUR_ES_CLUSTER_ID>.<YOUR_ES_REGION>.es.amazonaws.com',
        connectionClass: awsHttpClient,
        amazonES: {
            region: 'us-east-1',
            credentials: new AWS.EnvironmentCredentials('AWS')
        }
    });
    const res = await client.search({
        index: 'twitter',
        type: 'tweets',
        body: {
            query: {
                match: {
                    body: 'elasticsearch'
                }
            }
        }
    });

    return Promise.all(res);
};
