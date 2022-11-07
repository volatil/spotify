
// var bd      = "../imagenes/values.json";
// var bd      = "https://spreadsheets.google.com/feeds/list/1aZlC5KaMoyEPVqbMiH8_bPCsZoh65PBW9cm0HpG8Kjk/1/public/values?alt=json";
var bd = "https://sheets.googleapis.com/v4/spreadsheets/1aZlC5KaMoyEPVqbMiH8_bPCsZoh65PBW9cm0HpG8Kjk/values/inventario?key=AIzaSyAOWV0qar-gsYcyp5yWS99GQlPVovkuxcU";
var ventas  = "https://sheets.googleapis.com/v4/spreadsheets/1aZlC5KaMoyEPVqbMiH8_bPCsZoh65PBW9cm0HpG8Kjk/values/Ventas?key=AIzaSyAOWV0qar-gsYcyp5yWS99GQlPVovkuxcU";
// var cometa  = 14990;
var cometa  = 19990;

//- Capitalize()
const capitalize = (s) => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
}

// PUNTUACION PRECIOS
var puntuacion = function( uwu ){
	var uwu = String(uwu);
	if ( uwu.length == 0 ) {
		uwu = "";
		return uwu;
	} else if ( uwu.length == 4 ) {
		uwu = "$ " + uwu.slice( 0 , 1 ) + "." + uwu.slice( 1 );
		return uwu;
	} else if ( uwu.length == 5 ) {
		uwu = "$ " + uwu.slice( 0 , 2 ) + "." + uwu.slice( 2 );
		return uwu;
	} else if ( uwu.length == 6 ) {
		uwu = "$ " + uwu.slice( 0 , 3 ) + "." + uwu.slice( 3 );
		return uwu;
	} else {
		return uwu;
	};
};

// Calcula Fecha de Entrega
const fechaEntrega = function() {
	let mesSET = [ "Enero" , "Febrero" , "Marzo" , "Abril" , "Mayo" , "Junio" , "Julio" , "Agosto" , "Septiembre" , "Octubre" , "Noviembre" , "Diciembre" ];
	let diaSET = [ "Domingo" , "Lunes" , "Martes" , "Miercoles" , "Jueves" , "Viernes" , "Sabado" ];
	let fecha = new Date();
	fecha.setDate( fecha.getDate() + 15 );
	return `<strong>Fecha de entrega:</strong> ${ diaSET[ fecha.getDay() ] } ${fecha.getDate()} de ${ mesSET[ fecha.getMonth() ] }.`;
};

// CONTADOR DE RESULTADOS
var cuentaProductos = function( donde ){
	var cantidadResultados = $( '.productos li:visible' ).length;
	if ( cantidadResultados >= 2 ) {
		$( donde ).html( "<strong>" + cantidadResultados + "</strong> Resultados" );
	} else if ( cantidadResultados == 1 ) {
		$( donde ).html( "<strong>" + cantidadResultados + "</strong> Resultado" );
	} else {
		$( donde ).html( "No se encontrarón resultados" );
	};
}; 

// BUSCADOR
var buscar = function( valor ){
	if( valor == "todo" ) {
		$( ".productos li" ).removeClass( "hide" );
		$( ".productos li" ).removeClass( "show" );
		$( ".buscador .filtros > ul > li" ).removeClass( "activo" );
	} else {
		$.each( $( ".productos li" ) , function(){
			if ( valor.length <= 1 ) {
				$( ".productos li" ).removeClass( "hide" );
				$( ".productos li" ).removeClass( "show" );
			} else if ( $( this ).attr( "data-zapatilla" ).indexOf( valor ) >= 0 ){
				$( ".productos li" ).addClass( "hide" );
				$( this ).addClass( "show" );
			} else {
				$( this ).removeClass( "show" );
				$( this ).removeClass( "hide" );
				$( this ).addClass( "hide" );
			};
		});
	};
};

// FILTRO TALLA
var filtrarPorTalla = function( tallaBuscada ) {
	
	if ( tallaBuscada == "todas" ) {
		$( ".productos > ul li" ).show();
	} else {
		$.each( $( ".productos > ul li" ) , function(){
		
			var tallas  = $( this ).attr( "data-talla" );
			
			if ( tallas.includes( tallaBuscada ) ) {
				$( this ).show();
				$( this ).css( "display" , "inline-block" );
			} else {
				$( this ).hide();
			};
			
		});
	};
	
};

