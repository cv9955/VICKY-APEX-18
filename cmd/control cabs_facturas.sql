UPDATE VTA_FACTURAS V1
SET CAI = (
    SELECT CAI FROM CABS_FACTURAS C
        WHERE C.TIPO_CAB = V1.CAB_TIPO_ID -1500
        AND C.PUNTO_VENTA = V1.PUNTO_VENTA 
        AND C.NRO_CAB     = V1.NRO_CAB
     ) 
     ,
  FECHA = (
    SELECT FECHA FROM CABS_FACTURAS C
        WHERE C.TIPO_CAB = V1.CAB_TIPO_ID -1500
        AND C.PUNTO_VENTA = V1.PUNTO_VENTA 
        AND C.NRO_CAB     = V1.NRO_CAB
     )  
WHERE ID IN (  

SELECT V.ID
from VX_facturas C INNER JOIN vta_facturas V 
    ON  C.CAB_TIPO_ID    = V.CAB_TIPO_ID 
    AND C.PUNTO_VENTA = V.PUNTO_VENTA 
    AND C.NRO_CAB     = V.NRO_CAB
WHERE abs(C.TOTAL) = abs(V.TOTAL)
AND   C.CUIT = V.CUIT
AND   to_char(C.fecha,'MMYY') = to_char(V.fecha,'MMYY')
AND   abs(C.EXENTO) = abs(v.neto_exento)
AND   abs(C.NETO) = abs(v.neto_gravado)
AND   abs(c.IVA) = abs(V.IVA)
AND   abs(C.PERC_IBBA) = abs(V.IIBB)
and v.cai is null)

