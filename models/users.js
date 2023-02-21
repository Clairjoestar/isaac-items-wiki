const mongoose =require('mongoose')
const Schema = mongoose.Schema;

const userSchema =new Schema({
        // id:{
        //     type:Number,
        //     max:[100,'too long'],
        //     min:[0,'too short'],
        // },
        user_name: {
            type: String,
            max: [20, 'too long'],
            min: [4, 'too short'],
        },
        password: {
            type: String,

        },
        mail: {
            type: String,
        },
        // collections: [{
        //     type: Schema.Types.ObjectId,
        //     ref: 'collection' }],
        // }
    }
)

module.exports = mongoose.model('user', userSchema);