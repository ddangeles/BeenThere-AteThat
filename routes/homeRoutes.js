const router = require('express').Router();
const { Restaurant } = require('../models');
const withAuth = require('../utils/withAuth');


router.get('/', async (req, res) => {
  try {
    const restaurantData = await Restaurant.findAll({
      attributes: { exclude: [''] },
      order: [['name', 'ASC']],
    });

    const restaurants = restaurantData.map((project) => project.get({ plain: true }));

    res.render('homepage', { restaurants, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/restaurant/:id', withAuth, async (req, res) => {
  try {
    const restaurantData = await Restaurant.findOne({
      where: {id: req.params.id}
      // include: [
      //   User,
      //   {
      //     model: Comment,
      //     include: [User],
      //   },
      // ],
    });

    if (restaurantData) {
      // serialize and render the data
      const restaurant = restaurantData.get({ plain: true });
      res.render('singleRestaurant', { restaurant, loggedIn: req.session.loggedIn});
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

 router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/my-restaurants');  
      return;
    }
    res.render('login');
  });

  //get signup
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    //res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});





module.exports = router;
