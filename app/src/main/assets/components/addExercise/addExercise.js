fetchTrains();

function onTrainChange() {
    var trainSelectElement = document.getElementById("train-select");
    var selectedTrain = trainSelectElement.options[trainSelectElement.selectedIndex].value;
    window.vm.fetchExercisesFromDB(selectedTrain);
}


function onExerciseChange(){
    document.getElementById("duration-div").style.visibility = "visible";
    document.getElementById("distance-div").style.visibility = "visible";
//    $("#div-check-box-1").empty();
//    $("#div-check-box-2").empty();
//    $("#div-check-box-1").append("<label><input id=\"cb-time\" type=\"checkbox\" onclick='onClickTime()' data-tt-lable=\"add distance\"/>Add duration time</label>");
//    $("#div-check-box-2").append("<label><input id=\"cb-distance\" type=\"checkbox\" onclick='onClickDistance()' data-tt-lable=\"add distance\"/>Add distance</label>");
//    $("#div-check-box-1").enhanceWithin(); //refresh style
//    $("#div-check-box-2").enhanceWithin(); //refresh style
}


        <!--        TODO fix time/distance double bag  -->
function onClickTime(){
    if( $('#cb-time').is(":checked") ) {
        $("#div-input-time").append("<input id='input-time' type='number'/>");
        $("#div-input-time").enhanceWithin();
    }
    else $("#input-time").remove();
}

function onClickDistance(){
    if ( $('#cb-distance').is(":checked") ) {
        $("#div-input-distance").append("<input id='input-distance' type='number'/>");
        $("#div-input-distance").enhanceWithin();
    }
    else $("#input-distance").remove();
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
    window.vm.commitExerciseJava( $("#type-train").val() , $("#type-exercise").val() ,
        $('#cb-time').is(":checked") ? $("#input-time").val() : null ,
        $('#cb-distance').is(":checked") ? $("#input-distance").val() : null );
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
          document.getElementById("input-time-div").style.visibility = "hidden";
    }
}

function distanceCheckBoxClick() {
    var checkBoxState = document.getElementById("distance-check-box").checked;
    if (checkBoxState) {
          document.getElementById("input-distance-div").style.visibility = "visible";
    }
    else {
          document.getElementById("input-distance-div").style.visibility = "hidden";
    }
}