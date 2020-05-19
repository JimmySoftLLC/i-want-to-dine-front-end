// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
    region: 'us-east-1'
});

// Create DynamoDB document client
var dynamo = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10'
});

exports.handler = async (event, context) => {
    let body = {};
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Headers': 'Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    };
    try {
        switch (event.httpMethod) {
            case 'OPTIONS':
                body = 'CORS check passed safe to proceed';
                break;
            case 'POST':
                let myEventBody = JSON.parse(event.body);
                if (event.requestContext.authorizer.claims['custom:id'] !== myEventBody.myId) {
                    throw new Error(`Unauthorized Id used`);
                }
                switch (myEventBody.myMethod) {
                    case 'get':
                        body = await dynamo.get(myEventBody.myBody).promise();
                        break;
                    case 'batchGet':
                        body = await dynamo.batchGet(myEventBody.myBody).promise();
                        break;
                    case 'scan':
                        body = await dynamo.scan(myEventBody.myBody).promise();
                        break;
                    default:
                        throw new Error("Unsupported method " + event.httpMethod);
                }
            default:
        }
    } catch (err) {
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }
    return {
        statusCode,
        body,
        headers,
    };
};