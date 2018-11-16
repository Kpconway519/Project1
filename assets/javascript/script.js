



























































//this is the area for the user data which is pulled out of the database on the schedule.html page
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
var loggedInUserArriveTime = "";
var loggedInUserLeaveTime = "";
var loggedInUserEndAddress = "";
var loggedInUserStartAddress = ""; 

//pullUserData is triggered by an 'onload' in the body tag of the schedule.html file
function pullUserData() {
  //takes the username from localstorage
    var scheduleUserName = localStorage.getItem("humbugusername")
  //this is a callback function to pull the appropriate data out of firebase
    findByProperty("username", scheduleUserName, "/users/", function getData(x) {
console.log(x)
      //save the data as variables so we can use them
loggedInUserArriveTime = x.arrivetime;
loggedInUserLeaveTime = x.starttime;
loggedInUserStartAddress = x.startaddress;
loggedInUserEndAddress = x.endaddress;

//what's it gonna do with the user data once it pulls it?

//geocode step here






    })
}
  
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-



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


//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//simple function to put the username into the database
function pushIntoDb(uname) {
  database.ref('/users/').push({
  username: uname,
  });
}
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  //this is just for the first time user putting the username into the database. user clicks this button to login for the first time and put stuff into the database. 
  var userName = "";
$("#submit-button").on("click", function(event) {
    event.preventDefault();
    //grab the user's name out of the username box on the landing page
  
    var userName = $("#user-name").val().trim();

    //put the userName into local storage
    localStorage.setItem("humbugusername", userName)

    pushIntoDb(userName)
    //redirect to the next page
    window.location = "create.html";
});

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


$("#user-login").on("click", function(event) {
    event.preventDefault()

    var userName = $("#user-name").val().trim();

    //put the userName into local storage
    localStorage.setItem("humbugusername", userName)
    //takes user directly to the schedule page if they are logging in.
    window.location = 'schedule.html'

})

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  //OK so now that I have the username in the function, the next step is to take the stuff the user puts in and put that in alongside the user.
  //#user-info-submit is the name of the button.

$("#user-info-submit").on("click", function(event) {
    event.preventDefault()

    var newUserName = localStorage.getItem("humbugusername")
    console.log(newUserName)

    var startAddress = $("#start-address").val().trim();
    var endAddress = $("#end-address").val().trim();
    var leaveTime = $("#leave-time").val().trim();
    var arriveTime = $("#arrive-time").val().trim();

    updateValue("username", newUserName, "/users/", startAddress, endAddress, leaveTime, arriveTime)

    function updateAndLoadSchedule() {
      window.location = 'schedule.html'
      };
    //using settimeout to avoid asynchronous messups
    setTimeout(updateAndLoadSchedule, 500);
})

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//here is where my firebase retrieval functions live.

function findByProperty(property, query, location, cb) {
  if (!location) {
      console.log("location not provided, using default '/users/'")
      location = "/users/";
  }
  database.ref(location).once('value', function(snapshot) {

    var result = snapshot.val();
    // this is a for...in loop look me up
    for (key in result) {
      var currentUser = result[key]; // this is bracket notation to look up
      if (currentUser[property] === query) {
          cb(currentUser);
      }
    }
  }) 
}

//with this, I can update the values in the database.=============================
function updateValue(property, query, location, startadd, endadd, leavet, arrivet) {
  database.ref(location).once('value', function(snapshot) {
    var result = snapshot.val();
    for (key in result) {
      var currentUser = result[key];
      if (currentUser[property] === query) {
        console.log('here')
        database.ref(location + "/" + key + "/").update({
          //place receptacle for callback function here.
          startaddress:  startadd,
          endaddress: endadd, 
          starttime: leavet,
          arrivetime: arrivet
        });

      }
    }
  })
}
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


$( document ).ready(function events() {
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sport,music,arts&dmaId=245&latlong=&apikey=EjCnoRIJWhXvqFM6uxTUzXnplhtRgBCU&size=50" ,
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


// function makePins(endaddress) {
//   //here is an ajax call which queries for events within a certain radius of the zip code for {endaddress} and outputs all "closeEvents" into an array
// var closeEvents = [];
//   var sortForTime(leavetime, arrivetime) {
// for (i = 0; i < sortForTime.length; i++) {

//     // if closeEvents[i]./*starttime*/ is within 3 hours of arrivetime, push it into eventPins[]

//     }
//   }
// }




