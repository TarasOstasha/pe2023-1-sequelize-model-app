const { Router } = require('express');
const usersRouter = require('./usersRouter');


const router = new Router();



// api
router.use('/users', usersRouter);





module.exports = router;