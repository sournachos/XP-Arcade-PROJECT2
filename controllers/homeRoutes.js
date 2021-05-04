const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
      res.render('login');
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

module.exports = router
