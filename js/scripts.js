function convertTemp() {        
    var celcius = true;
    var val = document.getElementById('temp');
    var converted = val.textContent || val.innerText;
    var temperature_html = "";
    var celsiusToFarenheit = 0;
    var temp;

    temp = converted.substr(0,2);
    console.log("Current Temp: " + temp);
    
    if (celcius) {
        celsiusToFarenheit = (temp * 1.8) + 32;
        console.log("Temperature: " + temp + " Farenheit: " + celsiusToFarenheit);    
        temperature_html += "<div class = 'temperature'>";
        temperature_html += "<strong>" + Math.round(celsiusToFarenheit) + "°F" + "</strong>";
        temperature_html += "</div>";    
        $("#temp").html(temperature_html);   
        celcius = false;  
        console.log("Celcius state is: " + celcius);
    } else {
        console.log("Inside else function...Temp is: " + temp);
        temperature_html += "<div class = 'temperature'>";
        temperature_html += "<strong>" + temp + "°C" + "</strong>";
        temperature_html += "</div>";    
        $("#temp").html(temperature_html);        
    };   
};

function toProperCase(s)
{
  return s.toLowerCase().replace( /\b((m)(a?c))?(\w)/g,
          function($1, $2, $3, $4, $5) { if($2){return $3.toUpperCase()+$4+$5.toUpperCase();} return $1.toUpperCase(); });
};

function getDisplayIcon(desc) {
    var desc = desc.toLowerCase();
    var displayIcons = ["fa fa-sun-o fa-2x fa-border", "fa fa-cloud fa-2x fa-border", "fa fa-bolt fa-2x fa-border", "fa fa-snowflake-o fa-2x fa-border", "fa fa-tint fa-2x fa-border", "fa fa-umbrella fa-2x fa-border"];
    var displayIconsHtml = "<span id='clickableAwesomeFont' onclick='convertTemp()'><i class='";
    switch (desc) {
        case 'drizzle': 
            console.log("drizzle icon...")
            $('body').css('backgroundImage', 'url(https://farm5.staticflickr.com/4179/33743421574_4556e24569_h.jpg)');
            displayIconsHtml += displayIcons[4];
            displayIconsHtml += "' id='displayIcon'></span></i>"
            console.log(displayIconsHtml);
            $("#clickableAwesomeFont").html(displayIconsHtml);            
            break;
        case 'clouds':
            console.log("clouds icon...")
            $('body').css('backgroundImage', 'url(https://farm6.staticflickr.com/5207/5333050969_ae485a6e38_b.jpg)');
            displayIconsHtml += displayIcons[1];
            displayIconsHtml += "' id='displayIcon'></span></i>"
            console.log(displayIconsHtml);
            $("#clickableAwesomeFont").html(displayIconsHtml);
            break;  
        case 'rain':
            console.log("rain icon...")
            $('body').css('backgroundImage', 'url(https://farm5.staticflickr.com/4419/35500469724_709b76b7ee_h.jpg)');
            displayIconsHtml += displayIcons[5];
            displayIconsHtml += "' id='displayIcon'></span></i>"
            console.log(displayIconsHtml);
            $("#clickableAwesomeFont").html(displayIconsHtml);            
            break;            
        case 'snow':
            console.log("snow icon...")
            $('body').css('backgroundImage', 'url(https://farm5.staticflickr.com/4182/34342963701_bc765e05a6_h.jpg)');
            displayIconsHtml += displayIcons[3];
            displayIconsHtml += "' id='displayIcon'></span></i>"
            console.log(displayIconsHtml);
            $("#clickableAwesomeFont").html(displayIconsHtml);            
            break;       
        case 'clear':
            $('body').css('backgroundImage', 'url(https://farm7.staticflickr.com/6209/6038761491_bd4e1f0e5c_b.jpg)'); 
            console.log("clear icon...")
            displayIconsHtml += displayIcons[0];
            displayIconsHtml += "' id='displayIcon'></span></i>"
            console.log(displayIconsHtml);            
            $("#clickableAwesomeFont").html(displayIconsHtml);
            break;            
        case 'thunderstorm':
            $('body').css('backgroundImage', 'url(https://farm4.staticflickr.com/3935/15475466948_1e912dc488_h.jpg)');
            displayIconsHtml += displayIcons[2];
            displayIconsHtml += "' id='displayIcon'></span></i>"
            console.log(displayIconsHtml);
            $("#clickableAwesomeFont").html(displayIconsHtml);            
            console.log("thunderstorm icon...")
            break;            
        default:
            $('body').css('backgroundImage', 'url(https://farm5.staticflickr.com/4337/37088648005_6fb58fce22_h.jpg)');
            console.log("default icon...")
            break;            
    }
};

function getGeoPosition() {
    var long; 
    var lat;
    var bindURL = "";
    if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
           lat = position.coords.latitude;
           long = position.coords.longitude;
           console.log("Longitude: " + long + " Latitude: " + lat);
           bindURL = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;
           console.log("Our URL is: " + bindURL);
    // retrieve all weather data.
    $.ajax({
           url: bindURL,
           dataType: "json",
           crossDomain: true,
           success: function displayResponse(response) {               
                console.log("Retrieving API data...");
                console.log("City: " + response.name); 
                console.log("Country: " + response.sys.country); 
                console.log("Max Temp: " + response.main.temp_max);
                console.log("Conditions: " + response.weather[0].description);

                var city_html = ""; 
                var country_html = ""; 
                var temperature_html = ""; 
                var conditions_html = "";
                var minmax_html = "";
                city_html += "<div class = 'city'>";
                city_html += "<strong>" + response.name + ","+ "</strong>";
                city_html += "</div>";
               
                country_html += "<div class = 'country'>";
                country_html += "<strong>" + response.sys.country + "</strong>";
                country_html += "</div>";    

                temperature_html += "<div class = 'temperature'>";
                temperature_html += "<strong>" + Math.round(response.main.temp) + "°C</strong>";
                temperature_html += "</div>";               
               
                conditions_html += "<div class = 'weather_conditions'>";
                conditions_html += toProperCase(response.weather[0].main) + ", " + toProperCase(response.weather[0].description);
                conditions_html += "</div>";               
               
                minmax_html += "<div class = 'min_max'>";
                minmax_html += "Min: " + response.main.temp_min + ", " + "Max: " + response.main.temp_max + ", Humidity: " + response.main.humidity;
                minmax_html += "</div>";               
                           
                $("#city").html(city_html);
                $("#country").html(country_html);
                $("#temp").html(temperature_html);
                $("#current_conditions").html(conditions_html);
                $("#current_description").html(minmax_html);                
                $("#current_location").text("Longitude: " + long.toFixed(2) + " Latitude: " + lat.toFixed(2))
                
                // call function for changing display icon & background image.
               getDisplayIcon(response.weather[0].main);
               
           } 
       });
        function setHeader(xhr) {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Accept", "application/json");
        }            
    // end retrieve all weather data       
        });
    };


    
}