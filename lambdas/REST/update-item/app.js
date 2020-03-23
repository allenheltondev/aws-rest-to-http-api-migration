const httpStatusCode = require('http-status-codes');
const dynamodb = require('aws-sdk/clients/dynamodb');
const documentClient = new dynamodb.DocumentClient();
const NotFoundErrorMessage = 'Could not find an item with the specified id.';
const UnhandledExceptionErrorMessage = 'An error occurred saving the item.';

exports.lambdaHandler = async (event, context) => {
  const id = event.pathParameters.itemId;
  const item = JSON.parse(event.body);
  item.pk = id;

  const result = await updateItemInDynamo(item);
  if(!result.success){
    let response = {
      statusCode: httpStatusCode.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({message: UnhandledExceptionErrorMessage}),
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
    if(result.error === 'ConditionalCheckFailedException'){
      response.body = JSON.stringify({message: NotFoundErrorMessage});
      response.statusCode = httpStatusCode.NOT_FOUND;
    }

    return response;
  }
  else{
    return {
      statusCode: httpStatusCode.NO_CONTENT,
      body: '',
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
  }
};

async function updateItemInDynamo(item) {
  try {
    const params = {
      TableName: process.env.TableName,
      Item: item,
      ConditionExpression: 'attribute_exists(pk)'
    };

    await documentClient.put(params).promise();

    return { success: true }
  } catch (err) {
    console.log('An error occurred getting item from Dynamo');
    console.log(err);

    return {
      success: false,
      error: err.code
    };
  }
}
