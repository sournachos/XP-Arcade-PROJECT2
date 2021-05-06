const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        if (req.session.logged_in){
          res.render('home',{logged_in:req.session.logged_in})
        }
        else{
          res.render('login');
        }
    } 
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get('/clippy', async (req,res) =>{
  try{
    res.render('clippy')
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

router.get("/login", async (req,res) =>{
  try{
    res.render('login')
  }
  catch (err){
    console.log(err)
    res.status(500).json(err)
  }
})

router.get("/minesweeper", async (req, res) => {
  try {
    res.render('minesweeper');
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get("/snake", async (req, res) => {
  try {
    res.render('snake');
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get("/home", async (req, res) => {
  try{
    res.render('home')
    res.status(200)
  }
  catch (err){
    console.log(err)
  }
})



module.exports = router
