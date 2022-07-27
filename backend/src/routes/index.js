const { Router } = require('express');
const Product = require('../models/Product');

const router = Router();

// Get products with pagination
router.get('/products', async (req, res) => {
    // Destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
  
    try {
      // Execute query with page and limit values
      const products = await Product.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      // Get total documents in the Posts collection 
      const count = await Product.countDocuments();
  
      // Return response with posts, total pages, and current page
      res.json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }
  });

router.get('/products', (req, res) => {
    res.status(200).send('API works')
})

router.get('/product', (req, res) => {
    res.status(200).send('API works')
})

router.post('/product', (req, res) => {
  try{
    const { name, description, code, category, price, images } = req.body;
    const product = new Product({ name, description, code, category, price, images });

    // TODO: save images

    product.save((err, doc) => {
      if (!err){
          res.status(200).send('Product added succesfully!');
      }
      else{
          res.status(404).send('Error during record insertion : ' + err);
          console.log('Error during record insertion : ' + err);
      }
    });
  } catch(err) {
    res.status(500).send(err.message);
  }

})

router.put('/product', (req, res) => {
    res.status(200).send('API works')
})

router.delete('/product', (req, res) => {
    res.status(200).send('API works')
})


module.exports = router;