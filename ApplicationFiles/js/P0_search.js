function enterPressed(e){
	var keycode;
	if (window.event) 			{keycode = window.event.keyCode;}
	else if (e) 				{keycode = e.which;}
	else 						{return true;}

	if (keycode == 13){ 
		doSearch(); 		return false; 	}
	else { 					return true; 	} 
}   


function doSearch() { 
	window.location='f?p='+$v('pFlowId')+':9:'+$v('pInstance')
	+':BRANCH_TO_PAGE_ACCEPT'
	+'|SEARCH:::P0_SEARCH:'
	+$v('P0_SEARCH');
 }
 

 
function doSearchART() { 
	window.location='f?p='+$v('pFlowId')+':88:'+$v('pInstance')
	+':BRANCH_TO_PAGE_ACCEPT'
	+'|SEARCH:::P0_SEARCH_ART:'
	+$v('P0_SEARCH_ART');
 }    
    
// 03/05/20 archivo reemplazado >> pagZero.js

/*

    
function enterPressed_ART(e){
	var keycode;
	if (window.event) 	{keycode = window.event.keyCode;}
	else if (e) 		{keycode = e.which;}
	else 				{return true;}

	if (keycode == 13){ 
		doSearchART(); 
		return false; }
	else { 
		return true; } 
}      
  

  
function data_style() {
	apex.jQuery("span[data-style]").each(
		function(){
			apex.jQuery(this).
				parent().attr( 'style', apex.jQuery(this).attr('data-style'));
        }
	);	
}	

// aplicar atributo class a celda de interactive report
// parent-class >> class 
// REV 03/05/20 
function apply_class_to_parent() {
	apex.jQuery("span[parent-class]").each(
		function(){
			apex.jQuery(this).
				parent().attr( 'class', apex.jQuery(this).attr('parent-class'));
        }
	);	
	
	apex.jQuery("a[parent-class]").each(
		function(){
		apex.jQuery(this).
				parent().attr( 'class', apex.jQuery(this).attr('parent-class'));
        }
	);	
	
}	

*/