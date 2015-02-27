var _userId = 0

$(document).ready(function() {
	// Setup Options
	for (i = 1; i <= 12; i++) { 
		$("#hours").append("<option> "+i+" </option>");
	}
	
	for (i = 0; i < 60; i += 15) { 
		var leadingZeros = ("00" + i).substr(-2,2);
		$("#mins").append("<option> "+leadingZeros+" </option>");
	}
	
	$("#addAlarmBtn").css("display", "none");
});

// MARK: Google+ Authentication
function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
	$("#addAlarmBtn").css("display", "block");
	$('#signinButton').css("display", "none");
	
	getUser();
  } else {
	$("#addAlarmBtn").css("display", "none");
	$('#signinButton').css("display", "block");
	$("#alarmTitle").html("Alarms")
	
	console.log('Sign-in state: ' + authResult['error']);
  }
}

function getUser() {
	gapi.client.load('plus','v1', function() {
		var request = gapi.client.plus.people.get({
		   'userId': 'me'
		});
		
		request.execute(function(resp) {
		   userName = resp.displayName;
		   _userId_ = resp.result.id;
			
		console.log('UserId: ' + _userId_);
			
	    $("#alarmTitle").html(userName + "'s Alarms")
	    getAllAlarms(_userId_);
	   });
    });
    $('#signinButton').css('display', 'none');
}

function showAlarmPopup() {
	$("#mask").removeClass("hide");
	$("#popup").removeClass("hide");
}

function hideAlarmPopup() {
	$("#mask").addClass("hide");
	$("#popup").addClass("hide");
	$("#alarmName").val(''); 
}

function addAlarm() {
	// Google Analytics
	ga('send', 'event', 'Alarm', 'Add');

	var hours, mins, ampm, alarmName;
	
	alarmName = $("#alarmName").val(); 
	hours = $("#hours option:selected").text(); 
	mins = $("#mins option:selected").text(); 
	ampm = $("#ampm option:selected").text();
	
	if (!alarmName) {
		window.alert("Please enter alarm name");
		return ;
	}
	
	var time = hours + ":" + mins + ampm;
	var AlarmClass = Parse.Object.extend("Alarm");
	var alarm = new AlarmClass();
	alarm.save({"time": time,"alarmName": alarmName, "googleId" : _userId_}, {
	  success: function(object) {
		insertAlarm(time, alarmName, object.id);
		hideAlarmPopup();
	  }
	});
}

function insertAlarm(time, alarmName, objectId) {
	
	var alarm = $("<div>").addClass("flexable");
	alarm.addClass(objectId)
	alarm.append("<div class='name'> "+alarmName+" </div>");
	var timeStamp = " - " + time;
	alarm.append("<div class='time'> "+timeStamp+" </div>");
	alarm.append("<input type='button' value='x' id="+objectId+" class='deleteButton'/>");
	$("#alarms").append(alarm);

	$(".deleteButton").click(function(elem) {
		var idClicked = elem.target.id;
		deleteAlarm(idClicked);
	});
}

function deleteAlarm(elemClass) {
	// Google Analytics
	ga('send', 'event', 'Alarm', 'Delete');
	
	console.log(elemClass);
	$("."+elemClass).remove();
	
	var AlarmObject = Parse.Object.extend("Alarm");
	var query = new Parse.Query(AlarmObject);			
	query.get(elemClass, {
	  success: function(results) {
		results.destroy({});
	  },
	  error: function(object, error) {
		// error is a Parse.Error with an error code and description.
		if (error) {
			console.log("Parse ERROR:" + error.description);
		}
	  }
	});
}

function getAllAlarms(userId) {
		Parse.initialize("HcW1sYtq5mDdCxNdXbouDeQvBPkjdkGJsnBJ0ouH", "pRjkawCPgfwejgDc1cQLn5JMTU0V7m8ZCG2LaXVx");
		
		var AlarmObject = Parse.Object.extend("Alarm");
		var query = new Parse.Query(AlarmObject);
		query.equalTo("googleId", userId);
		query.find({
			success: function(results) {
			  for (var i = 0; i < results.length; i++) { 
				insertAlarm(results[i].get("time"), 	
				results[i].get("alarmName"), 
				results[i].id);
				//FIXME: results[i].get("objectId") or "id"
			  }
			}
		});
}