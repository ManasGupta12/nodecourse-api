const {mon}=require('./../server/mongoose');
const {todo}=require('./../server/models/todo');
const {user}=require('./../server/models/user');

 var id='5bd4b42133f805053800505a';
//  todo.find({
// 	_id: id
// }).then((todos)=>{
// 	console.log('todo',todos);
// });
//  todo.findOne({
// 	_id:id
// }).then((todo)=>{
// 	console.log('todo',todo);
// });
user.findById(id).then((user)=>{
	if(!user){
		return console.log('id not found')
	}
	console.log('User by id ',user);
}).catch((e)=>console.log(e));

