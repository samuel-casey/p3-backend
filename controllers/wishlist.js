const SelfCareItem = require('../models/selfcare');
const {Router} = require("express")
const router = Router();
const auth = require('../auth');


router.get("/", auth, async (req, res) => {
  res.json(await SelfCareItem.find({}));
});

router.post("/", auth, async (req, res) => {
res.json(await SelfCareItem.create(req.body));
});

router.get('/:id', auth, async (req, res) => {
    res.json(await SelfCareItem.findById(req.params.id));
});

router.put('/:id', auth, async (req, res) => {
res.json(await SelfCareItem.findByIdAndUpdate(req.params.id, req.body, {new:true}));
});

router.delete("/id:", auth, async (req, res) => {
res.json(await SelfCareItem.findByIdAndRemove(req.params.id));
});

module.exports = router;

