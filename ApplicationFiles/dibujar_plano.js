//******** GLOBAL ***********
var gTrazado = new Array();
var gZoom = 4;
var gRefile = 0;

CanvasRenderingContext2D.prototype.clear =
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }
};


function dibujar_plano(pCanvas = "mycanvas"){

	var c = document.getElementById(pCanvas);
	//c.getContext("2d").strokeRect(0,0,10,10); // cuadrado de control
	var tipo = document.getElementById("P30_TIPO").value;
	var largo = document.getElementById("P30_LARGO").value*1;
	var ancho = document.getElementById("P30_ANCHO").value*1;
	var alto = document.getElementById("P30_ALTO").value*1;


	var plargo = document.getElementById("P30_PLARGO").value*1;
	var pancho = document.getElementById("P30_PANCHO").value*1;
	var strazados = document.getElementById("P30_TRAZADOS").value;
	var trazados = strazados.split(":");

	var mult = document.getElementById("P30_MULT").value;
	mult = mult.replace(',','.')*1;	

	var mult_x = document.getElementById("P30_MULT_X").value;
	var mult_y = document.getElementById("P30_MULT_Y").value;		


	
	var ctx = c.getContext("2d");
	ctx.clear();



// buscar escala
	var h = 400;
	var w = 700;
	var escala = 1;
	var borde = 50;
	var hmax = pancho + (2* borde); 
	var wmax = plargo + (2 * borde);
//    escala = math.max(w/plargo,h/pancho);

	escala = w / wmax;

 // texto
	
	var fontsize = 200 * escala;

	ctx.font=(fontsize|0) + 'px Georgia';


	ctx.translate(borde,borde);
	ctx.scale(escala,escala);




	//PLACA ENTERA
	ctx.beginPath();
	ctx.strokeStyle = "blue";
	ctx.lineWidth = "5";
	ctx.fillStyle = '#ffd';

	ctx.rect(0,0,plargo,pancho);
	ctx.stroke();
 
    var t = 0;
    var cota = 0;
    var ycota = 0;
	ctx.lineWidth = 3;
    ctx.fillStyle = '#000';

	for (i = 0; i < trazados.length; i++){
			t += (trazados[i] * 1 ) ;


			ctx.beginPath();
			ctx.moveTo(0,t);	
			ctx.lineTo(plargo,t);
			ctx.stroke();


            ycota = t/2  + cota/ 2 ;
            ctx.fillText(trazados[i] ,plargo+10,ycota);
			ctx.stroke();
			cota = t;
	};

            ctx.fillText(plargo ,plargo/2,pancho + 50);
			ctx.stroke();
	        

	    context.save();
 		context.translate(borde, pancho / 2);
 		context.rotate(-Math.PI/2);
 		context.textAlign = "center";
 		context.fillText(pancho, 0, 0);
 		context.restore();

}



function a(){
	if (tipo != 2){ //} && document.getElementById('P30_CORTANTE_ID').value == ""){

		gZoom =  1 //document.getElementById("P30_ZOOM").value*1;

		var cierre = 0;
		var cierre_val = 0;
		var desarrollo = 0;
		var aleta_arriba = 0;
		var aleta_arriba_val = 0;
		var aleta_abajo = 0;
		var aleta_abajo_val = 0;
		
		gRefile = $('#P30_REFILE')[0].value * 1;

		if (document.getElementById("P30_DESARROLLO")){
			cierre = document.getElementById("P30_CIERRE").value*1;
			cierre_val = document.getElementById("P30_CIERRE_VALOR").value*1;
			desarrollo = document.getElementById("P30_DESARROLLO").value*1;
		}
		if (document.getElementById("P30_ALETA_SUP")){
			aleta_arriba = document.getElementById("P30_ALETA_SUP").value*1;
			aleta_arriba_val = Math.round(document.getElementById("P30_ALETA_SUP_VALOR").value*1);
		}
		if (document.getElementById("P30_ALETA_INF")){
			aleta_abajo = document.getElementById("P30_ALETA_INF").value*1;
			aleta_abajo_val = Math.round(document.getElementById("P30_ALETA_INF_VALOR").value*1);
		}
		var centro = 0;
		
		if (document.getElementById("P30_CENTRO"))
			centro = document.getElementById("P30_CENTRO").value*1;
				

		if (centro > 0){
			centro = 0;
		}
		

			

		if (pCanvas == "mycanvas"){
			var div_canvasWidth = document.getElementById('reg_plano').offsetWidth - 10;
			c.width = div_canvasWidth;
		}
		
		var ctx = c.getContext("2d");
		ctx.clear();
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, c.width, c.height);

		c.getContext("2d").strokeRect(0,0,trazados[1],10); // cuadrado de control

		switch(tipo) {
		case "0":

			art_0_1_9(c,largo,ancho,"N",mult,aleta_arriba,aleta_arriba_val,aleta_abajo,aleta_abajo_val,trazados,pCanvas);
			break;
		case "1":
			if (document.getElementsByName('f04')){
				var trazadosItem = document.getElementsByName('f04');
				for (i = 0; i < trazadosItem.length; i++){
					trazados [i] = trazadosItem[i].value;

				}
			}
			//trazados.sort();
			art_0_1_9(c,largo,ancho,"N",mult,aleta_arriba,aleta_arriba_val,aleta_abajo,aleta_abajo_val,trazados,pCanvas);
			break;
		case "3":
			art_3(c,largo,ancho,alto,mult_y,mult_x,pCanvas);
			break;
		case "4":
		case "5":
		case "6":
		case "7":

			if (aleta_arriba == 1){
				document.getElementById("P30_ALETA_SUP_VALOR").value = Math.round(ancho/2);
				aleta_arriba_val = ancho/2;
			}
			if (aleta_abajo == 1){
				document.getElementById("P30_ALETA_INF_VALOR").value = Math.round(ancho/2);
				aleta_abajo_val = ancho/2;
			}

			art_caja(c,largo,ancho,alto,cierre,cierre_val,aleta_arriba,aleta_arriba_val,aleta_abajo,aleta_abajo_val,desarrollo,trazados,centro,pCanvas);
			break;
		case "8":
			art_8(c,largo,ancho,alto,aleta_arriba,aleta_arriba_val,aleta_abajo,aleta_abajo_val,mult_x,trazados,centro,pCanvas);
			break;
		case "9":
			var largoArt9 = 0;
			var anchoArt9 = 0;
			
			if (cierre != 0)
				trazados.push(cierre_val-centro);
			
			if (desarrollo == 2){
				trazados.push(ancho);
				trazados.push(largo+centro);
				anchoArt9 = cierre_val+ancho+largo;
			}else{
				trazados.push(ancho);
				trazados.push(largo);
				trazados.push(ancho);
				trazados.push(largo+centro);	
				anchoArt9 = cierre_val+ancho+largo+ancho+largo;
			}
			largoArt9 = alto+aleta_arriba_val+aleta_abajo_val;
			
			if (mult < 1){
				mult = 1;
			}

			art_0_1_9(c,largoArt9,anchoArt9,"N",mult,aleta_arriba,aleta_arriba_val,aleta_abajo,aleta_abajo_val,trazados,pCanvas);
			
			//art_0_1_9(c,alto+aleta_arriba_val+aleta_abajo_val,cierre_val+ancho+largo+ancho+largo,"N",mult,aleta_arriba,aleta_arriba_val,aleta_abajo,aleta_abajo_val,trazados,pCanvas);
			
			break;
		default:
			break;
		}
	} else if (tipo == 2 && document.getElementById('P30_CORTANTE_ID').value != ""){
		
		gZoom = 0;
		var c = document.getElementById(pCanvas);
		
		if (pCanvas == "mycanvas"){
			var div_canvasWidth = document.getElementById('reg_plano').offsetWidth - 10;
			c.width = div_canvasWidth;
		}
		
		var ctx = c.getContext("2d");
		ctx.clear();
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, c.width, c.height);
		
		var trazados = new Array();
		
		var continuar = false;
		
		if (document.getElementById("P30_P_LARGO").value != undefined){
			continuar = true;
			var largo = document.getElementById("P30_P_LARGO").value;
		}
		if (document.getElementById("P30_P_ANCHO").value != undefined){
			continuar = true;
			var ancho = document.getElementById("P30_P_ANCHO").value;
		}
		
		if (continuar){
			var mult = 1;
			var aleta_arriba = 0;
			var aleta_arriba_val = 0;
			var aleta_abajo = 0;
			var aleta_abajo_val = 0;

			art_0_1_9(c,largo,ancho,"N",mult,aleta_arriba,aleta_arriba_val,aleta_abajo,aleta_abajo_val,trazados,pCanvas);
		}
		
	}
}

