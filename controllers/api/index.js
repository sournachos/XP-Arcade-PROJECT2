const router = require('express').Router();
const minesweeperRoutes = require('./minesweeperRoutes');
const snakeRoutes = require('./snakeRoutes');
const loginRoutes = require('./loginRoutes');

router.use('/minesweeper', minesweeperRoutes);
router.use('/snake', snakeRoutes);
router.use('/login', loginRoutes);
module.exports = router;
