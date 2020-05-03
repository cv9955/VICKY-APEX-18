// mueve celdas de busqueda al toolbar  
// REV 03/05/20 >> se usa en PAGE ZERO
function initSearchItem(pItem,pText) {
	moveItem2Navbar(pItem);
	$s('P0_SEARCH_' + pItem, pText);

	// on focus fade out
	$('#P0_SEARCH_'+ pItem).focus(function() {
		$s('P0_SEARCH_' + pItem, '');
		fadeOutItem(pItem, 80, 300);
	});

	// on focosout fade in
	$('#P0_SEARCH_' + pItem).focusout(function() {
		$s('P0_SEARCH_' + pItem , pText);
		fadeInItem(pItem , 50, 300);
	});
}

// move element to navbar
function moveItem2Navbar(pItem) {
  var element = $('#P0_SEARCH_' + pItem).detach();
  $('.navbar-' + pItem).append(element);
}

// fade out animation
function fadeOutItem(pItem, pWidth, pTime) {
  $('#P0_SEARCH_' + pItem).animate({
    width: pWidth,
    backgroundColor: "#fff",
    color: "#000"
  }, pTime);
}
// fade in animation
function fadeInItem(pItem, pWidth, pTime) {
  $('#P0_SEARCH_' + pItem).animate({
    width: pWidth,
    backgroundColor: "transparent",
    color: "#fff"
  }, pTime);
}


// aplicar atributo a celda de interactive report
// EJ. HTML EXPRESION <span parent-class=medida_caja>#LARGO#</span>
// parent-class >> class 
// parent-style	>> style
// REV 03/05/20 agrega parent-style
// USO paginas 33 45 52 100 107 108 109 210 221 230
//
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
	
	// no se utiliza  
	apex.jQuery("span[parent-style]").each(
		function(){
			apex.jQuery(this).
				parent().attr( 'style', apex.jQuery(this).attr('parent-style'));
        }
	);	

}	

// 03/05/20 se inclute en apply_class_to_parent  !! eliminar
/*
function data_style() {
	apex.jQuery("span[data-style]").each(
		function(){
			apex.jQuery(this).
				parent().attr( 'style', apex.jQuery(this).attr('data-style'));
        }
	);	
}	
*/
