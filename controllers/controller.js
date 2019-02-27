const Product = require('../models/model');

//post
exports.post = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
         // res.send('Produto cadastrado com  sucesso!')
         res.redirect('/products/')
    })

};

//get
exports.get = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

//getAll
exports.getAll = function (req, res) {
    Product.find({}, function (err, product) {
        if (err) return next(err);
        // res.send(product);
        res.render('show.ejs', { data: product })
    })
};

//put
exports.putGet = function (req, res) {
  // res.send('Product updated.');
  Product.findById(req.params.id, function (err, product) {
      if (err) return next(err);
      // res.send(product);
        res.render('edit.ejs', { product })
  })
};
exports.putPost = function (req, res) {
    var id = req.params.id;
    var name = req.params.name;
    var price = req.params.price;

    Product.findByIdAndUpdate(id , {$set: req.body},
      (err, product)=> {
        if (err) return res.send(err);
        res.redirect('/products/')
        console.log('atualizado com sucess');
    });
};

//delete
exports.delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id,
        (err, product) =>{
        if(err) return res.send(500,err);
        console.log('deletado com sucess');
        res.redirect('/products/')
    })
};