function art_0_1_9(c,l,a,izq,mult,aleta_arriba,aleta_arriba_val,aleta_abajo,aleta_abajo_val,trazados,pCanvas = "mycanvas"){

	if (gZoom == 0){
		var v_ALTO_CANVAS = $("#"+pCanvas).height() - 80 - 30;
		var v_ANCHO_CANVAS = $("#"+pCanvas).width() - 50 - 60;

		if (a/v_ALTO_CANVAS > (l*mult)/v_ANCHO_CANVAS){
		  var v_ZOOM_CANVAS = a/v_ALTO_CANVAS;
		}else{
		  var v_ZOOM_CANVAS = (l*mult)/v_ANCHO_CANVAS;
		}
	}else{
		var v_ZOOM_CANVAS = gZoom;
	}

	var divisor = v_ZOOM_CANVAS;
	var largo = l / divisor;
	var ancho = a / divisor;
	var refile = gRefile / divisor;
	var xInit = 50;
	var y = 80;
	var x = xInit;
	var t = 0;
	var ctx = c.getContext("2d");
	var ultimoTrazado = 0;
	

    //MULTIPLICADOR
	for (var i = 0; i < mult; i++){
		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.lineWidth = "3";
		ctx.rect(x,y,largo,ancho);
		ctx.stroke();

		var largo2 = largo;

		if (aleta_arriba != 0){
			ctx.beginPath();
			ctx.lineWidth = "1";
			ctx.moveTo(x+aleta_arriba_val/divisor,y);
			ctx.lineTo(x+aleta_arriba_val/divisor,y+ancho+15);
			ctx.stroke();

			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			//ctx.fillText(aleta_arriba_val.toFixed(), x, y+ancho+15);

			writeCanvas (ctx,aleta_arriba_val.toFixed(),x,y+ancho+15,"12px",pCanvas);

			largo2 = largo2 - aleta_arriba_val / divisor;
		}

		if (aleta_abajo != 0){
			ctx.beginPath();
			ctx.lineWidth = "1";
			ctx.moveTo(x+largo-aleta_abajo_val/divisor,y);
			ctx.lineTo(x+largo-aleta_abajo_val/divisor,y+ancho+15);
			ctx.stroke();

			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			//ctx.fillText(aleta_abajo_val.toFixed(), x+largo-aleta_abajo_val/divisor+3, y+ancho+15);
			writeCanvas (ctx,aleta_abajo_val.toFixed(),x+largo-aleta_abajo_val/divisor+3,y+ancho+15,"12px",pCanvas);

			largo2 = largo2 - aleta_abajo_val / divisor;
		}

		if (aleta_arriba != 0 || aleta_abajo != 0){
			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			writeCanvas (ctx,(largo2*divisor).toFixed(), x+largo/2-10, y+ancho+15,"12px",pCanvas);

		}

		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x,y-5);
		ctx.lineTo(x,y-20);
		ctx.stroke();

		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x+largo,y-5);
		ctx.lineTo(x+largo,y-20);
		ctx.stroke();

		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x,y-15);
		ctx.lineTo(x+largo,y-15);
		ctx.stroke();

		//---------------
		//ctx.fillStyle = "blue";
		//ctx.font = "16px Arial";
		writeCanvas (ctx,l, (largo /2)+x-10, y-20,"16px",pCanvas);
		x = x + (largo);
	}


    var yTrazado = y + ancho;

	//TRAZADOS
	if (trazados.length > 0){
		for (var i = 0; i < trazados.length; i++){
			t = trazados[i]/divisor;
			yTrazado = yTrazado - t;

			ctx.beginPath();
			ctx.lineWidth = "1";
			ctx.moveTo(xInit,yTrazado);
			ctx.lineTo(xInit+(largo*mult)+refile,yTrazado);
			ctx.stroke();

			ctx.beginPath();
			ctx.lineWidth = "1";
			ctx.moveTo(xInit+(largo*mult)+5+refile,yTrazado);
			ctx.lineTo(xInit+(largo*mult)+20+refile,yTrazado);
			ctx.stroke();

		}
		if (document.getElementById("P30_TIPO").value != 9)
			trazados.push(((yTrazado-y)*divisor).toFixed());

		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(xInit+(largo*mult)+5+refile,y);
		ctx.lineTo(xInit+(largo*mult)+20+refile,y);
		ctx.stroke();

		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(xInit+(largo*mult)+5+refile,y+ancho);
		ctx.lineTo(xInit+(largo*mult)+20+refile,y+ancho);
		ctx.stroke();

	}else{
		trazados.push(a);
	}

	x = xInit;

	//COTA GENERAL SI HAY MULTIPLICADOR
	if (mult > 1){
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x,y-30);
		ctx.lineTo(x,y-45);
		ctx.stroke();

		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x+largo*mult+refile,y-30);
		ctx.lineTo(x+largo*mult+refile,y-45);
		ctx.stroke();

		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x,y-40);
		ctx.lineTo(x+largo*mult+refile,y-40);
		ctx.stroke();

		//---------------
		//ctx.fillStyle = "blue";
		//ctx.font = "16px Arial";
		writeCanvas (ctx,l*mult+gRefile, x + (largo*mult /2)-15, y-45,"16px",pCanvas);

		if ($('#P30_STATUS')[0].value == 1){
			if (document.getElementById("P30_TIPO").value != 2)
				document.getElementById("P30_P_LARGO").value = Math.round(l*mult)+gRefile;
		}
	}
	
	if (gRefile > 0){
		
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x+largo*mult+refile,y-5);
		ctx.lineTo(x+largo*mult+refile,y-20);
		ctx.stroke();
		
		writeCanvas (ctx,gRefile, x+largo*mult+1, y-20,"12px",pCanvas);
		
		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.lineWidth = "1";
		ctx.fillStyle = 'lightyellow';
		ctx.fillRect(x + largo * mult, y, refile, ancho);
		ctx.rect(x + largo * mult,y,refile,ancho);
		ctx.stroke();
		
		
	}

	//COTA LATERAL
	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x-5,y);
	ctx.lineTo(x-20,y);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x-5,y+ancho);
	ctx.lineTo(x-20,y+ancho);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x-15,y);
	ctx.lineTo(x-15,y+ancho);
	ctx.stroke();

	ctx.translate(x-20, ( ancho / 2)+y+10);
	ctx.rotate(Math.PI / -2 );
	//ctx.font = "16px Arial";
	writeCanvas (ctx,a, 0,0,"16px",pCanvas);
	ctx.rotate(Math.PI / 2 );
	ctx.restore();
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	if (document.getElementById("P30_TIPO").value != 2){
		document.getElementById("P30_P_LARGO").value = Math.round(l*mult)+gRefile;
		document.getElementById("P30_P_ANCHO").value = Math.round(a);
	}
	//trazados.push(a);

	medidasTrazados2 (ctx,x,y,trazados,a/divisor,l*mult/divisor,divisor,pCanvas);

}


