var Weather = function (lat, lon){
	this.lat = lat;
	this.lon = lon;
	this.key = "b90e2409c25c39a24e68b8dd6d219976";
		alert('ja');

}

Weather.loadData = function(){
	var url = "https://api.forecast.io/forecast/"+this.key+"/"+this.lat+","+this.lon;
	console.log(url);
}