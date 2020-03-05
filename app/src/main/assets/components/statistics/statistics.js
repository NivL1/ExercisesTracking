applyLocalFileBrowsing()
createStatisticsTable()


fetchCommittedExercises()


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
	let statisticsValueArray = getStatisticsValue();
	let statisticsNamesArray = getStatisticsNames();
	statisticsValueArray.forEach(function (statisticsValue, index) {
		let row = table.insertRow(index);
		row.insertCell(0).innerHTML = statisticsNamesArray[index]
		row.insertCell(1).innerHTML = statisticsValue
	})
}

//TODO pull statistics from DB
function getStatisticsValue() {
	let arr = [1, 2.22, 333];
	return arr;
}

function getStatisticsNames() {
	let arr = ["test1", "test2", "test3"];
	return arr
}

function fetchCommittedExercises() {
    window.vm.fetchCommittedExercisesFromDb();
}