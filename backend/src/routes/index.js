const { Router } = require('express')
const Product = require('../models/Product')
const path = require('path')
const multer = require('multer')
const router = Router()

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage, dest: path.join(__dirname, '../uploads') })

// Get products with pagination
router.get('/products', async (req, res) => {
  // Destructure page and limit and set default values
  const { page = 1, limit = 10 } = req.query

  try {
    // Execute query with page and limit values
    const products = await Product.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    // Get total documents in the Posts collection
    const count = await Product.countDocuments()

    // Return response with posts, total pages, and current page
    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    })
  } catch (err) {
    console.error(err.message)
  }
})

router.get('/product/:id', (req, res) => {
  try {
    Product.findById(req.params.id).then(function (res) {
      res.status(200).send(res)
    }).catch(function (err) {
      res.status(404).send('Error during record insertion : ' + err)
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.post('/product', upload.single('image'), (req, res) => {
  try {
    const { name, description, code, category, price } = req.body
    let image
    // Multer
    if (req.file) {
      const file = req.file
      image = 'uploads/' + file.filename
    } else {
      image = ''
    }

    // Create product
    const product = new Product({ name, description, code, category, price, image })

    // Insert to DB
    product.save((err, doc) => {
      if (!err) {
        res.status(200).send('Product added succesfully!')
      } else {
        res.status(404).send('Error during record insertion : ' + err)
        console.log('Error during record insertion : ' + err)
      }
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.put('/product/:id', upload.single('image'), (req, res) => {
  try {
    let product = Product.findById(req.params.id)
    const { name, description, code, category, price } = req.body

    // Multer
    let image
    if (req.file) {
      const file = req.file
      image = 'uploads/' + file.filename
    } else {
      image = ''
    }

    // Create new product
    const newProduct = new Product({ name, description, code, category, price, image })

    // Update product
    product = newProduct

    // Save to DB
    product.save((err, doc) => {
      if (!err) {
        res.status(200).send('Product added succesfully!')
      } else {
        res.status(404).send('Error during record insertion : ' + err)
        console.log('Error during record insertion : ' + err)
      }
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.delete('/product/:id', (req, res) => {
  try {
    const product = Product.findById(req.params.id)

    Product.deleteOne(product).then(function () {
      res.status(200).send('Deleted product!')
    }).catch(function (err) {
      res.status(404).send('Error during record insertion : ' + err)
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router
