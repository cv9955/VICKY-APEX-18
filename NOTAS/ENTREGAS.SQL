select ID,FECHA,NRO_REMITO ,CTA,--REMITO_TO_EXCEL(ID,0) AS COPY,
CLIENTE_ID  ,CLI_CUENTA_ID ,CLI_DEPOSITO_ID ,flete_id,OBS,
'<span aria-hidden="true" class="fa fa-file-text-o fa-2x ' ||
CASE 
    WHEN CTA = 1 THEN 'u-color-35-text'
    WHEN CTA = 2 THEN 'u-color-42-text' end ||
 
CASE 
    WHEN (SELECT COUNT(1) FROM VTA_REMITOS_DETALLE WHERE VTA_REMITO_ID = VTA_REMITOS.ID AND (CANTIDAD * PRECIO) IS NULL) > 0
        THEN 'fa-anim-flash fam-x fam-is-warning" title="Revisar Precios"'
    WHEN STATUS = 3 
        THEN 'fam-arrow-right fam-is-info" title="Despachado"'
    WHEN STATUS = 9
        THEN 'fam-check fam-is-success" title="Recibido Ok"'
   END 
   || '></span>'
   STATUS_TITLE,

   
CASE 
    WHEN (SELECT COUNT(1) FROM VTA_REMITOS_DETALLE WHERE VTA_REMITO_ID = VTA_REMITOS.ID AND (CANTIDAD * PRECIO) IS NULL) > 0
        THEN 'Falta Precio'
    WHEN STATUS = 3 
        THEN 'Despachado'
    WHEN STATUS = 9
        THEN 'Recibido Ok' 
   END ACTION_LINK  
   
from VTA_REMITOS
WHERE STATUS IN (3,9)