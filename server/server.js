var express=require('express');

const bodyparser=require('body-parser');


var {mongoose}=require('./db/mongoose.js');

var {Todo}=require('./models/todo');

var {user}=require('./models/user');
var app=express();

app.use(bodyparser.json());

app.post('/todos',(req,res)=>{

var tod=new Todo({
	text:req.body.text,
	//_creator:req.user._id
});
tod.save().then((doc)=>{
res.send(doc);
},(e)=>{
	res.status(400).send(e);
});
});
app.get('/todos',(req,res)=>{
//   var id=req.params.id;
//   if(!ObjectID.isValid(id))
//   {
// return res.status(404).send();
// }
Todo.find().then((todo)=>{
	// if(!todo){
	// 	return res.status(404).send();
	// }
	res.send({todo});
},(e)=>{
	res.status(400).send()
});
});

app.listen(3000,()=>{
	console.log('started on port 3000');
});
module.exports={app};