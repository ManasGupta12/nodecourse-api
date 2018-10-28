const {ObjectID}=require('mongodb');



const {mon}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {user}=require('./../server/models/user');

// Todo.remove({}).then((result)=>{
// console.log(result);
// });
// todo.findOneAndRemove({_id:'5bd524df0f185210221c4e87'}).then((res)=>{
// console.log(res);
// });
Todo.findByIdAndRemove('5bd525670f185210221c4ec4').then((res)=>
{
	console.log(res);
});
