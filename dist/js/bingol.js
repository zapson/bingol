// Begin do Bingol.js
var chubs = [];
var numeros = [];
var igual = false;
var n;
// vai criar uma nova instancia no localstorage toda vez que entrar na pagina para armazenar o jogo :D
var d = new Date();
var entry = d.toJSON();

$(function () {

	for (var i = 1; i < 100; i++) {
		numeros.push(i);
	}

	$('#btnRoda').click(function(e){
		tirarBolinha();
	});



	$('#btnBingo').click(function () {
		
	})

});

function tirarBolinha(){
	if(numeros.length === 0){
		return false;
	}

	n = gerarNumero();

	$('.bingol-numero').text(n);

	chubs.push(numeros[n]);

	numeros.splice(n, 1);

	localStorage.setItem(entry, JSON.stringify(chubs));
}

/**
*	Gera um número aleatório de acordo com o tamanho do array
*/
function gerarNumero(){
	numero = Math.floor(Math.random() * numeros.length);

	return numero;
}