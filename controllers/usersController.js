const { hashSync } = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models');


// const pass = '123';
const HASH_SALT = 10
// const passHash = hashSync(pass, HASH_SALT)
// console.log(passHash);

module.exports.createUser = async (req, res, next) => {
    const { body } = req;
    try {
        body.passwHash = hashSync(body.passwHash, HASH_SALT);
        //console.log(body.passwHash)
        const createdUser = await User.create(body);
        if(!createdUser) {
            return res.status(400).send('Something went wrong');
        }
        const preparedUser = _.omit(createdUser.get(), ['passwHash', 'createdAt', 'updatedAt']);
        //const preparedUser = {...createdUser.get()};
        // delete preparedUser.passwHash;
        // delete preparedUser.createdAt;
        // delete preparedUser.updatedAt;
        res.status(201).send(preparedUser);
    } catch (err) {
        next(err);
    }
}
module.exports.getUsers = async (req, res, next) => {}
module.exports.getUserById = async (req, res, next) => {}
module.exports.updateUserById = async (req, res, next) => {}
module.exports.deleteUserById = async (req, res, next) => {}