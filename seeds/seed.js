const sequelize = require('../config/connection');
const { Restaurant } = require('../models');

const restaurantData = require('./restaurantData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Restaurant.bulkCreate(restaurantData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
