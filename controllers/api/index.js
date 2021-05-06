const router = require('express').Router();
// const loginRoutes = require('./loginRoutes');
const userRoutes = require('./userRoutes');
const createRoutes = require('./createRoutes');

router.use('/user', userRoutes);
router.use('/create', createRoutes);
module.exports = router;
