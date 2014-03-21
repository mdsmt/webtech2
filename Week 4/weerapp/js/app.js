// Location
var lat;
var lon;
var geocoder = new google.maps.Geocoder();
var city;

if(navigator.geolocation){

	navigator.geolocation.getCurrentPosition(getPosition, error);

}else{
	alert('No geolocation available in your browser!');
}
function error(){
	alert('No location found!');
}
function getPosition(position){
	lat = position.coords.latitude;
	lon = position.coords.longitude;
    codeLatLng(lat, lon);
	w = new Weather(lat, lon);
}
  function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
         //formatted address
         city = results[3].formatted_address;
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }
//End location

// Change day
 var days = $("a");
  days.each(function(day){
    $(this).on("click", function(){
     weatherData(day-1);
    });
  });
// Weather
var theWeather;
var weatherDay
var skycons = new Skycons({"color": "white"});

var Weather = function (lat, lon){
	this.lat = lat;
	this.lon = lon;
	this.key = "b90e2409c25c39a24e68b8dd6d219976";
	check();
}
/* Gebruik van localStorage: In het geheugen opslaan van data

	* localStorage.setItem("NAAM", data in die naam)
	* localStorage.getItem("NAAM")

*/
function check(){
	if(!localStorage.getItem("weatherdata")){
		// Not a localStorage
		loadData();
	}else{
		// There is a storage
		if(Date().getTime - localStorage.getItem('time')< 300000){
			console.log("Data up-to-date");
		}else{
			// Old data in the storage
			loadData();
		}
	}
}
function loadData (){
	// var url = "https://api.forecast.io/forecast/"+this.key+"/"+this.lat+","+this.lon;
	var url = "https://api.forecast.io/forecast/b90e2409c25c39a24e68b8dd6d219976/"+this.lat+","+this.lon;
    console.log(url);
	$.ajax({
		url: url, 
		type: "GET", 
		dataType: "jsonp"})

    .done(function(data) {
        console.log("Great succes! *Voice of Borat*");
        theWeather = data;
        localStorage.setItem("weatherdata", JSON.stringify(this.theWeather));
        localStorage.setItem("time",new Date().getTime());

        weatherData(0);
    });
     weatherData = function(day){
    	
    	weatherDay = this.theWeather.daily.data[day];
    	show(weatherDay);
    }
    function show(weather){
    	var day = new Date(weather.time*1000);
    	var weekdays = new Array();
    	weekdays[0] = "Sunday";
    	weekdays[1] = "Monday";
    	weekdays[2] = "Tuesday";
    	weekdays[3] = "Wednesday";
    	weekdays[4] = "Thursday";
    	weekdays[5] = "Friday";
    	weekdays[6] = "Saturday";

    	var months = new Array();
    	months[0] = "January";
    	months[1] = "February";
    	months[2] = "March";
    	months[3] = "April";
    	months[4] = "May";
    	months[5] = "June";
    	months[6] = "July";
    	months[7] = "August";
    	months[8] = "September";
    	months[9] = "October";
    	months[10] = "November";
    	months[11] = "December";

		//console.log(weekdays[day.getDay()] + " " + day.getDate() + " " + months[day.getMonth()] + " " + day.getFullYear());
        var datenow = new Date();
        var nowtime = datenow.getHours();
        var nowweather = this.theWeather.hourly.data[nowtime];
        var weathernow = Math.round((nowweather.temperature-32)*5/9);
        console.log(weathernow);
        
        var mintemp = Math.round((weatherDay.temperatureMin-32)*5/9);
        var maxtemp =  Math.round((weatherDay.temperatureMax-32)*5/9);
        $("#date").text(weekdays[day.getDay()] + " " + day.getDate() + " " + months[day.getMonth()] + " " + day.getFullYear());
        $("#city").text("You are in " + city);
        $("#tempnow").text("the temperature here is " + weathernow + "°C");
        $("#weather").text(weatherDay.summary);
        $("#mintemp").text(mintemp + "°C");
        $("#maxtemp").text(maxtemp + "°C");
        
        var iconcode = weatherDay.icon;

        getIcon(iconcode);
    }

    function getIcon(code){
        this.skycons.remove("weatherimage");
        switch(code){
            case "clear-day":
                this.skycons.add(document.getElementById("weatherimage"), Skycons.CLEAR_DAY);
                break;
            case "clear-night":
                this.skycons.add(document.getElementById("weatherimage"), Skycons.CLEAR_NIGHT);
                break;
            case "rain":
                skycons.add(document.getElementById("weatherimage"), Skycons.RAIN);
                break;
            case "snow":
                skycons.add(document.getElementById("weatherimage"), Skycons.SNOW);
                break;
            case "sleet":
                skycons.add(document.getElementById("weatherimage"), Skycons.SLEET);
                break;
            case "wind":
                skycons.add(document.getElementById("weatherimage"), Skycons.WIND);
                break;
            case "fog":
                skycons.add(document.getElementById("weatherimage"), Skycons.FOG);
                break;
            case "cloudy":
                skycons.add(document.getElementById("weatherimage"), Skycons.CLOUDY);
                break;
            case "partly-cloudy-day":
                skycons.add(document.getElementById("weatherimage"), Skycons.PARTLY_CLOUDY_DAY);
                break;
            case "partly-cloudy-night":
                skycons.add(document.getElementById("weatherimage"), Skycons.PARTLY_CLOUDY_NIGHT);
                break;
            default:
                skycons.add(document.getElementById("weatherimage"), Skycons.CLEAR_DAY);
                break;

         }
          this.skycons.play();
    }

}
