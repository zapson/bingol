// Begin do Bingol.js
var chubs = [];
var numeros = [];
var igual = false;
var n;

$(function () {
	console.log(localStorage);
	// vai criar uma nova instancia no localstorage toda vez que entrar na pagina para armazenar o jogo :D
	var d = new Date();
	var entry = d.toJSON();

	for (var i = 1; i < 100; i++) {
		numeros.push(i);
	}

	$('#btnRoda').click(function(e){
		if(numeros.length === 0){
			alert('acabou');
			return false;
		}

		n = gerarNumero();

		chubs.push(numeros[n]);

		numeros.splice(n, 1);

		localStorage.setItem(entry, JSON.stringify(chubs));
	});

	$('#btnBingo').click(function () {
		
	})

});

/**
*	Gera um número aleatório de acordo com o tamanho do array
*/
function gerarNumero(){
	numero = Math.floor(Math.random() * numeros.length);

	return numero;
}