# Clientes

### P101 - BUSCAR_CLIENTE
```SQL
SELECT ID,
	ALIAS,TAGS,STATUS, -- faceted search 
    NOMBRE title,
    VENDEDOR_ID description,
    OBS misc,
    1 ACTIONS,
    TO_CHAR(ID,'000') icon_html,
	'fa fa-2x ' || 
    CASE STATUS 
        WHEN -1 THEN 'fa-minus-circle-o' 
        WHEN  1 THEN 'fa-user u-success-text' 
        WHEN  2 THEN 'fa-user fam-x u-warning-text' 
        WHEN  3 THEN 'fa-user fam-x u-danger-text' 
                ELSE 'fa-user fam-pause '
		end icon_class
  FROM CLIENTES
  WHERE VENDEDOR_ID = NVL(:U_VENDEDOR_ID,VENDEDOR_ID)
  ORDER BY NOMBRE
```
 

## 100-CLIENTES_ARTICULOS
SELECT ART.ID,
  ART.CLI_GRUPO_ID,
  ART.CLIENTE_ID,
  ART.CODIGO CODIGO,
  ART.ART_TIPO_ID,
  LARGO,  ANCHO,  ALTO,
  ART.ART_CALIDAD_ID,
  ( SELECT '<span parent-class=' || STYLE || '>'|| CODIGO || '</span>' FROM LOV_CALIDAD WHERE ID = ART_CALIDAD_ID ) CALIDAD,
  art.PLARGO,
  art.PANCHO,
  art.TRAZADOS,
  ART.Slotter,
  ART_PKG.SQUARE_COLOR(art.COLOR) AS IMPRESION,
  art.OBS,
  art.STATUS,
  COT.PRECIO PRECIO_ACTUAL,
  COT.FECHA PRECIO_FEC,
  COT.ART_COTIZ_STATUS PRECIO_STATUS,
  CASE WHEN COT.VALID_COTIZ = 1 THEN COT.PRECIO END PRECIO_VALIDO,
  ART.aj_precio,
  CASE
    WHEN ART.STATUS IN (3,4)
    THEN COTIZ.GET_PRECIO_ART(ART.ID,ART.CLIENTE_ID) / COT.PRECIO
  END AUMENTO,
  CASE WHEN ART.STATUS IN (4) then '<i class="fa fa-thumbs-up">' END PEDIDO,
  CASE
    WHEN ART.STATUS IN (3,4)
    THEN COTIZ.GET_PRECIO_ART(ART.ID,ART.CLIENTE_ID)
  END PRECIO_CALCULADO,
  CASE
    WHEN LENGTH(art.OBS)>0
    THEN '<i class="fa fa-sticky-note-o">'
    ELSE ''
  END AS ICON_OBS,
  ROUND(6/SUPERFICIE) * 100 MINIMO ,
  CASE
    WHEN TIENE_IMAGEN = 1
    THEN '<i class="fa fa-picture-o" title="'||filename||'">'
    ELSE '<i class="fa fa-square-o">'
  END ICON_IMG
FROM               V0_ARTICULOS ART
    LEFT JOIN      V0_ART_COTIZ COT  ON ART.ID = COT.ARTICULO_ID AND ART.CLIENTE_ID = COT.CLIENTE_ID
WHERE ART.CLIENTE_ID = :G_CLIENTE_ID
ORDER BY ART.CLI_GRUPO_ID,CODIGO


## 104-CLIENTES_ARTICULOS
 

## [111-CLIENTES_CTACTE](#101)

## [124-CLIENTES_CUENTAS](#101)

## [123-CLIENTES_DFISCAL](#101)

## [109-CLIENTES_ENTREGAS](#101)

## [114-CLIENTES_INFO](#101)

## [103-CLIENTES_MAPA](#101)

## [120-CLIENTES_NUEVO](#101)