// ENLISTA COLORES
var listaColor = function( selectColor , padre ){
					
	var colorTodos  = "";
	for( var cuentaColor = 0; cuentaColor <= selectColor.split( " " ).length-1; cuentaColor++ ) {
		
		switch( selectColor.split( " " ).length ) {
			case 1:
				var cantidadColores = "somos1";
				break;
			case 2:
				var cantidadColores = "somos2";
				break;
			case 3:
				var cantidadColores = "somos3";
				break;
			case 4:
				var cantidadColores = "somos4";
				break;
			case 5:
				var cantidadColores = "somos5";
				break;
			case 6:
				var cantidadColores = "somos6";
				break;
			default:
				var cantidadColores = "somosVarios";
		}
		
		let colorsete = selectColor.split( " " )[cuentaColor];
		switch( colorsete ) {
			case "negro":
				colorTodos += `<span title="negro" style="background:black"></span>`;
				break;
			case "amarillo":
				colorTodos += `<span title="amarillo" style="background:yellow"></span>`;
				break;
			case "rojo":
				colorTodos += `<span title="rojo" style="background:red"></span>`;
				break;
			case "blanco":
				colorTodos += `<span title="blanco" style="background:white"></span>`;
				break;
			case "rosado":
				colorTodos += `<span title="rosado" style="background:#fe89b2"></span>`;
				break;
			case "celeste":
				colorTodos += `<span title="celeste" style="background:#7fddf9"></span>`;
				break;
			case "naranjo":
				colorTodos += `<span title="naranjo" style="background:#ff5a00"></span>`;
				break;
			case "menta":
				colorTodos += `<span title="menta" style="background:#91c2a5"></span>`;
				break;
			case "morado":
				colorTodos += `<span title="morado" style="background:#8e6f9e"></span>`;
				break;
			case "verde":
				colorTodos += `<span title="verde" style="background:#77ca45"></span>`;
				break;
			case "fluor":
				colorTodos += `<span title="fluor" style="background:#00ef80"></span>`;
				break;
			case "burdeo":
				colorTodos += `<span title="burdeo" style="background:#8c3750"></span>`;
				break;
			case "cafe":
				colorTodos += `<span title="cafe" style="background:brown"></span>`;
				break;
			case "gris":
				colorTodos += `<span title="gris" style="background:#d4d4d4"></span>`;
				break;
			case "dorado":
				colorTodos += `<span title="dorado" style="background:#d9b121"></span>`;
				break;
			case "azul":
				colorTodos += `<span title="azul" style="background:#4660cf"></span>`;
				break;
			case "arcoiris":
				colorTodos += `<span title="arcoiris" style="background: red;background: -webkit-linear-gradient(left, orange , yellow, green, cyan, blue, violet);background: -o-linear-gradient(right, orange, yellow, green, cyan, blue, violet);background: -moz-linear-gradient(right, orange, yellow, green, cyan, blue, violet);background: linear-gradient(to right, orange , yellow, green, cyan, blue, violet);"></span>`;
				break;
			case "transparente":
				colorTodos += `<span title="transparente" style="background:#eef8fb"></span>`;
				break;
			case "cyan":
				colorTodos += `<span title="cyan" style="background:cyan"></span>`;
				break;
			case "plateado":
				colorTodos += `<span title="plateado" style="background:#eceaea"></span>`;
				break;
			case "vainilla":
				colorTodos += `<span title="vainilla" style="background:#f1da8a"></span>`;
				break;
			case "durazno":
				colorTodos += `<span title="durazno" style="background:#f9ccaf"></span>`;
				break;
			default:
				console.log( `NaaaN [${colorsete}]` );
				colorTodos += `<span class="nan">?</span>`;
		};
		
		if( cuentaColor == selectColor.split( " " ).length-1 ) {
			$( padre ).addClass( cantidadColores );
			return `${colorTodos}`;
		}
		
	}

}

// GET PRODUCTO BY ID
var getProdByID = function( owo , donde ) {
	owo = owo-1
	
	Promise.all([
		fetch( bd ).then(value => value.json())
	])
	.then((value) => {
		var getProd         = value[0].values[owo];
		var id              = getProd[0];
		var stock		    = getProd[1];
		var marca		    = getProd[2];
		var modelo		    = getProd[3];
		
		var imagen		    = getProd[7];
		if ( imagen.split( " " ).length >= 2 ) {
			for ( var imgcount = 0; imgcount <= imagen.split( " " ).length-1; imgcount++ ) {
				$( ".getDetalle .galeria" ).append( `<img class="lazyload" src="${imagen.split( " " )[imgcount]}" alt="${marca} - ${modelo}" />` )
				
				$( ".getDetalle > .galeria > img" ).click(function(){
					let ruta = $( this ).attr( "src" );
					$( ".getDetalle > img" ).attr( "src" , ruta );
				});
				
			};
			imagen = imagen.split( " " )[0];
		};
		var preciocliente   = Number( getProd[4] ) + cometa;
		
		// Agrega PRODUCTOS
		if ( stock == 1 ) {
			$( `${donde}` ).append( `
				<li data-id="${id}">
					<a href="/detalle.html?id=${id}" title="${ capitalize(marca) } ${ capitalize(modelo) }">
						<img class="lazyload" data-src="${imagen}" alt="${ capitalize(marca) } ${ capitalize(modelo) }" /> 
						<span class="modelo">${modelo}</span>
						<span class="marca">${marca}</span>
						<span class="precio">${puntuacion(preciocliente)}</span>
					</a>
				</li>
			` );
		};
		
		
	});	
};

