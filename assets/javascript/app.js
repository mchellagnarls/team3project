$(document).ready(function() {

    // Event listener function that will trigger the AJAX call whenb the user clicks the submit button. //
    $("#submit-button").on("click", function(event) {

        // event.preventDefault() prevents the submit button from trying to submit a form when clicked. //
        event.preventDefault();

        // Initial variables for our two APIs with their respective keys and/or app IDs. //
        var edamamKeyAPI = "9d5b06c6d10c6620183573ad18113312";
        var edamamId = "a2c8e6b6";
        var spoonacularKeyAPI = "7aaa8c8c6c4743e8abe149221960621c";
        
        // Variable that connects the user search input to complete the API query URL below. //
        var recipeSearch = $("#search").val();

        // Variables for our API search query URLs. //
        var edamamQueryURL = "https://api.edamam.com/search?q=" + recipeSearch + "&app_id=a2c8e6b6&app_key=9d5b06c6d10c6620183573ad18113312";
        var spoonQueryURL = "https://api.spoonacular.com/food/wine/pairing?food=" + recipeSearch + "&apiKey=7aaa8c8c6c4743e8abe149221960621c&number=10";

        // Function for AJAX call to retrieve Edamam recipe information. //
        $.ajax({
            url: edamamQueryURL,
            method: "GET"
        }).then(function(response) {
        
            console.log(response.hits[0].recipe.calories);
            $("#calorie-card-text").text(JSON.stringify(response.hits[0].recipe.calories));
        
        });
        
        // Function for AJAX call to retrieve Spoonacular wine pairing information. //
        $.ajax({
            url: spoonQueryURL,
            method: "GET"
        }).then(function(response) {
        
            console.log(response.pairedWines);
            $("#winecard-text1").text(JSON.stringify(response.pairedWines[0]));
            $("#winecard-text2").text(JSON.stringify(response.pairedWines[1]));
            $("#winecard-text3").text(JSON.stringify(response.pairedWines[2]));

        
        });

        

    });



});