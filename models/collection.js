const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
        // id: {
        //     user: {
        //         type: Schema.Types.ObjectId,
        //         ref: 'id'
        //     },
        //     type: Number,
        // },
        // title: {type: String},
        // item_id: {type: String},
    item_id:{type:Schema.Types.ObjectId,ref:"items"},
    user_id:{type:Schema.Types.ObjectId,ref:"users"}
    }
)

module.exports = mongoose.model('collection', collectionSchema);