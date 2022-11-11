import {
	getMusic,
	getArtist,
	buscar,
	loading,
} from "./functions.js";

// setTimeout(() => {
// 	console.log("JE!");
// 	$(".resultados").html(loading);
// }, 2000);

$("header .buscador button").on("click", function () {
	const lobuscado = $(this).parent().find("input").val();
	buscar(lobuscado);
});

// Al presionar ENTER busca
$("header .buscador").keypress(function (e) {
	const code = (e.keyCode ? e.keyCode : e.which);
	if ( code === 13 ) {
		const lobuscado = $(this).parent().find("input").val();
		buscar(lobuscado);
	}
});

// https://dribbble.com/shots/16856425-SazheSound-Music-Player
