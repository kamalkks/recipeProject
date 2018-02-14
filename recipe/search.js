'use strict'
const uuid = require('uuid')
const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();

module.exports.search=(event,context,callback) => {
	const pearls={
	TableName: 'recipe2',
	Key:{
		id: event.pathParameters.idofrecipe
	}
};
dynamo.get(pearls, (error,result) =>{
if(error)
{
	console.error(error);
	callback(new Error("Unable to search the recipe"));
	return;

}
const res = {
	statusCode: 200,
	body: JSON.stringify(result.Item)
};
callback(null,res);
});

}