const { Comment } = require("../../models/");
const router = require('express').Router();
const withAuth = require("../../utils/withAuth");

// get all posted comments

router.get("/", withAuth, async (req, res) => {
try {
  const commentData = await Comment.findAll();
  const comments = commentData.map((comment) => comment.get({ plain: true }));
  } catch (err) {
    res.status(500).json(err);
  }
});


// create comments 
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit comments
router.put('/:id', withAuth, async (req, res) => {
    try {
      const [affectedRows] = await Comment.update(req.body, {
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

  // delete comments
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;