const { BeenThere } = require("../../models/");
const router = require('express').Router();

router.post("/", async (req, res) => {
    try {
      const newBeenThere = await BeenThere.create({
        ...req.body,
      });
      res.json(newBeenThere);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;

