const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const expressSession = require('express-session')
const bcrypt = require('bcryptjs')

// DB link
const db = require('./config/keys').MongoURI;

// la
app.use(express.static('public'));
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');


// Bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose connection
mongoose.set(Parser = {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
});

mongoose.connect(db, Parser)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));
const mongoStore = MongoStore(expressSession)

// Express session
app.use(expressSession({
    secret: 'securite',
    name: 'recipe',
    saveUninitialized: true,
    resave: false,
    store: new mongoStore(
        { mongooseConnection: mongoose.connection }
    )
}));


// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs')

// HandlebarsIntl
var Handlebars = require("handlebars");
const HandlebarsIntl = require('handlebars-intl')
HandlebarsIntl.registerWith(Handlebars);



//ANNONCE AFFICHAGE
const Annonce = require('./models/annonce');

app.get('/', async (req, res) => {
	const annonces = await Annonce.find({});

	res.render('index', { annonces });
});

// Inscription
const User = require('./models/User');
app.post('/register/auth', (req, res) => {
	if (req.body.password === req.body.password2) {
		req.body.isAdmin = 1;
		User.create(req.body, (err, user) => {
			if (err) {
				return res.send('err');
			}
			res.redirect('/');
		});
	} else {
		console.log('mdp incorect');
		return res.redirect('/');
	}
});
//CONNEXION
app.post('/login/auth', (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email }, (err, user) => {
		if (user) {
			bcrypt.compare(password, user.password, (err, same) => {
				if (same) {
					res.redirect('/user/profile');
					// if(req.body.isAdmin === false) {
					//     res.redirect('/user/profile')
					// } else {
					//     res.redirect('/admin/dashboard')
					// }
				} else {
					res.redirect('/');
				}
			});
		} else {
			return res.redirect('/');
		}
	});
});


app.get('/annonce/:id', async (req, res) => {
	const annonce = await Annonce.findById({
		_id: req.params.id
	});
	res.render('annonce', { annonce });
});

app.get('/annonces/dpform', (req, res) => {
	res.render('annonces/dpform');
});

// Annonces

app.post('/annonces/send', (req, res) => {
	Annonce.create(req.body, (err, post) => {
		res.redirect('/');
	});
});

const PORT = process.env.PORT || 5045;
app.listen(PORT, console.log(`Serveur sur http://localhost:${PORT}`));
