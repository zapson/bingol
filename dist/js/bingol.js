// Begin do Bingol.js
// Váriaveis globais
chubs = [];
var numeros = [];
var igual = false;
var n;
var stop = false;

// vai criar uma nova instancia no localstorage toda vez
//  que entrar na pagina para armazenar o jogo :D
var d = new Date();
entry = d.toJSON();

/**
 * Main fun
 */
$(function () {
	$(document).keypress(function (e) {
		if(e.charCode === 32){
			tirarBolinha();
		}
	});

	// Preenche do 1 ao 75
	for (var i = 1; i <= 75; i++) {
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

/** Função para retirar um numero */
function tirarBolinha(){
	if(!stop) {
		if(numeros.length === 0){
			stop = true;
			return true;
		}
 
		n = gerarNumero(numeros);

		// Printa o numero que saiu na tela
		$('.bingol-numero').text(n);
		chubs.push(n);
		localStorage.setItem(entry, JSON.stringify(chubs));
		atualizaNumeros(n);
	}
}

/**
*	Retorna um valor do array de numeros
*	e remove esse valor retornando o numero tirado
*/
function gerarNumero(numeros){
	var indexRandom = Math.floor(Math.random() * numeros.length);
	var numero 		= numeros[indexRandom];

	// Diz o JS que isso já vai alterar a variavel
	numeros.splice(indexRandom, 1);

	return numero;
}

/**
 * Verifica se na cartela do bingo já atingiu o máximo de caracteres e
 * pula para o próximo!
 */
function checaCaracter() {
	
	var cells = $('.bingol-cell').keydown(function (e) {
		// console.log(window.getSelection);
		// Caso seja diferente de teclas de apagar ou TAB
		if(e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 9){
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
		}
	})
}

/**
 * Valida se todos os numeros lançados correspondem
 * a cartela indicada nos campos
 */
function validarCampos() {
	$('.bingol-cells').find('input').removeClass('bingol-success');
	$('.bingol-cells').find('input').removeClass('bingol-error');
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
	var erro = { 
				i:null,
	 			valor:null 
	 			};

	/**
	 * Array para conter todos os erros
	 */
	var erros = [];

	/**
	 * Variável de controle para pular a iteração
	 */
	var skip = false;

	/**
	 * Variável de controle para pular todas as iterações
	 */
	var skipAll = false;

	var verdadeiro = false;

	/**
	 * Percorre todas os campos da cartela
	 * armazenando no vetor campos
	 * @param  {int} index   da célula
	 */
	$('.bingol-cell').each(function (index, celula) {
		campos.push($(celula));
	});

	$(campos).each(function (indexCampo, campo) {
		verdadeiro = false;
		$(chubs).each(function (indexChubs, chub) {

			// Verifica se é igual a algum elemento
			// presente em chubs e se o campo n eh verdade
			if(verdadeiro == false){
				if($(campo).val() == chub){

					// Diz que o campo é verdadeiro
					verdadeiro = true;
				} else {
					if(indexChubs == chubs.length - 1){
							erros.push({i:indexCampo, valor:$(campo).val()});
					}
				}
			}
		})
	})

	if(erros.length !==	 0) {
		$('.bingol-cells').find('input').addClass('bingol-success');

		$(erros).each(function (index, erro) {
			$('.bingol-cells').find('#'+erro.i).removeClass('bingol-success');
			$('.bingol-cells').find('#'+erro.i).addClass('bingol-error');
		})
	} else {
		stop = false;
		var audio = new Audio('assets/audio/tetra.mp3');
		$('.bingol-cells').find('input').addClass('bingol-success');
		$('#modalGanhou').modal('show');

		$('#modalGanhou').on('hidden.bs.modal', function (e) {
		  	stop = true;
		})

		$('#modalGanhou').on('shown.bs.modal', function (e) {
			audio.play();
		  	fade();
		})

		function fade() {
			if(!stop){
				$('#modalGanhou').fadeTo(600, 0.1, function () {
					setTimeout(function () {
						if(!stop){
							$('#modalGanhou').fadeTo(600, 1.0 , fade($('#modalGanhou')));
						}
					}, 300)
				})
			}
		}
	}

}

/**
 * Função para mostrar os numeros que já sairam
 * na tela de jogar
 * @param  Array numeros que já foram
 */
function atualizaNumeros(numeros) {
	$(numeros).each(function (index, value) {
		$('#numerosForam').append('<span class="btn btn-success numerinho">' + value + '</span>')
	})
}