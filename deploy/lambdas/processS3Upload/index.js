const AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const awsHttpClient = require('http-aws-es');
const elasticsearch = require('elasticsearch');

exports.handler = async (event, context) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {
        Bucket: bucket,
        Key: key
    };
    const client = elasticsearch.Client({
        host: process.env.ES_HOST_URL,
        connectionClass: awsHttpClient,
        amazonES: {
            region: 'us-east-1',
            credentials: new AWS.EnvironmentCredentials('AWS')
        }
    });

    try {
        const { Body } = await s3.getObject(params).promise();
        const data = new Buffer.from(Body).toString('utf8');
        const todos = data.split(';');

        const promises = todos.map((todo) => {
            const todoId = todo.split(',')[0];
            const name = todo.split(',')[1];
            const description = todo.split(',')[2];
            const indexDocument = async () => {
                const res = await client.index({
                    index: 'lambda-s3-index',
                    type: 'lambda-type',
                    body: {
                        todoId,
                        name,
                        description
                    }
                });
                return res;
            };
            return indexDocument();
        });

        return Promise.all(promises);
    } catch (err) {
        console.log(err);
        const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }
};
