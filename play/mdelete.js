const {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/Todoapp',(err,client)=>{
	if(err){
		return console.log('unable to connect to mongodb  server');
	}
	console.log('connected to mongoDB server');
	const db=client.db('Todoapp')
// db.collection('Todos').deleteMany({text:'lunch'}).then((result)=>{
//   console.log(result);
// });
// db.collection('Todos').deleteOne({text:'hello'}).then((result)=>{
//   console.log(result);
// });
// db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
//   console.log(result);
// });
// db.collection('users').deleteMany({name:'MANAS GUPTA'});
// db.collection('insert').findOneAndDelete({_id:new ObjectID("5b222146a7d014829d696135")
// }).then((results)=>{
// 	console.log(JSON.stringify(results,undefined,2));
// });
//client.close();
});