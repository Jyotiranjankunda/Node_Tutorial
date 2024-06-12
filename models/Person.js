const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ['chef', 'waiter', 'manager'],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre('save', async function(next) {
  const person = this;  // this refers the current document that is being executed.

  // Hash the password only if it is modified or it is new.
  if(!person.isModified('password')){
    return next();
  }

  try {
    // generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password
    const hashedPassword = await bcrypt.hash(person.password, salt);
    person.password = hashedPassword;

    next();  // next() btata hai ki sara kaam hamne successfully kr liya hai, jese ki password hash krna...  ab tum jake db me save kr do.
  } catch (error) {
    return next(error);
  }
});

personSchema.methods.comparePassword = async function(candidatePassword){
  try {
    // Use the brcypt to compare the provided password with the hashed password.
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

/*
suppose stored password is jk123
bcrypt will convert it into hash.

jk123  ->  dfadhd23oih423h23

During login, entered password is -> jk123

dfadhd23oih423h23 -> brcypt will extract salt from this
Now, 
salt + entered password(jk123) -> creates new hash
compares both hash. If they equal, then password matches, otherwise not.
*/

// Create Person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
