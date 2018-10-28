const {ObjectID}=require('mongodb');



const {mon}=require('./../server/mongoose');
const {todo}=require('./../server/models/todo');
const {user}=require('./../server/models/user');

todo.remove({}).then((result)=>{
console.log(result);
});
