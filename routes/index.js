const router = require('express').Router();

//const homeRoutes = require('./homeRoutes.js');
//const myrestaurantsRoutes = require('./myrestaurantsRoutes.js');

const apiRoutes = require('./api');

//router.use('/', homeRoutes);
//router.use('/my-restaurants', myrestaurantsRoutes);
router.use('/api', apiRoutes);

module.exports = router;
