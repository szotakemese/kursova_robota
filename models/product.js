var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productschema = new Schema({
    image: {type: String},
    title: {type: String, required: true},
    description: {
        proc: {type: String, required: true}, 
        rcam: {type: String, required: true}, 
        fcam: {type: String, required: true}, 
        bat:  {type: String, required: true}, 
        disp: {type: String, required: true}, 
        ram: {type: String, required: true}
    },
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Product', productschema);