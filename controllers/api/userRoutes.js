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
            res.status(200).redirect('/home')
        })
    }
    catch (err){
        console.log(err)
    }
})

module.exports = router