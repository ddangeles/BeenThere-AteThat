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
router.post("/my-restaurants", withAuth, upload.single('image'), async (req, res) => {
  console.log(req.body)
  console.log("hello")
  try {
    req.body = JSON.parse(JSON.stringify(req.body));

    if (!req.file){
      let newRestaurant = await Restaurant.create({ 
        ...req.body,
        userId: req.session.userId 
    });
 
    } else {
      let newRestaurant = await Restaurant.create({ 
        ...req.body, image: req.file.filename
        , userId: req.session.userId 
    });
  
    }
    res.redirect('/my-restaurants');

     } catch (err) {
    res.status(500).json(err);
  }
  // res.redirect('/my-restaurants');  
})

router.get('/', async (req, res) => {
  try {
    let restaurantData = await Restaurant.findAll({
      attributes: { exclude: [''] },
      order: [['name', 'ASC']]
    });

   restaurantData = restaurantData.map((project) => project.get({ plain: true }));

   if(!req.session.userId){ 
    res.render('homepage', { restaurantData, loggedIn: req.session.loggedIn});
    } else{
      let beenThereData = await BeenThere.findAll({
        where: {userId: req.session.userId},
        })
        beenThereData = beenThereData.map((project) => project.get({ plain: true }));

      console.log(beenThereData)
      
      restaurantData = restaurantData.map(restaurant => {
        let visited = false
        beenThereData.forEach(beenThere => {
          if (beenThere.restaurantId === restaurant.id) {
            visited = true
          }
        })
        return {
          ...restaurant,
          visited: visited
        }
      });

      console.log(restaurantData)
      res.render('homepage', { restaurantData, loggedIn: req.session.loggedIn});
    }

  } catch (err) {
    console.log(err)
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
