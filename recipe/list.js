'use strict'
const uuid = require('uuid')
const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();
const pearls={
	TableName: 'recipe2'
}
module.exports.list=(event,context,callback) => {
dynamo.scan(pearls, (error, result) =>{
	if(error)
	{
		console.error(error);
		callback(new error("Cannot find the recipe"));
		return;
	}
	const res={
	statusCode: 200,
	body: JSON.stringify(result.Items)
	 };
	 callback(null, res)
})

}