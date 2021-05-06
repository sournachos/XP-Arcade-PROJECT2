const router = require('express').Router();
const { User } = require('../../models')


router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll()
        // res.json(users)
        res.json(userData)
    } catch {
        res.status(500).send()
    }
})


router.post('/', async (req, res) => {
    try {
        const salt = bcrypt.getSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(salt)
        console.log(hashedPassword)
        const user = { name: req.body.name, password: req.body.passowrd }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }


})


router.post('/login', async (req, res) => {
    try {
        
        const user = await User.findOne({where:{username:req.body.username}})
        if(!user){
            res.status(400).json({message:"Incorrect username"})
            return
        }

        const validPassword = user.checkPassword(req.body.password)
        if(!validPassword){
            res.status(400).json({message:"Invalid password"})
            return
        }

        req.session.save(async () => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            res.status(200).render('home',{logged_in:req.session.logged_in})
        })
    }
    catch (err){
        console.log(err)
    }
})

router.post('/logout', async (req,res) => {
  try{
    if(req.session.logged_in){
      req.session.destroy(async () => {
        res.status(200).render('login')
      })
    }
  }
  catch (err){
    console.log(err)
  }
})

// put minesweeper score
router.put('/minesweeper', async (req, res) => {
  console.log("Minesweeper API route!!!!!!!!!!")
  try{
    await User.update(
      {
        minesweeper_score: req.body.time,
      },
      {
        where: {
          id: req.session.user_id,
        },
      }
    )
    console.log(req.session.user_id);
    res.status(200);

  } catch (err) {
    res.json(err);
  }
})

module.exports = router