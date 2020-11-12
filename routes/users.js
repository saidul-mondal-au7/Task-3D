var express = require('express');
var router = express.Router();
const Product = require('../models/Product');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('add data from postman. url = http://localhost:3000/users');
});

//add product
router.post('/', async(req, res) => {
  const { product_name, price, category } = req.body;
          try {
              const product = new Product({ product_name, price, category })
              await product.save()
              res.status(201).send("succesfully added");
            
          } catch(e) {
            res.status(400).send(e)
     }
})

module.exports = router;
