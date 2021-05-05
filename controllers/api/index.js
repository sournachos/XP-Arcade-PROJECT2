const router = require('express').Router();
// const loginRoutes = require('./loginRoutes');
const userRoutes = require('./userRoutes');


router.use('/user', userRoutes)

module.exports = router;
