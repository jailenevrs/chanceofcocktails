// This code's purpose is to recomend a cocktail, based on the current weather conditions in any city.
// The user is to input a city's name, and the program will fetch the current temperature in that city from api.openweathermap.org.
// Based on the temperature in that city, a random drink will be chosen from weather related cocktail arrays.
// Information about that drink will be fetched from thecocktaildb.com API, and displayed on the webpage.



// Assigning the api.opemweathermap.org key to var api.  Developement team started account in order to obtain key.
// Key must be in url in order to fetch from api.opemweathermap.org.
const api = "c90b5488ed6ad2675575883e578f5209"

var city  // To be used in event listener.

// Array is created holding cocktails appropriate for hot weather.

$("#submitButton").on("click", function (event) {
  event.preventDefault();
  city = $("#cityInput").val();
  console.log(city);
  getLatLong(city);
});

function getLatLong(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=imperial`
  )
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      console.log("Weather API:",apiResults);
      let lat = apiResults.coord.lat;
      let lon = apiResults.coord.lon;
      var html =
      `<div class="card" style="width:10rem">
        <div class="card-body">
          <h5 class="card-title">${city}
            <img src="http://openweathermap.org/img/wn/${apiResults.weather[0].icon}@2x.png" class="card-img-top" alt="...">
          </h5>
            <p class="card-text">Temp: ${apiResults.main.temp}</p>
            <p class="card-text">Humidity: ${apiResults.main.humidity}</p>
            <p class="card-text">Windspeed: ${apiResults.wind.speed}</p>
            <p class="card-text">Description: ${apiResults.weather[0].description}</p>
        </div>
      </div>`
      document.getElementById("#weatherHeader").innerHTML = html
      getFiveDayForcast(lat,lon,city)
      // TODO pass function that will use conditions to choose drink based on weather
    });
}
// TODO: see what the current weather is (know the keywords the weather API uses)
// TODO: display the weather conditions for that city
// // connect to Open Weather Map API
// // get current weather information

// TODO: randomly find a cocktail from the array based on the weather
// // create arrays that hold cocktails by weather category
sunnyCocktails = [
  "aperol_spritz",
  "caipirinha",
  "daiquiri",
  "mai_tai",
  "margarita",
  "mint_julep",
  "mojito",
  "moscow - mule",
  "tom_collins",
  "pina_colada",
];

// Array is created holding cocktails appropriate for moderate weather.
moderateWeatherCocktails = [
  "cosmopolitan",
  "espresso_martini",
  "last_word ",
  "old_fashioned",
  "manhattan",
  "martinez",
  "martini",
  "negroni",
  "rusty_nail",
  "vesper",
];

// Array is created holding cocktails appropriate for cold weather.
coldWeatherCocktails = [
  "hot_creamy_bush",
  "hot_toddy",
  "irish_coffee",
  "nutty_irishman",
  "orange_scented_hot_chocolate",
  "rum_toddy",
  "spanish_chocolate",
  "snowday",
  "swedish_coffee",
  "talos_coffee",
];


// Event listener for submit button is created.  
// Once user enters city name and clicks on submit button, the input is assigned to var city.
// var city is then passed into the getDrink function.
$('#submitButton').on('click', function (event) {
  event.preventDefault()
  city = $('#cityInput').val()
  console.log(city) // console log
  getDrink(city)
})

// getDrink function randomly chooses a cocktail based on the current temperature in the the city being passed into the function.
// If the current temperature in that city is over 79 degrees F, 
// the function will randomly chose a cocktail from an array of hot weather cocktails.
// If the current temperature in that city is over 49 degrees F, and under 80 degrees F, 
// the function will randomly chose a cocktail from from an array of moderate weather cocktails.
// If the current temperature in that city is below 50 degrees F, 
// the function will randomly chose a cocktail from an array of cold weather cocktails.
// The function will then call the getCocktailInfo() function, 
// which fetches cocktail information and displays it.
function getDrink(city) {

  var drink

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=imperial`)
    .then(data => {

      return data.json()

    }).then(function (apiResults) {

      // Test fetched data in console.log
      console.log('weather API: ', apiResults)

      if (apiResults.main.temp > 79) {

        drink = hotWeatherCocktails[Math.floor(Math.random() * hotWeatherCocktails.length)]

      } else if (apiResults.main.temp > 49) {

        drink = moderateWeatherCocktails[Math.floor(Math.random() * moderateWeatherCocktails.length)]

      } else {

        drink = coldWeatherCocktails[Math.floor(Math.random() * coldWeatherCocktails.length)]
      }

      getCocktailInfo(drink)

      var html =
        `<div class="card" style="width:10rem">
        <div class="card-body tempIcons">
          <h5 class="card-title">${city}
            <img src="http://openweathermap.org/img/wn/${apiResults.weather[0].icon}@2x.png" class="card-img-top" alt="...">
          </h5>
            <p class="card-text">Temp: ${apiResults.main.temp}</p>
        </div>
      </div>`

      document.getElementById("#html").innerHTML = html

    })
}

