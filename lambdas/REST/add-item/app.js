const httpStatusCode = require('http-status-codes');
const short = require('short-uuid');
const ErrorMessage = 'An error occurred saving the item.';

exports.lambdaHandler = async (event, context) => {
  const item = JSON.parse(event.body);

  const id = await saveToDynamo(item);
  if (!id) {
    return {
      statusCode: httpStatusCode.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({ message: ErrorMessage }),
      headers: { 'Access-Control-Allow-Origin': '*' }
    };

    // New HTTP Lambda v2.0 Response
    return { message: ErrorMessage };
  }
  else {
    return {
      statusCode: httpStatusCode.OK,
      body: JSON.stringify({ id: id }),
      headers: { 'Access-Control-Allow-Origin': '*' }
    };

    // New HTTP Lambda v2.0 Response
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
