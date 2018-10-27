const Mongoclient=require('mongodb').MongoClient;
//const {MongoClient,ObjectID}=require('mongodb');



Mongoclient.connect('mongodb://localhost:27017/Todoapp',(err,client)=>{
	if(err){
		return console.log('unable to connect to mongodb  server');
	}
	console.log('connected to mongoDB server');
const db=client.db('Todoapp');	

// db.collection('Todos').insertOne({
// 	text:'Something to do',
// 	completed:false
// },(err,result)=>{
// if(err){
// 	return console.log('unable to insert',err);
// }
// console.log(JSON.stringify(result.ops,undefined,2));

// });
db.collection('users').insertOne({
	name:'MANAS GUPTA',
	age:22,
	location:'KANPUR,INDIA',
	completed:false
},(err,result)=>{
	if(err)
	{
		return console.log('unable to insert user',err);
	}
	console.log(result.ops[0]._id.getTimestamp());
});

client.close();
});