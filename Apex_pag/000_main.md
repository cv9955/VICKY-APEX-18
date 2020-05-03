# APPLICATION 420

## DEFINITION

## SECURITY
PUBLIC USER : APEX_PUBLIC_USER
Authentication Scheme : APEX

## GLOBALIZATION
language en-us
dateformat DD-MM-RR

## USER INTERFACE

HOME URL  f?p=&APP_ID.:1:&SESSION.
LOGIN URL f?p=&APP_ID.:LOGIN_DESKTOP:&SESSION.
LOGO URL #APP_IMAGES#app-420-logo.png
NAVIGATION MENU 	*DESKTOP_MENU*  TopNavigationMegaMenu
NAVIGATION BAR 	*DESKTOP_BAR* 	NavigationBar

Javascript Files 
- #APP_IMAGES#js/pagZero.js

CSS Files
- #APP_IMAGES#css/Pedidos.css
- #APP_IMAGES#css/Articulos.css
- #APP_IMAGES#css/ventas.css


## 0 - GLOBAL PAGE

> FOOTER
### GLOBAL SEARCH 
> CURRENT PAGE IS NOT PRINTER FRIENDLY

- P0_SEARCH_CLIENTE 	>> SUBMIT : CLIENTE SEARCH PAGE BRANCH
- P0_SEARCH_ARTICULO 	>> SUBMIT : ARTICULO SEARCH PAGE BRANCH
- P0_SEARCH_BOBINA 		>> SUBMIT : BOBINA SEARCH PAGE BRANCH

#### DINAMYC_ACTIONS (PAGE_LOAD)
* GLOBAL SEARCH  
```JAVASCRIPT 
// mueve los controles a la toolbar
initSearchItem('CLIENTE','Cliente');
initSearchItem('ARTICULO','Articulo');
initSearchItem('BOBINA','Bobina');
```

* boton reset IR
```JAVASCRIPT 
if (typeof $.apex.interactiveReport === "function") {
    $.apex.interactiveReport.prototype.reset = function() {this._reset();};
    apex.jQuery('#STATIC_ID_ir').interactiveReport("reset");
}
```

* HIDE APEX_SUCESS_MESSAGE
```JAVASCRIPT 
setTimeout(function() {
    $('#APEX_SUCCESS_MESSAGE').fadeOut('fast');
}, 1000); // <-- time in milliseconds
```

## 1 - HOME

> BEFORE BODY 
### TITLE
- HERO 

> BODY 
### MENUN_INICIO
- LIST CARDS >> MENU_INICIO

 