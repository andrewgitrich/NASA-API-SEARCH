$(function(){

$("iframe").hide();
//grab value from form
$("#search-term").submit(function(event){
event.preventDefault();

var inputDate = $("#query").val();
	getRequest(inputDate);
	//console.log(inputDate);
	$("#query").val("");
});


//run get request with value
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
		console.log(result);
		
	});
}
	
//display results
function showGetResults(result){
	if(result.media_type === "video") {
	   $("img-api").css("display", "none");
	    $("iframe").show();
	    $("#vid-api").attr("src", result.url);
  	}
	else {
	    $("#vid-api").css("display", "none"); 
	    $("#img-api").attr("src", result.hdurl);
  		}

  		$("#description").text(result.explanation);
		$("#title").text(result.title);
	}


});
 