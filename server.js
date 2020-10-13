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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.get("/api/workouts", (req, res) => {
  db.Workout.find()
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.send(err);
    });
});

app.put("/api/workouts/:id", (req, res) => {
  db.Workout.update(
    { _id: req.params.id },
    {
      $push: {
        exercises: {
          type: req.body.type,
          name: req.body.name,
          duration: req.body.duration,
          weight: req.body.duration,
          reps: req.body.reps,
          sets: req.body.sets,
          distance: req.body.distance
        }
      }
    },
    (error, edited) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    //.then(({_id}) => db.Library.findOneAndUpdate({}, { $push: { books: _id } }, { new: true }))
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  let t = new Date(new Date().setDate(new Date().getDate())); // gets todays date in time code format
  t.setDate(t.getDate() - t.getDay()); // sets var to Sundays date, safetly with respect to daylight savings time
  t.setHours(0, 0, 0);
  db.Workout.find({ day: { $gte: t } }) // find workouts on dates greater than t, last sunday
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.send(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});