// getCocktailInfo() function fetches cocktail information based on the drink that is passed into it from the getDrink() function.
// The function builds and HTML card that displays the cocktail information.
function getCocktailInfo(drink) {

  // Console log the drink object from the API.
  console.log(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)

  fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then((response) => {

      return response.json()

    }).then((data) => {

      // Test fetched data in console.log
      console.log("API", data)

      // Build card containing drink information and asign it to var html.
      var html =
        `<div class="card">`
    })

// var randomSelect = Math.floor(Math.random() * sunnyCocktails.length);
// var drink = sunnyCocktails[randomSelect];

getCocktailAPI(drink);
function getCocktailAPI(drink) {
  console.log(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`);
  fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("API", data);
      var html = `<div id="drinkCard" class="card">

      <div class="card-image">
        <figure class="image is-4by3">
          <!--Display thumbnail from fetched drinks object-->
          <img src="${data.drinks[0].strDrinkThumb}"alt="Placeholder image"> 
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <figure class="image is-48x48"></figure>
          <div class="media-content">
          <!--Display drink name from fetched drinks object-->
            <p class="title is-5">${data.drinks[0].strDrink}</p>

            <!--Call getIngredients() function to process the ingredients from the fetched drink object and display them--!>

            <p class="ingredientTitle"> Ingredients: </p>
            <ul style="list-style-type:disc;">

            ${getIngredients(data.drinks[0])}
            </ul>
          </div>
        </div>

        <div class="content">
        <!--This is where strInsructions is fetched from drinks object and displayed-->
          <p "is-3">${data.drinks[0].strInstructions}</p>
      </div>
      </div>
    </div>`

      // Display the html card.
      document.getElementById("cocktailChoice").innerHTML = html

      // Handle errors.
    }).catch((err) => {

      // Display error in console log.
      console.error(err)

    })

  // The getIngredients() function processes, and returns, the ingredients and measurements of 
  // the randomly chosen cocktail from the drinks object that was fetched from the thecocktaildb.com API.
  // It is called in the getCocktailInfo() function.
  function getIngredients(drink) {

    var ingredients = ""

    for (var i = 0; i < 15; i++) {

      var ingredientName = drink['strIngredient' + (i + 1)]

      if (!ingredientName) {

        break

      }

      var measure = drink['strMeasure' + (i + 1)]

      ingredients += `<p class="subtitle is-6">${ingredientName} ${measure}</p>`

    }
    return ingredients;
    
  //       `<div class="content" id="showNot">
  //         <a href="#">Ingredients: d</a> <a href="#">#responsive</a>
  //     </div>
  //     </div>
  //   </div>;
  //     document.getElementById("cocktailChoice").innerHTML = html;
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });`

  // function getIngredients(drink) {
  //   var ingredients = "";
  //   for (var i = 0; i < 15; i++) {
  //     var ingredientName = drink["strIngredient" + (i + 1)];
  //     if (!ingredientName) {
  //       break;
  //     }
  //     var measure = drink["strMeasure" + (i + 1)];
  //     ingredients += <li class="subtitle is-6"> ${ingredientName} ${measure} </li>;
    }

  }
}




// var requestUrl = 'www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

// $.get(requestUrl, function(data){
//   console.log(data);
//   console.log
