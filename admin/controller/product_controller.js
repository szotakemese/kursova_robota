var Product = require('../../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping', { useNewUrlParser: true, useUnifiedTopology: true})

const PoductController = {
    
    //get all
    get: (req, res) => {
        console.log("return all products");
        Product.find({}, function (err, docs) {
            if (err)
                res.status(500).send(err);
            else
                res.send(docs);
        });
    },

    // one
    getId: (req, res) => {
        let id = req.params.id;

        if (id) {
           Product.findById(id, function (err, docs) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.send(docs);
                }
           });
        } else {
            res.sendStatus(400);
        }
    },

    //add new product
    post: (req, res) => {
        console.log(req.body);
        let newProduct = req.body;

        const product = new Product(newProduct);
            product.save(function (err) {
                if (err) {
                    console.log(err)
                    res.send(err.message);
                } else {
                    console.log("saved", product);
                    res.send(newProduct);
                }
                
            });
        
    },

    //delete by id
    deleteId: (req, res) => {
        let id = req.params.id;

        if (id) {
            Product.findByIdAndDelete(id, function (err, doc) {
                if (err) {
                    console.log(err);
                    res.send(err.message);
                } else {
                    res.send(doc);
                }
            });
        } else {
            res.sendStatus(400);
        }
    }
}


/*

const products = [
    new Product({
        image: 'https://jabko.ua/image/cache/catalog/Jabko%20(iPhone)/iphone_11_pro/iphone11pro(gl)-350x350.jpg',
        title: 'Apple Iphone 11 Pro 64GB (Gold)',
        description: {
            proc:'Processor: Apple A13 Bionic,', 
            rcam:'Rear Camera:12MP+12MP+12MP,', 
            fcam:'Front Camera: 12MP,', 
            bat:'Battery: 3046 mAh,', 
            disp:'Display: 5.8 inches,', 
            ram:'Ram: 4 GB'
        },
        price: 1175
    })
];

//How to add a product:
 //   webshop/seed : node product-seeder.js


var done = 0;
for(var i = 0; i < products.length; i++){
    products[i].save(function(err, res) {
        done++;
        if (done === products.length){
            exit();
        }
    });
};

function exit(){
    mongoose.disconnect();
};
*/
module.exports = {
    PoductController
}


