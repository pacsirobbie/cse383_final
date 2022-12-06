<!-- Author: Robbie Pacsi
Email: pacsir@miamioh.edu
Section: C
Date: 12/5/22
Final -->

var apiUrl="https://www.zipcodeapi.com/rest/<api_key>/info.<format>/<zip_code>/<units>";
var weatherURL="https://api.openweathermap.org/data/2.5/onecall"
var apiKey="?api_key=AX3JGuLPS3PPXyAIUXMkTXarZucDtrZiI4NulRUl98Usml1Lrbf8KWgZrmWkLdDK";
var weatherAPI = "appid=b672032d88d2dcd761c906ee5fde928c";
var count = 0;

lonLat();

function lonLat(zip) {
	if(count > 0) {
		var url = "https://www.zipcodeapi.com/rest/<AX3JGuLPS3PPXyAIUXMkTXarZucDtrZiI4NulRUl98Usml1Lrbf8KWgZrmWkLdDK>/info.json/"+zip+"/degrees";
		a = $.ajax({
			"url": url,
			"dataType": "json",
			method: "GET"
		}).done(function(data) {
			//Clear errors
			$("#error").html("");
			
			var lon = data.resource[0].longitude;
			var lat = data.resource[0].latitude;
			var city = data.resource[0].city;
			var state = data.resource[0].state;
			var cityState = city + ", " + state;
			
			$("#location").html(cityState);
			weatherFind(lon,lat);
		
		}).fail(function(error) {
			$("#location").html("");
			$("#error").html("Longitude and/or latitude could not be located. Please enter a valid zip code.");
			$("#weather").css('visibility', 'hidden');
		});
	}
	
	count++;
}

function weatherFind(lon, lat) {
	a = $.ajax({
		url: weatherURL + "?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&" + weatherAPI,
		method: "GET"
	}).done(function(data) {
		
		var var1 = new Date();
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		
		for(let j = 1; j <=7; j++) {
			var dayWeek = var1.getDay() + j;
			var month = var1.getMonth() + 1;
			var day = var1.getDate() + j;
			var year = var1.getFullYear();
			
			if(dayWeek < 7) {
				dayWeek = days[d.getDay() + j];
			}
			else if(dayWeek == 7) dayWeek = days[0];
			else if(dayWeek == 8) dayWeek = days[1];
			else if(dayWeek == 9) dayWeek = days[2];
			else if(dayWeek == 10) dayWeek = days[3];
			else if(dayWeek == 11) dayWeek = days[4];
			else if(dayWeek == 12) dayWeek = days[5];
			
			if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
				if(day == 32) day = 1;
				if(day == 33) day = 2;
				if(day == 34) day = 3;
				if(day == 35) day = 4;
				if(day == 36) day = 5;
				if(day == 37) day = 6;
			}
			else if(month == 2) {
				if(day == 29) day = 1;
				if(day == 30) day = 2;
				if(day == 31) day = 3;
				if(day == 32) day = 4;
				if(day == 33) day = 5;
				if(day == 34) day = 6;
			}
			else {
				if(day == 31) day = 1;
				if(day == 32) day = 2;
				if(day == 33) day = 3;
				if(day == 34) day = 4;
				if(day == 35) day = 5;
				if(day == 36) day = 6;
			}
			
			
			var picture1 = "http://openweathermap.org/img/wn/";
			picture1 += data.daily[j].weather[0].icon;
			picture1 += "@2x.png";
			
			
			var weather1 = data.daily[j].weather[0].description;
				
			
			var temp = data.daily[j].temp.day;
			var high = data.daily[j].temp.max;
			var low = data.daily[j].temp.min;
			temp = Math.round(temp);
			high = Math.round(high);
			low = Math.round(low);
			
			$("#dayWeek" + j).html(dayWeek);
			$("#date" + j).html(month + "/" + day + "/" + year);
			$("#day" + j).html("<img id ='day" + j + "' src=" + picture1 + ">");
			$("#weather" + j).html(weather1);
			$("#temp" + j).html("Temp: " + temp + "°F");
			$("#high" + j).html("High: " + high + "°F ");
			$("#low" + j).html("Low: " + low + "°F ");
		}
		
		$("#weather").css('visibility', 'visible');
	
	}).fail(function(error) {
		$("#error").html("Error gathering weather data with OpenWeatherMap.");
	});
}