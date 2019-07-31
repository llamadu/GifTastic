// make a function available after the document is loaded. Whatever code is written inside the $(document ).ready() method will run once the page DOM is ready to execute JavaScript code. //

$(document).ready(function() {

  // declaration of a variable named "animals" that is an array 
  var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
  ];


  //declaration populateButtons function with the parameters arrayToUse, classToAdd, and areaToAddTo
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    
    // use .empty to empty  child (and other descendant) elements, and any text within areaToAddTo
    $(areaToAddTo).empty();

    // for loop in which variable i is set to 0 when i is less than the number of elements in arrayToUse add 1 to i
    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      // add class classToAdd to a
      a.addClass(classToAdd);
      // set the "data-type" attribute of a  to arrayToUse[i]
      a.attr("data-type", arrayToUse[i]);
      // set the text of a to the text value of arrayToUse
      a.text(arrayToUse[i]);
      
      //add 'a' to the end of areaToAddTo
      $(areaToAddTo).append(a);
    }

  }
  //add click event to the document within the element with the id .animal-buttons
  $(document).on("click", ".animal-button", function() {
    //when the click event occurs run a function that empties the element with the class #animals
    $("#animals").empty();
    //remove class "active" from animal button
    $(".animal-button").removeClass("active");
    //add class active to var a
    $(this).addClass("active");
    console.log(this)
    //declaration of variable "type" and assigning value of the jQuery function  
    var type = $(this).attr("data-type");
    //declare queryURL and set it to the base gify API URL plus type and the API key
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    // use the ajax method GET to request information from the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      //use .then method to return a promise of the function response
      .then(function(response) {
        //declaration of the resulsts variable and set it the the value of the data associated with response
        var results = response.data;
        // for loop where variable i is set to 0 when i is less than the number of elements in results add 1 to i
        for (var i = 0; i < results.length; i++) {
          //declare variable animalDiv and use jQuery to create a div with the class "animal-item" and set that as the value of animalDiv
          var animalDiv = $("<div class=\"animal-item\">");
          // declaration of the rating variable and setting the value to the jQuery function-----
          var rating = results[i].rating;
          // declaration of variable 'p' and setting it to <p> text of "rating:" and the value of the 'rating' variable to jQuery function-----
          var p = $("<p>").text("Rating: " + rating);

          // declaration of the variable animated and setting the value to ----
          var animated = results[i].images.fixed_height.url;
          // declaration of the variable still and setting the value to 
          var still = results[i].images.fixed_height_still.url;

          // declaration of the variable animal image and setting an image tag with jQuery
          var animalImage = $("<img>");
          // set the "src" attribute of animalImage to still
          animalImage.attr("src", still);
          // set the "data-still" attribute of animalImage to still
          animalImage.attr("data-still", still);
          // set the "data-animate" attribute of animalImage to animated
          animalImage.attr("data-animate", animated);
          // set the "data-state" attribute of animalImage to still
          animalImage.attr("data-state", "still");
          // add the class of animal-image to animalImage
          animalImage.addClass("animal-image");

          // add p //var p = $("<p>").text("Rating: " + rating)// to the end of animalDiv
          animalDiv.append(p);
          // add animalImage //animalImage = $("<img>")// to the end of animalDiv
          animalDiv.append(animalImage);

          // add animalDiv to the end of hte element with the class #animals
          $("#animals").append(animalDiv);
        }
      });
  });

  // add click event to the element with the id .animal-image
  $(document).on("click", ".animal-image", function() {

    // when the click occurs run a function where the declared variable state is set to the value of animalImage with an attribute data-state
    var state = $(this).attr("data-state");
  
    // if state is strictly equal to "still"
    if (state === "still") {
      // set the "src" attribute of animalImage to the data-animate attribute of animalImage
      $(this).attr("src", $(this).attr("data-animate"));
      // set the data-state attribute of //this// to animate
      $(this).attr("data-state", "animate");
    }
    // if not...
    else {
      // set the "src" attribute of animalImage to the data-still attribute of animalImage
      $(this).attr("src", $(this).attr("data-still"));
      //set the data-state attribute of animalImage to still 
      $(this).attr("data-state", "still");
    }
  });

  // add click event that...
  $("#add-animal").on("click", function(event) {
    // ...cancels the default event from occuring
    event.preventDefault();
    //declaration of newAnimal variable wit the value of the input of the value of the 1st element
    var newAnimal = $("input").eq(0).val();

    // if the number of elements in new animal is greater than 2 push newAnimal to animals
    if (newAnimal.length > 2) {
      animals.push(newAnimal);
    }

    //populate animal buttons with the elements from the animal array
    populateButtons(animals, "animal-button", "#animal-buttons");

  });

  //populate animal buttons with the elements from the animal array
  populateButtons(animals, "animal-button", "#animal-buttons");
});
