var mongoose = require('mongoose');

console.log('Starting Database');

mongoose.connect(process.env.MONGODB_URI, function (error) {
    if (error) console.error(error);
    else {
        console.log('mongo connected');
    }
});

module.exports = mongoose;