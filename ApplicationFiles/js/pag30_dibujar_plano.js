//var canvasw = 800;
//var canvash = 600;
var myescala = 0.5;
var escala_ref_largo = 600;
var escala_ref_ancho = 280;
var borde = 10;


function dibujar_plano(pCanvas = "myplano"){

var tipo = document.getElementById('P30_TIPO').value;
  if (tipo == 3){
    plano_division();
  }else
  
  {
	   plano_cajas();
  }
}

function plano_division(pCanvas = "myplano"){

	var canvas = document.getElementById(pCanvas);
	var ctx = canvas.getContext("2d");

	
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0,0,canvas.width, canvas.height);

//  escala = Math.min(escala_ref_largo/plargo,escala_ref_ancho/pancho) ;	
    escala = 1;
	ctx.setTransform(escala,0,0,escala,canvas.clientWidth/2 ,50);



	var largo = document.getElementById('P30_LARGO').value;
	var ancho = document.getElementById('P30_ANCHO').value;
	var alto = document.getElementById('P30_ALTO').value;
    var div_x = document.getElementById('P30_DIV_X').value * 1;
    var div_y = document.getElementById('P30_DIV_Y').value * 1 ;

    var box_x = document.getElementById('P30_DIV_X').value * 1 + 1 ;
    var box_y = document.getElementById('P30_DIV_Y').value * 1 + 1 ;

	ctx.strokeStyle="#000000";
	ctx.lineWidth = 2/escala;
	var fontsize = 50;//100 * escala;
	ctx.font=(fontsize|0) + 'px Arial';



	var guia = largo /2;
   	ctx.save();
		ctx.translate(-guia,0);

		ctx.fillStyle = '#ece2c6';	
		ctx.fillRect(0, 0,largo,alto);

		ctx.beginPath();
		ctx.rect(0,0,largo,alto);
		ctx.stroke();
        
        var l = largo / (box_y);

		for (var i = 1; i < box_y; i++) {
				ctx.beginPath();
				ctx.moveTo(l * i,0);	
				ctx.lineTo(l * i,alto/2);
				ctx.stroke();
			}



		ctx.translate(0,alto);
		
		ctx.translate(0,50);

		ctx.fillStyle = '#ece2c6';	
		ctx.fillRect(0, 0,ancho,alto);

		ctx.beginPath();
		ctx.rect(0,0,ancho,alto);
		ctx.stroke();

		var a = ancho / (box_x);

		for (var i = 1; i < (box_x); i++) {
				ctx.beginPath();
				ctx.moveTo(a * i,alto/2);	
				ctx.lineTo(a * i,alto);
				ctx.stroke();
			}

    ctx.restore();

}	


