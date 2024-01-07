const { Router } = require('express');
const { usresController } = require('../controllers');


const usersRouter = Router();

usersRouter.route('/')
    .get(usresController.getUsers)
    .post(usresController.createUser)

usersRouter.route('/:id')
    .get(usresController.getUserById)
    .patch(usresController.updateUserById)
    .delete(usresController.deleteUserById)

module.exports = usersRouter;