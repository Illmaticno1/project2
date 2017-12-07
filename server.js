const express         = require('express');
const mongoose        = require('mongoose');
const morgan          = require('morgan');
const session         = require('express-session');
const bcrypt          = require('bcrypt');
const bodyParser      = require ( 'body-parser' );
const methodOverride  = require ( 'method-override' );
const pretty          = require('pretty-error');
const app             = express();
const PORT            = 3000;

// CONNECT TO DATABASE
mongoose.Promise = global.Promise;
const mongoURI = 'mongodb://localhost:27017/theU';
mongoose.connect(mongoURI, { useMongoClient: true});


// test connection
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('Mongo running: ', mongoURI));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(session({
  secret: 'l;akjdfjlnfsoaijdsl;',
  resave: false,
  saveUninitialized: false
}));
app.use(methodOverride('_method')); // allow POST, PUT and DELETE FROM A FORM

// controllers
const theUController = require('./controllers/theU.js');
const postController = require('./controllers/post.js');
// const userController = require('./controllers/users.js');
app.use('/theU', theUController);
app.use('/post', postController);
// app.use('/user', userController);

// root
app.get('/', (req, res) => {
  res.redirect('/theU');
  // res.send('works');
});



app.listen(PORT, () => {
  console.log('connected to port: ' + PORT);
});
