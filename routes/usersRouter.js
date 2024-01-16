const { Router } = require('express');
const { usresController } = require('../controllers');
const { paginate } = require('../middleware');


const usersRouter = Router();

usersRouter.route('/')
    .get(paginate.paginateUsers ,usresController.getUsers)
    .post(usresController.createUser)

usersRouter.route('/:id')
    .get(usresController.getUserById)
    .patch(usresController.updateUserById)
    .put(usresController.updateOrCreateUser, usresController.createUser)
    .delete(usresController.deleteUserById);

usersRouter.get('/:id/tasks', usresController.getUserTasks);


module.exports = usersRouter;