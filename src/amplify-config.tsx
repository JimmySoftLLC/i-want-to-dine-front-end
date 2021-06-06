// This file is used for manual configuration of the Amplify library.
// When Amplify is used in conjunction with the Amplify CLI toolchain or AWS Mobile Hub to manage backend resources,
// an aws-exports.js file is auto-generated and can be used instead of the below to automatically configure the Amplify library.
// In this workshop, we are using the Amplify client libraries without the CLI toolchain so you should edit this file manually.

const awsConfig = {
    Auth: {
        region: 'us-east-1', // example: 'us-east-2'
        userPoolId: 'us-east-1_4ajU9e1Yn', // example: 'us-east-2_teEUQbkUh'
        userPoolWebClientId: '2e70bconmpetsff86vakbqikn1', // example: '3k09ptd8kn8qk2hpk07qopr86'
        identityPoolId: 'us-east-1:3b9be410-6228-4d44-bf3f-203381691da6', // example: 'us-east-2:c85f3c18-05fd-4bb5-8fd1-e77e7627a99e'
    },
    Storage: {
        bucket: 'iwanttodine', // example: 'my-test-bucket'
        region: 'us-east-1', // example: 'us-east-2'
        identityPoolId: 'us-east-1:3b9be410-6228-4d44-bf3f-203381691da6', // example: 'us-east-2:c85f3c18-05fd-4bb5-8fd1-e77e7627a99e'
    },
    API: {
        endpoints: [
            {
                name: 'i_want_to_dine_restaurant_api',
                endpoint: 'https://pf7biibdkk.execute-api.us-east-1.amazonaws.com/prod', // example: 'https://u8swuvl00f.execute-api.us-east-2.amazonaws.com/prod'
                region: 'us-east-1' // example: 'us-east-2'
            },
        ]
    },
}

export default awsConfig;