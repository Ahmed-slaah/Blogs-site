const User = require('../models/mUser');
const jwt = require('jsonwebtoken');
 

const {promisify} = require('util');
const asyncSign = promisify(jwt.sign)


const create = (user)=>User.create(user)

const getAll = ()=>User.find({}).exec();

const getById =(id)=>User.findById(id).exec();

const updateOne =(id,data)=>User.findByIdAndUpdate(id,data,{new:true});

const deleteOne =(id)=>User.findByIdAndDelete(id).exec()

const follow = async(userid,followedID)=>{  
    try{const u = await User.findByIdAndUpdate(userid,{$addToSet:{follwing:followedID}},{new:true}).exec()}catch(e){throw e};
    try{const u2 = await User.findByIdAndUpdate(followedID,{$addToSet:{followers:userid}},{new:true}).exec()}catch(e){throw e};
    return {"Status":"Done..."}
}
const unfollow = async(userid,followedID)=>{  
    try{const u = await User.findByIdAndUpdate(userid,{$pull:{follwing:followedID}},{new:true}).exec()}catch(e){throw e};
    try{const u2 = await User.findByIdAndUpdate(followedID,{$pull:{followers:userid}},{new:true}).exec()}catch(e){throw e};
    return {"Status":"Done..."}
}


const login = async ({username,password})=>{
    //get user from database
    const user = await User.findOne({username}).exec();
    if(!user){
        throw Error('UN_AUTHENTICATED_user');
    }
    const isValid = user.vaildatepassword(password);
    if(!isValid){
        throw Error('UN_AUTHENTICATED_pass');
    };

    
    const token = await asyncSign({
        username: user.username,
        id: user.id,
      }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
      return { ...user.toJSON(), token };
      
      // match input password with user data using bcrypt
    };
module.exports={
    create,
    getAll,
    login,
    getById,
    updateOne,
    deleteOne,
    follow,
    unfollow
}