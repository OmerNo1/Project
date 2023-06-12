/* Tom Vivdenko 207610718
 Aviv Amrusi 208665927*/
//this file is used to create a model for the costs collection in the database
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//creating the schema for the costs collection
const costs_schema = new Schema({
  sum: {
    type: Number,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  user_id: {
    type: Number,
  },
  year: {
    type: Number,
  },
  month: {
    type: String,
  },
  day: {
    type: Number,
  },
});
//creating the model for the costs collection
const costs = mongoose.model("Costs", costs_schema, "Costs");

module.exports = costs;
