  // Initialization
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  
  // Create Schema
  const Credential = new Schema({
      firstName:String,
      lastName:String,
      password:String,
      email:String,
      phoneNumber:String
  });
  
  
  // Export ideas model
  module.exports = mongoose.model('taskCredential', Credential);