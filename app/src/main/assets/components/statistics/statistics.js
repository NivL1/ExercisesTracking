var tableNumOfCols = 0;
var tableNumOfRows = 0;
var committedExercisesTable = [];

applyLocalFileBrowsing();
fetchCommittedExercises();
getNumberOfRows();
//TODO create a promise istead of simple sleep
setTimeout(() => { createStatisticsTable(); }, 500);


// Turn off Ajax for local file browsing
function applyLocalFileBrowsing() {
	if ( location.protocol.substr(0,4)  === 'file' ||
		location.protocol.substr(0,11) === '*-extension' ||
		location.protocol.substr(0,6)  === 'widget' ) {

		// Start with links with only the trailing slash and that aren't external links
		var fixLinks = function() {
			$( "a[href$='/'], a[href='.'], a[href='..']" ).not( "[rel='external']" ).each( function() {
				if( !$( this ).attr( "href" ).match("http") ){
					this.href = $( this ).attr( "href" ).replace( /\/$/, "" ) + "/index.html";
				}
			});
		};

		// Fix the links for the initial page
		$( fixLinks );

		// Fix the links for subsequent ajax page loads
		$( document ).on( "pagecreate", fixLinks );

		// Check to see if ajax can be used. This does a quick ajax request and blocks the page until its done
		$.ajax({
			url: '.',
			async: false,
			isLocal: true
		}).error(function() {
			// Ajax doesn't work so turn it off
			$( document ).on( "mobileinit", function() {
				$.mobile.ajaxEnabled = false;

				var message = $( '<div>' , {
					'class': "jqm-content",
					style: "border:none; padding: 10px 15px; overflow: auto;",
					'data-ajax-warning': true
				});

				message
					.append( "<h3>Note: Navigation may not work if viewed locally</h3>" )
					.append( "<p>The Ajax-based navigation used throughout the jQuery Mobile docs may need to be viewed on a web server to work in certain browsers. If you see an error message when you click a link, please try a different browser.</p>" );

				$( document ).on( "pagecreate", function( event ) {
					$( event.target ).append( message );
				});
			});
		});
	}
}

function createStatisticsTable()
{
	let table = document.getElementById("statisticsTable");
	addColTitle(table);
	committedExercisesTable.forEach(function (committedRow, index) {
		let row = table.insertRow(index+1);
		for (col = 0; col < tableNumOfCols; col++) {
		    row.insertCell(col).innerHTML = committedRow[col]
		}
	})
}

function getNumberOfRows() {
	window.vm.getCommittedExercisesCountJava();
}

function setNumberOfRows(numRows) {
	numRows = parseInt(numRows);
	var numRowsArray = Array.from(Array(numRows).keys());
	numRowsArray = numRowsArray.splice(1);
	let fromOptions = document.getElementById('select-from').options;
	let toOptions = document.getElementById('select-to').options;
	numRowsArray.forEach(option =>
		fromOptions.add(
			new Option(option,option)
		));
	numRowsArray.forEach(option =>
		toOptions.add(
			new Option(option,option)
		));

}

function createCustomizedTable() {
	let tableDiv = $("#div-table");
	var table = $("#statisticsTable");
	table.remove();
	var newTable = document.createElement("TABLE");
	newTable.setAttribute('id', "statisticsTable");
	let fromValue = Number(document.getElementById("minNum").value)
	let toValue = Number(document.getElementById("maxNum").value)

    if (toValue < fromValue)
        var newCommittedExercisesTable = committedExercisesTable;
    else {
        if (fromValue == 0)
            var newCommittedExercisesTable = committedExercisesTable.slice(fromValue, toValue);
    	else
    	    var newCommittedExercisesTable = committedExercisesTable.slice(fromValue-1, toValue);
    }


	tableDiv.append(newTable);
	newTable = document.getElementById("statisticsTable");
	addColTitle(newTable);
	newCommittedExercisesTable.forEach(function (committedRow, index) {
		let row = newTable.insertRow(index+1);
		for (col = 0; col < tableNumOfCols; col++) {
			row.insertCell(col).innerHTML = committedRow[col];
		}
	})
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

function setCommittedExercisesCols(num) {
    tableNumOfCols = num;
}

function setCommittedExercisesRows(num) {
    tableNumOfRows = num;
}

function addColTitle(table) {
    var tableTitles = ["ID", "Exercise type", "Train type", "Time", "Distance"];
    let row = table.insertRow(0);
    tableTitles.forEach(function (titleName, index) {
        row.insertCell(index).innerHTML = tableTitles[index];
    })
}