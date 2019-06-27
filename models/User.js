const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true

  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isAdmin : {
    type: Number
}
 
 
});

UserSchema.index({
  name: 'text'
});
//bcrypt js
UserSchema.pre('save', function (next){
  const user = this
   bcrypt.hash(user.password, 10,(err, encrypted)=>{
     user.password = encrypted
     next()
   })
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
