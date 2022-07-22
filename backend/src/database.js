const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/webstore', {
    useNewUrlParser: true,
    useunifiedTopology: true
})
.then(db => console.log('DB connected'))
.catch(err => console.log(err))