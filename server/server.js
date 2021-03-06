require('./config.js');
var express=require('express');
const _=require('lodash');


const bodyparser=require('body-parser');
const {ObjectID}=require('mongodb');

var {mongoose}=require('./db/mongoose.js');

var {Todo}=require('./models/todo');

var {user}=require('./models/user');
var app=express();
const port=process.env.PORT||3000;

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
app.get('/todos/:id',(req,res)=>{
  var id =req.params.id;
  if(!ObjectID.isValid(id))
  {
return res.status(404).send();
}
Todo.findById(id).then((todo)=>{
	if(!todo){
		return res.status(404).send();
	}
	res.send({todo});
}).catch((e)=>{
	res.status(400).send();
});
});
app.delete('/todos/:id',(req,res)=>{
	var id=req.params.id;
	if(!ObjectID.isValid(id))
	{
		return res.status(404).send();
	}
	Todo.findByIdAndRemove(id).then((todo)=>{
		if(!todo){
			res.status(404).send();
		}
		res.send({todo});
	
	}).catch((e)=>{
		res.status(400).send();
	});

});
app.patch('/todos/:id',(req,res)=>{
	var id=req.params.id;
	var body=_.pick(req.body,['text','completed']);
	if(!ObjectID.isValid(id))
	{
		return res.status(404).send();
	}
	if(_.isBoolean(body.completed)&& body.completed){
     body.completedAt = new Date().getTime();
	}
	else
	{
     body.completed=false;
     body.completedAt=null;

	}
	Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
		if(!todo){
			res.status(404).send();
		}
		res.send({todo});
	
	}).catch((e)=>{
		res.status(400).send();
	})

	});


app.listen(port,()=>{
	console.log(`started at port ${port}`);
});
module.exports={app};