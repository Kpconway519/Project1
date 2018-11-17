


var loggedInUserStartAddress = "";

// variable and function to display the username at the top //
var displayUsername = localStorage.getItem("humbugusername")

$(document).ready(function(){
  $("#user-login").ready(function(){
      $("#username-display").append(displayUsername);
  });
});
// ------ //




  
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
    console.log("new user name " + newUserName)

    var startAddress = $("#start-address").val().trim();
    var endAddress = $("#end-address").val().trim();
    var leaveTime = $("#leave-time").val().trim();
    var arriveTime = $("#arrive-time").val().trim();

    updateValue("username", newUserName, "/users/", startAddress, endAddress, leaveTime, arriveTime)


function updateAndLoadSchedule() {
  //††††††††††† This redirect right here is asynchronous, need to fix so that it happens after everything else.†††††††††††††††††††††††††††††††††††††††††††††
  
  window.location = 'schedule.html'
  };

setTimeout(updateAndLoadSchedule, 500);

  // calling map functions
  codeAddress();
  markerMaker();
  calculateAndDisplayRoute(directionsService, directionsDisplay);
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
var result;
//with this, I can update the values in the database.=============================
function updateValue(property, query, location, startadd, endadd, leavet, arrivet) {
  database.ref(location).once('value', function(snapshot) {
    result = snapshot.val();
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
var obj;
var event;
var latLong;
var starDates; 
var teaTime;


$( document ).ready(function events() {
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sport,music,arts&dmaId=245&latlong=&apikey=EjCnoRIJWhXvqFM6uxTUzXnplhtRgBCU&size=50" ,
    async:true,
    dataType: "json",
    success: function(json) {
      for(var i = 0; i < json._embedded.events.length; i++) {
      obj = json._embedded.events[i];
      console.log(obj.name, obj._embedded.venues[0].location, obj.dates.start.localDate, obj.dates.start.localTime);
          
                // Parse the response.
                // Do other things.
             }},
    error: function(xhr, status, err) {
                // This time, we do not end up here!
             }
             
  });
  event = obj.name; 
  latLong = obj._embedded.venues[0].location;
  starDates = obj.dates.start.localDate; 
  teaTime = obj.dates.start.localTime;
  
  $("#eventlist > tbody").append("<tr><td>" + event + "</td><td>" + latLong + "</td><td>" + starDates + "</td><td>" +  teaTime+ "</td></tr>");

  })


function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
  origin: startLatLng,
        destination: endLatLng,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
    
    function markerMaker() {
      geocoder.geocode( { 'address': start}, function(results, status) {
        if (status == 'OK') {
          marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
    
    var startLatLng;
    var endLatLng;
    
    function codeAddress() {
      geocoder.geocode( { 'address': start}, function(results) {
        startLatLng = results[0].geometry.location;
        console.log(startLatLng);
      });
      geocoder.geocode( { 'address': end}, function(results) {
      endLatLng = results[0].geometry.location;
      console.log(endLatLng);
  });
};


// map script =======================================================================>


// Global variables ========================================
// var monday =  moment().startOf("isoWeek").format();
// var tuesday = moment(monday).add(1, "day").format();
// var wednsday = moment(monday).add(2, "day").format();
// var thursday = moment(monday).add(3, "day").format();
// var friday = moment(monday).add(4, "day").format();
// var saturday = moment(monday).add(5, "day").format();
// var sunday = moment().endOf("isoWeek").format();

var geocoder;
var map;
var marker;
var directionsService;
var directionsDisplay;
var startLatLng;
var endLatLng;
// =========================================================

console.log("start " + result[startadd] + "  end " + result[endadd]);

function initialize() {
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(35.227, -80.843); //35.2271° N, -80.8431° W "Charlotte Coordinates
  var mapOptions = {
    zoom: 10,
    center: latlng,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#001b25'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#ffffff'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#ffffff'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#ffffff'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#ffffff'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#ffffff'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#00ffaa'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#001b25'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#ffffff'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#ffffff'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#ffffff'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#ffffff'}]
          }
        ]
      }
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
      
      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById('right-panel'));
  
};

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
        origin: startLatLng,
        destination: endLatLng,
        travelMode: 'DRIVING'
      }, (response) => {
          directionsDisplay.setDirections(response);
           });
    }
    
    function markerMaker() {
          marker = new google.maps.Marker({
            map: map,
            position:  {lat: 35.22846, lng: -80.83508760000001}
          })
        };
  
    
    
    function codeAddress() {
      geocoder.geocode( { 'address':  result[startadd]}, function(results) {
        startLatLng = results[0].geometry.location;

        console.log(startLatLng);

        geocoder.geocode( { 'address':  result[endadd]}, function(results) {
          endLatLng = results[0].geometry.location;
          console.log(endLatLng);

          $("#map").addClass("left");
          calculateAndDisplayRoute(directionsService, directionsDisplay);
      });

  });
};

// ===================================================================================>









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

  // start = $("#start-route").val().trim();
  start = loggedInUserStartAddress
  // end = $("#end-route").val().trim();
  end = loggedInUserEndAddress
  codeAddress();
  $("#map").addClass("left");
  calculateAndDisplayRoute(directionsService, directionsDisplay);



    })
}

