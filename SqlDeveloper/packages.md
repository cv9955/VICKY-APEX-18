# PACKAGES

## ART_PKG

## BOB_PKG

## BOB_PRINT

## CORR_PKG

## COTIZ
* FUNCTION precio_papel (
	pid NUMBER,
	pfecha DATE DEFAULT SYSDATE
	)  RETURN NUMBER

* FUNCTION param_cotiz (
  * pid NUMBER DEFAULT NULL,
  * pcod VARCHAR2 DEFAULT NULL,
  * pfecha DATE DEFAULT SYSDATE
  RETURN NUMBER;

* FUNCTION get_fecha_param 
	RETURN DATE;

* FUNCTION get_precio_art (
        p_id       NUMBER,
        pcli       NUMBER DEFAULT NULL,
        pcalidad   NUMBER DEFAULT NULL
    ) RETURN NUMBER;

* FUNCTION get_precio_calidad (
        pcalidad       NUMBER,
        ptipo_precio   VARCHAR DEFAULT 'PRECIO',
        pfecha         DATE DEFAULT null
    ) RETURN NUMBER;


* PROCEDURE "GUARDAR_PRECIO" (
        part      NUMBER,
        pcli      NUMBER DEFAULT NULL,
        pprecio   NUMBER DEFAULT NULL,
        pobs      VARCHAR2 DEFAULT '',
        pdesde    DATE DEFAULT SYSDATE
    );

* PROCEDURE "GUARDAR_LISTA_CLIENTE" (
        pcli NUMBER DEFAULT NULL
    );


## PALLET_PKG

## PEDIDO_PKG

## PROD_PKG
