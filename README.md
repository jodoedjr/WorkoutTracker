# WorkoutTracker [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
MongoDB/Mongoose Workout Activity Tracker

## Description 

WorkoutTracker uses Mongoose/MongoDB Atlas to track stats about the users workout regimen. Users can add resistance(weights) or cardio exercises to an existing workout, create a new workout, or view stats for the week (starting on the most recent Sunday).


## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)


## Installation

Clone this repo.
Run `npm install` in the cloned base directory, and run locally (`npm start` executes `node server.js`)


## Usage 

The landing page displays information about the most recent exercise, including date, total duration, # exercises performed, total weight lifted, total # sets preformed, total reps preformed, and total distance covered if applicable.
The login page:
![Landing page showing previous workout](https://github.com/jodoedjr/WorkoutTracker/blob/main/assets/landingpage.png "Landing Page")

Add exercise allows the user to enter stats for their resistance or cardio exercise. 'Add exercise' adds information while remaining on the page, while 'complete' navigates back to the landing page.
![Add exercise page, Overhead Press 115 pounds](https://github.com/jodoedjr/WorkoutTracker/blob/main/assets/addexercise.png "Add Exercise page, Overhead Press, 115 pounds, etc.")

The stats dashboard provides visualizations for total daily workout duration in minutes, daily combined weight of all exercises, minute duration of each exercise in a pie chart, and weight per exercise in a doughnut chart.
![Stats Dashboard with visualizations](https://github.com/jodoedjr/WorkoutTracker/blob/main/assets/stats_dashboard.png "Stats Visualizations")

## License

This repo is covered by the MIT license


## Contributing

Please add issues to the issues section of the repo


## Tests

no tests provided


## Questions

Find me on GitHub at: https://github.com/jodoedjr
