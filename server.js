//variables
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const { hash } = require('bcrypt');
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });
//var for sequalize session
const sess = {
	secret: 'Super secret secret',
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize
	})
};

app.use(session(sess));

app.set('view engine', 'handlebars');
app.engine('handlebars', hbs.engine);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log('Now listening'));
});

const user = []

app.get('/users', (req, res) => {
	res.json(users)
})


//processing login
app.post('/users', async (req, res) => {
	try {
		//encrypt password
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
