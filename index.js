const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sd', { useUnifiedTopology: true });
const {getAll} = require('./controllers/cTodo');


app.use(express.json());

app.get('/Allblogs',async(req,res,next)=>{
  try{
    const todos = await getAll();
    res.json(todos);
  }catch(e){
    next(e);
  }
})

app.use('/',routes);

//if route doesnot exist 
app.use('*',(req,res,next)=>{
    res.status(404).json({err:"NOT FOUND"})
});


//err handler
app.use((err,req,res,next)=>{
    console.log(err);
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(422).json(err.errors);
  }
  if (err.code === 11000) {
    res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
  }
  if(err.message === 'UN_AUTHENTICATED'){
    res.status(401).json({statusCode:'UN_AUTHENTICATED'})
  }
  res.status(503).end();
  
})

const {PORT = 4000} = process.env
app.listen(PORT,()=>{
    console.log('App is up and ready on:', PORT);
})