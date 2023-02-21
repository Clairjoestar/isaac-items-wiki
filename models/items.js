const mongoose =require('mongoose')
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: {type:String},
    english_title: {type:String},
    item_id: {type:String},
    pickup_message: {type:String},
    description: [String],
    item_type: {type:String},
    extra: [String],

});

module.exports = mongoose.model('items', itemSchema);