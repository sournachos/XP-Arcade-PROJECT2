const router = require('express').Router();
const minesweeperRoutes = require('./minesweeperRoutes');
const trollRoutes = require('./trollRoutes');
const loginRoutes = require('./loginRoutes');

router.use('/minesweeper', minesweeperRoutes);
router.use('/troll', trollRoutes);
router.use('/login', loginRoutes);
module.exports = router;
