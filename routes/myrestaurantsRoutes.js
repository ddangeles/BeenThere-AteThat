const router = require('express').Router();
const { Restaurant } = require('../models');
const withAuth = require('../utils/withAuth');


router.get('/', withAuth, async (req, res) => {
  try {
    const restaurantData = await Restaurant.findAll({
      attributes: { exclude: [''] },
      order: [['name', 'ASC']],
    });

    const restaurants = restaurantData.map((project) => project.get({ plain: true }));

    res.render('my-restaurants', { restaurants, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;