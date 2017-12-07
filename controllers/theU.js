const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const User    = require('../models/users.js');
const Post    = require('../models/post.js');
// models
// console.log(Post);
// index route
router.get('/', async (req, res) => {
  const allPosts = await Post.find();
  res.render('../views/index.ejs', {
    post: allPosts,
    username: req.session.username
  })
  // res.send('works');
});

router.get('/login', (req, res) => {
  console.log(req.session);
  res.render('../views/login.ejs', {
  message: req.session.message
  });
})

router.post('/login', async (req, res) => {
  try {
  // save username to a variable
  const user = await User.findOne({username: req.body.username});
    // if statement compares password with the bcrypt key to see if it matches
    if (bcrypt.compareSync(req.body.password, user.password)) {
      req.session.username = req.body.username;
      req.session.userIsLoggedIn = true;
      console.log(req.session);
      res.redirect('/');
    } else {
      // if the password doesnt match
      console.log('bad password');
      req.session.message = 'Username or password are incorrect';
      res.redirect('/theU/login');
    }

  } catch (err) {
      console.log(err);
      req.session.message = 'Username or password are incorrect';
      res.redirect('/theU/login');
  }

})

router.get('/register', (req, res) => {
  console.log(req.session);
  res.render('../views/register.ejs', {
  message: req.session.message
  });
})

router.post('/register', async (req , res) => {
  console.log('===============>works');
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const username = req.body.username;

  const userDbEntry = {};

  userDbEntry.username = username;
  userDbEntry.password = passwordHash;

  console.log(userDbEntry);

  try {
    const user = await User.create(userDbEntry);
        console.log('USER: ',user);
        console.log('USER: ',user);
        req.session.username = user.username;
        req.session.userIsLoggedIn = true;
        res.redirect('/');
    } catch (err) {
      console.log(err);
    }
});

router.get('/logout', (req, res) => {
  // here we destroy the session
  req.session.destroy();
  res.redirect('/');
});



module.exports = router;
