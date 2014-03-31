var client = new Faye.Client('http://localhost:8000/faye');

$('#verzenden').click(function(e) {

	var naam = $("#txtNaam").val();
	var vraag = $("#txtVraag").val();
	if(naam.length >= 3 && vraag.length >= 10){
		client.publish('/questioning', {
		  naam: naam,
		  vraag: vraag
		});
		$("#txtVraag").val("");
		$("#txtNaam").val("");
		console.log(naam + " " + vraag);
	}else{
		$('#output').text("Je naam moet minsten 3 characters lang zijn en je vraag minstens 10");
	}
});
