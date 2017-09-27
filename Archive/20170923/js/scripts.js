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

function getGeoPosition() {
    var long; 
    var lat;
    if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
           lat = position.coords.latitude;
           long = position.coords.longitude;
           console.log("Longitude: " + long + " Latitude: " + lat);
       });
    };


    $.ajax({
           url: "https://fcc-weather-api.glitch.me/api/current?lat=-26.079400999999997&lon=28.2205329",
           dataType: "json",
           crossDomain: true,
           success: function displayResponse(response) {               
                console.log("Retrieving API data...");
                console.log("City: " + response.name); 
                console.log("Country: " + response.sys.country); 
                console.log("Max Temp: " + response.main.temp_max);
                console.log("Conditions: " + response.weather["main"]);

                var city_html = ""; 
                var country_html = ""; 
                var temperature_html = ""; 
                var conditions_html = "";
                // var weatherObj = JSON.parse(response);
                // console.log("Conditions: " + weatherObj[0][1]);
                city_html += "<div class = 'city'>";
                city_html += "<strong>" + response.name + ","+ "</strong>";
                city_html += "</div>";
               
                country_html += "<div class = 'country'>";
                country_html += "<strong>" + response.sys.country + "</strong>";
                country_html += "</div>";    

                temperature_html += "<div class = 'temperature'>";
                temperature_html += "<strong>" + Math.round(response.main.temp) + " °C</strong>";
                temperature_html += "</div>";               
                           
                console.log(city_html);
                console.log(country_html);
                console.log(temperature_html);
                $("#city").html(city_html);
                $("#country").html(country_html);
                $("#temp").html(temperature_html);
           } 
       });
    function setHeader(xhr) {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Accept", "application/json");
    }    
}