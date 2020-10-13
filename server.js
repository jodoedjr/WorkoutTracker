const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require('path');

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/", (req , res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.get("/exercise", (req , res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});
app.get("/stats", (req , res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.get("/api/workouts", (req, res) => {
  db.Workout.find()
  .then(dbWorkout => {
    console.log(dbWorkout);//[0].totalDuration);
    res.json(dbWorkout);
  })
  .catch(err => {
    res.send(err);
  });
});

app.get("/api/workouts/range", (req, res) => {
  
  let t = new Date(new Date().setDate(new Date().getDate())); // gets todays date in time code format
  t.setDate(t.getDate() - t.getDay()); // sets var to Sundays date, safetly with respect to daylight savings time
  t.setHours(0, 0, 0)
  console.log(t)
  db.Workout.find({ day: { $gte: t} }) // find workouts on dates greater than t, last sunday
  .then(dbWorkout => {
    //console.log(dbWorkout[dbWorkout.length -1].day > t);
    res.json(dbWorkout);
  })
  .catch(err => {
    res.send(err);
  });
});
// app.post("/submit", ({body}, res) => {
//   const user = new User(body);
//   user.setFullName();
//   user.lastUpdatedDate();

//   User.create(user)
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});