const express = require('express');
const todo = require('./rTodo');
const user = require('./rUser');
const authMdl = require('../middleware/auth')


const router = express.Router();

router.use('/todos',authMdl,todo);
router.use('/users',user);


module.exports=router;


