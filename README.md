# Task-3D Create Excel from Mongo Database Collection


### Live server https://task-3d-excel.herokuapp.com/

## Project Installation

After installing node, this project will need many NPM Packages, so just run the following command to install all.

```sh
    $ git clone Here(https://github.com/saidul-mondal-au7/Task-3D)
    $ cd Task-3B-main
    $ npm i
```
### Running The Project
```sh
    $ npm run dev
```

### NPM Packages Used -
express -

csv-express -

mongoose -

pug -

## Details

### Express application generator

Use the application generator tool, express-generator, to quickly create an application skeleton.

You can run the application generator with the npx command.

```sh
    $ npx express-generator
```

### Install csv-express module

As product details are fetched from mongodb collection and are converted to a CSV file. For generating CSV, a NodeJS module csv-express is installed.

```SH
    npm install csv-express
```
### Install mongoose module

Mongoose is a nodejs module used as an ORM. We can interact with a mongodb database easily. It provides mapping to database collections.

```sh
    npm install --save mongoose
```

### Create a products Model to generate CSV using NodeJS

Open the project in your favorite IDE such as VS code. Create a folder models. Create a file Product.js and add code below into it. This code defines a model for products collection in mongodb database. product_name, price and category fields are defined with String datatype. Finally to use product schema in other files, it is exported using module.exports.

```js
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var productSchema = new Schema({
    product_name: { type: String, Required:  'Product name cannot be left blank.' },
    price:    { type: String,     Required:  'Product price cannot be left blank.'},
    category: { type: String ,    Required:  'Product category cannot be left blank'}
    });
    module.exports = mongoose.model('Products', productSchema);

```

### Create users route and add data to Mongodb using postman

Open users.js file in routes folder and replace the code below.

```js
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

```
### To add data open post man and use post method https://task-3d-excel.herokuapp.com/users

### Create Index route

Open index.js file in routes folder and replace the code below. In ‘/’ route, first csv-express and mongoose modules are included. In ‘/’ route, product schema’s find method is used to select records. {} is criteria to select records from database (Equivalent of  where clause in SQL).

Find method returns results in products variable in callback method. In response object’s render method title and products array is assigned to index view.

```js
    const express  = require('express');
    const router   = express.Router();
    const csv      = require('csv-express');
    const mongoose = require('mongoose');
    const Product  = mongoose.model('Products');
    router.get('/', function(req, res, next) {
    Product.find({}, function(err, products) {
        if (err)
            res.send(err);
        res.render('index', { title: 'Create Excel from Mongo Database Collection', products: products });
    });
    });

```

### Create Index PUG template file

Add the code below in index.pug file in views folder. HTML table is created for id, product name, price and category fields. A loop through products array is performed and _id, product name, price and category of each product is displayed.

```pug
    extends layout
    block content
    .container
        .row
            .logo
            h3
            = title
        .row
            .span12
            .mini-layout
                h3 Products Listing
                a(href='/exporttocsv' style="margin-left: 60%;") Export to CSV
                table.table.table-bordered
                thead
                    tr
                    th ID
                    th Prodcut
                    th Price
                    th Category
                    if products.length
                    each item in products
                    tr
                    td #{item['_id']}
                    td #{item['product_name']}
                    td #{item['price']}
                    td #{item['category']}

```

### Display Product records

All products information is displayed with Export to CSV  link. Clicking on this link, products information is exported to a CSV file.

![](/demoPictures/Screenshot-1.png)


### Create Excel from Mongo Database Collection

To Create Excel from Mongo Database Collection, create a route exporttocsv in index.js file in routes directory.

### Add exporttocsv route

Open index.js file in routes directory and add code. Inside callback method a CSV file name variable is defined. find method returns mongodb collection object. lean method is used to convert mongodb documents to plain JavaScript array. In call back method products array is returned.

Response object’s status code is set to 200. Content-Type and Content Disposition properties with CSV file name are set using setHeader method. Next response object’s csv method exports records in a csv file.

```js
 router.get('/exporttocsv', function(req, res, next) {
    var filename   = "products.csv";
    var dataArray;
    Product.find().lean().exec({}, function(err, products) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(products, true);
    });
 });
module.exports = router;
```
## When user clicks on Export to Exel link, All records are fetched and user is prompted to save generated Exel file.

![](/demoPictures/Screenshot -2.png)


Thank you