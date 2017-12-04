const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const User    = require('../models/users.js');
const post    = require('../models/post.js');
const user    = require('../models/post.js');


//index route
router.get('/', async (req, res) => {
  const allPosts = await Post.find();

  if(req.session.userIsLoggedIn){
    res.render('views/index.ejs', {
      posts: allPosts,
      topic: req.session.username
    });
  } else {
    res.redirect('/user/login')
}


router.post('/:id', async (req, res) => {
    try {
      const posts = await Post.create(req.body);
      res.redirect('back');
    } catch (err) {
      res.send(err.message);
    }
  })
});


router.delete('/:id', async (req, res) {
  const posts = await Post.findByIdAndRemove(req.params.id);
  await Post.remove({ post: posts._id});
  res.redirect('/theU');
});


module.exports = router;
