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
    if (!event.requestContext.authorizer) {
        done(new Error('Authorization not configured', context.awsRequestId));
    }
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
            if (event.requestContext.authorizer.claims['custom:id'] !== myEventBody.myId) {
                done(new Error(`Unauthorized Id is used`));
            }
            switch (myEventBody.myMethod) {
                case 'delete':
                    dynamo.delete(myEventBody.myBody, done);
                    break;
                case 'put':
                    dynamo.put(myEventBody.myBody, done);
                    break;
                case 'update':
                    dynamo.update(myEventBody.myBody, done);
                    break;
                case 'get':
                    dynamo.get(myEventBody.myBody, done);
                    break;
                case 'batchGet':
                    dynamo.batchGet(myEventBody.myBody, done);
                    break;
                case 'batchWrite':
                    dynamo.batchWrite(myEventBody.myBody, done);
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

// exports.handler = async (event, context) => {
//     let body = {};
//     let statusCode = '200';
//     const headers = {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
//         'Access-Control-Allow-Headers': 'Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
//     };
//     try {
//         if (!event.requestContext.authorizer) {
//             throw new Error('Authorization not configured', context.awsRequestId);
//         }
//         switch (event.httpMethod) {
//             case 'OPTIONS':
//                 body = 'CORS check passed safe to proceed';
//                 break;
//             case 'POST':
//                 let myEventBody = JSON.parse(event.body);
//                 if (event.requestContext.authorizer.claims['custom:id'] !== myEventBody.myId) {
//                     throw new Error(`Unauthorized Id used`);
//                 }
//                 switch (event.httpMethod) {
//                     case 'delete':
//                         body = await dynamo.delete(myEventBody.myBody).promise();
//                         break;
//                     case 'put':
//                         body = await dynamo.put(myEventBody.myBody).promise();
//                         break;
//                     case 'update':
//                         body = await dynamo.update(myEventBody.myBody).promise();
//                         break;
//                     case 'get':
//                         body = await dynamo.get(myEventBody.myBody).promise();
//                         break;
//                     case 'scan':
//                         body = await dynamo.scan(myEventBody.myBody).promise();
//                         break;
//                     default:
//                         throw new Error("Unsupported method " + event.httpMethod);
//                 }
//             default:
//         }
//     } catch (err) {
//         statusCode = '400';
//         body = err.message;
//     } finally {
//         body = JSON.stringify(body);
//     }
//     return {
//         statusCode,
//         body,
//         headers,
//     };
// };