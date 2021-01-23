const express = require('express');
const router = express.Router();
const {create,getMyPosts,getById,getByTagName,updateOne,deleteOne,getNew} = require('../controllers/cTodo')

const multer = require('multer');
const {todoSchema}=require('../models/mTodo')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname);
    }
});

const upload = multer({storage:storage})

//post blog
router.post('/',upload.single('todoImage'),async(req,res,next)=>{
   
    const {body,userID,file} = req;
    body.todoImage=file.path
    console.log(body);
    try{
    const todo = await create({...body,author:userID});
    res.json(todo);
    }catch(e){
        next(e);
    }
});
//get blogs using tag or all blogs
router.get('/',async(req,res,next)=>{
    const TAG = req.query.tag;
    if(TAG){
        try{
            const todo = await getByTagName(TAG);
            res.json(todo);
            }catch(e){
                next(e);
            }
    }else{
        const { body,user:{id} } = req;
        try{
            const todos = await getNew({userId:id});
            res.json(todos);
            }catch(e){
                //debugger
                next(e);
            }
    }
});
//get blogs using id
router.get('/:id',async(req,res,next)=>{
    const ID = req.params.id;
    try{
        const todo = await getById(ID);
        res.json(todo);
        }catch(e){
            next(e);
        }
});
//edit blog 
router.patch('/:id',async(req,res,next)=>{
    const ID = req.params.id;
    const {body} = req;

    try{
        const todo = await updateOne(ID,body);
        res.json(todo);
        }catch(e){
            next(e);
        }
});
//delete blog
router.delete('/:id',async(req,res,next)=>{
    const ID = req.params.id;
    try{
        const todo = await deleteOne(ID);
        res.json(todo);
        }catch(e){
            next(e);
        }
});

module.exports=router;