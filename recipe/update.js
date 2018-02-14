'use strict'
const uuid = require('uuid')
const aws= require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {

  const diamond = JSON.parse(event.body);

  const pearls = {
    TableName:'recipe2',
    Key: {
      id: event.pathParameters.idofrecipe,
    },
    ExpressionAttributeNames: {
      '#name': 'name',
      '#ingredients': 'ingredients',
      '#steps': 'steps'
    },
    ExpressionAttributeValues: {
      ':name': diamond.name,
      ':ingredients': diamond.ingredients,
      ':steps': diamond.steps,
    },
    UpdateExpression: 'SET #name = :name, #ingredients = :ingredients, #steps = :steps',
    ReturnValues: 'ALL_NEW',
  };
  dynamo.update(pearls, (error, result) => {
   if(error)
{
  console.error(error);
  callback(new Error("Cannot delete the recipe"));
  return;

}
const res = {
  statusCode: 200,
  body: JSON.stringify({})
};
callback(null,res);
  });
};

// module.exports.update = (events, context, callback) => {

// 	const data = JSON.parse(event.body);

// const pearls = {
// 	TableName: 'recipe2',
// 	Item: {
// 		id: event.pathParameters.idofrecipe,
// 		name: data.name,
// 		ingredients: data.ingredients,
// 		steps: data.steps
// 	}
// }
// dynamoDb.put(pearls, (error, result) =>{
// 	if(error)
// 	{
// 		console.error(error);
// 		callback(new Error('Could not update the recipe'));
// 		return;
// 	}

// 	const res = {
// 		statusCode: 200,
// 		body: JSON.stringify(result.Item)
// 	}
// 	callback(null,res)
// });
// };


