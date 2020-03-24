const httpStatusCode = require('http-status-codes');
const dynamodb = require('aws-sdk/clients/dynamodb');
const documentClient = new dynamodb.DocumentClient();
const ErrorMessage = 'Could not find an item with the specified id.';

exports.lambdaHandler = async (event, context) => {
  const id = event.pathParameters.itemId;
  const item = await getItemFromDynamo(id);

  if (!item) {
    return {
      statusCode: httpStatusCode.NOT_FOUND,
      body: { message: ErrorMessage }
    };
  }
  else {
    item.id = item.pk;
    delete item.pk;

    return item;
  }
};

async function getItemFromDynamo(id) {
  try {
    const params = {
      TableName: process.env.TableName,
      Key: {
        pk: id
      }
    };

    const result = await documentClient.get(params).promise();

    return result.Item;
  } catch (err) {
    console.log('An error occurred getting item from Dynamo');
    console.log(err);
  }
}
