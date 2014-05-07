var client = new Faye.Client('http://localhost:8000/faye');
var i = 0;
var vraagarray = new Array();

client.subscribe('/questioning', function(questioning) {
	var naam = questioning.naam;
	var vraag = questioning.vraag;

	vraagarray.push([vraag, naam, 0]);

	console.log(vraagarray[i][0] + " door " + vraagarray[i][1]);

	$('#allquestionsshow').prepend('<div id="vraag' +i + '"><p class="vraag">' + vraagarray[i][0] + ' #' + vraagarray[i][2] + '</p></div>');
  	console.log(naam + " " + vraag);
  	i++;
});



client.subscribe('/dislikevoting', function(voting) {
	var dislikeID = voting.dislikeID;
	var idvraag = dislikeID.substr(5);

	/*var id = '#allquestionsshow #' + dislikeID;
	$(id).css("font-size", "-=1px");*/

	var history = vraagarray[idvraag][2];
	var future = history - 1;
	vraagarray[idvraag][2] = future;
	$("#allquestionsshow #" + dislikeID).html(vraagarray[idvraag][0] + ' #' + vraagarray[idvraag][2]);
	console.log(vraagarray[idvraag][1]);		
});

client.subscribe('/likevoting', function(voting) {
	var dislikeID = voting.dislikeID;
	var idvraag = dislikeID.substr(5);
	/*var id = '#allquestionsshow #' + dislikeID;
	$('#allquestionsshow #' + dislikeID).css("font-size", "+=1px");*/

	var history = vraagarray[idvraag][2];
	var future = history + 1;
	vraagarray[idvraag][2] = future;
	$("#allquestionsshow #" + dislikeID).html(vraagarray[idvraag][0] + ' #' + vraagarray[idvraag][2]);
	console.log(vraagarray[idvraag][1]);		

	//console.log(dislikeID);
});
