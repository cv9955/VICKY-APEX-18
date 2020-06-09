@echo off
echo Importando Facuras...

IF "%1"=="" (set /p mes="Ingresar Mes [MMYYYY]: ") else ( set mes=%1)

	 
	sqlldr userid=VIC/SJdF5662@192.168.2.151/xepdb1 as sysdba control=Cabecera.ctl data=CABECERA_%mes%.txt discard=log\CABECERA_%mes%.dis bad=log\CABECERA_%mes%.bad log=log\CABECERA_%mes%.log 

	sqlldr userid=VIC/SJdF5662@192.168.2.151/xepdb1 as sysdba control=Detalle.ctl data=Detalle_%mes%.txt discard=log\Detalle_%mes%.dis bad=log\Detalle_%mes%.bad log=log\Detalle_%mes%.log

	SQLPLUS VIC/SJdF5662@192.168.2.151/xepdb1 as sysdba @afip_import_facturas.sql
)
