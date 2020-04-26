# Paginas
## Main
- 1 Menu Principal  >> LISTA_MENU_INICIO



## Clientes
- 101 Buscar_Cliente 
  - 120 Nuevo_Cliente

## Menu Clientes  (reemplazo de 10 - Cliente_X)
- 100 CLIENTES_Articulos  >>G_CLIENTE_ID
- 107 CLIENTES_Pedidos / produccion
- 108 CLIENTES_Stock
- 109 CLIENTES_Entregas
- 111 CLIENTES_Cuentas / CHEQUES
  - 121 Cli_DFiscal_ABM
  - 123 Cli_DFiscal_CC
  - 122 Cli_Cuentas_ABM
  - 124 Cli_Cuentas_CC
- 115 CLIENTES_Grupos
- 114 CLIENTES_informacion
  - 117 Cli_Contacto_ABM
  - 116 Cli_Deposito_ABM
  - 119 Cli_Grupos_ABM

> G_CLIENTE_ID :   
> PAGE_CLIENTE : Guarda ultima pagina para volver
> PAGE_CLIENTE_ID
> PAGE_CLIENTE_TITLE 

  
  
## Articulos
- 102 Buscar_Articulo
- 104 Lista_Articulos

## MENU_ARTICULO   TARGET="ART"
- 100 CLIENTES >> 
- 30 ART_X
- 31 ART_Z
- 32 ART_COTIZ

- 34 ART_IMAGEN
- 35 ART_PALLET


- 27 IMAGEN
- 77 PALLETIZADO
- 160 PRINT_ORDEN

## LISTA_MENU_INICIO
- 101 CLIENTES
- 104 ARTICULOS
- 57  VENTAS
- 401 COMPRAS
- 300 BOBINAS
- 133 PRODUCCION


## MENU_BOBINAS
- 300 Stock
  - 301 DLG_STOCK
  - 305 DLG_BOBINA
- 304 Listado
- 303 Corrugado
- 310 Compras
  - 314 Ingreso
    - 311 312 313 wINGRESO
    - 315 PRINT_PLANILLA
	- 316 PRINT_ETIQUETAS
- 332 Resumen_Mensual

## MENU_VENTAS
- 507 Pedidos
  - 8 Pedido_x

- 511 Entregas (despacho)  --81
- 520 Remitos 1/2          --81
  - 510 NUEVO_REMITO
  - 502 Remito_x
  - 143 PRINT_REMITO_1
  - 145 PRINT_REMITO_2
  - 503 REMITO_A1
  - 504 REMITO_A2
  - 505 FACTURA_A1
  - 84 Detalle 1/2 
- 530 Facturas   --201
  - 70 factura_x
  - 421 422 423 424 425 wFACTURAR
- 540 Recibos  1/2
  - 541 recibo_x   --500
  - 146 PRINT_RECIBO_1
  -     PRINT_RECIBO_2
  
## MENU_FABRI
- 33 PEDIDOS
- 12 FABRI
- 13 Corrugado
-    TERMINADO
-   Stock

## BR_CLIENTE
- 
  -
