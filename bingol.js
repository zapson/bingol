// Begin do Bingol.js
var chubs = [];
var numeros = [];
var igual = false;
var n;

$(function () {
	for (var i = 1; i < 100; i++) {
		numeros.push(i);
	}

	$('#btnRoda').click(function(e){
		igual 	= false;

		n = gerarNumero();
		console.log(n);
		if(n === 100){
			alert('acabou');
			return false;
		}

		chubs.push(numeros[n]);

		numeros.splice(n, 1);

		localStorage.setItem("bingol", JSON.stringify(chubs));
		console.log(localStorage.getItem("bingol"));
	});

	/**
	*	Gera um número aleatório de acordo com o tamanho do array
	*/
	function gerarNumero(){
		if(numeros.length === 0){
			return 100;
		}
		numero = Math.floor(Math.random() * numeros.length);

		return numero;
	}
});