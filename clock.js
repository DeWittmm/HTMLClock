getTime()
setInterval(getTime, 999);

function getTime() {
	var clockLabel = document.getElementById("timeStamp");
	var d = new Date();
	
	clockLabel.innerHTML = d.toLocaleTimeString();
}

// window.alert("JavaScript!");
console.log(Date().toString());