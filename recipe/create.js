'use strict'
const uuid = require('uuid')
const aws= require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();

module.exports.create=(event,context,callback) => {
	const diamond = JSON.parse(event.body);
		if(typeof diamond.ingredients !== 'string' || typeof diamond.name !== 'string'|| typeof diamond.steps !== 'string')
	{
		console.error('Validation failed');
		callback(new Error('There is an error'));
		return;
	}

	const pearls = {
		TableName: 'recipe2',
		Item: {
			id: uuid.v1(),
			name:diamond.name,
			ingredients:diamond.ingredients,
			steps:diamond.steps
		}
	}
	dynamo.put(pearls, (error,result) =>{
		if(error)
		{
			console.error(error);
			callback(new Error('Create didnt work'));
			return;
		}
		const res = {
			statusCode: 200,
			body: JSON.stringify(result.Item)
		}
		callback(null,res)
	})

}