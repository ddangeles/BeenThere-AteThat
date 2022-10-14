const { Image } = require("../../models/");
const router = require('express').Router();
const withAuth = require("../../utils/withAuth");

router.get("/", withAuth, async (req, res) => {
try {
  const imageData = await Comment.findAll();
  const images = imageData.map((image) => image.get({ plain: true }));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newImage = await Image.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.json(newImage);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
      const [affectedRows] = await Image.update(req.body, {
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


router.delete("/:id", withAuth, async (req, res) => {
  try {
    const imageData = await Image.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!imageData) {
      res.status(404).json({ message: "No Image found with this id!" });
      return;
    }
    res.status(200).json(imageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;