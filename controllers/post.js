const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const User    = require('../models/users.js');
const Post    = require('../models/post.js');
const user    = require('../models/users.js');


//index route
router.get('/', async (req, res) => {
  // res.send(allPosts);
  try {
    const allPosts = await Post.find();
    // console.log(allPosts);
    res.render('../views/index.ejs', { post: allPosts,
      username: req.session.username });
    } catch ( err ) {
      res.send(err.message);
    }
    if(req.session.userIsLoggedIn){
      res.render('views/index.ejs', {
        posts: allPosts,
        topic: req.session.username
      })
    } else {
      res.redirect('/user/login')
    };
  })

  // new posts
  router.get('/new', async (req, res) => {
    const allPosts = await Post.find();
    res.render('../views/new.ejs',{
      post: allPosts
    });
  });

  // show
  router.get('/:id', async (req, res) => {
    try {
      const post = await Post.findById( req.params.id );
      res.render( '../views/show.ejs', { post })
    } catch ( err ) {
      res.send('That isnt\'t a valid id!');
    }
  })


  // create route
  router.post('/post', async (req, res) => {
    try {
      const posts = await Post.create(req.body);
      res.redirect('/post/' + posts.id);
    } catch (err) {
      res.send(err.message);
    }
  });

  // edit
  router.get('/:id/edit', async (req, res) => {
    try {
      const posts = await Post.findById(req.params.id);
      res.render( '../views/edit.ejs', { posts });
    } catch (err) {
      res.send(err.message);
    }
  })

  // update
  router.put('/:id', async (req, res) => {
    try {
      const posts = await Post.findByIdAndUpdate(req.params.id, req.body);
      const id = req.params.id
      res.redirect('/post/' + id);
    } catch (err) {
      res.send(err.message);
    }
  })
  // delete
  router.delete('/:id', async (req, res) => {
    try {
      const posts = await Post.findByIdAndRemove(req.params.id);
      await Post.remove( { post: posts._id} ) ;
      res.redirect('/post');
    } catch (err) {
      res.send(err.message);
    }
  });

  const seed = [
    {
      topic: 'football',
      body: 'i love football',
      img: 'http://www.markstickets.com/images/cheap-miami-hurricanes-football-tickets.jpghttp://www.markstickets.com/images/cheap-miami-hurricanes-football-tickets.jpg'
    }
  ];

  // Post.create(seed, (err, post) => {
  //   if(err){console.log(err);}
  //   console.log('seeded new posts!');
  //   res.redirect('/');
  // })
  module.exports = router;
