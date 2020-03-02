var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
//var User = require("./models/user");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");

var commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  authRoutes = require("./routes/index");

//Set up environment
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0-x19h2.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("Connected");
  })
  .catch(err => {
    console.log("Error:", err.message);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use(flash());
//seedDB();

// Passport configuration
app.use(
  require("express-session")({
    secret: "Megaman is the best cat",
    resave: false,
    saveUnitialized: false,
    cookie: { maxAge: 60000 }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//middleware for passing in current user to all routes
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.message = req.flash("error");
  next();
});
//require routes
app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.listen(3000, () => {
  console.log("Yelp camp server started!!!");
});
