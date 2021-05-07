const router = require('express').Router();
const { User } = require('../../models');
const { sequelize } = require('../../models/User');

//gets user login info
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll()
    res.json(userData)
  } catch {
    res.status(500).send()
  }
})

//encrypt password
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

//log in function
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } })
    if (!user) {
      res.status(400).json({ message: "Incorrect username" })
      return
    }
    const validPassword = user.checkPassword(req.body.password)
    if (!validPassword) {
      res.status(400).json({ message: "Invalid password" })
      return
    }
    req.session.save(async () => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.status(200).redirect('/')
    })
  }
  catch (err) {
    console.log(err)
  }
})

//creating new user
router.post('/signup', async (req, res) => {
  console.log("HERERER")
  try {
    let notFound = true;
    (await User.findAll()).map(user => {
      if (user.username == req.body.username) {
        notFound = false
        res.status(403).json({ message: "User already exists!" })
      }
    })
    if (notFound) {
      await User.create({
        username: req.body.username,
        password: req.body.password
      }).then(user => {
        req.session.save(() => {
          req.session.user_id = user.id;
          req.session.logged_in = true;
          res.status(200).redirect('/')
        })
      })
    }
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

//logout button
router.post('/logout', async (req, res) => {
  try {
    if (req.session.logged_in) {
      req.session.destroy(async () => {
        res.status(200).render('login')
      })
    }
  }
  catch (err) {
    console.log(err)
  }
})

// put minesweeper score
router.put('/minesweeper', async (req, res) => {
  try {
    const newScore = req.body.time;
    // find user's current high score
    const userDB = await User.findByPk(req.session.user_id);
    const userData = userDB.get({ plain: true });
    const msScore = userData.minesweeper_score;
    // compare new score to current score
    if(newScore < msScore || msScore == null) {
      const scoreUpdate = await User.update(
        {
          minesweeper_score: req.body.time,
        },
        {
          where: {
            id: req.session.user_id,
          },
        }
      )
    }
    res.status(200).redirect("/leaderboard");
  } catch (err) {
    res.json(err);
  }
})
//error handel for minesweeper
router.get('/minesweeper', async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router