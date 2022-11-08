const getMusic = function ( uri ) {
	const html = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${uri}" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
	return html;
};
const getArtist = function ( artist ) {
	const html = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/artist/${artist}" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
	return html;
};

const buscar = function (lobuscado) {
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "98d8757727msh41ea8bae09d95c0p125af3jsnd81dae475fd1",
			"X-RapidAPI-Host": "spotify23.p.rapidapi.com",
		},
	};

	fetch(`https://spotify23.p.rapidapi.com/search/?q=%3C${lobuscado}%3E&type=multi&offset=0&limit=2&numberOfTopResults=5`, options)
		.then((response) => response.json())
		.then((response) => {
			console.log( response );

			// MUSICA
			$(".resultados").append("<div data-tema='musica'><h2>Canciones</h2></div>");
			for ( let count = 0; count <= response.tracks.items.length - 1; count++ ) {
				const resumen = response.tracks.items[count];
				const id = response.tracks.items[count].data.id;
				$(".resultados div[data-tema=musica]").append( getMusic(id) );
			}

			// ARTISTAS
			$(".resultados").append("<div data-tema='artistas'><h2>Artistas</h2></div>");
			for ( let count = 0; count <= response.artists.items.length - 1; count++ ) {
				const resumen = response.artists.items[count];
				let artist = response.artists.items[count].data.uri;
				artist = artist.split("artist:")[1];
				$(".resultados div[data-tema=artistas]").append( getArtist(artist) );
			}
		});
};

export { getMusic, getArtist, buscar };
