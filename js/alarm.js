$(document).ready(function() {
	// Setup Options
	for (i = 1; i <= 12; i++) { 
		$("#hours").append("<option> "+i+" </option>");
	}
	
	for (i = 0; i <= 60; i += 15) { 
		var leadingZeros = ("00" + i).substr(-2,2);
		$("#mins").append("<option> "+leadingZeros+" </option>");
	}
});

function showAlarmPopup() {
	$("#mask").removeClass("hide");
	$("#popup").removeClass("hide");
}

function hideAlarmPopup() {
	$("#mask").addClass("hide");
	$("#popup").addClass("hide");
}

function insertAlarm(hours, mins, ampm, alarmName) {
	var alarm = $("<div>").addClass("flexable");
	alarm.append("<div class='name'> "+alarmName+" </div>");
	var timeStamp = " - " + hours + ":" + mins + ampm
	alarm.append("<div class='time'> "+timeStamp+" </div>");
	
	$("#alarms").append(alarm);
}

function addAlarm() {
	var hours, mins, ampm, alarmName;
	
	alarmName = $("#alarmName").val(); 
	hours = $("#hours option:selected").text(); 
	mins = $("#mins option:selected").text(); 
	ampm = $("#ampm option:selected").text();
	
	if (alarmName) {
		insertAlarm(hours, mins, ampm, alarmName);
		hideAlarmPopup();
	} 
	else {
		window.alert("Please enter alarm name");
	}
}