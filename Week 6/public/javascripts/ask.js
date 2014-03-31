var client = new Faye.Client('http://localhost:8000/faye');

$('#verzenden').click(function(e) {

	var naam = $("#txtNaam").val();
	var vraag = $("#txtVraag").val();
	client.publish('/questioning', {
	  naam: naam,
	  vraag: vraag
	});
	console.log(naam + " " + vraag);
});
