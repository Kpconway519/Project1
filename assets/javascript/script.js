  //How do I put an object inside of another object?
  
  
  
  
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCBpI-0zqjP8_LypXmGt4N9xuBz8SyYaqU",
    authDomain: "humbug-e5b83.firebaseapp.com",
    databaseURL: "https://humbug-e5b83.firebaseio.com",
    projectId: "humbug-e5b83",
    storageBucket: "humbug-e5b83.appspot.com",
    messagingSenderId: "964116892329"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//something which checks the local storage to see if they have been on the website before.


//if username exists in local storage, then log them in

//else put something in local storage containing random number for identification purposes


//=============First time user code============================
//on landing page, user makes a username or inputs username
var userInfo = {
name: "",
startAddress: "",
endAddress: "",
startTime: "",
endTime: "",
};
var userName = userInfo.name;

//========================================
//hardcoding the info in for now so I can play around with it.
//the database is a JSON object that we can access like an api
var firebaseDbObject = {
  users: {
    sampleUser: {
      //CHRIS==I'm thinking we need to take this address info initially, but convert it to a lat/long for easier storage. This string below looks much more difficult to parse
      route: "/*plug in the route link from Google*/" ,
      leaveTime: "17:00",
      arriveTime: "18:00",
      },

  },
  allUsernames: ["sampleUser"]
}
//========================================

$("#submit-button").on("click", function(event) {
  event.preventDefault();

  //grab the user's name out of the username box on the landing page
  var userName = $("#user-name").val().trim();

//=========trying to figure out how to put an object inside of another object. the .push() method returns an error. been working for a while on this one. no solution found yet.

  var newUser = {userName: {
  startAddress: "",
  endAddress: "",
  leaveTime: "",
  arriveTime: "",}}

  localStorage.setItem("username", userName)


  //check the username to see if it has been done before====================
  //pull down the database

  //make a function here to check and see if the new username matches one that has been done before. 

  //if it does match, prompt the user to make a different one


  //if it does not match, it is a new user, so we put it in the array in firebase

  //upload the new object to firebase.
  database.ref().push(firebaseDbObject)
})


//at this point the user plugs in their addresses and times

//get the values from the blanks
//†††††††† need to look back at this and make sure I am putting this into the object correctly
userInfo.startAddress = $("#start-address").val().trim();
userInfo.endAddress = $("#end-address").val().trim();
userInfo.leaveTime = $("#leave-time").val().trim();
userInfo.arriveTime = $("#arrive-time").val().trim();

//==============Section here for converting startAddress and endAddress into a latitude/longitude to plug into google maps API to get route, then save that route as a variable so it can be pushed to the database============================

//CHRIS need your help here
userInfo.startAddress
userInfo.endAddress

//on click Submit Button send route, start time, and end time to database
$("#user-info-submit").on("click", function() {

//send the user's route and time info to the database

});

//weekly outlook page===========================
//this page uses the route we saved from the on click function and compares it with the eventbrite api

//get all events within 5 miles of the destination, save addresses

//take the data above and filter for time of the drive

//all remaining items need to be shown on the map that is displayed to the user

//separate out this stuff based on the day and show a different map for each day, which will be accessed when the user clicks on that day on their weekly outlook page

//†††††††††††††††† Maybe use a different API to look for other relevant events going on in your city. Ticketmaster looks like a good one. †††††††††††††††††††††††††







//===========================================









