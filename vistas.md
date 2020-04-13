# VISTAS

## CLIENTES

### CLI_CUENTAS_ALL
```SQL
SELECT    id,    cliente_id,    title,    2 cta
	FROM    cli_cuentas

UNION ALL

SELECT    id,    cliente_id,   title,    1 cta
	FROM    cli_dfiscal
```
### CLI_DEPOSITOS_VIEW 
SELECT 
    ID , 
	CLIENTE_ID,
    NVL(TITLE,NVL(locality,ROUTE)) TITLE ,
    REPLACE( REPLACE (DIRECCION,', Buenos Aires',''),', Argentina','') DIRECCION ,
    LAT, 
	LNG, 
	OBS
    FROM CLI_DEPOSITOS
	