function art_3(c,l,a,alt,mult_x,mult_y,pCanvas = "mycanvas"){

	if (gZoom == 0){
		var v_ALTO_CANVAS = $("#"+pCanvas).height() - 80 - 30;
		var v_ANCHO_CANVAS = $("#"+pCanvas).width() - 50 - 60;

		if (alt/v_ALTO_CANVAS > (l*2+100)/v_ANCHO_CANVAS){
		  var v_ZOOM_CANVAS = alt/v_ALTO_CANVAS;
		}else{
		  var v_ZOOM_CANVAS = (l*2+100)/v_ANCHO_CANVAS;
		}
	}else{
		var v_ZOOM_CANVAS = gZoom;
	}

	var divisor = v_ZOOM_CANVAS;


	var largo = l / divisor;
	var ancho = a / divisor;
	var alto = alt / divisor;
	var xInit = 50;
	var y = 80;
	var x = xInit;
	var t = 0;
	var ctx = c.getContext("2d");
	var ultimoTrazado = 0;
	var div_y = ancho / (mult_x*1+1);
	var div_x = largo / (mult_y*1+1);

	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.rect(x,y,largo,ancho);
	ctx.stroke();

    //MULTIPLICADOR X
	for (var i = 1; i <= mult_x; i++){
		ctx.beginPath();
		ctx.lineWidth = "3";
		ctx.moveTo(x,y+(div_y*i));
		ctx.lineTo(x+largo,y+(div_y*i));
		ctx.stroke();
	}

    //MULTIPLICADOR Y
	for (var i = 1; i <= mult_y; i++){
		ctx.beginPath();
		ctx.lineWidth = "3";
		ctx.moveTo(x+(div_x*i),y);
		ctx.lineTo(x+(div_x*i),y+ancho);
		ctx.stroke();
	}

	//COTA LARGO
    ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x,y+ancho +5);
	ctx.lineTo(x,y+ancho +20);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x+largo,y+ancho +5);
	ctx.lineTo(x+largo,y+ancho +20);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x,y+ancho +15);
	ctx.lineTo(x+largo,y+ancho +15);
	ctx.stroke();

	//ctx.fillStyle = "blue";
	//ctx.font = "16px Arial";
	writeCanvas (ctx,l, (largo /2)+x-10, y+ancho +30,"16px",pCanvas);

    //COTA DIVISION X
    ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x+largo -div_x,y-5);
	ctx.lineTo(x+largo -div_x,y-20);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x+largo,y-5);
	ctx.lineTo(x+largo,y-20);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x+largo -div_x,y-15);
	ctx.lineTo(x+largo,y-15);
	ctx.stroke();

	//ctx.fillStyle = "blue";
	//ctx.font = "12px Arial";
	writeCanvas (ctx,(div_x*divisor).toFixed(), x+largo -div_x, y-25,"12px",pCanvas);

    //COTA DIVISION Y
    ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x+largo+5,y);
	ctx.lineTo(x+largo+20,y);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x+largo+5,y+div_y);
	ctx.lineTo(x+largo+20,y+div_y);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x+largo+15,y);
	ctx.lineTo(x+largo+15,y+div_y);
	ctx.stroke();

	//ctx.fillStyle = "blue";
	//ctx.font = "12px Arial";
	writeCanvas (ctx,(div_y*divisor).toFixed(), x+largo +20, y+(div_y/2)+2,"12px",pCanvas);

	//COTA LATERAL
	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x-5,y);
	ctx.lineTo(x-20,y);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x-5,y+ancho);
	ctx.lineTo(x-20,y+ancho);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x-15,y);
	ctx.lineTo(x-15,y+ancho);
	ctx.stroke();

	ctx.translate(x-20, ( ancho / 2)+y+10);
	ctx.rotate(Math.PI / -2 );
	//ctx.font = "16px Arial";
	writeCanvas (ctx,a, 0,0,"16px",pCanvas);
	ctx.rotate(Math.PI / 2 );
	ctx.restore();
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	//----------------------------------------------

	x = x + largo + 80;
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.rect(x,y,largo,alto);
	ctx.stroke();

      //MULTIPLICADOR Y
	for (var i = 1; i <= mult_y; i++){
		ctx.beginPath();
		ctx.lineWidth = "3";
		ctx.moveTo(x+(div_x*i),y+(alto/2));
		ctx.lineTo(x+(div_x*i),y+alto);
		ctx.stroke();
	}
	y = y + alto + 20;
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.rect(x,y,ancho,alto);
	ctx.stroke();

    //MULTIPLICADOR X
	for (var i = 1; i <= mult_x; i++){
		ctx.beginPath();
		ctx.lineWidth = "3";
		ctx.moveTo(x+(div_y*i),y+(alto/2));
		ctx.lineTo(x+(div_y*i),y+alto);
		ctx.stroke();
	}
	
	if ($('#P30_STATUS')[0].value == 1){
		document.getElementById("P30_P_ANCHO").value = Math.round(alt);
		document.getElementById("P30_P_LARGO").value = Math.round(l*mult_x + a * mult_y)+gRefile;

		document.getElementById("P30_TRAZADOS").disabled = false;
		document.getElementById("P30_TRAZADOS").value = '|' + alt + '|';
		document.getElementById("P30_TRAZADOS").disabled = true;
	}
}

