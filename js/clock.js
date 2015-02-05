getTime()
setInterval(getTime, 999);

//Properties
var body = $("body");

$(document).ready(function() {
	getLocation(getTemp)
});

function getTime() {
	var d = new Date();
	$("#timeStamp").text(d.toLocaleTimeString());
}

function getTemp(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	
	$.ajax({	
	   url: "https://api.forecast.io/forecast/64144c099db5f1848951a234a2f4c768/" + lat + "," + lon + "?callback=?", 

	   type: "GET", 
	   dataType : "json", 
	   
	   success: function( json ) {
		   // console.log(JSON.stringify(json));
		   	$( "#forecastLabel" ).append(json.daily.summary);
	
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
	body.append( "<p id=positionFooter> </p>")
	$("#positionFooter").append("Latitude: " + position.coords.latitude + 
	"<br>Longitude: " + position.coords.longitude); 
}

// window.alert("JavaScript!");
console.log(Date().toString());