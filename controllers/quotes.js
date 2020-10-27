const {Router} = require("express")
const router = Router();
const auth = require('../auth');
const Quote = require('../models/quotes');


router.get("/", auth, async (req, res) => {
  res.json(await Quote.find({}));
});

router.post("/", auth, async (req, res) => {
res.json(await Quote.create(req.body));
});

router.get('/:id', auth, async (req, res) => {
    res.json(await Quote.findById(req.params.id));
});

router.put('/:id', auth, async (req, res) => {
res.json(await Quote.findByIdAndUpdate(req.params.id, req.body, {new:true}));
});

router.delete("/id:", auth, async (req, res) => {
res.json(await Quote.findByIdAndRemove(req.params.id));
});

module.exports = router;