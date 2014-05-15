var client = new Faye.Client('http://localhost:8000/faye');
var datavraag = [];
var i = 0;
generateUUID: function generateUUID() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	}	


client.subscribe('/questioning', function(questioning) {
	var naam = questioning.naam;
	var vraag = questioning.vraag;
	var eventnaam = questioning.eventnaam;
	var object = {
      id: generateUUID(),
      gebruiker: naam,
      vraag: vraag,
      likes: 0
    }
	datavraag.push(object);
	console.log(datavraag);
	console.log(datavraag[0].id);

	console.log(datavraag['vraag'] + " door " + datavraag['gebruiker']);

	$('#allquestionsshow').prepend('<div class="vragen" id="vraag' + i + '"><div class="vraagdiv"><p class="vraag">' + datavraag[i].vraag + '</p><p class="gebruikerdiv">Door ' + datavraag[i].gebruiker + '</p></div><div class="likediv"><p>' + datavraag[i].likes + '</p></div></div>');
	client.publish('/showing', {
	 	  id: datavraag[i].id,
	 	  vraag: datavraag[i].vraag,
	 	  naam: datavraag[i].gebruiker,
	 	  likes: datavraag[i].likes
	 	});
	console.log(datavraag[i].vraag + " door " + datavraag[i].gebruiker);

	console.log(jQuery.inArray(datavraag[i].id, datavraag[i]));
	i++;


 //  	console.log(naam + " " + vraag);
 
});



client.subscribe('/dislikevoting', function(voting) {
	var dislikeID = voting.dislikeID;
	var idvraag = dislikeID.substr(5);

	/*var id = '#allquestionsshow #' + dislikeID;
	$(id).css("font-size", "-=1px");*/

	var history = datavraag[idvraag].likes;
	var future = history - 1;
	datavraag[idvraag].likes = future;
	$("#allquestionsshow #" + dislikeID + " .likediv p").html(datavraag[idvraag].likes);
});

client.subscribe('/likevoting', function(voting) {
	var likeID = voting.likeID;
	var idvraag = likeID.substr(5);
	/*var id = '#allquestionsshow #' + dislikeID;
	$('#allquestionsshow #' + dislikeID).css("font-size", "+=1px");*/

	var history = datavraag[idvraag].likes;
	var future = history + 1;
	datavraag[idvraag].likes = future;
	$("#allquestionsshow #" + likeID + " .likediv p").html(datavraag[idvraag].likes);
	// vraagarray[0][0]

	//console.log(dislikeID);
});
