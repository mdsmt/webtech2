var client = new Faye.Client('http://localhost:8000/faye');
var i = 1;
client.subscribe('/questioning', function(questioning) {
	var naam = questioning.naam;
	var vraag = questioning.vraag;
	$('#allquestionsshow').prepend('<div id="vraag' +i + '"><p class="vraag">' + vraag + '</p></div>');
  	console.log(naam + " " + vraag);
  	i++;
});



client.subscribe('/dislikevoting', function(voting) {
	var dislikeID = voting.dislikeID;
	var id = '#allquestionsshow #' + dislikeID;
	$(id).css("font-size", "-=1px");

	console.log(dislikeID);
});

client.subscribe('/likevoting', function(voting) {
	var dislikeID = voting.dislikeID;
	var id = '#allquestionsshow #' + dislikeID;
	$('#allquestionsshow #' + dislikeID).css("font-size", "+=1px");

	console.log(dislikeID);
});
