
  
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
    console.log("new user name " + newUserName)

    //==============Section here for converting startAddress and endAddress into a latitude/longitude to plug into google maps API to get route, then save that route as a variable so it can be pushed to the database============================

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
  // calling map functions
  codeAddress();
  markerMaker();
  calculateAndDisplayRoute(directionsService, directionsDisplay);

  })



//===========================================

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
            position: latLong
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








