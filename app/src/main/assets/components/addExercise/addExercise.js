$(document).ready(function() {
    fetchTrains();
});

function onTrainChange() {
    $("#div-type-exercise").empty();
    window.vm.fetchExercisesFromDB($("#type-train").val());

}


function onExerciseChange(){
    $("#div-check-box-1").empty();
    $("#div-check-box-2").empty();
    $("#div-check-box-1").append("<label><input id=\"cb-time\" type=\"checkbox\" onclick='onClickTime()' data-tt-lable=\"add distance\"/>Add duration time</label>");
    $("#div-check-box-2").append("<label><input id=\"cb-distance\" type=\"checkbox\" onclick='onClickDistance()' data-tt-lable=\"add distance\"/>Add distance</label>");
    $("#div-check-box-1").enhanceWithin(); //refresh style
    $("#div-check-box-2").enhanceWithin(); //refresh style
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

   // showTrains("asdaks|fffasda|Asdaf");
}

function showTrains(trainsString) {
    var trainsArr = trainsString.split("|")

    $("#div-type-train").append("<label for=\"type-train\" class=\"select\">Select type of train:</label>" +
        "<select id='type-train' data-native-menu='false' onchange='onTrainChange()'>"
            + "<option>Select Train Type</option>");

    $.each(trainsArr, function(key, value) {
        $('#type-train').append($("<option></option>")
            .attr("value",value)
            .text(value));
    })

    $("#div-type-train").enhanceWithin();

}

function showExercises(exercisesString) {
    var exercisesArr = exercisesString.split("|")

    $("#div-type-exercise").append("<label for=\"type-exercise\" class=\"select\">Select type of train:</label>" +
        "<select id='type-exercise' data-native-menu='false' onchange='onExerciseChange()'>"
        + "<option>Select Exercise Type</option>");

    $.each(exercisesArr, function(key, value) {
        $('#type-exercise').append($("<option></option>")
            .attr("value",value)
            .text(value));
    })

    $("#div-type-exercise").enhanceWithin();
}

function commitExercise() {
    window.vm.commitExerciseJava( $("#type-train").val() , $("#type-exercise").val() ,
        $('#cb-time').is(":checked") ? $("#input-time").val() : null ,
        $('#cb-distance').is(":checked") ? $("#input-distance").val() : null );
}

function showStr(str)
{
    var ob = document.getElementById("output");
    ob.value = str;
}

//confirm adding exercise or alert problem occured
function confirmAddition (isAdded) {
    isAdded ? alert("Exercise has been added") : alert("Some Problem occured");
}