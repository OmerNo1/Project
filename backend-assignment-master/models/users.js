/* Tom Vivdenko 207610718
 Aviv Amrusi 208665927*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//creating the schema for the users collection 
//acually we don't need to create a schema for the users collection because we don't need to add any new users to the database
const users_schema = new Schema({
  id: {
    type: Number,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  birthday: {
    type: Number,
  },
});
//creating the model for the users collection
const users = mongoose.model("Users", users_schema, "Users");
//exporting the model
module.exports = users;