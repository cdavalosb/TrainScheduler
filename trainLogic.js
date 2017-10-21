/* global firebase moment */


// 1. Initialize Firebase

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCMdADXLXAriPTiRiC_wnNakcS9KcEHZrM",
    authDomain: "train-scheduler-1fdd8.firebaseapp.com",
    databaseURL: "https://train-scheduler-1fdd8.firebaseio.com",
    projectId: "train-scheduler-1fdd8",
    storageBucket: "",
    messagingSenderId: "439400969874"
  };

  firebase.initializeApp(config);
  var database = firebase.database();



// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainFirst = moment($("#firstTrainTime-input").val().trim(), "DD/MM/YY").format("X");
  var trainFrecuency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    first: trainFirst,
    frecuency: trainFrecuency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frecuency);

  // Alert
  //alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTrainTime-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().first;
  var trainFrecuency = childSnapshot.val().frecuency;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFrecuency);

  // Prettify the employee start
  //var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  //var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  //console.log(empMonths);

  // Calculate the total billed rate
  //var empBilled = empMonths * empRate;
  //console.log(empBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainFrecuency + "</td><td>" + trainFirst + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
