const expect=require('expect');
const request=require('supertest');
const {ObjectID}=require('mongodb');

const {app}=require('./../server');
const {Todo}=require('./../models/todo');
const todos=[{
	_id:new ObjectID(),
	text:'first test Todo'
},{
	_id:new ObjectID(),
	text:'second todo '
}];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
    	return Todo.insertMany(todos);
 }).then(()=> done());
	});
describe('POST/todos',()=>{
	it('should create a new todo',(done)=>{
   var text='test a todo text';
   request(app)
   .post('/todos')
   .send({text})
   .expect(200)
   .expect((res)=>{
   expect(res.body.text).toBe(text);
	})
	.end((err,res)=>{
		if(err)
			{return done(err);
			}

    Todo.find({text}).then((todos)=>{
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe(text);
    done();
    }).catch((e)=>done(e));

    });
	});
	it('should not create todo',(done)=>{
		request(app)
		.post('/todos')
		.send({})
		.expect(400)
	    .end((err,res)=>{
			if(err){
				return done(err);
			}
			Todo.find().then((todos)=>{
             expect(todos.length).toBe(2);
             done();
			}).catch((e)=>done(e));
		});
	});
});
describe('GET/todos',()=>{
	it('should get all  todo',(done)=>{
    request(app)
   .get('/todos')
  // .set('x-auth',users[0].tokens[0].token)
   .expect(200)
   .expect((res)=>{
   expect(res.body.todo.length).toBe(2);
	})
   .end(done);
});
describe('GET/todos/:id',()=>{
	it('should return todo doc',(done)=>{
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		 
		.expect(200)
   .expect((res)=>{
     expect(res.body.todo.text).toBe(todos[0].text);
	})
	.end(done);
	});
	// 

it('should return 404 if todo not found',(done)=>{
	var hexid=new ObjectID().toHexString();
	request(app)
	.get(`/todos/${hexid}`)
	
    .expect(404)
	.end(done)
});
it('should return 404 for non-objects id',(done)=>{
	request(app)
	.get(`/todos/123abc`)
	
	.expect(404)
	.end(done)
 });
});
});
describe('DELETE/todos/:id',()=>{
	it('should remove a todo ',(done)=>{
		var hexid=todos[1]._id.toHexString();
		request(app)
		.delete(`/todos/${hexid}`)
		//.set('x-auth',users[1].tokens[0].token)
		.expect(200)
   .expect((res)=>{
     expect(res.body.todo._id).toBe(hexid);
	})
	.end((err,res)=>{
		if(err){
			console.log(err);
		}
		Todo.findById(hexid).then((todo)=>{
			expect(todo).toNotExist();
			done();
		}).catch((e)=>done());
	});
	});
	it('should return 404 if todo not found',(done)=>{
	var hexid=new ObjectID().toHexString();
	request(app)
	.delete(`/todos/${hexid}`)
	//.set('x-auth',users[1].tokens[0].token)
	.expect(404)
	.end(done)
});
	
it('should return 404 if object id is valid',(done)=>{
	request(app)
	.delete(`/todos/123abc`)
	//.set('x-auth',users[1].tokens[0].token)
	.expect(404)
	.end(done)
});
});

describe('PATCH/todos/:id',()=>{
	it('should return todo doc',(done)=>{
		var hexid=todos[0]._id.toHexString();
		var text='Hii this from server side';
		request(app)
		.patch(`/todos/${hexid}`)
		//.set('x-auth',users[0].tokens[0].token)
		.send({
			completed:true,
			text
		})
		.expect(200)
   .expect((res)=>{
     expect(res.body.todo.text).toBe(text);
     expect(res.body.todo.completed).toBe(true);
     expect(typeof res.body.todo.completedAt).toBe('number');
	})
	.end(done);
	});
	it('it should clear completedAt when todo is completed',(done)=>{
     var hexid=todos[1]._id.toHexString();
		var text='This is new';
		request(app)
		.patch(`/todos/${hexid}`)
		//.set('x-auth',users[1].tokens[0].token)
		.send({
			completed:false,
			text
		})
		.expect(200)
   .expect((res)=>{
     expect(res.body.todo.text).toBe(text);
     expect(res.body.todo.completed).toBe(false);
     expect(res.body.todo.completedAt).toBeFalsy();
	})
	.end(done);
	 });
	});




