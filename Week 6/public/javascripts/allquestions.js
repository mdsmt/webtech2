var client = new Faye.Client('http://localhost:8000/faye');

client.subscribe('/questioning', function(questioning) {
	var naam = questioning.naam;
	var vraag = questioning.vraag;
  	console.log(naam + " " + vraag);
});