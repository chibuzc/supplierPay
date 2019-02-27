const mongoose = require('mongoose');
const { Schema } = mongoose;

const beneficiarySchema = new Schema ({
    name: String,
    transferReciept: { type : String , unique : true, required : true, dropDups: true },
    
})

module.exports = mongoose.model('beneficiaries', beneficiarySchema)