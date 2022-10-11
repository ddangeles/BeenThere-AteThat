const router = require('express').Router();
const { Restaurant } = require('../../models/');
const withAuth = require('../../utils/withAuth');

// create post
router.post('/', withAuth, async (req, res) => {
  const body = req.body;
    console.log(body);
  try {
    const newRestaurant = await Restaurant.create({ 
        ...body
        , userId: req.session.userId 
    });
    res.json(newRestaurant);
     } catch (err) {
    res.status(500).json(err);
  }
});

// edit post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Restaurant.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const affectedRows = await Restaurant.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(affectedRows)
    if (affectedRows === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;