var selectedOption = null;
var flag2 = "2";
var dataToAdd = null;

function onOptionToAddChange() {
    // document.getElementById("train-option-div").style.visibility = "hidden";
    // document.getElementById("exercise-option-div").style.visibility = "hidden";
    var optionSelectElement = document.getElementById("select-option");
    selectedOption = optionSelectElement.options[optionSelectElement.selectedIndex].value;
    var optionSelectedElement = $("#div-option-selected");
    optionSelectedElement.empty();
    if (selectedOption === "Train") {
        var h3 = document.createElement("H3");
        h3.innerHTML = "Enter train name to add";
        var input = document.createElement("INPUT");
        input.setAttribute('id', "input-train-to-add");
        input.setAttribute('type', "text");
        optionSelectedElement.append(h3);
        optionSelectedElement.append(input);
        optionSelectedElement.enhanceWithin();
    }

    else if (selectedOption === "Exercise") {
        window.vm.fetchTrainsFromDB(flag2);
    }


}

function onTrainAddOptionChange() {
    optionSelectedElement =  $("#div-option-selected");
    if(optionSelectedElement.children().length === 2) {
        var h3 = document.createElement("H3");
        h3.innerHTML = "Enter exercise name to add";
        var input = document.createElement("INPUT");
        input.setAttribute('id', "input-exercise-to-add");
        input.setAttribute('type', "text");
        optionSelectedElement.append(h3);
        optionSelectedElement.append(input);
        optionSelectedElement.enhanceWithin();
    }
}

function submitToDB(){
    var inputElement;
    var trainsSelectElement;
    var trainTypeToAdd;
    if(selectedOption === null)
        alert("Please select train/exercise and enter a value");
    else {
        if (selectedOption === "Train") {
            inputElement = $("#input-train-to-add");
            dataToAdd = inputElement.val();
            if(dataToAdd === null)
                alert("Please enter a value");
            else
                window.vm.addOptionTrainJava(dataToAdd);

        } else if (selectedOption === "Exercise") {
            trainsSelectElement = document.getElementById("train-select-option");
            trainTypeToAdd = trainsSelectElement.options[trainsSelectElement.selectedIndex].value;
            inputElement = $("#input-exercise-to-add");
            dataToAdd = inputElement.val();
            if(dataToAdd === null)
                alert("Please enter a value");
            else
                window.vm.addOptionExerciseJava(dataToAdd, trainTypeToAdd);
        }
    }
}



