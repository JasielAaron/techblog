const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });


    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/create', (req, res) => {
  res.render('create');
});
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/blog/:id', async(req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id,{
      include:[
        {
          model: User, 
          attributes:['username']
        },
        {model: Comment,
          include:[ {
            model: User, 
            attributes:['username']
          },]
        }
      ]
    })
    const blog = blogData.get({
      plain: true
    })
    console.log(blog)
    res.render('singleblog',{
      blog,
      logged_in: req.session.logged_in
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;
