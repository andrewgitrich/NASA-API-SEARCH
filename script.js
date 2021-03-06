$(function(){

//hides the empty iframe untill a video is recieved
$("iframe").hide();

//grab value from form date search
$("#search-term").submit(function(event){
	event.preventDefault();
	getRequest($("#query").val());
});

//gets todays photo of the day immediatly
(function(){
	var inputDate = $("#query").val();
	getRequest(inputDate);
	$("#query").val("");
})();

//random button creates random num for month,day,year
$("#random").on("click", function(){
	var year = Math.floor(Math.random() * (2016 - 2001) + 2001);
 	var month = Math.floor(Math.random() * (13 - 1) + 1);
	var day = Math.floor(Math.random() * (29 - 1) + 1);
	var randomDate = year.toString() + "-" + month.toString() + "-" + day.toString();

	getRequest(randomDate);
});

//run get request with value from form
function getRequest(date){
		var params ={
			date: date,	
			api_key: "VHh1uMGyZiUyQqrCSirGZxoOZju4EHBqRWyODt31" 
			};
		
		$.ajax({
			url: "https://api.nasa.gov/planetary/apod",
			data: params,
			dataType: "json",
			type: "GET",
			})

		.done(function(result){
			var getResults = showGetResults(result);
			console.log(result);	
			});
	}

	
//display results
function showGetResults(result){

	//if a vid returns run
	if(result.media_type === "video") {
	   	$("#container").hide();
	   	$("iframe").show();
	    $("#vid-api").attr("src", result.url);
  		}

 	//if an img returns run
	else {
		$("#container").show();
	    $("#vid-api").css("display", "none"); 
	 	$("#container").css({"background-image": 'url(' + result.hdurl + ')','background-repeat': 'no-repeat','background-size': 'cover' });
  		}

		//add a title and description
  		$(".description").text(result.explanation);
		$("#title").text(result.title);
	}
});
 