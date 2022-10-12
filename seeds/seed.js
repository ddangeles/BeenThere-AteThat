const sequelize = require('../config/connection');
const { Restaurant, User, Comment } = require('../models');

const restaurantData = require('./restaurantData.json');
const userData = require('./userData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  await Restaurant.bulkCreate(restaurantData, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true
  })

  process.exit(0);
};

seedDatabase();
