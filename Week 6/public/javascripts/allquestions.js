var client = new Faye.Client('http://localhost:8000/faye');

client.subscribe('/questioning', function(questioning) {
	var naam = questioning.naam;
	var vraag = questioning.vraag;
	$('#allquestions').prepend('<div class="vraag"><a class="like">Like</a> <a class="dislike">Dislike</a><p class = "naam">' + naam + '</p><p class="vraag">' + vraag + '</p></div>');
  	console.log(naam + " " + vraag);
});

