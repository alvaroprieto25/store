const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useunifiedTopology: true
})
  .then(db => console.log('DB connected'))
  .catch(err => console.log(err))
