const router = require('express').Router();
const { Restaurant } = require('../models');
// const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    const restaurantData = await Restaurant.findAll({
      attributes: { exclude: [''] },
      order: [['name', 'ASC']],
    });

    const restaurants = restaurantData.map((project) => project.get({ plain: true }));

    res.render('homepage', { restaurants });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
