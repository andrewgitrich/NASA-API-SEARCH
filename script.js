$(function(){

//hides the empty iframe untill a video is recieved
$("iframe").hide();

//grab value from form
$("#search-term").submit(function(event){
event.preventDefault();

var inputDate = $("#query").val();
	getRequest(inputDate);
	$("#query").val("");
});

//random button
$("button").on("click", function(){
	var year = Math.floor(Math.random() * (2016 - 2001) + 2001);
 	var month = Math.floor(Math.random() * (13 - 1) + 1);
	var day = Math.floor(Math.random() * (29 - 1) + 1);
	var randomDate = year.toString() + "-" + month.toString() + "-" + day.toString();
/*console.log(year);
console.log(month);
console.log(day);
console.log(randomDate);*/
	getRequest(randomDate);
});
 






//run get request with value from form
function getRequest(date){
		var params ={
			date: date,
			//hd: "",	
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
		//console.log(result);
		
	});
}
	
//display results
function showGetResults(result){
	if(result.media_type === "video") {
	   	$("#img-api").hide();
	    $("iframe").show();
	    $("#vid-api").attr("src", result.url);
  	}
	else {
		$("#img-api").show();
	    $("#vid-api").css("display", "none"); 
	    $("#img-api").attr("src", result.hdurl);
  		}

  		$("#description").text(result.explanation);
		$("#title").text(result.title);
	}


});
 