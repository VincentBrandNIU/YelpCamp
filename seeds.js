const mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

function seedDB() {
  //remove all campgrounds
  Campground.remove({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("removed campgrounds!");
      //add a few campgrounds
    }
  });

  //add a few comments
}

module.exports = seedDB;
