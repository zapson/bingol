// Begin do Bingol.js
var chubs = [];
var igual = false;
var n;

$(function () {
	$('#btnRoda').click(function(e){
		igual = false;

		// Isto está funcionando, a api html5 utiliza creio que uma espécie de cookie
		var numeros = {"numeros" : [1, 20, 30, 40]};

		//localStorage.setItem("bingol", JSON.stringify(numeros));
		console.log(localStorage.getItem("bingol"));
	});

	function gerarNumero(){
		numero = Math.floor(Math.random() * 100) + 1;
		$.each(chubs, function (index, chubinha) {
			if(chubinha === numero){
				igual = true;
			}
		})

		if(igual == true){
			gerarNumero();
		} else {
			return numero;
		}
	}
});