/**********************************************
* function art_caja
***********************************************/
function art_caja(c,l,a,alt,cierre,cierre_val,aleta_arriba,aleta_arriba_val,aleta_abajo,aleta_abajo_val,desarrollo,trazados,pCentro,pCanvas = "mycanvas"){


	var aletaArribaVal = 0;
	var aletaAbajoVal = 0;

	if (aleta_arriba == 0)
		aletaArribaVal = 0;
	else if (aleta_arriba == 3)
		aletaArribaVal = (a/2 + aleta_arriba_val);
	else
		aletaArribaVal = aleta_arriba_val;

	if (aleta_abajo == 0)
		aletaAbajoVal = 0;
	else if (aleta_abajo == 3)
		aletaAbajoVal = (a/2 + aleta_abajo_val);
    else
		aletaAbajoVal = aleta_abajo_val;

	var largoTotal = (l*2+a*2) / desarrollo + cierre_val;

	var altoTotal = alt +aletaArribaVal + aletaAbajoVal ;

	if (gZoom == 0){
		var v_ALTO_CANVAS = $("#"+pCanvas).height() - 80 - 30;
		var v_ANCHO_CANVAS = $("#"+pCanvas).width() - 50 - 60;

		if (altoTotal/v_ALTO_CANVAS > largoTotal/v_ANCHO_CANVAS){
		  var v_ZOOM_CANVAS = altoTotal/v_ALTO_CANVAS;
		}else{
		  var v_ZOOM_CANVAS = largoTotal/v_ANCHO_CANVAS;
		}
	}else{
		var v_ZOOM_CANVAS = gZoom;
	}

	var divisor = v_ZOOM_CANVAS;

	var largo = l / divisor;
	var ancho = a / divisor;
	var alto = alt / divisor;
	var itemCierre_v = cierre_val;
	var cierre_v = cierre_val / divisor;
	var centro = pCentro / divisor;
	var refile = gRefile / divisor;

	if (cierre == 0){
		cierre_v = 0;
	    itemCierre_v = 0;
	}

	var xInit = 50;
	var y = 80;
	var x = xInit;
	var ctx = c.getContext("2d");
	var largoTotal = 0;
	var aleta_val = aleta_arriba_val;
	var aleta =aleta_arriba*1 + aleta_abajo*1;
	var largoSum = 0;
	var anchoSum = 0;
	aletaArribaVal = aleta_arriba_val / divisor;
	aletaAbajoVal = aleta_abajo_val / divisor;
	var itemAletaArribaVal = aleta_arriba_val;
	var itemAletaAbajoVal = aleta_abajo_val;
	var m1 = -15;
	var m2 = 15;

	if (aleta_arriba == 0){
		aletaArribaVal = 0;
		itemAletaArribaVal = 0;
		//m1 = 0;
	}else if (aleta_arriba == 3){
		aletaArribaVal = (a/2 + aleta_arriba_val) / divisor;
		itemAletaArribaVal = (a/2 + aleta_arriba_val);
	}

	if (aleta_abajo == 0){
		aletaAbajoVal = 0;
		itemAletaAbajoVal = 0;
		m2 = 0;
	}else if (aleta_abajo == 3){
		aletaAbajoVal = (a/2 + aleta_abajo_val) / divisor;
		itemAletaAbajoVal = (a/2 + aleta_abajo_val);
	}

	largoTotal = ((l*2+a*2) / divisor ) / desarrollo + cierre_v;

	altoTotal = alto +aletaArribaVal + aletaAbajoVal ;

	var itemLargoTotal = ((l*2+a*2)) / desarrollo + itemCierre_v;

	var itemAltoTotal = alt + itemAletaArribaVal + itemAletaAbajoVal ;

	//PLACA ENTERA
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth = "3";
	ctx.rect(x,y,largoTotal,altoTotal);
	ctx.stroke();

	//MEDIDA PLACA LARGO
	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x,y-5-15);
	ctx.lineTo(x,y-20-15);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x,y+m1);
	ctx.lineTo(x,y);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x+largoTotal+refile,y-5-15);
	ctx.lineTo(x+largoTotal+refile,y-20-15);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x+largoTotal,y+m1);
	ctx.lineTo(x+largoTotal,y);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x,y-15-15);
	ctx.lineTo(x+largoTotal+refile,y-15-15);
	ctx.stroke();

	//ctx.fillStyle = "blue";
	//ctx.font = "16px Arial";
	writeCanvas (ctx,Math.round(itemLargoTotal)+gRefile, (largoTotal /2)+x-10, y-20-15,"16px",pCanvas);
	
	
	//MEDIDA PLACA ANCHO
	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x-5,y);
	ctx.lineTo(x-20,y);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x-5,y+altoTotal);
	ctx.lineTo(x-20,y+altoTotal);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x-15,y);
	ctx.lineTo(x-15,y+altoTotal);
	ctx.stroke();

	ctx.translate(x-20, ( altoTotal / 2)+y+10);
	ctx.rotate(Math.PI / -2 );
	//ctx.font = "16px Arial";
	writeCanvas (ctx,Math.round(itemAltoTotal), 0,0,"16px",pCanvas);
	ctx.rotate(Math.PI / 2 );
	ctx.restore();
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	//CIERRE
	largoSum = largoSum - centro + x;
	if (cierre !=0){
		largoSum = largoSum + cierre_v;
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(largoSum,y+m1);
		ctx.lineTo(largoSum,y+altoTotal+m2);
		ctx.stroke();

		if (aleta_arriba != 0){
			ctx.beginPath();
			ctx.lineWidth = "3";
			ctx.moveTo(largoSum,y);
			ctx.lineTo(largoSum,y+aletaArribaVal);
			ctx.stroke();
		}

		if (aleta_abajo != 0){
			ctx.beginPath();
			ctx.lineWidth = "3";
			ctx.moveTo(largoSum,y+aletaArribaVal+alto);
			ctx.lineTo(largoSum,y+altoTotal);
			ctx.stroke();
		}
	}

	//ANCHO
	largoSum = largoSum + ancho;
	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(largoSum,y+m1);
	ctx.lineTo(largoSum,y+altoTotal+m2);
	ctx.stroke();

	if (aleta_arriba != 0){
		ctx.beginPath();
		ctx.lineWidth = "3";
		ctx.moveTo(largoSum,y);
		ctx.lineTo(largoSum,y+aletaArribaVal);
		ctx.stroke();
	}

	if (aleta_abajo != 0){
		ctx.beginPath();
		ctx.lineWidth = "3";
		ctx.moveTo(largoSum,y+aletaArribaVal+alto);
		ctx.lineTo(largoSum,y+altoTotal);
		ctx.stroke();
	}

	if (desarrollo == 1){
		//LARGO
		largoSum = largoSum + largo;
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(largoSum,y+m1);
		ctx.lineTo(largoSum,y+altoTotal+m2);
		ctx.stroke();

		if (aleta_arriba != 0){
			ctx.beginPath();
			ctx.lineWidth = "3";
			ctx.moveTo(largoSum,y);
			ctx.lineTo(largoSum,y+aletaArribaVal);
			ctx.stroke();
		}

		if (aleta_abajo != 0){
			ctx.beginPath();
			ctx.lineWidth = "3";
			ctx.moveTo(largoSum,y+aletaArribaVal+alto);
			ctx.lineTo(largoSum,y+altoTotal);
			ctx.stroke();
		}

		//LARGO
		largoSum = largoSum + ancho;
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(largoSum,y+m1);
		ctx.lineTo(largoSum,y+altoTotal+m2);
		ctx.stroke();

		if (aleta_arriba != 0){
			ctx.beginPath();
			ctx.lineWidth = "3";
			ctx.moveTo(largoSum,y);
			ctx.lineTo(largoSum,y+aletaArribaVal);
			ctx.stroke();
		}

		if (aleta_abajo != 0){
			ctx.beginPath();
			ctx.lineWidth = "3";
			ctx.moveTo(largoSum,y+aletaArribaVal+alto);
			ctx.lineTo(largoSum,y+altoTotal);
			ctx.stroke();
		}
	}
	


	//ALETA SUPERIOR
	anchoSum = anchoSum + y + aletaArribaVal;
	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x,anchoSum);
	ctx.lineTo(x +largoTotal + 15 ,anchoSum);
	ctx.stroke();



	if (aleta_arriba == 3){
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x,anchoSum-ancho/2);
		ctx.lineTo(x +largoTotal + 15 ,anchoSum-ancho/2);
		ctx.stroke();


		ctx.beginPath();
		ctx.lineWidth = "3";
		ctx.moveTo(x+cierre_v+ancho/2-centro,y);
		ctx.lineTo(x+cierre_v+ancho/2-centro,y+aletaArribaVal);
		ctx.stroke();

		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x+cierre_v+ancho/2-centro,y+m1);
		ctx.lineTo(x+cierre_v+ancho/2-centro,y);
		ctx.stroke();

		if (desarrollo == 1){
			ctx.beginPath();
			ctx.lineWidth = "3";
			ctx.moveTo(x+cierre_v+ancho+largo+ancho/2-centro,y);
			ctx.lineTo(x+cierre_v+ancho+largo+ancho/2-centro,y+aletaArribaVal);
			ctx.stroke();

			ctx.beginPath();
			ctx.lineWidth = "1";
			ctx.moveTo(x+cierre_v+ancho+largo+ancho/2-centro,y+m1);
			ctx.lineTo(x+cierre_v+ancho+largo+ancho/2-centro,y);
			ctx.stroke();
		}
	}

	//ALETA INFERIOR
	anchoSum = anchoSum + alto;
	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x,anchoSum);
	ctx.lineTo(x +largoTotal + 15 ,anchoSum);
	ctx.stroke();


	if (aleta_abajo== 3){
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x,anchoSum+ancho/2);
		ctx.lineTo(x +largoTotal + 15 ,anchoSum+ancho/2);
		ctx.stroke();


		ctx.beginPath();
		ctx.lineWidth = "3";
		ctx.moveTo(x+cierre_v+ancho/2-centro,y+aletaArribaVal+alto);
		ctx.lineTo(x+cierre_v+ancho/2-centro,y+altoTotal);
		ctx.stroke();

		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x+cierre_v+ancho/2-centro,y+altoTotal);
		ctx.lineTo(x+cierre_v+ancho/2-centro,y+altoTotal+m2);
		ctx.stroke();

		if (desarrollo == 1){
			ctx.beginPath();
			ctx.lineWidth = "3";
			ctx.moveTo(x+cierre_v+ancho+largo+ancho/2-centro,y+aletaArribaVal+alto);
			ctx.lineTo(x+cierre_v+ancho+largo+ancho/2-centro,y+altoTotal);
			ctx.stroke();

			ctx.beginPath();
			ctx.lineWidth = "1";
			ctx.moveTo(x+cierre_v+ancho+largo+ancho/2-centro,y+altoTotal);
			ctx.lineTo(x+cierre_v+ancho+largo+ancho/2-centro,y+altoTotal+m2);
			ctx.stroke();
		}
	}



	//MEDIDAS ALETA SUPERIOR
	if (true){
		//MEDIDAS CIERRE
		if (cierre != 0){
			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			writeCanvas (ctx,cierre_val - pCentro, x+(cierre_v-centro)/3, y-5,"12px",pCanvas);
		}
		//MEDIDAS ANCHO 1
		if (aleta_arriba == 3){
			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			writeCanvas (ctx,a/2, x + cierre_v + ancho/2/3 - centro, y-5,"12px",pCanvas);

			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			writeCanvas (ctx,a/2, x + cierre_v + ancho/2 + ancho/2/3 - centro, y-5,"12px",pCanvas);
		}else {
			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			writeCanvas (ctx,a, x + cierre_v + ancho/3 - centro, y-5,"12px",pCanvas);
		}

		//MEDIDAS LARGO 1
		if (desarrollo == 1){
			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			writeCanvas (ctx,l, x + cierre_v + ancho + largo /3 - centro, y-5,"12px",pCanvas);
		}else{
			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			writeCanvas (ctx,l+pCentro, x + cierre_v + ancho + largo /3 - centro, y-5,"12px",pCanvas);
		}

		//MEDIDAS ANCHO 2
		if (desarrollo == 1){
			if (aleta_arriba == 3){
				//ctx.fillStyle = "blue";
				//ctx.font = "12px Arial";
				writeCanvas (ctx,a/2, x + cierre_v + ancho + largo+ ancho/2/3 - centro, y-5,"12px",pCanvas);

				//ctx.fillStyle = "blue";
				//ctx.font = "12px Arial";
				writeCanvas (ctx,a/2, x + cierre_v + ancho + largo+ ancho/2 + ancho/2/3 - centro, y-5,"12px",pCanvas);
			}else {
				//ctx.fillStyle = "blue";
				//ctx.font = "12px Arial";
				writeCanvas (ctx,a, x + cierre_v +ancho+largo+ ancho/3 - centro, y-5,"12px",pCanvas);
			}
		}

		if (desarrollo == 1){
			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			writeCanvas (ctx,l+pCentro, x + cierre_v + ancho + largo + ancho + largo /3 - centro, y-5,"12px",pCanvas);
		}
		

	}

	//MEDIDAS ALETA INFERIOR
	if (aleta_abajo != 0){
		//MEDIDAS CIERRE
		if (cierre != 0){
			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			writeCanvas (ctx,cierre_val - pCentro, x+(cierre_v-centro)/3, y+altoTotal+15,"12px",pCanvas);
		}
		//MEDIDAS ANCHO 1
		if (aleta_abajo == 3){
			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			writeCanvas (ctx,a/2, x + cierre_v + ancho/2/3 - centro, y+altoTotal+15,"12px",pCanvas);

			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			writeCanvas (ctx,a/2, x + cierre_v + ancho/2 + ancho/2/3 - centro, y+altoTotal+15,"12px",pCanvas);
		}else {
			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			writeCanvas (ctx,a, x + cierre_v + ancho/3 - centro, y+altoTotal+15,"12px",pCanvas);
		}

		//MEDIDAS LARGO 1
		if (desarrollo == 1){
			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			writeCanvas (ctx,l, x + cierre_v + ancho + largo /3 - centro, y+altoTotal+15,"12px",pCanvas);
		}else{
			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			writeCanvas (ctx,l+pCentro, x + cierre_v + ancho + largo /3 - centro,y+altoTotal+15,"12px",pCanvas);
		}

		//MEDIDAS ANCHO 2
		if (desarrollo == 1){
			if (aleta_abajo == 3){
				//ctx.fillStyle = "blue";
				//ctx.font = "12px Arial";
				writeCanvas (ctx,a/2, x + cierre_v + ancho + largo+ ancho/2/3 - centro, y+altoTotal+15,"12px",pCanvas);

				//ctx.fillStyle = "blue";
				//ctx.font = "12px Arial";
				writeCanvas (ctx,a/2, x + cierre_v + ancho + largo+ ancho/2 + ancho/2/3 - centro, y+altoTotal+15,"12px",pCanvas);
			}else {
				//ctx.fillStyle = "blue";
				//ctx.font = "12px Arial";
				writeCanvas (ctx,a, x + cierre_v +ancho+largo+ ancho/3 - centro, y+altoTotal+15,"12px",pCanvas);
			}
		}

		if (desarrollo == 1){
			//ctx.fillStyle = "blue";
			//ctx.font = "12px Arial";
			writeCanvas (ctx,l+pCentro, x + cierre_v + ancho + largo + ancho + largo /3 - centro, y+altoTotal+15,"12px",pCanvas);
		}
	}

	if (gRefile > 0){
		
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(largoTotal + x + refile,y+m1);
		ctx.lineTo(largoTotal + x + refile,y);
		ctx.stroke();
		
		writeCanvas (ctx,gRefile, largoTotal + x +1, y-5,"12px",pCanvas);
		
		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.lineWidth = "1";
		ctx.fillStyle = 'lightyellow';
		ctx.fillRect(largoTotal + x, y, refile, altoTotal);
		ctx.rect(largoTotal + x,y,refile,altoTotal);
		ctx.stroke();
		
		
	}
	if ($('#P30_STATUS')[0].value == 1){
		document.getElementById("P30_P_ANCHO").value = Math.round(itemAltoTotal);
		document.getElementById("P30_P_LARGO").value = Math.round(itemLargoTotal)+gRefile;
	}
	//TRAZADOS
	var traz = 0;
	gTrazado = new Array();

	if (aleta_abajo != 0){
		traz = traz + aleta_abajo_val;
		gTrazado.push(traz); //ADD TRAZADO
		if (aleta_abajo == 3){
			traz = traz + a/2;
			gTrazado.push(traz); //ADD TRAZADO
		}
	}
	traz = traz + alt;
	gTrazado.push(traz); //ADD TRAZADO

	if (aleta_arriba != 0){
		if (aleta_arriba == 3){
			traz = traz + a/2;
			gTrazado.push(traz); //ADD TRAZADO
		}
		traz = traz + aleta_arriba_val;
		gTrazado.push(traz); //ADD TRAZADO
	}

	//TRAZADOS
	if (trazados.length > 0){
		for (var i = 0; i < trazados.length; i++){
			t = trazados[i]/divisor;
			gTrazado.push(trazados[i]);

			ctx.beginPath();
			ctx.lineWidth = "1";
			ctx.moveTo(x,y+altoTotal-t);
			ctx.lineTo(x+(largoTotal)+15,y+altoTotal-t);
			ctx.stroke();
		}
	}
	gTrazado.sort(function(a,b) { return a - b; });
	var gTrazadoFinal = new Array();
	var trazPrev = 0;
	for (var i = 0; i < gTrazado.length; i++){
		t = gTrazado[i];
		gTrazadoFinal.push(Math.round(t-trazPrev));
		trazPrev = t;

	}

	medidasTrazados2(ctx,x,y,gTrazadoFinal,altoTotal,largoTotal,divisor,pCanvas);

}


