/* Tom Vivdenko 207610718
 Aviv Amrusi 208665927*/
const express = require("express");
const router = express.Router();
const Cost = require("../models/costs");
const User = require("../models/users");
const list_of_months=["january","february","march","april","may","june","july","august","september","october","november","december"]; 
// post request for adding a new cost to the DB
router.post("/", function (req, res, next) {
 

  //initializing the variables
  let date = null;
  let category = null;
  let day = null;
  let month = null;
  let year = null;
//   //checking if the user entered all the parameters if the user didn't enter all the parameters we will use the current date
  if (!req.body.day  || !req.body.month || !req.body.year) {
    date = new Date();
    category = req.body.category;
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    // else we will use the date that the user entered
  } else {
    category = req.body.category;
    day = req.body.day;
    month = req.body.month;
    year = req.body.year;
  }
//   //making the month request to be in lower case
  if (typeof(month) === "string") {
    month = month.toLocaleLowerCase();
  }

  // normalizing the month request to be in the range of 1-12
  if (list_of_months.includes(month)) {
    for (let i=0; i<list_of_months.length; i++) {
      if (month === list_of_months[i]) {
        month = i+1;
      }
    }
  }
//   //checking if the user entered valid data
  const valid_category = ["housing", "sports", "other", "transportation", "education", "health", "food"];
  //checking if the user entered valid data
  if (!valid_category.includes(category) || day > 31 || day < 1 || month > 12 || month < 1 || year > 2100 || year < 1900 || isNaN(req.body.user_id) || isNaN(day) || isNaN(month) || isNaN(year)) {
    return res.status(400).json({
      //if the user didn't enter valid data we will send an error message
      error: "Invalid data! Please check what you've entered.",
    });
  }

  //checking if the user exists in the DB
  User.findOne({ id: req.body.user_id })
  //if the user exists we will add the cost to the DB
    .then(function (user) {
      if (!user) {
        return res.status(400).json({//if the user doesn't exist we will send an error message
          error: "User with given user_id does not exist.",
        });
      }
//       //creating the cost object
      let cost_to_push = req.body;
      cost_to_push.month = month;
      cost_to_push.day = day;
      cost_to_push.year = year;
//       //adding the cost to the DB
      Cost.create(cost_to_push)
      //if the cost was added successfully we will send the cost to the user
        .then(function (cost) {
          //sending the cost to the user
          res.send(cost);
        })
        .catch(next);
    })
    .catch(next);
});
//method get will return bad request
router.get('/', (req, res) => {
  res.status(400).send("bad request");
});
module.exports = router;
