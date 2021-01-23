const mongoose = require('mongoose');
const {Schema} = mongoose;
const todoSchema = new Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:200,
    },
    body:{
        type:String,
    },
    tags:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    todoImage:{
        type:String,
        required:true,
    },
    updatedAt:{
        type:Date,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
});
    
const todoModel = mongoose.model('mTodo',todoSchema);
module.exports=todoModel;


