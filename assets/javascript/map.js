// GOOGLE MAPS API
var mapKey="AIzaSyAmAJABDIKP1_S6uXioW7w81FkcpRiNGw8";
var start;
var end;


$("form").on("click", "button", function(event) {
  event.preventDefault();
  start = $("#start-route").val().trim();
  end = $("#end-route").val().trim();
  codeAddress();
  $("#map").addClass("left");
  calculateAndDisplayRoute(directionsService, directionsDisplay);

});

var geocoder;
var map;
var marker;
var directionsService;
var directionsDisplay;

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
  
}
    
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