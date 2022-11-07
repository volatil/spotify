
// TRAE DATA
Promise.all([
	fetch("https://spreadsheets.google.com/feeds/list/1aZlC5KaMoyEPVqbMiH8_bPCsZoh65PBW9cm0HpG8Kjk/1/public/values?alt=json").then(value => value.json())
])
	.then((value) => {
		const data = value[0].feed.entry;
		for (let fila = 0; fila <= data.length - 1; fila++) {
			const id = data[fila].gsx$id.$t;
			const stock = data[fila].gsx$stock.$t;
			const marca = data[fila].gsx$marca.$t;
			const modelo = data[fila].gsx$modelo.$t;
			const color = data[fila].gsx$color.$t;
			// desde el valor "precio_cliente"
			// var preciocliente  = data[fila].gsx$preciocliente.$t;
			// desde el valor "precio_neto"
			let preciocliente = data[fila].gsx$precioneto.$t;
			preciocliente = Number(preciocliente) + 1;
			const talla = data[fila].gsx$talla.$t;
			let imagen	= data[fila].gsx$imagen.$t;
			if (imagen.split(" ").length >= 2) {
				for (let imgcount = 0; imgcount <= imagen.split(" ").length - 1; imgcount++) {
					$(".getDetalle .galeria").append(`<img class="lazyload" src="${imagen.split(" ")[imgcount]}" alt="${marca} - ${modelo}" />`);

					$(".getDetalle > .galeria > img").click(function () {
						const ruta = $(this).attr("src");
						$(".getDetalle > img").attr("src", ruta);
					});
				};
				imagen = imagen.split(" ")[0];
			};

			let descripcion = data[fila].gsx$descripcion.$t;
			if( descripcion.length >= 1 ) {
				descripcion = "("+descripcion+")";
			};
			
			// Agrega FILTROS
			if( !$( ".filtros .marca ul" ).html().includes( marca ) ) {
				$( ".filtros .marca ul" ).append( `
					<li class="${marca}">
			 			<img class="lazyload" data-src="./imagenes/marcas/${marca}-negro.svg" alt="${marca}" />
			 		</li>
				` );
			};
			// Agrega PRODUCTOS
			if ( stock == "1" ) {
				$( ".productos ul" ).prepend( `
					<li data-talla="${talla}" data-stock="${stock}" data-id="${id}" data-zapatilla="${marca} ${modelo} ${color}">
						<a href="/detalle.html?id=${id}" title="${marca} ${modelo}">
							<img class="lazyload" data-src="${imagen}" alt="${marca} ${modelo} ${color}" /> 
							<span class="modelo">${modelo}</span>
							<span class="marca">${marca}</span>
							<span class="color">${color}</span>
							<span class="precio">${puntuacion(preciocliente)}</span>
							<span class="talla">${talla}</span>
							<span class="descripcion">${descripcion}</span>
							<span class="id">#${id}</span>
						</a>
					</li>
				` );
			}
			$( ".productos .cargando" ).hide();
		};
		
		cuentaProductos( ".filtros span.cantidad" );
		
		// FILTRO
		$( ".filtros > .marca > ul > li" ).click(function(){
			$( ".buscador > input" ).val( "" );
			$( ".filtros > .marca > ul > li" ).removeClass( "activo" );
			$( this ).addClass( "activo" );
			var filtrando = $( this ).attr( "class" ).split( "activo" )[0];
			buscar( filtrando );
			cuentaProductos( ".filtros span.cantidad" );
		});

	});	

console.log("Conectado ✔️");