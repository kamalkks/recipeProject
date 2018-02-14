'use strict'
const uuid = require('uuid')
const aws= require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();

module.exports.delete = (event,context,callback) => {
	const pearls = {
	TableName: 'recipe2',
	Key:{
		id: event.pathParameters.idofrecipe
	}
};
dynamo.delete(pearls, (error,result) =>{
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

}