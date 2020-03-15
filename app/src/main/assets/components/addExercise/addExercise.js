var selectedTrain = null;
var selectedExercise = null;
var inputTime = "";
var inputDistance = "";


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
    window.vm.fetchTrainsFromDB();
}


function showTrains(trainsString) {
    var trainsArr = trainsString.split("|");
    trainsArr.pop();

    var typeTrain = $("#div-type-train");

    typeTrain.append("<label for=\"train-select\" class=\"select\">Select type of train:</label>" +
        "<select id='train-select' data-native-menu='false' onchange='onTrainChange()'>"
        + "<option selected disabled hidden>Select Train Type</option>");

    let trainsOptions = document.getElementById('train-select').options;

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
        + "<option elected disabled hidden>Select Exercise Type</option>");

    let exercisesOptions = document.getElementById('exercise-select').options;

    exercisesArr.forEach(option =>
        exercisesOptions.add(
            new Option(option)
    ));
    typeExercise.enhanceWithin();

}


function commitExercise() {
    var durationCheckBoxState = document.getElementById("duration-check-box").checked;
    var distanceCheckBoxState = document.getElementById("distance-check-box").checked;
    if(durationCheckBoxState)
         inputTime = document.getElementById("input-duration").value;
    if(distanceCheckBoxState)
         inputDistance = document.getElementById("input-distance").value;

    if (selectedTrain != null && selectedExercise != null) {
        window.vm.commitExerciseJava(selectedTrain, selectedExercise, inputTime, inputDistance);

        location.reload();
        alert('Exercise was added');

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
        inputTime = "";
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
