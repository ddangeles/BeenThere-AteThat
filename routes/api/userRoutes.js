const router = require('express').Router();
const { User, BeenThere } = require('../../models');

//create new user
router.post('/', async (req, res) => {
  try {
    console.log(req.body.username)
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//login session
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'Incorrect username or password!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

//logging out
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//been there
router.post('/beenthere', async (req, res) => {
  try {
    
    const beenThere = await BeenThere.create({
      restaurantId: req.body.restaurantId,
      userId: req.session.userId 
    });

    res.sendStatus(204) 
  }      
  
   catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;