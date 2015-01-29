getTime()
setInterval(getTime, 999);

$(document).ready(function() {
	getTemp()
});

function getTime() {
	var d = new Date();
	$( "#timeStamp").text(d.toLocaleTimeString());
}

function getTemp() {
	$.ajax({
	   url: "https://api.forecast.io/forecast/64144c099db5f1848951a234a2f4c768/35.300399,-120.662362?callback=?", 

	   type: "GET", 
	   dataType : "json", 
	   
	   success: function( json ) {
		   // console.log(JSON.stringify(json));
		   
			$( "#forecastLabel" ).append(json.daily.summary);
	
			var src = 'img/' + json.daily.icon + ".png";
			$("#forecastIcon").attr("src", src);
			
			var tempMax = json.daily.data[0].temperatureMax;
			if (tempMax < 60) {
			 	$("body").addClass("cold")
			}
			else if (tempMax < 70) {
			 	$("body").addClass("chilly")
			}
			else if (tempMax < 80) {
			 	$("body").addClass("nice")
			}
			else if (tempMax < 90) {
			 	$("body").addClass("warm")
			}
			else {
			 	$("body").addClass("hot")
			}
		},

	   error: function( xhr, status, errorThrown ) {
		   alert( "Sorry, there was a problem!" );
	   }
	});
}

// window.alert("JavaScript!");
console.log(Date().toString());