// GET PRODUCTO BY LOGO
var getProdByLogo = function( donde ) {
	Promise.all([
		fetch( bd ).then(value => value.json())
	])
	.then((value) => {
		for( var fila = 1; fila <= value[0].values.length-1; fila++ ) {
			var getProd = value[0].values[fila];
			var stock   = getProd[1];
			var marca   = getProd[2];
			
			// Agrega FILTROS
			if( !$( donde ).html().includes( marca ) && stock == 1 ) {
				$( donde ).append( `
					<li class="${ marca }">
						<a href="/marca.html?marca=${ marca }" title="${ capitalize( marca ) }">
							 <img class="lazyload" data-src="../imagenes/marcas/${ marca }-blanco.svg" alt="${ capitalize( marca ) }" />
						</a>
					 </li>
				` );
			};
		};
		
	});	
};

// GET PRODUCTO BY MARCA
var getProdByMarca = function( donde , traemarca ) {
	
	Promise.all([
		fetch( bd ).then(value => value.json())
	])
	.then((value) => {
		
		for( var fila = 0; fila <= value[0].values.length-1; fila++ ) {
			var getProd         = value[0].values[fila];
			var id              = getProd[0];
			var stock		    = getProd[1];
			var color		    = getProd[6];
			var marca		    = getProd[2];
			var modelo		    = getProd[3];
			var preciocliente   = Number( getProd[4] ) + cometa;
			var talla           = getProd[5];
			
			// Agrega FILTROS
			if ( traemarca === "todas" ) {
				if ( stock == 1 ) {
					$( `${donde}` ).prepend( `
						<li data-talla="${talla}" data-color="${color}" data-id="${id}">
							<a href="/detalle.html?id=${id}" title="${marca} ${modelo}">
								<img class="lazyload" data-src="${imagen}" alt="${marca} ${modelo}" /> 
								<span class="modelo">${modelo}</span>
								<span class="marca">${marca}</span>
								<span class="precio">${puntuacion(preciocliente)}</span>
							</a>
						</li>
					` );
				};
			} else {
				var imagen		    = getProd[7].split( " " )[0];
				if ( stock == 1 && marca == traemarca ) {
					$( `${donde}` ).prepend( `
					<li data-talla="${talla}" data-color="${color}" data-id="${id}">
						<a href="/detalle.html?id=${id}" title="${marca} ${modelo}">
								<img class="lazyload" data-src="${imagen}" alt="${marca} ${modelo}" /> 
								<span class="modelo">${modelo}</span>
								<span class="marca">${marca}</span>
								<span class="precio">${puntuacion(preciocliente)}</span>
							</a>
						</li>
					` );
				};
			};
				
			$( "img.cargando" ).hide();
			cuentaProductos( "h3.resultados" );
		};
		
	});	
};

// GET PRODUCTO RELACIONADO
var getProdRelacionado = function( owo , donde ) {
	owo = owo-1
	
	Promise.all([
		fetch( bd ).then(value => value.json())
	])
	.then((value) => {
		var getProd         = value[0].values[owo];
		var id              = getProd[0];
		var stock		    = getProd[1];
		var marca		    = getProd[2];
		var modelo		    = getProd[3];
		
		var imagen		    = getProd[7];
		if ( imagen.split( " " ).length >= 2 ) {
			imagen = imagen.split( " " )[0];
		};
		var preciocliente   = Number( getProd[4] ) + cometa;
		
		// Agrega PRODUCTOS
		if ( stock == 1 ) {
			$( `${donde}` ).append( `
				<li data-id="${id}">
					<a href="/detalle.html?id=${id}" title="${marca} ${modelo}">
						<img class="lazyload" data-src="${imagen}" alt="${marca} ${modelo}" /> 
						<span class="modelo">${modelo}</span>
						<span class="marca">${marca}</span>
						<span class="precio">${puntuacion(preciocliente)}</span>
					</a>
				</li>
			` );
		};
	
	});	
};

// SETEA EL TITULO
var setTitle = function() {
	let paginaActual = document.location.pathname;
	if ( paginaActual === "/" ) {
		$( "title" ).html( `[CLICKZAPATILLA] Bienvenido` );
	} else if ( paginaActual === "/marca.html" ) {
		$( "title" ).html( `[CLICKZAPATILLA] | Marca ${location.href.split( "marca=" )[1].toUpperCase()}` );
	} else if ( paginaActual === "/busqueda.html" ) {
		$( "title" ).html( `[CLICKZAPATILLA] | Buscando ${location.href.split( "buscador=" )[1]}` );
	} else if ( paginaActual === "/detalle.html" ) {
		var zapatilla = {
			"marca" : $( ".getDetalle > div > .marca" ).html() ,
			"modelo" : $( ".getDetalle > div > .modelo" ).html() ,
			"id" : $( ".getDetalle > div > p.id" ).html() ,
		};
		$( "title" ).html( `[CLICKZAPATILLA] | ${capitalize(zapatilla.modelo)} - ${capitalize(zapatilla.marca)} - ${capitalize(zapatilla.id)}` );
		
		
		
		
		
		
	} else if ( paginaActual === "/terminosycondiciones" ) {
		$( "title" ).html( `[CLICKZAPATILLA] | Términos y Condiciones` );
	} else {
		$( "title" ).html( `[CLICKZAPATILLA] ${document.location.pathname}` );
	}
};setTitle();
