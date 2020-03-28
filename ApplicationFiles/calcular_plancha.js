
function test() {
	var tipo = document.getElementById("P32_TIPO").value;
	document.getElementById("P32_OBS").value = tipo;
	document.getElementById("P32_PLARGO").value = 0;
	document.getElementById("P32_PANCHO").value = 0;

}


function calcular_plancha() {
  	document.getElementById("P32_OBS").value = 'PRUEBA OK';


	var tipo = document.getElementById("P32_TIPO").value;


		if (tipo == 0) 
		{
			var l = document.getElementById("P32_LARGO").value;
			var a = document.getElementById("P32_ANCHO").value;

			var x = document.getElementById("P32_MULT_X").value;
			var y = document.getElementById("P32_MULT_Y").value;

			var pl = l * x;
			var pa = a * y;
			var mult = x * y;
			
			document.getElementById("P32_PLARGO").value = pl;
			document.getElementById("P32_PANCHO").value = pa;
		}	
		else
		{

		  	document.getElementById("P32_PLARGO").value = 99;
	        document.getElementById("P32_PANCHO").value = 99;
	    }    	



}