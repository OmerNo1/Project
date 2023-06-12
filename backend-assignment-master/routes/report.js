/* Tom Vivdenko 207610718
 Aviv Amrusi 208665927*/
const express = require("express");
const router = express.Router();
const Cost = require("../models/costs");
// things we need to do in order to get the report
let sports = [];
let education = [];
let transportation = [];
let other = [];
let health = [];
let housing = [];
let food = [];
let report = { sports, education, transportation, other, health, housing, food};
// list of months
const list_of_months=["january","february","march","april","may","june","july","august","september","october","november","december"];
// To manage the computed design pattern we decided to add the founded reports into a all_reports local array
// to avoid the user from reaching the mongoDB when he actually don't need to.
// and to avoid repeating reading of data in the DB when the user asks for the same report.
let all_reports = [];
//found_in_all_reports is a flag that indicates if the report the user asked for is already in the all_reports array
let found_in_all_reports = false;
//responseSent is a flag that indicates if the response was already sent to the user
let responseSent = false;
//the function that is responsible for sending the response to the user
router.get("/", function (req, res, next) {
  //resetting the flags
  responseSent = false;
//   //initializing the variables
  const user_id_request = req.query.user_id;
  const year_request = req.query.year;
  let month_request = req.query.month;

  //making the month request to be in lower case
  if(typeof(month_request) == "string")
  {
    month_request = month_request.toLocaleLowerCase();
  }
  
  //normalizing the month request to be in the range of 1-12
  if(list_of_months.includes(month_request)){
    for(let i=0;i<list_of_months.length;i++){
//       //checking if the month the user entered is in the list_of_months array
      if(month_request === list_of_months[i]){

        month_request = i+1;
      }
    }
  }
  ///checking if the user entered valid data
  if( isNaN(year_request ) ||isNaN(month_request) ||year_request  >2100 || year_request  < 1900 || month_request > 12 || month_request < 1 ){
    res.status(400).send("Bad request");
    return;
  }
  // checking if the report the user asked for is already in the all_reports array
  all_reports?.map((singleReport) => {
    singleReport.user_id === user_id_request &&
    singleReport.year === year_request &&
    singleReport.month === month_request
      ? // if we found the report by the parameters the user entered we change the boolean variable (flag)
        (found_in_all_reports = true)
      : (found_in_all_reports = false);
    if (found_in_all_reports) {
      let new_report = Object.assign({}, singleReport);
      // deleting the information in the report that we don't need to send to the client
      
      delete new_report.user_id;
      delete new_report.year;
      delete new_report.month;  
      // sending the report to the client   
      res.send(new_report);
      // changing the flag to true to indicate that the response was already sent to the client
      responseSent = true;
    }
  });

  // otherwise (the data requested isn't found on the all_reports array do this)
  if (!found_in_all_reports && !responseSent) {
    Cost.find({
    
      user_id: user_id_request,
      year: year_request,
      month: month_request,

    }).then(function (cost) {
      for (i in cost) {
        const selected_category = cost[i].category;
        // creating the data_description_sum_params object
        // that will be pushed into the report array
        let data_description_sum_params = {
          day: cost[i].day,
          description: cost[i].description,
          sum: cost[i].sum,
        };
        // pushing into the report array based on the cost's category
        if (!report[selected_category]) report[selected_category] = [];
        // pushing the data into the report array
        report[selected_category].push(data_description_sum_params);
      }
      // sending the report to the client
      res.send(report);
      
// adding the report to the all_reports array
      id_year_month_params = {
        user_id: user_id_request,
        year: year_request,
        month: month_request,
      };
      // merging the report with the id_year_month_params
      report = { ...report, ...id_year_month_params };
// adding the report to the all_reports array
      all_reports.push(report);
      // clearing the report array
      report = {
        food: [],
        sports: [],
        education: [],
        transportation: [],
        other: [],
        health: [],
        housing: [],
      };
// developers check
    }).catch(function(error) {
      res.status(500).send(error);
    });
    
  }
});
router.post('/', (req, res) => {
  res.status(400).send("bad request");
});
module.exports = router;
