const router = require('express').Router();

//main api routes
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const restaurantRoutes = require('./restaurantRoutes');
const beenThereRoutes = require('./beenThereRoutes');

//set up main routes
router.use('/user', userRoutes);
router.use('/comment', commentRoutes);
router.use('/restaurant', restaurantRoutes);
router.use('/beenthere', beenThereRoutes);

module.exports = router;