# AFIP_IMPORT_FACTURAS.BAT


## load data VIC.IMPORT_CABECERA
>> sqlldr userid=VIC/***@192.168.2.151/xepdb1 as sysdba control=Cabecera.ctl data=CABECERA_%mes%.txt discard=log\CABECERA_%mes%.dis bad=log\CABECERA_%mes%.bad log=log\CABECERA_%mes%.log 


## load data VIC.IMPORT_CABECERA
>> sqlldr userid=VIC/***@192.168.2.151/xepdb1 as sysdba control=Detalle.ctl data=Detalle_%mes%.txt discard=log\Detalle_%mes%.dis bad=log\Detalle_%mes%.bad log=log\Detalle_%mes%.log


## CABS_FACTURAS 
SQLPLUS VIC/***@192.168.2.151/xepdb1 as sysdba @afip_import_facturas.sql

>> INSERT INTO CABS_FACTURAS 
>> INSERT INTO CABS_FACTURAS_DETALLE 
