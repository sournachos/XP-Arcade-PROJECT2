const router = require('express').Router();
const {User} = require('../models');

//renders page based on login status
router.get('/', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render('home', { logged_in: req.session.logged_in })
    }
    else {
      res.render('login');
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//puts clippy on pages
router.get('/clippy', async (req, res) => {
  try {
    res.render('clippy')
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
//main page route
router.get("/login", async (req, res) => {
  try {
    res.render('login')
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
//loads minesweeper page
router.get("/minesweeper", async (req, res) => {
  try {
    res.render('minesweeper', { logged_in: req.session.logged_in });
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})
//loads snake page
router.get("/snake", async (req, res) => {
  try {
    res.render('snake', { logged_in: req.session.logged_in });
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})
//once logged in load new page with access to games
router.get("/home", async (req, res) => {
  try {
    res.render('home', { logged_in: req.session.logged_in })
    res.status(200)
  }
  catch (err) {
    console.log(err)
  }
})

router.get('/leaderboard', async (req, res) => {
  try {
    const scoresDB = await User.findAll({
      attributes: ['username', 'minesweeper_score'],
      order: [[ 'minesweeper_score', 'ASC' ]]
    });

    const scoresData = scoresDB.map((item) =>
      item.get({ plain: true }));

    //res.status(200).json(scoresData);
    res.render('leaderboard', {scoresData:scoresData, logged_in: req.session.logged_in})
    res.status(200)
  }
  catch (err) {
    console.log(err);
  }
})

module.exports = router
