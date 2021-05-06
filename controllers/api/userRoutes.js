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
    const user = users.find(user => user.name === req.body.name)
    if (user === null) {
        return res.status(400).send("Cannot find user")
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }

    } catch {
        res.status(500).send()
    }
})


app.post('/api/register', async (req, res) => {
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

module.exports = router