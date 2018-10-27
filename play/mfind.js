const {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/Todoapp',(err,client)=>{
	if(err){
		return console.log('unable to connect to mongodb  server');
	}
	console.log('connected to mongoDB server');
	const db =client.db('Todoapp')

// db.collection('Todos').find({_id:new ObjectID('5bd48942779639a4d4806113')}).toArray().then((docs)=>{
// console.log('Todos');
// console.log(JSON.stringify(docs,undefined,2));
// },(err)=>{
// 	console.log('unable to fetch todos',err);
// });
// db.collection('Todos').find().count().then((count)=>{
// console.log(`Todos count: ${count}`);
// },(err)=>{
// 	console.log('unable to fetch todos',err);
// });
// // db.collection('insert').find({name:'MANAS GUPTA'}).toArray().then((docs)=>{
// // console.log(JSON.stringify(docs,undefined,2));
// // },(err)=>{
// // 	console.log('unable to fetch todos',err);
// // });
// //  db.collection('insert').find({name:'MANAS GUPTA'}).count().then((count)=>{
// //  console.log(`Todos count: ${count}`);
// // });
//client.close();
});