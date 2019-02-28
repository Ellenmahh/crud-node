const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/route'); // Imports routes for the products
const app = express();
const url = require('url');

app.set('view engine','ejs')

app.get('/',(req,res)=>{
  res.render('index.ejs')
})

// Set up mongoose connection
const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/products', product);
// app.use('/api/products', product);

app.get('**.json', function(req, res) {
  let query = req.query;
  query.format = 'json';
  res.redirect(url.format({
    pathname:req.url.replace(".json", ""),
    query:query
  }));
  //res.send({error: "Url não encontrada"})
});

let port = 1234;
app.listen(port, () => {
    console.log('O servidor esta rodando na porta ' + port);
});