## 107-CLIENTES_PEDIDOS
### PRODUCCION
```SQL
SELECT 
    VTA_PEDIDO_ID "ID", 
    ARTICULO_ID,
    Z.OBS,
    ART.CLI_GRUPO_ID, ART.CODIGO,
    ART_PKG.SMEDIDAS(ARTICULO_ID) MEDIDAS,
case pedido_style_2 
WHEN 'Recibido_Ok' THEN '<a href=javascript:$s("P107_PEDIDO_COMPLETO","'||VTA_PEDIDO_ID|| '") 
 class="fa fa-truck fam-check fam-is-success" title="Pedido Completo"></a>' 
WHEN 'Entrega Parcial' THEN '<span title = "Entrega Parcial"  aria-hidden="true" class="fa fa-truck fam-play fam-is-warning"></span>'
WHEN 'Despachado' THEN '<span title = "Despachado"  aria-hidden="true" class="fa fa-truck fam-play fam-is-info"></span>'
WHEN 'Produccion' THEN '<span title = "En Produccion"  aria-hidden="true" class="fa fa-industry fam-blank fam-is-warning"></span>'
WHEN 'No Entregado' THEN '<span  title = "No Entregado" aria-hidden="true" class="fa fa-truck fam-x fam-is-danger"></span>'
WHEN 'Remito s/n' THEN '<span title = "Remito Preparado" aria-hidden="true" class="fa fa-file-o fam-information fam-is-disabled"></span>'
end pedido_icon,
case when Z.mult = 1 then '' when Z.mult = 0.5 then '1/2' when Z.mult > 0 then to_char(Z.mult,'999') else to_char(Z.mult,'999D00') end mult  ,
FECHA "FECHA_PED",FECHA_ENTREGA "FECHA_ENT", CANTIDAD "PEDIDO", ENTREGADO,PRECIO,
case when combinado = 0 then null else combinado end COMBINADO,
case when PLANCHAS = 0 then null else PLANCHAS end PLANCHAS,
case when PRODUCCION = 0 then null else PRODUCCION end PRODUCCION,
CASE WHEN TERMINADO = 0 THEN NULL ELSE TERMINADO END TERMINADO,
CASE  pedido_style_2 
    WHEN 'A_FAbri' then 'pedido_entrega_parcial'
    WHEN 'Combinado'  THEN 'pedido_en_corrugadora'
    WHEN 'Corrugado' THEN 'pedido_en_produccion'
    WHEN 'Produccion' THEN 'pedido_terminado_parcial'
    WHEN 'No Entregado' THEN 'pedido_listo'
    WHEN 'Recibido_Ok' THEN 'pedido_listo'
    WHEN 'Entrega Parcial' THEN 'pedido_corrugado_parcial'
    WHEN 'Remito s/n' THEN 'pedido_listo'
    WHEN 'Corrugado ' THEN 'pedido_corrugado_parcial'
    ELSE 'pedido_pendiente' END AS pedido_status    
FROM Z4_PRODUCCION Z LEFT JOIN ARTICULOS ART
ON Z.ARTICULO_ID = ART.ID
WHERE Z.CLIENTE_ID = :G_CLIENTE_ID
order by vta_pedido_id 
```

### CUMPLIDOS
```SQL
select PEDIDO,
       ARTICULO,
       MEDIDAS,
       CODIGO,
       CANT,
       PRECIO,
       ORDEN_COMPRA,
       FECHA_PED,
       FECHA_ENT,
       OBS,
       LUGAR_ENTREGA,
       STATUS,
       ENTREGADO,
       PENDIENTE,
       ICON_OBS
  from P7_VTA_PEDIDOS
 where CLIENTE_ID = :G_CLIENTE_ID
 and status not in (1)
order by fecha_ped desc
```

## 108-CLIENTES_STOCK
```SQL
SELECT ID,
    CODIGO,
    ART_TIPO_ID ,
    LARGO,
	ANCHO,
	ALTO,
    ART_CALIDAD_ID ,
    calidad_style(art_calidad_id) CALIDAD_STYLE,
    PLARGO,
    PANCHO,
    TRAZADOS,
    Slotter,
    STATUS,
    obs,
    nvl(ALTA_PL,0) - nvl(BAJA_PL,0) PLANCHAS ,
    nvl(ALTA,0) - NVL(BAJA,0) CAJAS ,
    STOCKED
FROM ARTICULOS
WHERE cliente_id = :G_CLIENTE_ID
```

## 117-CLI_CONTACTOS_ABM
> FORM ON CLI_CONTACTOS

## [122-CLI_CUENTAS_ABM](#101)

## 116-CLI_DEPOSITOS_ABM
> FORM ON CLI_DEPOSITOS / MAPA

## [121-CLI_DFISCAL_ABM](#101)

### CARGAR_IIBB
```SQL
INSERT INTO CLI_IIBB (CUIT,DESDE,HASTA,VALOR)
	SELECT T2.CUIT,
		TO_DATE(T2.DESDE,'DDMMYYYY'),
		TO_DATE(T2.HASTA,'DDMMYYYY'),
		VALOR 
	FROM PADRON_ARBA T2
		WHERE T2.CUIT =  REPLACE(:P121_CUIT,'-','');
```

## 119-CLI_GRUPOS_ABM
> FORM ON CLI_GRUPOS

## [106-VENDEDOR](#101)




