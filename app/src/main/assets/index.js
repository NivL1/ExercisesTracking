var greetingMsg = '';
setGreetingMsg();

function setGreetingMsg() {
	var currentHour = getCurrentHourTime();
	document.getElementById('greetingMsg').innerHTML = getGreetingMsg(currentHour);
}

function getGreetingMsg(currentHour) {
	if ((currentHour < 12) && (currentHour >= 6))
		return "Good Morning"
	else if ((currentHour < 18) && (currentHour >= 12))
		return "Good Afternoon"
	else
		return "Good Evening"
}

function getCurrentHourTime() {
	var d = new Date();
	return d.getHours()
}

function fetchData(){
	window.vm.fetchMyExercises();
}

function showExercises(str) {
	var ob = document.getElementById("output");
	ob.value = str;
}