
function Calcular(){
  var px ='P' + $v('pFlowStepId') + '_';
	var tipo = $x(px + 'TIPO').value;



	switch (tipo) {

		case "0": //piso
			var l = Number($x(px + 'LARGO').value);   
    		var a = Number($x(px + 'ANCHO').value);

    		var mult_x = Number($x(px + 'MULT_X').value);   
    		var mult_y = Number($x(px + 'MULT_Y').value);   

    		var refile = Number($x(px + 'REFILE').value);   
	
    		var pl = l * mult_x + refile;
    		var pa = a * mult_y;   
    		var mult = mult_x * mult_y;

	    	$x(px + 'PLARGO').value = pl;
     		$x(px + 'PANCHO').value = pa;
     		$x(px + 'MULT').value = mult;
     		$x(px + 'SLOTTER').value = $x(px + 'SLOTTER').value || l;
 			$x(px + 'TRAZADOS').value = pa ; 

     	break;
		
		case "5": // TIRAS
			var l = Number($x(px + 'LARGO').value);   
    		var a = Number($x(px + 'ANCHO').value);
 

    		var refile = Number($x(px + 'REFILE').value);   
	
    		var pl = l  + refile;
    		var pa = a ;   
    		var mult = 1;

	    	$x(px + 'PLARGO').value = pl;
     		$x(px + 'PANCHO').value = pa;
     		$x(px + 'MULT').value = mult;
     		$x(px + 'SLOTTER').value = $x(px + 'SLOTTER').value || l;
 			$x(px + 'TRAZADOS').value = pa ; 

     	break;
		
		
  		case "1": // plancha trazada
		
			//**** CALCULO LARGO PLANCHA ****
			var sslotter 	= $x(px + 'SLOTTER').value || $x(px + 'LARGO').value; 
			var refile 		= Number($x(px + 'REFILE').value);
			var mult_x 		= $x(px + 'MULT_X').value || 1; 

			var slotter  = sslotter.split(":");
	
			var pl = 0;
			for (i = 0; i < slotter.length; i++){
				pl = pl + slotter [i] * 1;
			}
			$x(px + 'LARGO').value = pl;
			$x(px + 'PLARGO').value = pl * mult_x + refile;
			$x(px + 'SLOTTER').value = $x(px + 'SLOTTER').value || $x(px + 'LARGO').value;	

			
			//***** CALCULO ONDA *****
			var strazados 	= $x(px + 'TRAZADOS').value || $x(px + 'ANCHO').value;
			var trazados = strazados.split(":");
			var pa = 0;
			for (i = 0; i < trazados.length; i++){
				pa = pa + trazados [i] * 1;
			}

     		$x(px + 'PANCHO').value = pa;
			$x(px + 'TRAZADOS').value = strazados;
     		$x(px + 'MULT').value = mult_x;
     		
     	break;


      case "2": // troq  
/*        NO CALCULA -- CARGAR PLANCHA A MANO

        var l = Number($x(px + 'LARGO').value);   
        var a = Number($x(px + 'ANCHO').value);

        var mult_x = Number($x(px + 'MULT_X').value);   
        var mult_y = Number($x(px + 'MULT_Y').value);   

        var refile = Number($x(px + 'REFILE').value);   
  
        var pl = l*mult_x + refile;
        var pa = a*mult_y;   
        var mult = mult_x * mult_y;

        $x(px + 'PLARGO').value = pl;
        $x(px + 'PANCHO').value = pa;
        $x(px + 'MULT').value = mult;
        $x(px + 'SLOTTER').value = '' ;
        $x(px + 'TRAZADOS').value = pa ; */
        break;
      
      case "3": // DIVISION 
        var l = Number($x(px + 'LARGO').value);   
        var a = Number($x(px + 'ANCHO').value);
        var h = Number($x(px + 'ALTO').value);

        var mult_x = Number($x(px + 'DIV_X').value);   
        var mult_y = Number($x(px + 'DIV_Y').value);   

        var refile = Number($x(px + 'REFILE').value);   
  
        var pl = l*mult_x + a*mult_y + refile;
        var pa = h;   
        var mult = 1;
        var DIV_Z = (mult_x*1 + 1) * (mult_y*1 + 1) ;

        $x(px + 'PLARGO').value = pl;
        $x(px + 'PANCHO').value = pa;
        $x(px + 'MULT').value = mult;
        $x(px + 'SLOTTER').value = '' ;
        $x(px + 'TRAZADOS').value = pa ; 
        $x(px + 'DIV_Z').value = DIV_Z ; 
        break;
  		case "4": // cercos
			  var l = Number($x(px + 'LARGO').value);   
    		var a = Number($x(px + 'ANCHO').value);
    		var h = Number($x(px + 'ALTO').value);

    		var refile = Number($x(px + 'REFILE').value);   
    		var centro = Number($x(px + 'CENTRO').value);   
    		var media_caja = Number($x(px + 'DESARROLLO').value);   
    		var chapeton = Number($x(px + 'CIERRE_VALOR').value);
  
    		if (chapeton == null) {
    			chapeton = 30;
    		}   

    		var pl;
    		var pa = h;
    		var mult;

			if (media_caja == 1){
				pl = l + a + chapeton + refile;
        slotter = chapeton + ':' + a + ':' + l;
				mult = 0.5;
			}
			else{
				pl = (l + a) * 2 + chapeton + refile; 
        slotter = (chapeton*1 + centro*1) + ':' + a + ':' + l + ':' + a + ':' + (l*1 - centro*1);
				mult = 1;
			}

	    	$x(px + 'PLARGO').value = pl;
     		$x(px + 'PANCHO').value = pa;
     		$x(px + 'MULT').value = mult;
        $x(px + 'SLOTTER').value = slotter ;


     		break;
  		
		case "6": //tira div
			var l = Number($x(px + 'LARGO').value);   
    		var a = Number($x(px + 'ANCHO').value);

    		var mult_x = Number($x(px + 'MULT_X').value);   
    		var mult_y = Number($x(px + 'MULT_Y').value);   

    		var refile = Number($x(px + 'REFILE').value);   
			var sslotter 	= $x(px + 'SLOTTER').value || $x(px + 'LARGO').value; 
			var slotter  = sslotter.split(":");
			var pl = 0;
			for (i = 0; i < slotter.length; i++){
				pl = pl + slotter [i] * 1;
			}
			

  			if (mult_x == 2)
  			{
  				pl = pl * 2;
  				sslotter = sslotter + ':' + sslotter;
  			} else
			{
				mult_x = 1
			}	
			
			var pa = a;
  			if (mult_y == 2)
  			{
  				pa = pa * 2;
  			} else
			{
				mult_y = 1
			}
			
			var mtrazados = pa;
			
			var mult = mult_x * mult_y;
  			pl = pl + refile;
			
	    	$x(px + 'PLARGO').value = pl;
     		$x(px + 'PANCHO').value = pa;
     		$x(px + 'MULT').value = mult;
     		$x(px + 'SLOTTER').value = $x(px + 'SLOTTER').value|| $x(px + 'LARGO').value; 
 			$x(px + 'TRAZADOS').value = pa ; 
			$x(px + 'MULT_X').value = mult_x;
			$x(px + 'MULT_Y').value = mult_y;

    		

     		break;
			
			

     	break;

  		case "7": // caja
			var l = Number($x(px + 'LARGO').value);   
    		var a = Number($x(px + 'ANCHO').value);
    		var h = Number($x(px + 'ALTO').value);

    		var refile = Number($x(px + 'REFILE').value);   
    		var centro = Number($x(px + 'CENTRO').value);   
    		var media_caja = Number($x(px + 'DESARROLLO').value);   
    		var chapeton = Number($x(px + 'CIERRE_VALOR').value);


  
  			var aleta_sup;
  			var aleta_inf;
  			var aleta_sup_val;
  			var aleta_inf_val;

  			try{
	  			aleta_sup = $x(px + 'ALETA_SUP').value;  
  			}
  			catch(err){
  				aleta_sup = 0;
  			};
  			
  			try {
	  			aleta_inf = $x(px + 'ALETA_INF').value;   
	  		}catch(err){
	  			aleta_inf = 0;
	  		};		


    			var mtrazados = [0,0,0,h,0,0,0];

    			switch (aleta_sup)	{
    				case "0": // sin aleta
    					aleta_sup_val = 0;
    					break;
  				case "1": // aleta simple;
  					aleta_sup_val = Math.round(a/2);
  					mtrazados[2] = aleta_sup_val;
  					break;
  				case "2": // aleta cruzada;
  					aleta_sup_val = Number($x(px + 'ALETA_SUP_VALOR').value); 
  					mtrazados[2] = aleta_sup_val;
  					break;
  				case "3": // aleta integral;
  					aleta_sup_val = Number($x(px + 'ALETA_SUP_VALOR').value); 
  					mtrazados[0] = aleta_sup_val;
  					mtrazados[2] = Math.round(a/2);
  					break;	
    			}


			

 			switch (aleta_inf)	{
  				case "0": // sin aleta
  					aleta_inf_val = 0;
  					break;
				case "1": // aleta simple;
					aleta_inf_val = Math.round(a/2);
					mtrazados[4] = aleta_inf_val;
					break;
				case "2": // aleta cruzada;
					aleta_inf_val = Number($x(px + 'ALETA_INF_VALOR').value); 
					mtrazados[4] = aleta_inf_val;
					break;
				case "3": // aleta integral;
					aleta_inf_val = Number($x(px + 'ALETA_INF_VALOR').value); 
					mtrazados[6] = aleta_inf_val;
					mtrazados[4] = Math.round(a/2);
					break;	
  			}

  			if (tipo == "7" || tipo == "6") {
  				$x(px + 'ALETA_SUP_VALOR').value = aleta_sup_val ; 	
  			}
  			if (tipo == "7" || tipo == "5") {
  				$x(px + 'ALETA_INF_VALOR').value = aleta_inf_val ; 	
  		    }
			
        if ($x(px + 'CALCULAR_0').checked)
        {  
          $x(px + 'DEBUG').value = "Calcular";
			       var trazados = '';
			       var pa = 0;
      	     for (var i = 0; i < mtrazados.length; i++) {
      				if (mtrazados[i] > 0){	
      				        if(trazados.length > 0){
      						trazados = trazados + ":";
      					}
      					trazados = trazados + mtrazados[i] 
      					pa = pa + mtrazados[i] * 1 ;
      				}		
      			}
            $x(px + 'TRAZADOS').value = trazados ; 
          }else
          {
            $x(px + 'DEBUG').value = $x(px + 'CALCULAR').value;
            var strazados = $x(px + 'TRAZADOS').value;
            var trazados = strazados.split(":");
  
            var pa = 0;
             for (i = 0; i < trazados.length; i++){
                 pa = pa + trazados [i] * 1;
              }

          }
  			
  			

    		if (chapeton == null) {
    			chapeton = 30;
    		}   

    		var pl;
    		
    		var mult;
    		var slotter;

			if (media_caja == 1){
				slotter = chapeton + ':' + a + ':' + l;
				pl = l + a + chapeton + refile;
				mult = 0.5;
			}
			else{
				slotter = (chapeton*1 + centro*1) + ':' + a + ':' + l + ':' + a + ':' + (l*1 - centro*1);
				pl = (l + a) * 2 + chapeton + refile; 
				mult = 1;
			}


	    	$x(px + 'PLARGO').value = pl;
     		$x(px + 'PANCHO').value = pa;
     		$x(px + 'MULT').value = mult;
     		$x(px + 'SLOTTER').value = slotter ;

     		break;

 		case "8": // BANDEJA
			var l = Number($x(px + 'LARGO').value);   
    		var a = Number($x(px + 'ANCHO').value);
    		var h = Number($x(px + 'ALTO').value);

    		var refile = Number($x(px + 'REFILE').value);   
    		var invertida = Number($x(px + 'DESARROLLO').value);   
 			var mult_x = Number($x(px + 'MULT_X').value);    
  			
  			var aleta_sup = $x(px + 'ALETA_SUP').value;   
  			var aleta_inf = $x(px + 'ALETA_INF').value;   

    		
    		
    		var mult = 1;
  			var mtrazados = [0,0,0,a,0,0,0];
			var slotter = h + ':' + l + ':' + h;
			var pl = l + h * 2;

  			if (invertida == 1){
  				mtrazados[3] = l;
  				pl = a + h * 2;
  				slotter = h + ':' + a + ':' + h;
  			}	


  			if (mult_x == 2)
  			{
  				pl = pl * 2;
  				slotter = slotter + ':' + slotter;
  				mult = 2;
  			} else
			{
				mult_x = 1
			}				

  			pl = pl + refile;


  			switch (aleta_sup)	{
  				case "0": // sin aleta
  					break;
				case "1": // aleta mecanica;
					mtrazados[2] = h;
					break;
				case "2": // aleta revatible;
					mtrazados[0] = h-3;
					mtrazados[1] = 10;
					mtrazados[2] = h;
					break;	
  			}

 			switch (aleta_inf)	{
  				case "0": // sin aleta
   					break;
				case "1": // aleta simple;
					mtrazados[4] = h;
					break;
				case "2": // aleta cruzada;
					mtrazados[6] = h-3;
					mtrazados[5] = 10;
					mtrazados[4] = h;
					break;	
  			}


			var trazados = '';
			var pa = 0;
			for (var i = 0; i < mtrazados.length; i++) {
				if (mtrazados[i] > 0){	
				        if(trazados.length > 0){
						trazados = trazados + ":";
					}
					trazados = trazados + mtrazados[i] 
					pa = pa + mtrazados[i] * 1 ;
				}		
			}


	    	$x(px + 'PLARGO').value = pl;
     		$x(px + 'PANCHO').value = pa;
     		$x(px + 'MULT').value = mult;
			$x(px + 'MULT_X').value = mult_x;
     		$x(px + 'SLOTTER').value = slotter ;
 			$x(px + 'TRAZADOS').value = trazados ; 
     		break;


  		case "9": // TUBO
			var l = Number($x(px + 'LARGO').value);   
    		var a = Number($x(px + 'ANCHO').value);
    		var h = Number($x(px + 'ALTO').value);

    		var refile = Number($x(px + 'REFILE').value);   
    		var centro = Number($x(px + 'CENTRO').value);   
    		var media_caja = Number($x(px + 'DESARROLLO').value);   
    		var cierre = Number($x(px + 'CIERRE').value);

    		var chapeton = 0;
    		if (cierre > 0) {
    			chapeton = Number($x(px + 'CIERRE_VALOR').value);
			}

  			var aleta_sup = $x(px + 'ALETA_SUP').value;   
  			var aleta_inf = $x(px + 'ALETA_INF').value;   
  			var aleta_sup_val;
  			var aleta_inf_val;
  			var slotter;

  			switch (aleta_sup)	{
  				case "0": // sin aleta
  					aleta_sup_val = 0;
  					slotter = h;
  					break;
				case "1": // con aleta;
					aleta_sup_val = Number($x(px + 'ALETA_SUP_VALOR').value); 
					slotter = aleta_sup_val + ':' + h;
					break;
  			}

 			switch (aleta_inf)	{
  				case "0": // sin aleta
  					aleta_inf_val = 0;
  					break;
				case "1": // aleta simple;
					aleta_inf_val = Number($x(px + 'ALETA_INF_VALOR').value); 
					slotter = slotter + ':' + aleta_inf_val;
					break;
  			}
  			var pl = aleta_inf_val + h + aleta_sup_val + refile;


    		var mult;
  			var trazados = '';

			if (media_caja == 1){
				trazados = l + ':' + a + ':' + chapeton;
				pa = l + a + chapeton;
				mult = 0.5;
			}
			else{
				trazados = l + ':' + a + ':' + l + ':' + a + ':' + chapeton;
				pa = (l + a) * 2 + chapeton ; 
				mult = 1;
			}


			$x(px + 'SLOTTER').value = slotter ;
  			$x(px + 'TRAZADOS').value = trazados ; 
	    	$x(px + 'PLARGO').value = pl;
     		$x(px + 'PANCHO').value = pa;
     		$x(px + 'MULT').value = mult;
 
     		break;

 		default:
 			$x(px + 'DEBUG').value = "TIPO:" + tipo;

	}

     dibujar_plano();

}


