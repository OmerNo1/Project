/* Tom Vivdenko 207610718
 Aviv Amrusi 208665927*/
var express = require("express");
var router = express.Router();

/* GET home page. */
//sending our information to the client
router.get("/", function (req, res, next) {
  res.json([
    {
      firstname: "Aviv",
      lastname: "Amrusi",
      id: 208665927,
      email: "Amrusiaviv@gmail.com",
    },
    {
      firstname: "Tom",
      lastname: "Vivdenko",
      id: 207610718,
      email: "vivd.vtom07@gmail.com",
    },
  ]);
});
// sends a bad request if the method is not post 
router.post('/', (req, res) => {
  res.status(400).send('bad request');
});
module.exports = router;
