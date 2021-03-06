const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };

const ExerciseSchema = new Schema({
  type: String,
  name: String,
  duration: Number,
  weight: Number,
  reps: Number,
  sets: Number,
  distance: Number
})

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: new Date(new Date().setDate(new Date().getDate()))
  },
  exercises: [ExerciseSchema]
});

WorkoutSchema.virtual("totalDuration").get(function () {
  let totalDuration = 0;
  // forEach on exercises did not work here - maybe something is going on between mongoose and arrays of length 1
  for(let i = 0; i < this.exercises.length; i++){
    totalDuration += this.exercises[i].duration;
  }
  return totalDuration;
});

WorkoutSchema.set('toJSON', { getters: true, virtuals: true });// virtual properties are not returned by default when calling the toJSON() property of schema
//res.json calls the toJSON property of this schema, which does not by default return virtual properties like 'totalDuration'

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
