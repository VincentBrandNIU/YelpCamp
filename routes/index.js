const express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
router.get("/", (req, res) => {
  res.render("landing");
});

//===========================
//AUTH Routes
//===========================
//Show register form
router.get("/register", (req, res) => {
  res.render("register");
});
//handle sign up logic
router.post("/register", (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        return res.render("register");
      }
      passport.authenticate("local")(req, res, () => {
        res.redirect("/campgrounds");
      });
    }
  );
});
//Show Login form
//TROUBLE WITH FLASH empty array returned
router.get("/login", (req, res) => {
  res.render("login", { message: req.flash("error") });
});
//============================================
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }),
  (req, res) => {}
);

//Logout Route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/campgrounds");
});

module.exports = router;
