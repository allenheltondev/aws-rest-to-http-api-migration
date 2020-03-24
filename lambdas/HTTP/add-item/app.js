const short = require('short-uuid');
const httpStatusCode = require('http-status-codes');
const ErrorMessage = 'An error occurred saving the item.';
const dynamodb = require('aws-sdk/clients/dynamodb');
const documentClient = new dynamodb.DocumentClient();

exports.lambdaHandler = async (event, context) => {
  const item = JSON.parse(event.body);

  const id = await saveToDynamo(item);
  if (!id) {
    return {
      statusCode: httpStatusCode.INTERNAL_SERVER_ERROR,
      body: { message: ErrorMessage }
    };
  }
  else {
    return { id: id };
  }
};

async function saveToDynamo(item) {
  try {
    const id = short.generate();
    item.pk = id;
    const params = {
      TableName: process.env.TableName,
      Item: item
    };

    await documentClient.put(params).promise();
    return id;
  } catch (err) {
    console.log('An error occurred adding item to Dynamo');
    console.log(err);
  }
}
