const express = require('express');
const router = express.Router();
const { create, getAll, login, getById, updateOne, deleteOne,follow,unfollow} = require('../controllers/cUser');
const User = require('../models/mUser')
const auth = require('../middleware/auth');
//REGISTER
router.post('/', async (req, res, next) => {
    const { body } = req;
    try {
        const user = await create(body);
        res.json(user)
    } catch (e) {
        next(e)
    }
});
//LOGIN
router.post('/login', async (req, res, next) => {
    const { body } = req
    try {
        const user = await login(body);
        res.json(user);
    } catch (e) {
        next(e);
    }
});
//GET ALL USERS
router.get('/', async (req, res, next) => {
    try {
        const users = await getAll();
        res.json(users);
    } catch (e) {
        next(e);
    }
});
//GET USERS BY ID 
router.get('/:id', async (req, res, next) => {
    const ID = req.params.id;
    try {
        const user = await getById(ID);
        res.json(user);
    } catch (e) {
        next(e);
    }
});
//EDIT USER BY ID
router.patch('/:id', async (req, res, next) => {
    const ID = req.params.id;
    const { body } = req;

    try {
        const todo = await updateOne(ID, body);
        res.json(todo);
    } catch (e) {
        next(e);
    }
});
//DELETE USER
router.delete('/:id', async (req, res, next) => {
    const ID = req.params.id;
    try {
        const todo = await deleteOne(ID);
        res.json(todo);
    } catch (e) {
        next(e);
    }
});
//FOLLOW
router.put('/follow/:userid',auth,async(req,res,next)=>{
    const {user:{id},params:{userid}} = req
    try{
        const user = follow(id,userid)
        res.json(user);
    }catch(e){
        console.log(e);
        next(e);
    }

});
//UNFOLLOW
router.put('/unfollow/:userid',auth,async(req,res,next)=>{
    const {user:{id},params:{userid}} = req
    try{
        const user = unfollow(id,userid)
        res.json(user);
    }catch(e){
        console.log(e);
        next(e);
    }

});



module.exports = router;