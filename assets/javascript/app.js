$(document).ready(function() {
    var favoritesArr = JSON.parse(localStorage.getItem("dish"));

    $("#search").keyup(function(e){     
        var str = $.trim( $(this).val() );
        if( str != "" ) {
          var regx = /^[A-Za-z]+$/;
          if (!regx.test(str)) {
            $("#searchComment").html("Letters only, no numbers");
          }
        }
        else {
            $("#searchComment").html("");
        }
    });

    $(".results").hide();

    function getItemFromAPI(searchTerm){
         // event.preventDefault() prevents the submit button from trying to submit a form when clicked //
         event.preventDefault();

         $(".results").show();
         $("#recipe-card-image").empty();
 
         // Initial variables for our two APIs with their respective keys and/or app IDs //
         var edamamKeyAPI = "9d5b06c6d10c6620183573ad18113312";
         var edamamId = "a2c8e6b6";
         var spoonacularKeyAPI = "7aaa8c8c6c4743e8abe149221960621c";
 
         // Variables for our API search query URLs //
         var edamamQueryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=a2c8e6b6&app_key=9d5b06c6d10c6620183573ad18113312";
         var spoonQueryURL = "https://api.spoonacular.com/food/wine/pairing?food=" + searchTerm + "&apiKey=7aaa8c8c6c4743e8abe149221960621c&number=10";
 
         // Function for AJAX call to retrieve Edamam recipe information //
         $.ajax({
             url: edamamQueryURL,
             method: "GET"
         }).then(function(response) {
             // Displaying recipe title //
             console.log(response.hits[5].recipe.label);
             $("#recipe-title-text").text(response.hits[5].recipe.label);
 
             // Displaying link recipe //
             console.log(response.hits[5].recipe.url);
 
             var recipeURL = response.hits[5].recipe.url;
             var recipeLink = $("<a>").attr("href", recipeURL);
             recipeLink.text(recipeURL);
             $("#recipe-link").append(recipeLink[0]);
 
             // Displaying recipe image //
             console.log(response.hits[5].recipe.image);
 
             var imgURL = response.hits[5].recipe.image;
             var image = $("<img>").attr("src", imgURL);
             $("#recipe-card-image").append(image);
             
             // Displaying receipe calories //
             console.log(response.hits[5]);
             var calorie=JSON.stringify(response.hits[5].recipe.calories);
             var calNum = Math.round(calorie);
              $("#calorie-card-text").text(calNum);
 
             // Displaying recipe health labels //
             console.log(response.hits[5].recipe.healthLabels);
           
             // Variable for health labels as an array //
             var healthLabelsArray = response.hits[5].recipe.healthLabels;
             var healthLabelsStr = "";
 
             // Loop to cycle through the array of health labels //
             for (i = 0; i < healthLabelsArray.length; i++) {
                 if( i > 0 ){
                     healthLabelsStr += ', ';
                 }
                 healthLabelsStr += healthLabelsArray[i];
             }
 
             $("#healthLabels-card-text").text(JSON.stringify(healthLabelsStr));
 
             // Displaying recipe ingredient lines //
             console.log(response.hits[5].recipe.ingredientLines);
             $("#recipe-item1").text(response.hits[5].recipe.ingredientLines[0]);
             $("#recipe-item2").text(response.hits[5].recipe.ingredientLines[1]);
             $("#recipe-item3").text(response.hits[5].recipe.ingredientLines[2]);
             $("#recipe-item4").text(response.hits[5].recipe.ingredientLines[3]);
             $("#recipe-item5").text(response.hits[5].recipe.ingredientLines[4]);
             $("#recipe-item6").text(response.hits[5].recipe.ingredientLines[5]);
             $("#recipe-item7").text(response.hits[5].recipe.ingredientLines[6]);
             $("#recipe-item8").text(response.hits[5].recipe.ingredientLines[7]);
             $("#recipe-item9").text(response.hits[5].recipe.ingredientLines[8]);
             $("#recipe-item10").text(response.hits[5].recipe.ingredientLines[9]);
             $("#recipe-item11").text(response.hits[5].recipe.ingredientLines[10]);
             $("#recipe-item12").text(response.hits[5].recipe.ingredientLines[11]);
             $("#recipe-item13").text(response.hits[5].recipe.ingredientLines[12]);
             $("#recipe-item14").text(response.hits[5].recipe.ingredientLines[13]);
             $("#recipe-item15").text(response.hits[5].recipe.ingredientLines[14]);
             $("#recipe-item16").text(response.hits[5].recipe.ingredientLines[15]);
             $("#recipe-item17").text(response.hits[5].recipe.ingredientLines[16]);
             $("#recipe-item18").text(response.hits[5].recipe.ingredientLines[17]);
             $("#recipe-item19").text(response.hits[5].recipe.ingredientLines[18]);
             $("#recipe-item20").text(response.hits[5].recipe.ingredientLines[19]);
         
            // Function for AJAX call to retrieve Spoonacular wine pairing information //
            $.ajax({
                url: spoonQueryURL,
                method: "GET"
            }).then(function(response) {
                // Displaying preferred wine pairings //
                console.log(response.pairedWines);
                $("#winecard-text1").text(response.pairedWines[0]);
                $("#winecard-text2").text(response.pairedWines[1]);
                $("#winecard-text3").text(response.pairedWines[2]);
            });
        });
    } // closes getItemFromApi

    // Event listener function that will trigger the AJAX call whenb the user clicks the submit button //
    $("#submit-button").on("click", function(event) {

        // event.preventDefault() prevents the submit button from trying to submit a form when clicked //
        event.preventDefault();

        $(".results").show();
        $("#recipe-card-image").empty();
        $("#winecard-text1").text("Couldn't find any wines for this dish.")
        $("#winecard-text2").empty();
        $("#winecard-text3").empty();
        $("#recipe-link").empty();
        

        // Initial variables for our two APIs with their respective keys and/or app IDs //
        var edamamKeyAPI = "9d5b06c6d10c6620183573ad18113312";
        var edamamId = "a2c8e6b6";
        var spoonacularKeyAPI = "7aaa8c8c6c4743e8abe149221960621c";
        
        // Variable that connects the user search input to complete the API query URL below //
        var recipeSearch = $("#search").val();
        getItemFromAPI(recipeSearch);
    });

    function updateFavorites(){
        if( favoritesArr && favoritesArr.length ){
            console.log('here');
            $("#favDish").empty();
            var recipeList = $("<ul>");
        
            for (var i = 0; i < favoritesArr.length; i++){
                var listItem = $("<li>");
                var itemTag = $("<a>");
                itemTag.text(favoritesArr[i]);
                itemTag.addClass('fav-item');
                listItem.append(itemTag);
                recipeList.append(listItem);

            }
                console.log(recipeList);
                $("#favDish").append(recipeList);
        }
    }


    // Process click to a favorite item
    $(document).on("click", ".fav-item", function(){
        console.log('favorite clicked');
        var favText = $(this).text().toLowerCase();
        getItemFromAPI(favText);
    });
   

    $("#fav").on("click", function(event) {
        event.preventDefault();
        recipeSearch = $("#submit-button").val();
        favoritesArr.push(recipeSearch);    
        
        
        localStorage.setItem("dish", JSON.stringify(favoritesArr));
        updateFavorites();
    });

    updateFavorites();

});