var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGBDB_URI);

module.exports = {mongoose};
