function getWeather(){
	var zipCode = document.getElementById("zipCode").value;
  	var url = "http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+",US&appid=0fc297e15359dca81b2ee9bb404b0c3b";
	jsonRequest(url);
}
function processResponse(wxObject){
	if (wxObject.weather[0].main == "Clouds"){
		document.getElementById("location").innerHTML=" <img src='https://images.fineartamerica.com/images-medium-large-5/dark-clouds-audrey-chandler.jpg' height='400' width='700';>";
	}
	if (wxObject.weather[0].main == "Clear"){
		document.getElementById("location").innerHTML=" <img src='http://il3.picdn.net/shutterstock/videos/6606776/thumb/1.jpg'height='400' width='700';>";
	}
	if (wxObject.weather[0].main == "Rain"){
		document.getElementById("location").innerHTML=" <img src='http://www.trbimg.com/img-579cb259/turbine/cgnews-heavy-rain-today-and-sunday-20160730' height='400' width='700';>";
	}   
	if (wxObject.weather[0].main == "Snow"){
		document.getElementById("location").innerHTML=" <img src='http://www.qygjxz.com/data/out/209/4659002-snow.jpg' height='400' width='700';>";
	}
	if (wxObject.weather[0].main == "Mist"){
		document.getElementById("location").innerHTML=" <img src='http://vignette1.wikia.nocookie.net/demigodshaven/images/f/f5/Mist.jpg/revision/latest?cb=20110102163040' height='400' width='700';>";
	}
	if (wxObject.weather[0].main == "Drizzle"){
		document.getElementById("location").innerHTML=" <img src='https://i.ytimg.com/vi/LbAigABOm_E/maxresdefault.jpg' height='400' width='700';>";
	}
	var result="<h3> The weather condition in "+wxObject.name+" is: "+wxObject.weather[0].main+". </h3>";
	document.getElementById("what").innerHTML=result;
	
}
function handle(e){
        if(e.keyCode === 13){
            e.preventDefault(); // Ensure it is only this code that runs
            return getWeather()
        }
    }
function processError(){
	document.getElementById("location").innerHTML=" <img src='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQYgsD60tT091XDdJJEv75Lmrrvi8SAjLeL-OiJG-Yh0oz2N3hNllWgRGW8' height='400' width='700';>";
	var error="<h3> Something went wrong! Try a different ZIP code. </h3>"
	document.getElementById("what").innerHTML=error;
	// We never call this function either. It gets started if we encounter an error while retrieving info  
    // from the weather API.   
    // You can use this function to display an error message and image if something goes wrong
	}   
function jsonRequest(url)
{
    var con = new XMLHttpRequest();
    // The following is a function within an event handler within an object. 
	// We have not covered this in class, but basically this nested function
	// will get called whenever the "state" of the connection changes - usually 
	// that means that we either got a valid response or an error message. 
	// Sometimes a connection will time out and then this never gets called.
    con.onreadystatechange = function()
    {
        if (con.readyState === XMLHttpRequest.DONE) {
            // A connection's state can change multiple times, so we need to check whether 
			// it is now done and whether the response was a good one (status 200 means everyhting is great)
    		if (con.status === 200) {
                    // If we have a good response, we take the JSON string and convert it to an object.
					// We then call the processResponse function to analye the received data
  			        processResponse(JSON.parse(con.responseText),con.responseText);
            } else {

  			        processError();
            }
        }
    };
    // This opens the connection to teh server and sends the actual request:
    con.open("GET", url, true);
    con.send();
}
