const SelfCareItem = require('../models/selfcare');
const {Router} = require("express")
const router = Router();



router.get("/", async (req, res) => {
  res.json(await SelfCareItem.find({}));
});

router.post("/", async (req, res) => {
res.json(await SelfCareItem.create(req.body));
});

router.get('/:id', async (req, res) => {
    res.json(await SelfCareItem.findById(req.params.id));
});

router.put('/:id', async (req, res) => {
res.json(await SelfCareItem.findByIdAndUpdate(req.params.id, req.body, {new:true}));
});

router.delete("/id:", async (req, res) => {
res.json(await SelfCareItem.findByIdAndRemove(req.params.id));
});

module.exports = router;
