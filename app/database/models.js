var mongoose = require('mongoose'),
    schemas = require('./schemas');

var models = {};

models.Projeto = mongoose.model('Projeto', schemas.Projeto);

module.exports = models;