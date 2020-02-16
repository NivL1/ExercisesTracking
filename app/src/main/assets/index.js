var greetingMsg = '';
var greetingImgPath = '';
setGreetingMsg();
setGreetingImg();

function setGreetingMsg() {
	document.getElementById('greetingMsg').innerHTML = getGreetingMsg(getCurrentHourTime());
}

function setGreetingImg() {
	var image = document.getElementById('greetingImg');
	image.setAttribute("src", getGreetingImgPath(getCurrentHourTime()));
}

function getGreetingImgPath(currentHour) {
    	if ((currentHour < 12) && (currentHour >= 6))
    		return "./images/morningImg.JPG";
    	else if ((currentHour < 18) && (currentHour >= 12))
    		return "./images/afternoonImg.JPG";
    	else
    		return "./images/eveningImg.JPG";
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