function art_8(c,l,a,alt,aleta_arriba,aleta_arriba_val,aleta_abajo,aleta_abajo_val,mult_x,trazados,pCentro,pCanvas = "mycanvas"){

	var aletaArribaVal = alt;
	var aletaAbajoVal = alt;

	if (aleta_arriba == 0){
		aletaArribaVal = 0;
		m1 = 0;
	}else if (aleta_arriba == 2)
		aletaArribaVal = (alt+10+alt-3);

	if (aleta_abajo == 0){
		aletaAbajoVal = 0;
		m2 = 0;
	}else if (aleta_abajo == 2)
		aletaAbajoVal = (alt+10+alt-3);

    var altoTotal = a;

	if (aleta_arriba == 1){
		altoTotal = altoTotal+alt;
	}else if (aleta_arriba == 2){
		altoTotal = altoTotal+alt+10+alt-3;
	}

	if (aleta_abajo == 1){
		altoTotal = altoTotal+alt;
	}else if (aleta_abajo == 2){
		altoTotal = altoTotal+alt+10+alt-3;
	}

	var largoTotal = (l + alt + alt ) *mult_x;



	if (gZoom == 0){
		var v_ALTO_CANVAS = $("#"+pCanvas).height() - 80 - 30;
		var v_ANCHO_CANVAS = $("#"+pCanvas).width() - 50 - 60;

		if (altoTotal/v_ALTO_CANVAS > largoTotal/v_ANCHO_CANVAS){
		  var v_ZOOM_CANVAS = altoTotal/v_ALTO_CANVAS;
		}else{
		  var v_ZOOM_CANVAS = largoTotal/v_ANCHO_CANVAS;
		}
	}else{
		var v_ZOOM_CANVAS = gZoom;
	}

	var divisor = v_ZOOM_CANVAS;

	var largo = l / divisor;
	var ancho = a / divisor;
	var alto = alt / divisor;
	var centro = pCentro / divisor;
	var refile = gRefile / divisor;

	var xInit = 50;
	var y = 80;
	var x = xInit;
	var ctx = c.getContext("2d");
	largoTotal = 0;
	altoTotal = 0;
	var aleta_val = aleta_arriba_val;
	var aleta =aleta_arriba*1 + aleta_abajo*1;
	var largoSum = 0;
	var anchoSum = 0;
	aletaArribaVal = alt / divisor;
	aletaAbajoVal = alt / divisor;
	var m1 = -15;
	var m2 = 0;
	var x1 = 0;
	var y1 = 0;

	if (aleta_arriba == 0){
		aletaArribaVal = 0;
		m1 = 0;
	}else if (aleta_arriba == 2)
		aletaArribaVal = (alt+10+alt-3) / divisor;

	if (aleta_abajo == 0){
		aletaAbajoVal = 0;
		m2 = 0;
	}else if (aleta_abajo == 2)
		aletaAbajoVal = (alt+10+alt-3) / divisor;

	largoTotal = (l + alt + alt ) / divisor *mult_x;

	altoTotal = a;

	if (aleta_arriba == 1){
		altoTotal = altoTotal+alt;
	}else if (aleta_arriba == 2){
		altoTotal = altoTotal+alt+10+alt-3;
	}

	if (aleta_abajo == 1){
		altoTotal = altoTotal+alt;
	}else if (aleta_abajo == 2){
		altoTotal = altoTotal+alt+10+alt-3;
	}
	
	var finalAltoTotal = altoTotal;
	
	altoTotal = altoTotal/divisor;
    
	
	var finalLargoTotal = (l + alt + alt ) * mult_x;
	
	//PLACA ENTERA
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth = "3";
	ctx.rect(x,y,largoTotal,altoTotal);
	ctx.stroke();


	//MEDIDA PLACA LARGO
	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x,y-5-15);
	ctx.lineTo(x,y-20-15);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x+largoTotal+refile,y-5-15);
	ctx.lineTo(x+largoTotal+refile,y-20-15);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x,y-15-15);
	ctx.lineTo(x+largoTotal+refile,y-15-15);
	ctx.stroke();

	x1 = (largoTotal /2)+x-10;
	y1 = y-20-15;
	txt = (largoTotal*divisor).toFixed() * 1 +gRefile;
	writeCanvas (ctx,txt,x1,y1,"16px",pCanvas);

	//MEDIDA PLACA ANCHO
	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x-5,y);
	ctx.lineTo(x-20,y);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x-5,y+altoTotal);
	ctx.lineTo(x-20,y+altoTotal);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.moveTo(x-15,y);
	ctx.lineTo(x-15,y+altoTotal);
	ctx.stroke();

	ctx.translate(x-20, ( altoTotal / 2)+y+10);
	ctx.rotate(Math.PI / -2 );
	//ctx.font = "16px Arial";
	writeCanvas (ctx,(altoTotal * divisor).toFixed(), 0,0,"16px",pCanvas);
	ctx.rotate(Math.PI / 2 );
	ctx.restore();
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	// VERTICALES
	largoSum = x;

	for (var i = 1; i <= mult_x; i++){
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(largoSum,y+m1);
		ctx.lineTo(largoSum,y+altoTotal+m2);
		ctx.stroke();

		largoSum = largoSum + alto;
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(largoSum,y+m1);
		ctx.lineTo(largoSum,y+altoTotal+m2);
		ctx.stroke();

		x1 = largoSum - alto + alto/3;
		y1 = y-10;
		txt = alt;
		writeCanvas (ctx,txt,x1,y1,"12px",pCanvas);

		largoSum = largoSum + largo;
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(largoSum,y+m1);
		ctx.lineTo(largoSum,y+altoTotal+m2);
		ctx.stroke();

		x1 = largoSum - largo + largo/2;
		y1 = y-10;
		txt = l;
		writeCanvas (ctx,txt,x1,y1,"12px",pCanvas);

		largoSum = largoSum + alto;
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(largoSum,y+m1);
		ctx.lineTo(largoSum,y+altoTotal+m2);
		ctx.stroke();

		x1 = largoSum - alto + alto/3;
		y1 = y-10;
		txt = alt;
		writeCanvas (ctx,txt,x1,y1,"12px",pCanvas);

	}

	// VERTICALES CORTE
	largoSum = x;

	for (var i = 1; i <= mult_x; i++){
		largoSum = largoSum + alto;

		if (aleta_arriba != 0){
			ctx.beginPath();
			ctx.lineWidth = "3";
			ctx.moveTo(largoSum,y);
			ctx.lineTo(largoSum,y+aletaArribaVal);
			ctx.stroke();
		}

		if (aleta_abajo != 0){
			ctx.beginPath();
			ctx.lineWidth = "3";
			ctx.moveTo(largoSum,y+aletaArribaVal+ancho);
			ctx.lineTo(largoSum,y+aletaArribaVal+ancho+aletaAbajoVal);
			ctx.stroke();
		}

		largoSum = largoSum + largo;
		if (aleta_arriba != 0){
			ctx.beginPath();
			ctx.lineWidth = "3";
			ctx.moveTo(largoSum,y);
			ctx.lineTo(largoSum,y+aletaArribaVal);
			ctx.stroke();
		}

		if (aleta_abajo != 0){
			ctx.beginPath();
			ctx.lineWidth = "3";
			ctx.moveTo(largoSum,y+aletaArribaVal+ancho);
			ctx.lineTo(largoSum,y+aletaArribaVal+ancho+aletaAbajoVal);
			ctx.stroke();
		}
		if (mult_x > 0 && mult_x != i){
			largoSum = largoSum + alto;
			ctx.beginPath();
			ctx.lineWidth = "3";
			ctx.moveTo(largoSum,y);
			ctx.lineTo(largoSum,y+aletaArribaVal+ancho+aletaAbajoVal);
			ctx.stroke();
		 }
    }

    // HORIZANTALES
    anchoSum = y;
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.moveTo(x,anchoSum);
    ctx.lineTo(x+largoTotal-m1,anchoSum);
    ctx.stroke();

    if (aleta_arriba == 2){
		anchoSum = anchoSum + (alt - 3)/divisor;
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x,anchoSum);
		ctx.lineTo(x+largoTotal-m1+refile,anchoSum);
		ctx.stroke();

		anchoSum = anchoSum + 10/divisor;
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x,anchoSum);
		ctx.lineTo(x+largoTotal-m1+refile,anchoSum);
		ctx.stroke();
    }

    if (aleta_arriba != 0){
		anchoSum = anchoSum + alto;
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x,anchoSum);
		ctx.lineTo(x+largoTotal-m1+refile,anchoSum);
		ctx.stroke();
    }

    anchoSum = anchoSum + ancho;
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.moveTo(x,anchoSum);
    ctx.lineTo(x+largoTotal-m1+refile,anchoSum);
    ctx.stroke();

    if (aleta_abajo != 0){
		anchoSum = anchoSum + (alt)/divisor;
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x,anchoSum);
		ctx.lineTo(x+largoTotal-m1+refile,anchoSum);
		ctx.stroke();
    }

    if (aleta_abajo == 2){
		anchoSum = anchoSum + 10/divisor;
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x,anchoSum);
		ctx.lineTo(x+largoTotal-m1+refile,anchoSum);
		ctx.stroke();

		anchoSum = anchoSum + (alt-3)/divisor;
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x,anchoSum);
		ctx.lineTo(x+largoTotal-m1+refile,anchoSum);
		ctx.stroke();
    }
	
	if (gRefile > 0){
		
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.moveTo(x+largoTotal+refile,y-5);
		ctx.lineTo(x+largoTotal+refile,y-20);
		ctx.stroke();
		
		writeCanvas (ctx, gRefile, x+largoTotal+1, y-10,"12px",pCanvas);
		
		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.lineWidth = "1";
		ctx.fillStyle = 'lightyellow';
		ctx.fillRect(x + largoTotal, y, refile, altoTotal);
		ctx.rect(x + largoTotal,y,refile,altoTotal);
		ctx.stroke();
		
		
	}
	if ($('#P30_STATUS')[0].value == 1){
		document.getElementById("P30_P_ANCHO").value = Math.round(finalAltoTotal);
		document.getElementById("P30_P_LARGO").value = Math.round(finalLargoTotal)+gRefile;
	}
	
	//TRAZADOS
	var traz = 0;
	gTrazado = new Array();

	if (aleta_abajo == 2){
		traz = traz + (alt-3);
		gTrazado.push(traz); //ADD TRAZADO

		traz = traz + 10;
		gTrazado.push(traz); //ADD TRAZADO
	}

	if (aleta_abajo != 0){
		traz = traz + alt;
		gTrazado.push(traz); //ADD TRAZADO
	}

	traz = traz + a;
	gTrazado.push(traz); //ADD TRAZADO

	if (aleta_arriba != 0){
		traz = traz + alt;
		gTrazado.push(traz); //ADD TRAZADO
	}

	if (aleta_arriba == 2){
		traz = traz + 10;
		gTrazado.push(traz); //ADD TRAZADO

		traz = traz + (alt-3);
		gTrazado.push(traz); //ADD TRAZADO
	}

	gTrazado.sort(function(a,b) { return a - b; });
	var gTrazadoFinal = new Array();
	var trazPrev = 0;
	for (var i = 0; i < gTrazado.length; i++){
		t = gTrazado[i];
		gTrazadoFinal.push(t-trazPrev);
		trazPrev = t;

	}

	medidasTrazados2(ctx,x,y,gTrazadoFinal,altoTotal,largoTotal,divisor,pCanvas);

}

