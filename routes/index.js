var express = require('express');
var router = express.Router();
const { send } = require('../helpers/mailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// crear ruta para detonar el envio de mails

router.post("/spamer", (req, res) => {
 let options = { ...req.body };
 options.filename = "action";
 send(options).then(() => {
   res.status(200).json({ msg: "Spam sent "});
 }).catch(err => res.status(400).json(err));
});

module.exports = router;
