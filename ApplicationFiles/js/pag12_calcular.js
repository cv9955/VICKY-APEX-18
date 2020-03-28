function Calcular()
{
  var px ='P' + $v('pFlowStepId') + '_';
 
    
   var l1 = $v(px+'PLARGO_1');
   var c1 = $v(px+'CANT_1');
   var m1 = $v(px+'MULT_1');
   var o1 = $v(px+'PANCHO_1');
   var l2 = $v(px+'PLARGO_2');
   var c2 = $v(px+'CANT_2');
   var m2 = $v(px+'MULT_2');
   var o2 = $v(px+'PANCHO_2');
   var l3 = $v(px+'PLARGO_3');
   var c3 = $v(px+'CANT_3');
   var m3 = $v(px+'MULT_3');
   var o3 = $v(px+'PANCHO_3');
    
   var mx1 = $v(px+'MX_1') || 1;  
   var mx2 = $v(px+'MX_2') || 1;  
   var mx3 = $v(px+'MX_3') || 1;  

   var formato = $v(px+'FORMATO') * 10;
   var r1 = 30;
   if (formato < 1300) {
	   r1 = 20 ;
	} 
   
   var mt1 =   Math.round(l1 * c1 / m1 /mx1 /1000);
   var mt2 =   Math.round(l2 * c2 / m2 /mx2 /1000);
   var mt3 =   Math.round(l3 * c3 / m3 /mx3 /1000);
    

   $x(px + 'METROS_1').value = mt1 || 0 ;
   $x(px + 'METROS_2').value = mt2 || 0 ;
   $x(px + 'METROS_3').value = mt3 || 0;

  var onda =    o1 * m1 *mx1 + o2 * m2 * mx2 + o3 * m3 * mx3;

   $x(px + 'ONDA').value = onda;
   $x(px + 'R1').value = r1;
   $x(px + 'DIF').value = formato - onda - r1;
   $x(px + 'REFILE').value = formato - onda;
}


function Borrar(art)
{
    var px ='P' + $v('pFlowStepId') + '_';    
    $s(px + 'ART_'     +art,'');
    $s(px + 'CLIENTE_' +art,'');
    $s(px + 'CODIGO_'  +art,'');
    $s(px + 'CALIDAD_' +art,'');
    $s(px + 'PLARGO_'  +art,'');
    $s(px + 'CANT_'    +art,'');
    $s(px + 'MULT_'    +art,'1');
    $s(px + 'MX_'      +art,'1');
    $s(px + 'PANCHO_'  +art,'');
    $s(px + 'TRAZADOS_'+art,'');
    $s(px + 'METROS_'  +art,'0');
    $s(px + 'TIPO_'    +art,null);    
}