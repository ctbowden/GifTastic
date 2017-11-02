// Week 6 Giphy Project
// UNC Coding Bootcamp
// Charles Bowden
// Giphy API Key JbAze3Bq2K81GsPhzV1gSBiyZyA2vR38

// Array of Topics to use for Buttons
var topics = ["Ducktales", "He-Man", "Transformers", "Batman Animated Series", "Rescue Rangers", "Animaniacs", "Gummi Bears", "Dungeons and Dragons"]

function displayTopicInfo() {
	var cartoon = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=JbAze3Bq2K81GsPhzV1gSBiyZyA2vR38&q=" + cartoon + "&limit=10&offset=0&rating=PG-13&lang=en";

	$.ajax({
		url: queryURL, 
		method: "GET"
	}).done(function(response) {

		// Create For Loop here to show multiple Giphy Responses
		for (var i = 0; i < 10; i++) {
		
		//Creating a Div for Topic
		var topicDiv = $("<div class='gif'>");
		// Storing the rating data in variable
		var rating = response.data[i].rating;
		// Creating Element to display rating 
		var pRate = $("<p>").text("Rating: " + rating);
		// Adding Rating to Topic Div
		topicDiv.append(pRate);
		// Variable to hold still image from from Giphy
		var giphyImgStill = response.data[i].images.downsized_still.url;
		// Variable to hold motion image from Giphy
		var giphyImgMotion = response.data[i].images.original.mp4;
		// Create Image Element
		var image = $("<img>").attr("src", giphyImgMotion);
		//update image with more attributes
		image.attr("data-still", giphyImgStill);
		image.attr("data-animate", giphyImgMotion);
		image.attr("data-state", "still");
		// Appending the Image
		topicDiv.append(image);
		// Write Topic Div to HTML document
		$("#cartoons").prepend(topicDiv);
		}
	})
}

function renderButtons() {
	// Clears CartoonButtons Div
	$("#cartoonButtons").empty();

	// Looping through topics
	for (var i = 0; i < topics.length; i++) {
		// Code to Dynamically Generate Buttons for each Topic in topics array
		var a = $("<button>");
		// Adding a class of Topic to our Button
		a.addClass("topic");
		// Adding a data-attribute
		a.attr("data-name", topics[i]);
		// Button Text
		a.text(topics[i]);
		// Adding the Button to the Buttons Div
		$("#cartoonButtons").append(a);
	}
}

// This function handles events where a Topic button is clicked
$("#addCartoon").on("click", function(event) {
	event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#cartoon-input").val().trim();
    // Adding movie from the textbox to our array
    topics.push(topic);

	// Calling renderButtons which handles the processing of our movie array
    renderButtons();
    });

// Adding a click event listener to all elements with a class of "movie"
$(document).on("click", ".topic", displayTopicInfo);
// Calling the renderButtons function to display the intial buttons
renderButtons();






// Code to animate images follows, will need to format images as shown in example to use this code
// <img src="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" data-still="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" data-animate="https://media3.giphy.com/media/W6LbnBigDe4ZG/200.gif" data-state="still" class="gif">
$(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
