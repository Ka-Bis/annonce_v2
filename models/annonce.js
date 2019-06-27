const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const AnnonceSchema = new mongoose.Schema({
  ads_category: {
    type: String,
    required: true
  },
  ads_title: {
    type: String,
    required: true
  },
  ads_description: {
    type: String,
    require: true,
  },
  ads_price: {
    type: Number,
    require: true,
  },
  ads_city: {
    type: String,
    require: true,
  },
  ads_pic:{
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
},
  edito: {
    type: Boolean,
    default: false,
},
 
});

AnnonceSchema.index({
  ad_title: 'text'
});

const Annonce = mongoose.model('Annonce', AnnonceSchema);

module.exports = Annonce;
