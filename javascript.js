var topics = ["Christmas", "Halloween", "Rocky Horror", "The Lion King", "Blackbird", "iPhone", "Dame Edna", "Equality", "Castro", "San Francisco", "Star Trek", "Cheetos", "Australia"];


function gifSearch() {
 $("#gifs-appear-here").empty();
 //this gets the value of the button created from the input form
 var topic = $(this).attr("button-value");
 console.log(topic);
 //queryURL using the topic name
 var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  topic + "&api_key=dc6zaTOxFJmzC&limit=10";
 // AJAX request with the queryURL
 $.ajax({
   url: queryURL,
   method: "GET"
  })
  // After data comes back from the request
  .done(function(response) {
   console.log(queryURL);
   console.log(response);

   var results = response.data;
   // Looping through each result item
   for (var i = 0; i < results.length; i++) {
    // Creating and storing a div tag
    var topicDiv = $("<div>");
    topicDiv.addClass("gifsDisplay");
    // Creating a paragraph tag with the result item's rating
    var p = $("<p>").text("Rating: " + results[i].rating);
    // Creating and storing an image tag
    var topicImage = $("<img>");
    topicImage.addClass("thumbnail");
    topicImage.attr("src", results[i].images.fixed_height_still.url);
    topicImage.attr("data-state", "still")
    topicImage.attr("data-animate", results[i].images.fixed_height.url)
    topicImage.attr("data-still", results[i].images.fixed_height_still.url)
    topicImage.addClass("gif");
    topicImage.bind('click', pauseGif);

    topicDiv.append(topicImage);
    topicDiv.append(p);

    // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
    $("#gifs-appear-here").prepend(topicDiv);
   }
  });
};

function renderButtons() {

 // Deleting the buttons prior to adding new movies
 // (this is necessary otherwise you will have repeat buttons)
 $("#buttons-view").empty();
 // Looping through the array of movies
 for (var i = 0; i < topics.length; i++) {
  // Then dynamicaly generating buttons for each topic in the array
  // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
  var topicButton = $("<button>");
  // Adding a class of topic to our button
  topicButton.addClass("topic");
  // Adding a data-attribute
  topicButton.attr("button-value", topics[i]);
  // Providing the initial button text
  topicButton.text(topics[i]);
  // Adding the button to the buttons-view div
  topicButton.bind('click', gifSearch);

  $("#buttons-view").append(topicButton);
 }

}
// This function handles events where one button is clicked
$("#add-topic").on("click", function(event) {
 event.preventDefault();
 // This line grabs the input from the textbox
 var newTopic = $("#topic-input").val().trim();

 topics.push(newTopic); //pushes the user input topic into the array 
 renderButtons();
});

// Calling the renderButtons function to display the intial buttons
renderButtons();

function pauseGif() {

 var state = $(this).attr("data-state");

 console.log(state);
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
};