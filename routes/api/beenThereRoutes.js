const { BeenThere } = require("../../models/");
const router = require('express').Router();
const withAuth = require('../../utils/withAuth')


router.post("/", withAuth, async (req, res) => {
    try {
      const newBeenThere = await BeenThere.create({
        ...req.body,
        userId: req.session.userId
      });
      res.json(newBeenThere);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;