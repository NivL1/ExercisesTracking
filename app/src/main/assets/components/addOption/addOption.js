var selectedOption = null;

// TODO complete the exercise add option and submit button
function onOptionToAddChange() {
    // document.getElementById("train-option-div").style.visibility = "hidden";
    // document.getElementById("exercise-option-div").style.visibility = "hidden";
    var optionSelectElement = document.getElementById("select-option");
    selectedOption = optionSelectElement.options[optionSelectElement.selectedIndex].value;
    var optionSelectedElement = document.getElementById("div-option-selected");


    if (selectedOption === "Train") {
        var h3 = document.createElement("H3");
        h3.innerHTML = "Enter train name to add";
        var input = document.createElement("INPUT");
        input.setAttribute('type', "text");
        optionSelectedElement.appendChild(h3);
        optionSelectedElement.appendChild(input);

    }

    else if (selectedOption === "Exercise")
        var i = 0;


}

function submitToDB(){

}


