var greetingMsg = '';
var greetingImgPath = '';
var tableNumOfCols = 0;
var tableNumOfRows = 0;
var committedExercisesTable = [];


setGreetingMsg();
setGreetingImg();
setLastThreeTrainings();

//TODO fix problem - 3 first exercises shown instead of last
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

function showLastThreeTrainings(lastThreeTrainings) {
    if (lastThreeTrainings.length != 0) {
        showTrainsDisplay();
        lastThreeTrainings.forEach(function (training, index) {
            document.getElementById('train_' + index).innerHTML = training;
        })
    }
}

function getLastThreeTrainings() {
    var lastThreeTrainings = [];
    for (var indexOffset = 1; indexOffset < 4; indexOffset++) {
        lastThreeTrainings.push(committedExercisesTable[committedExercisesTable.length - indexOffset][2]);
    }
    return lastThreeTrainings;
}

function fetchCommittedExercises() {
    window.vm.getCommittedExercisesCols();
    window.vm.getCommittedExercisesRows();
    window.vm.fetchCommittedExercisesFromDb();
}

function putCommittedExercises(committedExercisesString) {
    var committedExercisesArray = committedExercisesString.split("|");
    committedExercisesArray.pop();

    var rowArray = []
    for (i = 0; i < tableNumOfRows; i++) {
        for (j = 0; j < tableNumOfCols; j++) {
            rowArray.push(committedExercisesArray[i * tableNumOfCols + j]);
        }
        committedExercisesTable.push(rowArray);
        rowArray= [];
    }
}

function setLastThreeTrainings() {
    fetchCommittedExercises();
    setTimeout(() => {
        lastThreeTrainings = getLastThreeTrainings();
        showLastThreeTrainings(lastThreeTrainings);
    }, 500);

}

function setCommittedExercisesCols(num) {
    tableNumOfCols = num;
}

function setCommittedExercisesRows(num) {
    tableNumOfRows = num;
}

function showTrainsDisplay() {
    var divs = document.getElementsByTagName('div');
    for(var i = divs.length; i--;) {
        var div = divs[i];
        if(div.className === 'trainsDisplay') {
            div.style.display = 'block';
        }
    }
}