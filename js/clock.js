
//Properties
var body = $("body");

$(document).ready(function() {
	getTime()
	setInterval(getTime, 999);

	compSciCoords = {latitude: 35.30062899763752, longitude: -120.66242171415054}
	position = {coords: compSciCoords}
	getWeather(position)
	showPosition(position)
});

function getTime() {
	var d = new Date();
	$("#timeStamp").text(d.toLocaleTimeString());
}

function findLocalWeather() {
	getLocation(getWeather)
	getLocation(showPosition)
}

function getWeather(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	
	$.ajax({	
	   url: "https://api.forecast.io/forecast/64144c099db5f1848951a234a2f4c768/" + lat + "," + lon + "?callback=?", 

	   type: "GET", 
	   dataType : "json", 
	   
	   success: function( json ) {
		   // console.log(JSON.stringify(json));

			$("#forecastLabel").text(json.daily.summary);
		   
		   var src = 'img/' + json.daily.icon + ".png";
		   $("#forecastIcon").attr("src", src);

			var tempMax = json.daily.data[0].temperatureMax;
			if (tempMax < 60) {
			 	body.addClass("cold")
			}
			else if (tempMax < 70) {
			 	body.addClass("chilly")
			}
			else if (tempMax < 80) {
			 	body.addClass("nice")
			}
			else if (tempMax < 90) {
			 	body.addClass("warm")
			}
			else {
			 	body.addClass("hot")
			}
		},

	   error: function( xhr, status, errorThrown ) {
		   alert( "There was a problem loading the forecast 😢" );
	   }
	});
}

// http://www.w3schools.com/html/html5_geolocation.asp
function getLocation(displayfunc) {
	if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(displayfunc);
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}

function showPosition(position) {
	// body.append( "<p id=positionFooter class=mdFont > </p>") 
	//Better practice to keep the structure of the DOM constant and change out each elements contents. 
	$("#positionFooter").html("Latitude: " + position.coords.latitude + '<br>' +
	"Longitude: " + position.coords.longitude); 
}

console.log(Date().toString());