function medidasTrazados (ctx,x,y,trazados,altoTotal,largoTotal,divisor){

	//trazados.sort(function(a,b) { return a - b; });
	var trazPrev = 0;
	var traz = 0;
	var x1=0;
	var y1=0;
	var txt=0;

	for (var i = 0; i < trazados.length; i++){
		traz = trazados[i];

		x1 = x+largoTotal+15;
		y1 = y+altoTotal-traz/divisor+((traz-trazPrev)/divisor)/2+3;
		txt = traz-trazPrev;
		writeCanvas (ctx,traz-trazPrev,x1,y1,"12px",pCanvas);

		trazPrev = traz;
	}
	if ($('#P30_STATUS')[0].value == 1){
		document.getElementById("P30_TRAZADOS").disabled = false;
		document.getElementById("P30_TRAZADOS").value = trazados.reverse().join("|");
		document.getElementById("P30_TRAZADOS").disabled = true;
	}
}

function medidasTrazados2 (ctx,x,y,trazados,altoTotal,largoTotal,divisor,pCanvas = "mycanvas"){

	//trazados.sort(function(a,b) { return a - b; });
	var trazPrev = 0;
	var traz = 0;
	var x1=0;
	var y1=0;
	var txt=0;

	var y2 = y+altoTotal;

	for (var i = 0; i < trazados.length; i++){

		traz = trazados[i];

		x1 = x+largoTotal+gRefile/divisor+20;
		y2 = y2 - traz/divisor;
		y1 = y2+(traz/divisor)/2+3;

		txt = traz;
		writeCanvas (ctx,txt,x1,y1,"12px",pCanvas);

		trazPrev = traz;
	}
	if ($('#P30_STATUS')[0].value == 1 && document.getElementById("P30_TIPO").value != 2){
		document.getElementById("P30_TRAZADOS").disabled = false;
		document.getElementById("P30_TRAZADOS").value = "|" + trazados.reverse().join("|") + "|";
		document.getElementById("P30_TRAZADOS").disabled = true;
	}
}


function writeCanvas (ctx,text,x,y,tamano = "12px",pCanvas = "mycanvas"){
	ctx.fillStyle = "blue";
	if (pCanvas == "mycanvas")
		ctx.font = tamano + " Arial";
	else
		ctx.font = "16px Arial";
	
	ctx.fillText(text, x, y);

}

