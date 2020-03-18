var selectedTrain = null;
var selectedExercise = null;
var inputDuration = "";
var inputDistance = "";
var durationCheckBoxState = false;
var distanceCheckBoxState = false;
var flag1 = "1";

fetchTrains();

function onTrainChange() {
    var trainSelectElement = document.getElementById("train-select");
    selectedTrain = trainSelectElement.options[trainSelectElement.selectedIndex].value;
    window.vm.fetchExercisesFromDB(selectedTrain);
}


function onExerciseChange(){

    var exerciseSelectElement = document.getElementById("exercise-select");
    selectedExercise = exerciseSelectElement.options[exerciseSelectElement.selectedIndex].value;
    var checkBox1 =  $("#div-check-box-1");
    var checkBox2 = $("#div-check-box-2");
    checkBox1.empty();
    checkBox2.empty();
    checkBox1.append("<label><input id=\"duration-check-box\" type=\"checkbox\" onclick='durationCheckBoxClick()' data-tt-lable=\"add distance\"/>Add duration time</label>");
    checkBox2.append("<label><input id=\"distance-check-box\" type=\"checkbox\" onclick='distanceCheckBoxClick()' data-tt-lable=\"add distance\"/>Add distance</label>");
    checkBox1.enhanceWithin(); //refresh style
    checkBox2.enhanceWithin(); //refresh style
}


function fetchTrains() {
    window.vm.fetchTrainsFromDB(flag1);
}


function showTrains(trainsString) {
    var trainsArr = trainsString.split("|");
    var flag = trainsArr[0];
    trainsArr = trainsArr.slice(1);
    var typeTrain;
    let trainsOptions;
    trainsArr.pop();

    if(flag === "1") {
        typeTrain = $("#div-type-train")
        typeTrain.append("<label for=\"train-select\" class=\"select\">Select type of train:</label>" +
            "<select id='train-select' data-native-menu='false' onchange='onTrainChange()'>"
            + "<option selected disabled hidden>Select Train Type</option>");
        trainsOptions = document.getElementById('train-select').options;
    }
    else {
        typeTrain = $("#div-option-selected");
        typeTrain.append("<label for=\"train-select-option\" class=\"select\">Select type of train:</label>" +
            "<select id='train-select-option' data-native-menu='false' onchange='onTrainAddOptionChange()'>"
            + "<option selected disabled hidden>Select Train Type</option>");
        trainsOptions = document.getElementById('train-select-option').options;
    }
    
    trainsArr.forEach(option =>
        trainsOptions.add(
            new Option(option)
    ));
    typeTrain.enhanceWithin();

}


function showExercises(exercisesString) {
    var typeExercise = $("#div-type-exercise");

    typeExercise.empty();

    $("#div-input-distance").empty();
    $("#div-input-duration").empty();
    var exercisesArr = exercisesString.split("|");
    exercisesArr.pop();

    typeExercise.append("<label for=\"exercise-select\" class=\"select\">Select type of train:</label>" +
        "<select id='exercise-select' data-native-menu='false' onchange='onExerciseChange()'>"
        + "<option selected disabled hidden>Select Exercise Type</option>");

    let exercisesOptions = document.getElementById('exercise-select').options;

    exercisesArr.forEach(option =>
        exercisesOptions.add(
            new Option(option)
    ));
    typeExercise.enhanceWithin();

}


function commitExercise() {
    if(selectedExercise != null) {
        durationCheckBoxState = document.getElementById("duration-check-box").checked;
        distanceCheckBoxState = document.getElementById("distance-check-box").checked;
    }
    durationCheckBoxState ? inputDuration = document.getElementById("input-duration").value : null;
    distanceCheckBoxState ? inputDistance = document.getElementById("input-distance").value : null;
    if (selectedTrain != null && selectedExercise != null) {
        window.vm.commitExerciseJava(selectedTrain, selectedExercise, inputDuration, inputDistance);
        location.reload();
    }
    else {
        alert('Please choose train and exercise type');
    }
}


function durationCheckBoxClick() {
    var checkBoxState = document.getElementById("duration-check-box").checked;
    var inputDuration = $("#div-input-duration");
    inputDuration.empty();
    if (checkBoxState) {
        inputDuration.append("<input id='input-duration' type='number'/>");
        inputDuration.enhanceWithin();
    }
    else {
        inputDuration = "";
    }
}


function distanceCheckBoxClick() {
    var checkBoxState = document.getElementById("distance-check-box").checked;
    var divInputDistance = $("#div-input-distance");
    divInputDistance.empty();
    if (checkBoxState) {
        divInputDistance.append("<input id='input-distance' type='number'/>");
        divInputDistance.enhanceWithin();
    }
    else {
        inputDistance = "";
    }
}

function confirm(confirmation) {
    if(confirmation === "-1")
        alert("a problem is occured");
    else
        alert("line number "+confirmation+" was added successfully");

}