const router = require('express').Router();
const { Restaurant, Comment, User, BeenThere, } = require('../models');
const withAuth = require('../utils/withAuth');

// start of image uploading, will probably have to be moved
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/image')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})

// images get posted within the folder of images
// will have to create an image object within the restaurant 
// in order to populate the image of the restaurant
router.post("/upload", upload.single('image'), (req, res) => {
  res.redirect('/my-restaurants');  
})

router.get('/', async (req, res) => {
  try {
    const restaurantData = await Restaurant.findAll({
      attributes: { exclude: [''] },
      order: [['name', 'ASC']],
    });


    // const beenThereData = await BeenThere.findAll({
    //   where: {userId: req.session.userId},
    // });

    const restaurants = restaurantData.map((project) => project.get({ plain: true }));
    

    // console.log(restaurants)
    // console.log(beenThereData)

    res.render('homepage', { restaurants, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/restaurant/:id', withAuth, async (req, res) => {
  try {
    const restaurantData = await Restaurant.findOne({
      where: {id: req.params.id},
      include: [
        User, Comment
        // {
        //   model: Comment,
        //   attributes: ['id', 'comment', 'restaurantId', 'userId'],
        //   // include: {
        //   //   model: User,
        //   //   attributes: ['username']
        //   // },
        // }
      ],
    });

    if (restaurantData) {
      // serialize and render the data
      const restaurant = restaurantData.get({ plain: true });
      console.log(restaurant)
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
