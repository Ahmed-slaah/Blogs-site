const jwt = require('jsonwebtoken');
const userm = require('../models/mUser')

const { promisify } = require('util');
const asyncVerify = promisify(jwt.verify)

const auth = async (req, res, next) => {

    const { headers: { authorization } } = req;
    if (!authorization) {
        next((new Error('UN_AUTHENTICATED')))
    }
    try {
        //debugger;

        var {id} = await asyncVerify(authorization, 'SECRET_MUST_BE_COMPLEX');
       // var a = await asyncVerify(authorization, 'SECRET_MUST_BE_COMPLEX');

        const user = await userm.findById(id).exec();
        req.user = user ;
        next()
    } catch (e) {
        next((new Error('UN_AUTHENTICATED')));
    }
};

module.exports = auth;
