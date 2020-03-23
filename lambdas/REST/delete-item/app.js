const httpStatusCode = require('http-status-codes');
const dynamodb = require('aws-sdk/clients/dynamodb');
const documentClient = new dynamodb.DocumentClient();

exports.lambdaHandler = async (event, context) => {
  const id = event.pathParameters.itemId;

  await deleteItemFromDynamo(id);

  return {
    statusCode: httpStatusCode.NO_CONTENT,
    body: '',
    headers: { 'Access-Control-Allow-Origin': '*' }
  };
};

async function deleteItemFromDynamo(id) {
  try {
    const params = {
      TableName: process.env.TableName,
      Key: {
        pk: id
      }
    };

    await documentClient.delete(params).promise();
  } catch (err) {
    console.log('An error occurred deleting item from Dynamo');
    console.log(err);
  }
}
