
  
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
// ∂∂∂∂∂∂∂∂∂∂∂ must redo this thing in a bit ©©©©©©©©©©©©©©©©©


//========================================
//hardcoding the info in for now so I can play around with it.
//the database is a JSON object that we can access like an api
var firebaseDbObject = {
  users: [
    {
        username: "test",
        route: "/*plug in the route link from Google*/" ,
        leaveTime: "17:00",
        arriveTime: "18:00",
    },
    {
        username: "test2",
        route: "route sample",
        leaveTime: "2:00",
        arriveTime: "3:00"
    }
    ],
  allUsernames: ["sampleUser"]
}
//========================================
//this is just for the first time user putting the username into the database.


$("#submit-button").on("click", function(event) {
  event.preventDefault();
  //grab the user's name out of the username box on the landing page

  var userName = $("#user-name").val().trim();

  var newUser = {
    username: "test2",
    route: "route sample",
    leaveTime: "2:00",
    arriveTime: "3:00"
  }

  if (firebaseDbObject.allUsernames.includes(userName) === true) {
//make sure to delete this alert later and replace it with something else
    alert("exists already, please input a new username")
  }else{

    newUser.username = userName;

    firebaseDbObject.allUsernames.push(userName)
  


    //upload the new object to firebase.
    database.ref().push(firebaseDbObject)

  };


})



















//at this point the user plugs in their addresses and times

//get the values from the blanks
//†††††††† need to look back at this and make sure I am putting this into the object correctly


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


$( document ).ready(function events() {
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sport,music&dmaId=245&latlong=&apikey=EjCnoRIJWhXvqFM6uxTUzXnplhtRgBCU",
    async:true,
    dataType: "json",
    success: function(json) {
      for(var i = 0; i < json._embedded.events.length; i++) {
      var obj = json._embedded.events[i];
      console.log(obj.name,obj._embedded.venues[0].location, obj.dates.start.localDate, obj.dates.start.localTime);
          
                // Parse the response.
                // Do other things.
             }},
    error: function(xhr, status, err) {
                // This time, we do not end up here!
             }
             
  });
  var event = obj.name 
  var latLong = obj._embedded.venues[0].location
  var starDates = obj.dates.start.localDate 
  var teaTime = obj.dates.start.localTime
  
  $("#eventlist > tbody").append("<tr><td>" + event + "</td><td>" + latLong + "</td><td>" + starDates + "</td><td>" +  teaTime+ "</td></tr>");
  
  })



//===========================================









