var mongoose = require('mongoose');

console.log('Starting Database');

mongoose.connect('mongodb://heroku_40hrsmmr:iol523cl0eg327pkf1p9qt22bn@ds061676.mlab.com:61676/heroku_40hrsmmr', function (error) {
    if (error) console.error(error);
    else {
        console.log('mongo connected');
    }
});

module.exports = mongoose;