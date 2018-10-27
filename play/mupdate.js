const {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/Todoapp',(err,client)=>{
	if(err){
		return console.log('unable to connect to mongodb  server');
	}
	console.log('connected to mongoDB server');
	const db=client.db('Todoapp')
	db.collection('users').findOneAndUpdate({_id:new ObjectID('5bd4873b61d902245869fc7d')},{
		$set:{
			name:'MANAN GUPTA'
		},
		$inc:{ 
			age:1
		}
	},
		{ 
		  returnOriginal:false
	
	}).then((results)=>{
		console.log(results);
	});
//client.close();
});