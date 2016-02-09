'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);


	console.log("User clicked on project " + idNumber);

	var url1 = "/project/";
	var url = url1.concat(idNumber);
	console.log("URL route is: " + url);


	$.get(url, sample);

	// Make sure callbacks are defined in closures t pass around vars
	// without having to resort to global variables
	function sample(result){
		console.log(result);

		var newHtml = '<h2>' + result['title'] + '</h2>' +
					'<h5>' + result['date'] + '</h5>' +
					'<p>' + result['summary'] + '</p>' +
					'<img class="detailsImage" src="' + result['image'] + '" > ';

		var getSelector = "#" + projectID + " > .thumbnail > " + ".details";
		$(getSelector).html(newHtml);
	}	

}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");

	$.get('/palette', change);

	function change(result){
		console.log(result);
		var colors = result['colors']['hex'];

		$('body').css('background-color', colors[0]);
		$('.thumbnail').css('background-color', colors[1]);
		$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
		$('p').css('color', colors[3]);
		$('.project img').css('opacity', .75);

		console.log(colors);
	}

}

