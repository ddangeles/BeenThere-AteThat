const router = require('express').Router();

//main api routes
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const restaurantRoutes = require('./restaurantRoutes');

//set up main routes
router.use('/user', userRoutes);
router.use('/comment', commentRoutes);
router.use('/restaurant', restaurantRoutes);

module.exports = router;