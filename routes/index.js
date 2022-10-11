const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');
const myrestaurantsRoutes = require('./myrestaurantsRoutes.js');

router.use('/', homeRoutes);
router.use('/my-restaurants', myrestaurantsRoutes);

module.exports = router;
