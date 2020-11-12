const express = require('express');
const router = express.Router();
const csv = require('csv-express');
const mongoose = require('mongoose');
const Product  = mongoose.model('Products');

/* GET home page. */
 router.get('/', function(req, res, next) {
    Product.find({}, function(err, products) {
        if (err)
          res.send(err);

        res.render('index', { title: 'Create Excel from Mongo Database Collection', products: products });
    });
 });

 router.get('/exporttocsv', function(req, res, next) {
    const filename = "products.csv";
    let dataArray;
    Product.find().lean().exec({}, function(err, products) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(products, true);
    });
 });  



module.exports = router;
