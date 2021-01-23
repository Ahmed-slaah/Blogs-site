const Todo = require('../models/mTodo')

const create = (todo)=>Todo.create(todo);

const getAll = ()=>Todo.find({}).exec();

const getMyPosts = (query)=>Todo.find({query}).exec();

const getById =(id)=>Todo.findById(id).exec();

const getByTagName =(tag)=>Todo.find({tags:tag}).exec();

const updateOne =(id,data)=>Todo.findByIdAndUpdate(id,data,{new:true});

const deleteOne =(id)=>Todo.findByIdAndDelete(id).exec()

const getNew = ()=>Todo.find().sort([['createdAt',-1]]).exec();


module.exports={
    create,
    getAll,
    getById,
    updateOne,
    deleteOne,
    getByTagName,
    getMyPosts,
    getNew,
}