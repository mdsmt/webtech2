var client = new Faye.Client('http://localhost:8000/faye');
var i = 0;
$('#verzenden').click(function(e) {

	var naam = $("#txtNaam").val();
	var vraag = $("#txtVraag").val();
	if(naam.length >= 3 && vraag.length >= 10){
		client.publish('/questioning', {
		  naam: naam,
		  vraag: vraag,
		  eventnaam: "eventnaam"
		});
		// $("#txtVraag").val("");
		// $("#txtNaam").val("");
		// console.log(naam + " " + vraag);


	}
	else{
		$('#output').text("Je naam moet minsten 3 characters lang zijn en je vraag minstens 10");
	}
	return false;
});
client.subscribe('/showing', function(showing) {
			var id = showing.id;
			var vraag = showing.vraag;
			var naam = showing.naam;
			var likes = showing.likes;
			console.log(vraag + " " + id + " #" + likes);
			var text ='';
			text +='<div class="likevragen" id="vraag' + i + '" >'
			text +=		'<div class="likebutt">'
			text +=			'<div href= "#"class="like">+</div><br />';
			text +=			'<div href="#" class="dislike">-</div>';
			text +=		'</div>'
			// text += 	'<p class="naam">' + naam + '</p><p class="vraag">' + vraag + '</p>'
			text += 	'<p class="vraag">' + vraag + '</p>';
			text +='</div>';
			$('#allquestions').prepend(text);
			

			//$('#allquestions').prepend('<div id="vraag' + i + '" ><a href= "#"class="like">Like</a><a href="#" class="dislike">Dislike</a><p class="naam">' + naam + '</p><p class="vraag">' + vraag + '</p></div>');
			$("#txtVraag").val("");
			$("#txtNaam").val("");
			i++;
});


$("#allquestions").on("click","div.dislike",function(e) {

	var dislikeID = $(this).parent().parent().attr('id');
	console.log(dislikeID);
	client.publish('/dislikevoting', {
		 dislikeID: dislikeID
	});	
});

$("#allquestions").on("click","div.like",function(e) {

	var likeID = $(this).parent().parent().attr('id');
	console.log(likeID);
	client.publish('/likevoting', {
		 likeID: likeID
	});
});