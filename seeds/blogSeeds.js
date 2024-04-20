const { Blog } = require('../models');
const blogData = [
  {
    title: 'Scarlett With',
    content: 'Scarlet Witch Aka Wanda Maximoff is a mutan she is trying to find her sons Billy and Tommy. ',
    user_id: 1,
  },
];
const seedBlog = () => Blog.bulkCreate(blogData);
module.exports = seedBlog;