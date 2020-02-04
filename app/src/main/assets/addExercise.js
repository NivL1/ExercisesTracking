$(document).ready(function() {

    fetchTrains();

    // $('#type-train').on('change', function (e) {
    //     var optionSelected = $("option:selected", this);
    //     var valueSelected = this.value;
    //     if (valueSelected === "Aerobic") {
    //         $("#div-type-exercise").empty();
    //         $("#div-type-exercise").append("<label for=\"type-exercise\" class=\"select\">Select type of exercise:</label>" +
    //             "<select id='type-exercise' data-native-menu='false' onchange='onExerciseChange()'>" +
    //             "<option>Select Type</option>\n"+
    //             "<option value=\"running\">Running</option>\n" +
    //             "<option value=\"walking\">Walking</option>\n" +
    //             "<option value=\"swimming\">Swimming</option>\n" +
    //             "<option value=\"cycling\">Cycling</option>\n" +
    //             "<option value=\"boxing\">Boxing</option></select>")
    //     }
    //     if (valueSelected === "anaerobic"){
    //         $("#div-type-exercise").empty();
    //         $("#div-type-exercise").append("<label for=\"type-exercise\" class=\"select\">Select type of exercise:</label>" +
    //             "<select id='type-exercise' data-native-menu='false' onchange='onExerciseChange()'>" +
    //             "<option>Select Type</option>\n"+
    //             "<option value=\"running\">Pushups</option>\n" +
    //             "<option value=\"walking\">Situps</option>\n" +
    //             "<option value=\"swimming\">Pull-ups</option>\n" +
    //             "<option value=\"cycling\">Squats</option></select>")
    //     }
    //     if (valueSelected === "anaerobic-w"){
    //         $("#div-type-exercise").empty();
    //         $("#div-type-exercise").append("<label for=\"type-exercise\" class=\"select\">Select type of exercise:</label>" +
    //             "<select id='type-exercise' data-native-menu='false' onchange='onExerciseChange()'>"+
    //             "<option>Select Type</option>\n"+
    //             "<option value=\"bench-press\">Bench press</option>\n"+
    //             "<option value=\"overhead-press\">Overhead press</option>\n" +
    //             "<option value=\"push-press\">Push press</option>\n" +
    //             "<option value=\"deadlift\">Deadlift</option></select>")
    //     }
    //
    //       $("#div-type-exercise").enhanceWithin(); //refresh style
    //
    // })
});

function onTrainChange() {

    window.vm.fetchExercisesFromDB($("#type-train").val());

}


function onExerciseChange(){
    $("#div-check-box-1").empty();
    $("#div-check-box-2").empty();
    $("#div-check-box-1").append("<label><input id=\"cb-time\" type=\"checkbox\" onclick='onClickTime()' data-tt-lable=\"add distance\"/>Add time</label>");
    $("#div-check-box-2").append("<label><input id=\"cb-distance\" type=\"checkbox\" onclick='onClickDistance()' data-tt-lable=\"add distance\"/>Add distance</label>");
    $("#div-check-box-1").enhanceWithin(); //refresh style
    $("#div-check-box-2").enhanceWithin(); //refresh style
}

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

  //  showTrainsType("asdaks|fffasda|Asdaf");
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

function addExercise() {
    window.vm.addExercise( $("#type-train").val() , $("#type-exercise").val() ,
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