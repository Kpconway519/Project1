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

//something which checks the cookies to see if they have been on the website before.



//=============First time user code============================
//on landing page, user makes a username or inputs username
var userName = $(/*user name input*/).val().trim();
$(/*submit button*/).on("click", function() {

  //check the username to see if it has been done before

  //if it has not, put it in the array in firebase
})


//mash the two together like this [name][number] to give the user a unique identifier. Tell them to save this info for later. It will be used to get their info.

//at this point the user plugs in their addresses and times
//capture this info as variables

//on click Submit Button #start-address #end-address #leave-time #arrive-time to database with key
$(/*"submit button"*/).on("click", function() {


//push the unique user identifier to the database with the user-inputted data.


//Lets try to store the route as a whole. To do this:
//1. need to feed start and end address into Google
//2. Google pops out a route as a JSON object--lets figure out how to save this stuff for later
//3. We save this route to use forever in the future and push it to the database

});
//end of on click function====================================

//weekly outlook page===========================
//this page uses the route we saved from the on click function and compares it with the eventbrite api

//get all events within 5 miles of the destination, save addresses

//take the data above and filter for time of the drive

//all remaining items need to be shown on the map that is displayed to the user

//separate out this stuff based on the day and show a different map for each day, which will be accessed when the user clicks on that day on their weekly outlook page

//†††††††††††††††† Maybe use a different API to look for other relevant events going on in your city †††††††††††††††††††††††††







//===========================================


//returning users

//it can read a cookie stored on their browser, if no cookie detected, give them an opportunity to plug in their username