function plano_cajas(pCanvas = "myplano"){

	var canvas = document.getElementById(pCanvas);
	var ctx = canvas.getContext("2d");
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0,0,canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';	
	ctx.fillRect(0, 0,canvas.width, canvas.height);
	
	/*/ solo para pruebas
	ctx.strokeStyle="#777777";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.rect(0,0,canvas.width, canvas.height);
	ctx.stroke();
	/*/

	var tipo = document.getElementById('P30_TIPO').value;

	var plargo = document.getElementById('P30_PLARGO').value;
	var pancho = document.getElementById('P30_PANCHO').value;
	

    escala = Math.min(escala_ref_largo/plargo,escala_ref_ancho/pancho) ;
	ctx.translate(20,20);
	ctx.fillText(escala ,200,200);
	
	ctx.setTransform(escala,0,0,escala,canvas.clientWidth/2 ,50);	

	var zoom = 1/ escala;
	

	var w = canvas.clientWidth;
	var h = canvas.clientHeight;


	// dibujar plancha lisa + cotas
	ctx.strokeStyle="#000000";
	ctx.lineWidth = 2 * zoom;
	var fontsize = 25 * zoom;
	
	ctx.font=(fontsize|0) + 'px Arial';

	var guia = plargo /2;
   	ctx.save();
	ctx.translate(-guia,0);
	
	ctx.beginPath();
	ctx.rect(0,0,plargo,pancho);
	ctx.stroke();
    ctx.restore();


	// cota plargo
		ctx.fillStyle = '#000';	
		ctx.textAlign = "center";
    	ctx.fillText(plargo ,0, pancho + 10);
	

	/*	     
	// cota pancho
	ctx.save();
 		ctx.translate(-guia-20, pancho / 2);
 		ctx.rotate(-Math.PI/2);

 		ctx.fillStyle = '#000';	
 		ctx.textAlign = "center";
 		ctx.fillText(Math.round(pancho), 0, 0);
 	ctx.restore();*/


// dibujar cortes trazadora x largo
	if (tipo == "0" || tipo =="1"){
    	var mult_x = Number(document.getElementById('P30_MULT_X').value);  
    	if (mult_x > 1){
    		ctx.save();
			ctx.translate(-guia,0);
			var l = Number(document.getElementById('P30_LARGO').value);  
			for (var i = 1; i < mult_x; i++) {
				ctx.beginPath();
				ctx.moveTo(l * i,0);	
				ctx.lineTo(l * i,pancho);
				ctx.stroke();
			}
			ctx.restore();
   		} 
	}
// dibujar cortes trazadora x Onda
   	if (tipo == "0"){
   		var mult_y = Number(document.getElementById('P30_MULT_Y').value);
    	if (mult_y > 1){
    		ctx.save();
			ctx.translate(-guia,0);    		
			var a = Number(document.getElementById('P30_ANCHO').value);  
			for (var i = 1; i < mult_y; i++) {
				ctx.beginPath();
				ctx.moveTo(0,a * i);	
				ctx.lineTo(plargo,a * i);
				ctx.stroke();
			}
			ctx.restore();
   		} 	
	}
	
	// dibujar trazados
   	if (tipo == "1" || tipo == "5" || tipo == "7" || tipo == "8" || tipo == "9"){
   		var strazados = document.getElementById('P30_TRAZADOS').value;
		var trazados = strazados.split(":");

	    var t = 0;
   		ctx.save();
		ctx.translate(-guia,0);   

		for (i = 0; i < trazados.length -1 ; i++){
				t += (trazados[i] * 1 ) ;

				ctx.beginPath();
				ctx.moveTo(0,t);	
				ctx.lineTo(plargo,t);
				ctx.stroke();
			}
		
		//dibuja cotas
		t = 0; 
		var cota = 0;
	    var ycota = 0;
		ctx.translate(plargo ,0);
		ctx.textAlign = "left";
		
		// escala 
		//ctx.fillText(escala,0,-10); 

	    for (i = 0; i < trazados.length ; i++){
	     		t += (trazados[i] * 1 ) ;
	     		ycota = t/2  + cota/ 2 ;
	            ctx.fillText(Math.round(trazados[i]) ,10,ycota);
				cota = t;
		};

		ctx.restore();	
	}
	
     // CORTES SLOTTER
	if (tipo == "1" || tipo == "4" || tipo == "5"|| tipo == "7" || tipo == "8" || tipo == "9") { 
   		var strazados = document.getElementById('P30_SLOTTER').value;
		var trazados = strazados.split(":");
	    var t = 0;
   		ctx.save();
		ctx.translate(-guia,0);   

		for (i = 0; i < trazados.length ; i++){
				t += (trazados[i] * 1 ) ;

				ctx.beginPath();
				ctx.moveTo(t,0);	
				ctx.lineTo(t,pancho);
				ctx.stroke();
			}
		
		//dibuja cotas
		t = 0; 
		var cota = 0;
	    var xcota = 0;
		ctx.textAlign = "center";
	    for (i = 0; i < trazados.length ; i++){
	     		t += (trazados[i] * 1 ) ;
	     		xcota = t/2  + cota/ 2 ;
	            ctx.fillText(trazados[i] ,xcota,-10);
				cota = t;
		};

		ctx.restore();

	}
     // CORTES DIVISION
	if (tipo == "6") { 
   		var sSLOTTER = document.getElementById('P30_SLOTTER').value;
   		var MULT_X = document.getElementById('P30_MULT_X').value;
   		var MULT_Y = document.getElementById('P30_MULT_Y').value;
		
		var ANCHO = document.getElementById('P30_ANCHO').value;
		var LARGO = document.getElementById('P30_LARGO').value;
		var PANCHO = document.getElementById('P30_PANCHO').value;
		var PLARGO = document.getElementById('P30_PLARGO').value;
		
		var SLOTTER = sSLOTTER.split(":");
		
		
	    var t = 0;
   		ctx.save();
		ctx.translate(-guia,0);   
		

		// cortes sectores
		for (n = 0; n < MULT_X ; n++){ // doble largo
		for (i = 0; i < SLOTTER.length ; i++){
				t += (SLOTTER[i] * 1 ) ;

				if (i < SLOTTER.length-1) { // no dibujo ultimo 
				
				ctx.strokeStyle="#101080";
				ctx.lineWidth = 10;
				ctx.beginPath();
				ctx.moveTo(t,0);	
				ctx.lineTo(t,ANCHO / 2);
				ctx.stroke();
			
				if (MULT_Y == "2") {
				ctx.beginPath();
				ctx.moveTo(t,ANCHO * 3 / 2);	
				ctx.lineTo(t,ANCHO * 2);
				ctx.stroke();
				}
				
				}		
				
			}
		}
		
		// corte refile
		ctx.strokeStyle="#101080";
		ctx.lineWidth = 3* zoom;
	
		if (MULT_X == "2") {
				ctx.beginPath();
				ctx.moveTo(LARGO,0 );	
				ctx.lineTo(LARGO,PANCHO);
				ctx.stroke();
		}		
		
		// corte medio trazadora
		ctx.strokeStyle="#008000";
		ctx.lineWidth = 3* zoom;
		if (MULT_Y == "2") {
				ctx.beginPath();
				ctx.moveTo(0,ANCHO );	
				ctx.lineTo(PLARGO ,ANCHO);
				ctx.stroke();
		}
		//dibuja cotas sectores
		t = 0; 
		var cota = 0;
	    var xcota = 0;
		ctx.textAlign = "center";
		for (n = 0; n < MULT_X ; n++){ // doble largo
	    for (i = 0; i < SLOTTER.length ; i++){
	     		t += (SLOTTER[i] * 1 ) ;
	     		xcota = t/2  + cota/ 2 ;
	            ctx.fillText(SLOTTER[i] ,xcota,-10);
				cota = t;
		}
		}
		
		//dibuja cotas TRAZADOS
		t = 0; 
		var cota = 0;
	    var ycota = 0;
		
		ctx.translate(plargo ,0);
		ctx.textAlign = "left";
	   // ctx.fillText(zoom  ,10, 0);
	
	    ctx.fillText(Math.round(ANCHO / 2) ,10, 25 * zoom);
	    ctx.fillText(Math.round(ANCHO / 2) ,10, PANCHO );
		if (MULT_Y == "2") {
			ctx.fillText(Math.round(ANCHO) ,10, PANCHO /2 + 10);
		}	
		ctx.restore();

	}

}




