const router = require('express').Router();
const { Restaurant, User } = require('../models');
const withAuth = require('../utils/withAuth');


router.get('/', withAuth, async (req, res) => {
  try {
    const restaurantData = await Restaurant.findAll({
      where: { "userId": req.session.userId },
      include: [User]
    });

    const restaurants = restaurantData.map((project) => project.get({ plain: true }));

    res.render('my-restaurants', {layout: "myRestaurant", restaurants, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-restaurant', {
    layout: 'myRestaurant',
  });
});



router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const restaurantData = await Restaurant.findByPk(req.params.id);

    if (restaurantData) {
      const restaurant = restaurantData.get({ plain: true });
      res.render('edit-restaurant', {
        layout: 'myRestaurant',
        restaurant,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});


module.exports = router;