var selectedTrain = null
var selectedExercise = null
var inputTime = null
var inputDistance = null


fetchTrains();

function onTrainChange() {
    var trainSelectElement = document.getElementById("train-select");
    selectedTrain = trainSelectElement.options[trainSelectElement.selectedIndex].value;
    window.vm.fetchExercisesFromDB(selectedTrain);
}


function onExerciseChange(){
    var exerciseSelectElement = document.getElementById("exercise-select");
    selectedExercise = exerciseSelectElement.options[exerciseSelectElement.selectedIndex].value;

    document.getElementById("duration-div").style.visibility = "visible";
    document.getElementById("distance-div").style.visibility = "visible";
}


function fetchTrains() {
    window.vm.fetchTrainsFromDB();
}


function showTrains(trainsString) {
    let trainsOptions = document.getElementById('train-select').options;
    var trainsArr = trainsString.split("|");
    trainsArr.pop();

    trainsArr.forEach(option =>
        trainsOptions.add(
            new Option(option)
    ));
}


function showExercises(exercisesString) {
    let exercisesOptions = document.getElementById('exercise-select').options;
    var exercisesArr = exercisesString.split("|");
    exercisesArr.pop();

    exercisesArr.forEach(option =>
        exercisesOptions.add(
            new Option(option)
    ));
    document.getElementById("exercise-div").style.visibility = "visible";
}


function commitExercise() {
    inputTime = document.getElementById("input-time").value;
    inputDistance = document.getElementById("input-distance").value

    if (selectedTrain != null && selectedExercise != null)
        window.vm.commitExerciseJava(selectedTrain, selectedExercise, inputTime, inputDistance);
}


//confirm adding exercise or alert problem occured
function confirmAddition (isAdded) {
    isAdded ? alert("Exercise has been added") : alert("Some Problem occured");
}


function durationCheckBoxClick() {
    var checkBoxState = document.getElementById("duration-check-box").checked;
    if (checkBoxState) {
          document.getElementById("input-time-div").style.visibility = "visible";
    }
    else {
        inputTime = ""
        document.getElementById("input-time-div").style.visibility = "hidden";
    }
}


function distanceCheckBoxClick() {
    var checkBoxState = document.getElementById("distance-check-box").checked;
    if (checkBoxState) {
          document.getElementById("input-distance-div").style.visibility = "visible";
    }
    else {
        inputDistance = ""
        document.getElementById("input-distance-div").style.visibility = "hidden";
    }
}