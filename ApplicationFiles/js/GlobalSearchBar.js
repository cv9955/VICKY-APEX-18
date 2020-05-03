// 03/05/2020 ARCHIVIO REEMPLAZADO >> pagZero.js
/*
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


*/