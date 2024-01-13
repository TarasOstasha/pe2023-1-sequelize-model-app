// const { hashSync } = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models');


// const pass = '123';
// const HASH_SALT = 10
// const passHash = hashSync(pass, HASH_SALT)
// console.log(passHash);

module.exports.createUser = async (req, res, next) => {
    const { body } = req;
    try {
        //body.passwHash = hashSync(body.passwHash, HASH_SALT);
        //console.log(body.passwHash)
        const createdUser = await User.create(body);
        if (!createdUser) {
            // create error from error handler
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
// --------------------------------------------------------------------------------------------------------
module.exports.getUsers = async (req, res, next) => {
    const { limit, offset } = req.pagination;
    try {
        const foundUsers = await User.findAll({
            raw: true, attributes: { exclude: ['createdAt', 'updatedAt', 'passwHash'] },
            limit,
            offset,
            order: ['id']
        }); // excluded data from response
        res.status(200).send({ data: foundUsers });
    } catch (error) {
        next(error)
    }
}
// --------------------------------------------------------------------------------------------------------
module.exports.getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const foundUser = await User.findByPk(id, { raw: true, exclude: ['createdAt', 'updatedAt', 'passwHash'] });

        if (!foundUser) {
            return res
                .status(404)
                .send([{ status: 404, message: 'User not found ):' }]);
        }

        res.status(200).send({ data: foundUser });
    } catch (err) {
        next(err);
    }

}
// --------------------------------------------------------------------------------------
module.exports.updateUserById = async (req, res, next) => {

    const { body, params: { id } } = req;


    try {
        //body.passwHash = hashSync(body.passwHash, HASH_SALT);

        const [updatedUsersCount, [updatedUser]] = await User.update(body, {
            where: { id },
            raw: true,
            returning: true,
        });

        if (!updatedUsersCount) {
            return res.status(404).send([{ status: 404, title: 'User Not Found' }]);
        }

        const preparedUser = _.omit(updatedUser, [
            'passwHash',
            'createdAt',
            'updatedAt',
        ]);

        res.status(200).send({ data: preparedUser });
    } catch (err) {
        next(err);
    }
};
// -------------------------------------------------------------------------------------
module.exports.updateOrCreateUser = async (req, res, next) => {
    // check if exist
    // if exist - update data
    // else , create user
    const { body, params: { id } }  = req;
    try {
        const [updatedUsersCount, [updatedUser]] = await User.update(body, {
            where: { id },
            raw: true,
            returning: true
        });
        if(!updatedUsersCount) {
            // if not found - create a new one
            body.id = id;
            return next();
        }
        const preparedUser = _.omit(updatedUser, [
            'passwHash',
            'createdAt',
            'updatedAt',
        ]);
        res.status(200).send({ data: preparedUser });
    } catch (error) {
        next(error);
    }
};
/// -------------------------------------------------------------------------------------
module.exports.deleteUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedUserCount = await User.destroy({ where: { id } });
        if (deletedUserCount === 0) {
            return res.status(404).send([{ status: 404, title: 'User Not Found' }]);
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}