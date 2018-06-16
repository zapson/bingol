// Begin do Bingol.js
// Váriaveis globais
chubs = [];
var numeros = [];
var igual = false;
var n;
var stop = false;

// vai criar uma nova instancia no localstorage toda vez que entrar na pagina para armazenar o jogo :D
var d = new Date();
entry = d.toJSON();

$(function () {
	$(document).keypress(function (e) {
		if(e.charCode === 32){
			tirarBolinha();
		}
	});
	for (var i = 1; i < 100; i++) {
		numeros.push(i);
	}

	$('#btnRoda').click(function(e){
		tirarBolinha();
	});

	$('#btnBingo').click(function () {
		checaCaracter();
	})

	$('.btn-validar').click(function () {
		validarCampos();
	})

});

if(!stop) {
	function tirarBolinha(){
		if(numeros.length === 0){
			stop = true;
		}
 
		n = gerarNumero();

		$('.bingol-numero').text(n);

		chubs.push(numeros[n]);

		numeros.splice(n, 1);

		localStorage.setItem(entry, JSON.stringify(chubs));
	}
}

/**
*	Gera um número aleatório de acordo com o tamanho do array
*/
function gerarNumero(){
	numero = Math.floor(Math.random() * numeros.length);

	return numero;
}

/**
 * Verifica se na cartela do bingo já atingiu o máximo de caracteres e
 * pula para o próximo!
 */
function checaCaracter() {
	var cells = $('.bingol-cell').keydown(function () {
		if($(this).val().length == 2) {
			var nextCell = cells.get(cells.index(this) + 1);
			if(nextCell){
				nextCell.focus();
			} else {
				nextCell = cells.get(cells.index(this) + 2);
				if(nextCell){
					nextCell.focus();
				}
			}
		}
	})
}

/**
 * Valida se todos os numeros lançados correspondem
 * a cartela indicada nos campos
 */
function validarCampos() {

	/**
	 * Armazena os números marcados da cartela
	 * já preenchida
	 * @type {Array}
	 */
	var campos = [];

	/**
	 * Variável de controle quando um número 
	 * está errado
	 */
	var erro;

	/**
	 * Variável de controle para pular a iteração
	 */
	var skip = false;

	/**
	 * Percorre todas os campos da cartela
	 * armazenando no vetor campos
	 * @param  {int} index   da célula
	 */
	$('.bingol-cell').each(function (index, celula) {
		campos.push($(celula));
	});

	$(campos).each(function (index, campo) {
		$(chubs).each(function (index, chub) {
			// Verifica se já ocorreu a verificação do
			// elemento
			if(skip){
				return;
			}
			// Verifica se é igual a algum elemento
			// presente em chubs
			if($(campo).val() == chub){

				// Se sim pula para o próximo elemento do campo
				skip = true;
				return true;
			}
			
		})
	})

	console.log(chubs);
	console.log(localStorage);
	console.log(localStorage.getItem(entry));
}