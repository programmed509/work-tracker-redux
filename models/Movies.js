const mongoose = require('mongoose');

const MoviesSchema = mongoose.Schema(
{})

module.exports = mongoose.model('movies', MoviesSchema)