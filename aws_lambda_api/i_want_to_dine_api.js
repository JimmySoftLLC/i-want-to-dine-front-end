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

exports.handler = (event, context, callback) => {
    const done = (err, res) =>
        callback(null, {
            statusCode: err ? '400' : '200',
            body: err ? err.errorMessage : JSON.stringify(res),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                'Access-Control-Allow-Headers': 'Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            },
        });
    switch (event.httpMethod) {
        case 'OPTIONS':
            const response = {
                statusCode: 200,
                body: 'CORS check passed safe to proceed',
            };
            done(null, response);
            break;
        case 'POST':
            var myEventBody = JSON.parse(event.body);
            switch (myEventBody.myMethod) {
                case 'get':
                    dynamo.get(myEventBody.myBody, done);
                    break;
                case 'scan':
                    dynamo.scan(myEventBody.myBody, done);
                    break;
                default:
                    done(new Error(`Unsupported method "${event.httpMethod}"`));
            }
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};

// i_want_to_dine_restaurant_api
//245