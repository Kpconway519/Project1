
var loggedInUserArriveTime = "";

var loggedInUserLeaveTime = "";

var loggedInUserEndAddress = "";

var loggedInUserStartAddress = ""; 

function pullUserData() {
    var scheduleUserName = localStorage.getItem("humbugusername")
    alert(scheduleUserName)
    findByProperty("username", scheduleUserName, "/users/", function getData(x) {
console.log(x)
loggedInUserArriveTime = x.arrivetime;
loggedInUserLeaveTime = x.starttime;
loggedInUserStartAddress = x.startaddress;
loggedInUserEndAddress = x.endaddress;

alert(loggedInUserArriveTime)
alert(loggedInUserEndAddress)
alert(loggedInUserLeaveTime)
alert(loggedInUserArriveTime)
    })
}
  



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




//=============First time user code============================
//on landing page, user makes a username or inputs username

//================================================================================================



function pushIntoDb(uname) {
  database.ref('/users/').push({
  username: uname,
  });
}




  //========================================
  //this is just for the first time user putting the username into the database. user clicks this button to login for the first time and put stuf into the database. 
  var userName = "";
$("#submit-button").on("click", function(event) {
    event.preventDefault();
    //grab the user's name out of the username box on the landing page
  
    var userName = $("#user-name").val().trim();

    //put the userName into local storage
    localStorage.setItem("humbugusername", userName)

    console.log("the username is not currently in the database")
    pushIntoDb(userName)
    window.location = "create.html";
});

//======================================================================================================================================================
//if the user clicks the login again function, this thing runs


$("#user-login").on("click", function(event) {
    event.preventDefault()


    var userName = $("#user-name").val().trim();

    //put the userName into local storage
    localStorage.setItem("humbugusername", userName)



    window.location = 'schedule.html'


// findByProperty("username", userName, "/users/", function(x) {
// console.log(x)
// if (x.username === userName) {
//   // trueChecker = true;
//   console.log(`the username ${userName} exists`)
//   console.log(trueChecker)
//   // alert('this username already exists, logging you in.')
//   window.location = "schedule.html"
//   }
// })

})

















//at this point the user plugs in their addresses and times











  //OK so now that I have the username in the function, the next step is to take the stuff the user puts in and put that in alongside the user.
  //#user-info-submit is the name of the button.

$("#user-info-submit").on("click", function(event) {
    event.preventDefault()
    //AT THIS POINT I NEED TO PULL THE USERNAME FROM LOCALSTORAGE SO THE PROGRAM WILL KNOW WHAT IT IS
    var newUserName = localStorage.getItem("humbugusername")
    console.log(newUserName)

    //==============Section here for converting startAddress and endAddress into a latitude/longitude to plug into google maps API to get route, then save that route as a variable so it can be pushed to the database============================

    var startAddress = $("#start-address").val().trim();
    var endAddress = $("#end-address").val().trim();
    var leaveTime = $("#leave-time").val().trim();
    var arriveTime = $("#arrive-time").val().trim();

    updateValue("username", newUserName, "/users/", startAddress, endAddress, leaveTime, arriveTime)


function updateAndLoadSchedule() {
  window.location = 'schedule.html'
  };

setTimeout(updateAndLoadSchedule, 500);
})


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


// function makePins(endaddress) {
//   //here is an ajax call which queries for events within a certain radius of the zip code for {endaddress} and outputs all "closeEvents" into an array
// var closeEvents = [];
//   var sortForTime(leavetime, arrivetime) {
// for (i = 0; i < sortForTime.length; i++) {

//     // if closeEvents[i]./*starttime*/ is within 3 hours of arrivetime, push it into eventPins[]

//     }
//   }
// }




