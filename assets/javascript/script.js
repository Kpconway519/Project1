
  
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


$( document ).ready(function events() {
  $( document ).ready(function races() {
  
    var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://runsignup.com/Rest/races/?format=json&events=T&race_headings=T&race_links=F&include_waiver=F&include_event_days=F&page=1&results_per_page=50&sort=name+ASC&start_date=today&search_start_date_only=F&only_races_with_results=F&city=Charlotte&distance_units=K&api_key=bFXbdzmpncmjBUe52srx0FnMhbViL73w&api_secret=AyGNLq8xGHAlDEpwBzsGEdwjzRMRiz1s",
    "method": "GET",
    "headers": {
      "cache-control": "no-cache",
      "Postman-Token": "a179fe14-1867-42a6-a83d-70b6a3ef27d3"
    }
  }
  
  $.ajax(settings).done(function (response) {
    for(var i = 0; i < response.races.length; i++)
  
    console.log(response.races[i].race.name, response.races[i].race.next_date, response.races[i].race.address)
    
    
    //var raceName = response.races[i].race.name
    //var raceDate = response.races[i].race.next_date
   // var raceLoc = response.races[i].race.address
    
  });
  $.ajax({
      type:"GET",
      url:"https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sport,music,arts&dmaId=245&latlong=&apikey=EjCnoRIJWhXvqFM6uxTUzXnplhtRgBCU&size=50",
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
         
    
          
    })
//===========================================







