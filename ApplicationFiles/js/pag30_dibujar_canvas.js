var c_w = 4000;
var c_h = 2000;
var myescala = 0.5;
var escala_ref_largo = 600;
var escala_ref_ancho = 280;
var borde = 10;


function dibujar_canvas(pCanvas = "mycanvas"){

var tipo = document.getElementById('P30_TIPO').value;
  if (tipo == 3){
    canvas_division();
  }else
  
  {
	   canvas_cajas();
  }
}

function canvas_division(pCanvas = "mycanvas"){

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


function canvas_cajas(pCanvas = "mycanvas"){

	var canvas = document.getElementById(pCanvas);
	var ctx = canvas.getContext("2d");


	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0,0,c_w, c_h);

    ctx.fillStyle = '#ffffff';	
	ctx.fillRect(0, 0,c_w, c_h);
	
	var tipo = document.getElementById('P30_TIPO').value;
	var plargo = document.getElementById('P30_PLARGO').value;
	var pancho = document.getElementById('P30_PANCHO').value;
	
 escala = 1;

	var w = canvas.clientWidth;
	var h = canvas.clientHeight;

	ctx.setTransform(1, 0, 0, 1, 2000, 100);
	ctx.strokeStyle="#000000";
	ctx.lineWidth = 4;
	ctx.fillStyle = '#000000';	
	var fontsize = 25 ;
	ctx.font='30px Arial';

	var guia = plargo /2;
   	ctx.save();
		ctx.translate(-guia,0);
	
		ctx.beginPath();
		ctx.rect(0,0,plargo,pancho);
		ctx.stroke();
    ctx.restore();


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
   	if (tipo == "1" || tipo > "4"){
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
				if (trazados[i] < 30)
				{	ctx.font='25px Arial'; }
				else
				{	ctx.font='50px Arial'; }
	            ctx.fillText(Math.round(trazados[i]) ,10,ycota);
				cota = t;
		};

		ctx.restore();	
	}

	if (tipo >= "3" || tipo == "1") { // trazados de slotter
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
				if (trazados[i] < 100)
				{	ctx.font='25px Arial'; }
				else
				{	ctx.font='50px Arial'; }	
	            ctx.fillText(trazados[i] ,xcota,-10);
				cota = t;
		};

		ctx.restore();

	}

}




