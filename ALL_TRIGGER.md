** ART_CALIDAD_H	"
*** TRG_ART_CALIDAD_H	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
     :new.cotiz_fec := sysdate;
     :new.COTIZ_by := nvl(v('APP_USER'),USER);
     IF :NEW.DESDE IS NULL THEN
        :NEW.DESDE := TRUNC(SYSDATE);
     END IF;
     
    UPDATE ART_CALIDAD_H
    SET HASTA = :NEW.DESDE
    WHERE ID = :NEW.ID AND HASTA IS NULL;
    

END;
"	"
```"
** ART_CALIDAD_0	"
*** TRG_ART_CALIDAD_0	"	"**BEFORE EACH ROW - UPDATE**
"	"```sql
"	"BEGIN
        :NEW.GRAMAJE := :NEW.GRAM_A + :NEW.GRAM_B * 1.5 + :NEW.GRAM_C;
        :NEW.COTIZ := cotiz.precio_papel(:new.papel_a) * :new.gram_a /1000
            + COTIZ.precio_papel(:new.papel_b) * :new.gram_b * 1.5 /1000
            + COTIZ.precio_papel(:new.papel_c) * :new.gram_c / 1000;
        :NEW.COTIZ_FEC := TRUNC(SYSDATE);
        :NEW.COTIZ_BY := nvl(v('APP_USER'),USER);
        
        
        if :new.COTIZ != :old.COTIZ then 
            INSERT INTO ART_CALIDAD_H (ID,COTIZ,DESDE)
            VALUES(:new.ID,:new.COTIZ,TRUNC(SYSDATE));
        end if;     
END
;
"	"
```"
** ART_CALIDAD_1	"
*** TRG_ART_CALIDAD_1	"	"**BEFORE EACH ROW - UPDATE**
"	"```sql
"	"BEGIN
        :NEW.COTIZ_FEC := TRUNC(SYSDATE);
        :NEW.COTIZ_BY := nvl(v('APP_USER'),USER);


        if :new.COTIZ != :old.COTIZ then 
            INSERT INTO ART_CALIDAD_H (ID,COTIZ,DESDE)
            VALUES(:new.ID,:new.COTIZ,TRUNC(SYSDATE));
        end if;     
END
;
"	"
```"
** ART_COTIZ	"
*** TRG_ART_COTIZ	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
 IF INSERTING AND :NEW.ID IS NULL THEN
    SELECT MAX (ID) +1 INTO :NEW.ID FROM ART_COTIZ;
  END IF;  
  :new.created := sysdate;
  :new.created_by := nvl(v('APP_USER'),USER);

END;
"	"
```"
** ARTICULOS	"
*** ARTICULOS_HIST	"	"**BEFORE EACH ROW - UPDATE**
"	"```sql
"	"BEGIN
if :old.status =3 and :new.status=4 then
        :new.rev := nvl(:old.rev,0) +1;
      :new.SIGNED := sysdate;
      :new.SIGNED_by := nvl(v('APP_USER'),USER);


    INSERT INTO H_ARTICULOS (
        ID,
        REV,
        CLIENTE_ID,
        CODIGO,
        ART_TIPO_ID,
        LARGO,
        ANCHO,
        ALTO,
        ART_CALIDAD_ID,
        PLARGO,
        PANCHO,
        OBS,
        MULT_X,
        MULT_Y,
        DESARROLLO,
        CIERRE_TIPO,
        CIERRE_VALOR,
        ALETA_SUP_TIPO,
        ALETA_SUP_VALOR,
        ALETA_INF_TIPO,
        ALETA_INF_VALOR,
        CENTRO,
        MULT,
        REFILE,
        COLOR,
        TRAZADOS,
        SLOTTER,
        CLI_GRUPO_ID,
        UPDATED_BY,UPDATED_FEC)
    VALUES (
        :new.ID,
        :new.REV,
        :new.CLIENTE_ID,
        :new.CODIGO,
        :new.ART_TIPO_ID,
        :new.LARGO,
        :new.ANCHO,
        :new.ALTO,
        :new.ART_CALIDAD_ID,
        :new.PLARGO,
        :new.PANCHO,
        :new.OBS,
        :new.MULT_X,
        :new.MULT_Y,
        :new.DESARROLLO,
        :new.CIERRE_TIPO,
        :new.CIERRE_VALOR,
        :new.ALETA_SUP_TIPO,
        :new.ALETA_SUP_VALOR,
        :new.ALETA_INF_TIPO,
        :new.ALETA_INF_VALOR,
        :new.CENTRO,
        :new.MULT,
        :new.REFILE,
        :new.COLOR,
        :new.TRAZADOS,
        :new.SLOTTER,
        :new.CLI_GRUPO_ID,
        nvl(v('APP_USER'),USER),
        sysdate
        );
   end if;     

END;"	"
```"
** ARTICULOS	"
*** ARTICULOS_TRG	"	"**BEFORE EACH ROW - INSERT OR UPDATE**
"	"```sql
"	"BEGIN 
  IF INSERTING THEN 
    :NEW.CREATED    :=SYSDATE;
    :NEW.CREATED_BY := NVL(V('APP_USER'),USER);

		if :new.ART_TIPO_ID is null then 
			 Raise_Application_Error(-2010, 'Tipo No se Puede ser NULL.');
		end if;

    IF :NEW.ID IS NULL THEN
      SELECT ARTICULOS_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;

    :new.status := 1;
    :new.rev := 0; 
    :new.calcular := 1;
    :new.mult_x :=1;
    :new.mult_y :=1;

		if :new.ART_TIPO_ID = 4 then
			:new.aleta_sup_tipo := 0;
			:new.aleta_inf_tipo := 0;
			:new.desarrollo := 0;
			:new.cierre_tipo := 1; 
		elsif :new.ART_TIPO_ID = 5 then
			:new.aleta_sup_tipo := 0;
			:new.aleta_inf_tipo := 1;
			:new.desarrollo := 0;
			:new.cierre_tipo := 1; 
		elsif :new.ART_TIPO_ID = 6 then
			:new.aleta_sup_tipo := 1;
			:new.aleta_inf_tipo := 0;
			:new.desarrollo := 0;
			:new.cierre_tipo := 1;
		elsif :new.ART_TIPO_ID = 7 then
			:new.aleta_sup_tipo := 1;
			:new.aleta_inf_tipo := 1;
			:new.desarrollo := 0;
			:new.cierre_tipo := 1;
		 elsif :new.ART_TIPO_ID = 8 then
			:new.aleta_sup_tipo := 1;
			:new.aleta_inf_tipo := 1;
			:new.desarrollo := 0;
		 elsif :new.ART_TIPO_ID = 9 then
			:new.aleta_sup_tipo := 0;
			:new.aleta_inf_tipo := 0;
			:new.desarrollo := 0;
			:new.cierre_tipo := 1;  
		end if;


  END IF;
  
  IF UPDATING THEN
    :NEW.UPDATED    :=SYSDATE;
    :NEW.UPDATED_BY := NVL(V('APP_USER'),USER);
  END IF;
END;"	"
```"
** ART_SHARED	"
*** TRG_ART_SHARED	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"DECLARE 
  CNT NUMBER;

  BEGIN
    SELECT COUNT(1)
        INTO CNT
    FROM ARTICULOS 
        WHERE ID = :NEW.ARTICULO_ID
        AND CLIENTE_ID = :NEW.CLIENTE_ID;
        
   IF CNT > 0 THEN      
        RAISE_APPLICATION_ERROR(-20001,'Articulo Propio');
   END IF;
  
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT ART_SHARED_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
    
    


    

END;
"	"
```"
** ART_11	"
*** ART_11_TRG	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    NULL;
  END COLUMN_SEQUENCES;
END;
"	"
```"
** BOB	"
*** TRG_NEW_BOB	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
    --- NRO BOBINA
     IF :NEW.ID IS NULL THEN
      SELECT MAX(ID) +1 INTO :NEW.ID FROM BOB;
     END IF;  
     
	-- AUDIT
	:NEW.CREATED_FEC := SYSDATE;
	:NEW.CREATED_BY := NVL(V('APP_USER'),USER);

	-- CONTROL TIPO ONDA / COMUNN
	IF :NEW.TIPO IN (0,1) THEN
		IF :NEW.GRAMAJE < 140 THEN
			:NEW.TIPO := 0;
		ELSE
			:NEW.TIPO := 1;
		END IF;	
	END IF;	
   

    :NEW.PSTOCK := 100;
    :NEW.ESTADO := 0;

END;
"	"
```"
** BOB	"
*** TRG_CONTROL_BOB_ESTADO	"	"**BEFORE EACH ROW - UPDATE**
"	"```sql
"	"BEGIN
	IF :OLD.ESTADO IN (1,2,3) AND :NEW.ESTADO IN (1,2,3) THEN
        :NEW.ESTADO := CASE :NEW.PSTOCK 
            WHEN 0 THEN 3 WHEN 100 THEN 1 ELSE 2 END;
		END IF;
END;
"	"
```"
** BOB	"
*** TRG_CONTROL_BOB_ESTADO_2	"	"**BEFORE EACH ROW - UPDATE**
"	"```sql
"	"BEGIN
  IF :NEW.ESTADO = 0 THEN
      :NEW.ESTADO := 1;
  END IF;    
END;

"	"
```"
** BOB_ORDEN	"
*** TRG_NEW_BOB_ORDEN	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
    IF :NEW.ID IS NULL THEN
      SELECT MAX(ID) +1 INTO :NEW.ID FROM BOB_ORDEN;
    END IF;
    :new.created_fec := sysdate;  
    :new.created_by := nvl(v('APP_USER'),USER);
END;
"	"
```"
** BOB_PROV	"
*** TRG_NEW_BOB_PROV	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
    IF :NEW.ID IS NULL THEN
      SELECT MAX(ID) +1 INTO :NEW.ID FROM BOB_PROV;
    END IF;
      :NEW.CREATED_FEC := SYSDATE;
      :NEW.CREATED_BY := NVL(V('APP_USER'),USER);
END;
"	"
```"
** BOB_TIPO	"
*** TRG_BOB_TIPO	"	"**BEFORE EACH ROW - INSERT OR UPDATE**
"	"```sql
"	"DECLARE
  vGuardarPrecio NUMBER :=0; 
BEGIN
    IF INSERTING THEN
      SELECT MAX(ID)+1 INTO :new.ID FROM BOB_TIPO;
      :new.created := sysdate;
      :new.created_by := nvl(v('APP_USER'),USER);
      vGuardarPrecio := 1;
    END IF;

    IF UPDATING THEN 
     :new.UPDATED :=SYSDATE;
     :new.UPDATED_by := nvl(v('APP_USER'),USER);
        
      IF :NEW.PRECIO != :OLD.PRECIO THEN
         vGuardarPrecio := 1;
      END IF;
   END IF;
   
   IF vGuardarPrecio = 1 THEN 
        INSERT INTO BOB_TIPO_H (ID,PRECIO,DESDE,HASTA)
        VALUES(:new.ID,:new.PRECIO,TRUNC(:NEW.UPDATED),NULL);
        
        UPDATE ART_CALIDAD_0
        SET COTIZ = NULL
        WHERE :NEW.ID IN (PAPEL_A,PAPEL_B,PAPEL_C);
      END IF;
END;
"	"
```"
** BOB_TIPO_H	"
*** TRG_BOB_TIPO_H	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
    :new.created_by := nvl(v('APP_USER'),USER);
    UPDATE BOB_TIPO_H
        SET HASTA = :NEW.DESDE
        where ID = :NEW.ID
        and HASTA is null;
END;
"	"
```"
** BOB_USO	"
*** TRG_NEW_BOB_USO	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
    -- KEY
    SELECT BOB_USO_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;

    :new.created_fec := sysdate;
    :new.created_by := nvl(v('APP_USER'),USER);
    
    -- ORDEN
    SELECT NVL(MAX(ORDEN)+1,0) INTO :NEW.ORDEN 
        FROM BOB_USO 
        WHERE FECHA = :NEW.FECHA 
        AND LUGAR = :NEW.LUGAR;

    -- DIAMETRO INICIAL
	UPDATE BOB
		SET DIAMETRO = :NEW.INICIO
		WHERE ID = :NEW.BOBINA
		AND PSTOCK = 100;
        
    -- DIAMETRO FINAL
    IF :NEW.FIN < 20 THEN 
        :NEW.FIN := 0;
    END IF;

    -- RENDIMIENTO ONDA
    IF :NEW.LUGAR = 2 THEN
        :NEW.REND := 1.35;
    ELSE
        :NEW.REND := 1;
    END IF;
    
    -- CALCULO USO
    SELECT 
        PSTOCK - POWER(:NEW.FIN / DIAMETRO,2)*100 
        INTO :NEW.USO
        FROM BOB WHERE ID = :NEW.BOBINA;

END;
"	"
```"
** BOB_USO	"
*** TRG_UPDATE_BOB_USO	"	"**BEFORE STATEMENT - UPDATE**
"	"```sql
"	"BEGIN
    Raise_Application_Error(-20099, 'Cannot UPDATE this TABLE.');
END;
"	"
```"
** BOB_USO	"
*** TRG_CONTROL_BOB_PSTOCK	"	"**AFTER EACH ROW - INSERT OR DELETE**
"	"```sql
"	"BEGIN
    IF INSERTING THEN
        UPDATE BOB B1
            SET PSTOCK = B1.PSTOCK - :NEW.USO 
            WHERE ID = :NEW.BOBINA;
    ELSE
        UPDATE BOB B1
            SET PSTOCK =  B1.PSTOCK + :OLD.USO
            WHERE ID = :OLD.BOBINA;
    END IF;        
  END;
"	"
```"
** CAB_DEPOSITOS	"
*** TRG_CAB_DEPOSITOS_NEW	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"begin  
   if inserting then 
      if :NEW."ID" is null then 
         select DOCS_DEPOSITO_SEQ.nextval into :NEW."ID" from dual; 
      end if; 
   end if; 
end;

"	"
```"
** CABS_CORR_C	"
*** TRG_NEW_CABS_CORR_C	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"begin   
  if :NEW."ID" is null then 
    select max(id) + 1 into :new.ID from CABS_CORR_C; 
    if :NEW."ID" is null then
       :new.id := 1;
    end if;   
 end if; 
 
      :new.created := sysdate;
      :new.created_by := nvl(v('APP_USER'),USER);
end;
"	"
```"
** CABS_CORR_D	"
*** TRG_PRODUCCION_STOCK_1	"	"**AFTER EACH ROW - INSERT OR UPDATE OR DELETE**
"	"```sql
"	"BEGIN
  UPDATE ARTICULOS ART
    SET 
     STOCKED = NULL
     WHERE ID IN (:NEW.ART_1,:OLD.ART_1,:NEW.ART_2,:OLD.ART_2,:NEW.ART_3,:OLD.ART_3)
     ;
END;
"	"
```"
** CABS_CORR_D	"
*** CABS_CORR_D_TRG	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT CABS_CORR_D_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
"	"
```"
** CABS_CORR_EXT	"
*** CABS_CORR_EXT_TRG1	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
 IF INSERTING AND :NEW.ID IS NULL THEN
    SELECT MAX (ID) +1 INTO :NEW.ID FROM CABS_CORR_EXT;
  END IF;  
  :new.CREATED_FEC := sysdate;
  :new.created_by := nvl(v('APP_USER'),USER);
END;
"	"
```"
** CABS_CORR_FAV	"
*** CABS_CORR_FAV_TRG	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT CABS_CORR_FAV_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
"	"
```"
** CABS_FACTURAS	"
*** CABS_FACTURAS_TRG	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT CABS_ENTREGAS_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
"	"
```"
** CABS_FACTURAS_DETALLE	"
*** CABS_FACTURAS_DETALLE_TRG	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT CABS_FACTURAS_DETALLE_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
"	"
```"
** CLI_CONTACTOS	"
*** CLI_CONTACTOS_TRG	"	"**BEFORE EACH ROW - INSERT OR UPDATE**
"	"```sql
"	"BEGIN 
  IF INSERTING THEN 
    :NEW.CREATED    :=SYSDATE;
    :NEW.CREATED_BY := NVL(V('APP_USER'),USER);
    :NEW.STATUS := 1;
    IF :NEW.ID IS NULL THEN
      SELECT CLI_CONTACTOS_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END IF;
  
  IF UPDATING THEN
    :NEW.UPDATED    :=SYSDATE;
    :NEW.UPDATED_BY := NVL(V('APP_USER'),USER);
  END IF;
END;"	"
```"
** CLI_CUENTAS	"
*** CLI_CUENTAS_TRG	"	"**BEFORE EACH ROW - INSERT OR UPDATE**
"	"```sql
"	"BEGIN 
  IF INSERTING THEN 
    :NEW.CREATED    :=SYSDATE;
    :NEW.CREATED_BY := NVL(V('APP_USER'),USER);
    :NEW.STATUS := 1;
    IF :NEW.ID IS NULL THEN
      SELECT CLI_CUENTAS_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END IF;
  
  IF UPDATING THEN
    :NEW.UPDATED    :=SYSDATE;
    :NEW.UPDATED_BY := NVL(V('APP_USER'),USER);
  END IF;
END;"	"
```"
** CLI_DEPOSITOS	"
*** CLI_DEPOSITOS_TRG	"	"**BEFORE EACH ROW - INSERT OR UPDATE**
"	"```sql
"	"BEGIN 
  IF INSERTING THEN 
    :NEW.CREATED    :=SYSDATE;
    :NEW.CREATED_BY := NVL(V('APP_USER'),USER);
    :NEW.STATUS := 1;
    IF :NEW.ID IS NULL THEN
      SELECT CLI_DEPOSITOS_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END IF;
  
  IF UPDATING THEN
    :NEW.UPDATED    :=SYSDATE;
    :NEW.UPDATED_BY := NVL(V('APP_USER'),USER);
  END IF;
END;"	"
```"
** CLI_DFISCAL	"
*** CLI_DFISCAL_TRG	"	"**BEFORE EACH ROW - INSERT OR UPDATE**
"	"```sql
"	"BEGIN 
  IF INSERTING THEN 
    :NEW.CREATED    :=SYSDATE;
    :NEW.CREATED_BY := NVL(V('APP_USER'),USER);
    :NEW.STATUS :=1 ; 
    IF :NEW.ID IS NULL THEN
      SELECT CLI_CUENTAS_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END IF;
  
  IF UPDATING THEN
    :NEW.UPDATED    :=SYSDATE;
    :NEW.UPDATED_BY := NVL(V('APP_USER'),USER);
  END IF;
END;"	"
```"
** CLIENTES	"
*** CLIENTES_TRG	"	"**BEFORE EACH ROW - INSERT OR UPDATE**
"	"```sql
"	"BEGIN 
  IF INSERTING THEN 
    :NEW.CREATED    :=SYSDATE;
    :NEW.CREATED_BY := NVL(V('APP_USER'),USER);
    :NEW.STATUS := 1;
    IF :NEW.ID IS NULL THEN
      SELECT CLIENTES_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END IF;
  
  IF UPDATING THEN
    :NEW.UPDATED    :=SYSDATE;
    :NEW.UPDATED_BY := NVL(V('APP_USER'),USER);
  END IF;
END;"	"
```"
** CLI_GRUPOS	"
*** CLI_GRUPOS_TRG	"	"**BEFORE EACH ROW - INSERT OR UPDATE**
"	"```sql
"	"BEGIN 
  IF INSERTING THEN 
    :NEW.CREATED    :=SYSDATE;
    :NEW.CREATED_BY := NVL(V('APP_USER'),USER);
    :NEW.STATUS := 1;
    
    IF :NEW.ID IS NULL THEN
      SELECT CLI_GRUPOS_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END IF;
  
  IF UPDATING THEN
    :NEW.UPDATED    :=SYSDATE;
    :NEW.UPDATED_BY := NVL(V('APP_USER'),USER);
  END IF;
END;"	"
```"
** CLI_IIBB	"
*** CLI_IIBB_TRG	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT CLI_IIBB_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
"	"
```"
** DOC_CAJAS	"
*** TRG_DOC_CAJAS_NEW	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"begin  
   if inserting then 
      if :NEW."ID" is null then 
         select SEQ_DOC_CAJAS.nextval into :NEW."ID" from dual; 
      end if; 
   end if; 
end;

"	"
```"
** DOC_CHEQUES	"
*** TRG_DOC_CHEQUES_NEW	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN

  IF INSERTING AND :NEW.ID IS NULL THEN      
     SELECT DOC_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;    
  END IF;		


END;
"	"
```"
** DOC_CHEQUES	"
*** TRG_DOC_CHEQUES_TRG1	"	"**BEFORE EACH ROW - INSERT OR UPDATE**
"	"```sql
"	"BEGIN
       IF :NEW.DOC_TIPO_ID = 10  THEN  
            SELECT BANCO_ID INTO :NEW.BANCO_ID FROM DOC_CUENTAS WHERE ID = :NEW.DOC_CUENTA_ID ;   
        ELSE
            :NEW.BANCO_ID := TO_NUMBER(substr(:NEW.banco_NUM,0,3));
        END IF;
        
        IF :NEW.PROV_PAGO_ID IS NOT NULL THEN
         SELECT FECHA INTO :NEW.FECHA_OUT
         FROM PROV_PAGOS WHERE ID = :NEW.PROV_PAGO_ID;
        END IF; 
END;
"	"
```"
** DOC_RETEN	"
*** TRG_DOC_RETEN_NEW	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
  IF INSERTING AND :NEW.ID IS NULL THEN      
  SELECT DOC_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;    
  END IF;
END;
"	"
```"
** IMPORT_DETALLE	"
*** IMPORT_DETALLE_BIU	"	"**BEFORE EACH ROW - INSERT OR UPDATE**
"	"```sql
"	"begin 
    if :new.id is null then 
        :new.id := to_number(sys_guid(), 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'); 
    end if; 
end import_detalle_biu; 

"	"
```"
** LOV_COTIZ_H	"
*** TRG_LOV_COTIZ_H	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
    :new.created_by := nvl(v('APP_USER'),USER);
    UPDATE LOV_COTIZ_H
        SET HASTA = :NEW.DESDE
        where ID = :NEW.ID
        and HASTA is null;
END;
"	"
```"
** PRODUCCION	"
*** TRG_PRODUCCION_NEW	"	"**BEFORE EACH ROW - INSERT OR UPDATE**
"	"```sql
"	"BEGIN
 IF INSERTING THEN 
      :new.created := sysdate;
      :new.created_by := nvl(v('APP_USER'),USER); 
    IF :NEW.ID IS NULL THEN
        SELECT MAX (ID) +1 INTO :NEW.ID FROM PRODUCCION;
    END IF;
    
    IF :NEW.ART_MULT IS NULL THEN 
        SELECT MULT INTO :NEW.ART_MULT FROM ARTICULOS WHERE ID = :NEW.ARTICULO_ID ;
    END IF;
 END IF;

 IF :NEW.CANTIDAD < 0 THEN 
   :NEW.CANTIDAD := -:NEW.CANTIDAD;
 END IF;  

 IF :NEW.STATUS = 3 THEN
    IF :NEW.CANTIDAD > 0 THEN
      :new.CONTADO := sysdate;
      :new.CONTADO_by := nvl(v('APP_USER'),USER); 
    ELSE
        :NEW.STATUS := 2;
    END IF;  
 END IF;       

END;

"	"
```"
** PRODUCCION	"
*** TRG_PRODUCCION_STOCK	"	"**AFTER EACH ROW - INSERT OR UPDATE OR DELETE**
"	"```sql
"	"BEGIN
  UPDATE ARTICULOS ART
    SET 
     STOCKED = NULL
     WHERE ID IN (:NEW.ID,:OLD.ID,:NEW.PLANCHA_ID,:OLD.PLANCHA_ID)
     ;
END;
"	"
```"
** PROV_COMPRAS	"
*** TRG_PROV_COMPRAS_NEW	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
    IF :NEW.ID IS NULL THEN
      SELECT CABS_COMPRAS_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
    
    :NEW.CREATED := SYSDATE;
    :new.created_by := nvl(v('APP_USER'),USER);
    
END;

"	"
```"
** PROV_COMPRAS_PAGOS	"
*** PROV_COMPRAS_PAGOS_INS	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"DECLARE
    SALDO_FACTURA NUMBER;
    SALDO_OPAGO NUMBER;
        ex_custom    EXCEPTION;
BEGIN
    IF :NEW.VALOR IS NULL THEN
    
    SELECT SIGNO * (TOTAL - NVL(PAGO,0)) INTO SALDO_FACTURA
        FROM V0_PROV_COMPRAS WHERE ID = :NEW.COMPRAS_ID;
    
    SELECT TOTAL - NVL(PAGO,0) INTO SALDO_OPAGO
        FROM V0_PROV_PAGOS WHERE ID = :NEW.PAGOS_ID;
    
        :NEW.VALOR :=  LEAST(SALDO_FACTURA,SALDO_OPAGO);
    END IF;
    

    IF :NEW.VALOR = 0 THEN 
      RAISE ex_custom;
    END IF;

EXCEPTION
    WHEN ex_custom THEN
        DBMS_OUTPUT.PUT_LINE(SQLERRM);
    
END;
"	"
```"
** PROVEDORES	"
*** PROVEDORES_TRG	"	"**BEFORE EACH ROW - INSERT OR UPDATE**
"	"```sql
"	"BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT PROVEDORES_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
      :NEW.CREATED :=SYSDATE;
      :NEW.CREATED_BY := NVL(V('APP_USER'),USER);
    END IF;
    
    IF UPDATING THEN
      :NEW.UPDATED :=SYSDATE;
      :NEW.UPDATED_BY := NVL(V('APP_USER'),USER);
 
    END IF;
    
  END COLUMN_SEQUENCES;
END;"	"
```"
** PROV_PAGOS	"
*** TRG_PROV_PAGOS	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"begin
   SELECT MAX(ID) + 1 INTO  :NEW.ID  FROM PROV_PAGOS;
  :new.created := sysdate;
  :new.created_by := nvl(v('APP_USER'),USER);
end;"	"
```"
** VENDEDORES	"
*** VENDEDORES_TRG	"	"**BEFORE EACH ROW - INSERT OR UPDATE**
"	"```sql
"	"BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT VENDEDORES_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
      :NEW.CREATED :=SYSDATE;
      :NEW.CREATED_BY := NVL(V('APP_USER'),USER);
      :NEW.STATUS := 1;
    END IF;
    
    IF UPDATING THEN
      :NEW.UPDATED :=SYSDATE;
      :NEW.UPDATED_BY := NVL(V('APP_USER'),USER);
 
    END IF;
    
  END COLUMN_SEQUENCES;
END;"	"
```"
** VIC_USERS	"
*** BI_VIC_USERS	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"begin
if :NEW."USER_ID" is null then
select "VIC_USERS_SEQ".nextval into :NEW."USER_ID" from sys.dual;
end if;
end;
"	"
```"
** VTA_FACTURAS	"
*** TRG_VTA_FACTURAS_NEW	"	"**BEFORE EACH ROW - INSERT OR UPDATE**
"	"```sql
"	"BEGIN
    IF inserting THEN
        SELECT seq_vta_facturas.NEXTVAL INTO :new.id
            FROM sys.dual;
        :new.created := SYSDATE;
        :new.created_by := nvl(v('APP_USER'),user);
        :new.cab_tipo_id := nvl(:new.cab_tipo_id,1501);
    END IF;

    :new.fecha := nvl(:new.fecha,SYSDATE);

    IF :new.punto_venta IS NULL THEN
        SELECT
            MAX(punto_venta)
        INTO :new.punto_venta
        FROM
            vta_facturas
        WHERE
            cab_tipo_id =:new.cab_tipo_id;

    END IF;

    IF :new.nro_cab IS NULL THEN
        SELECT MAX(nro_cab) + 1        INTO :new.nro_cab
        FROM vta_facturas
        WHERE
            cab_tipo_id =:new.cab_tipo_id
            AND punto_venta =:new.punto_venta;
    END IF;

    :new.nro_cab := nvl(:new.nro_cab,1);

    IF :new.cuit IS NULL THEN
        SELECT cuit,razon_social,cliente_id
        INTO :new.cuit,:new.dfiscal,:new.cliente_id
        FROM cli_dfiscal
        WHERE id =:new.cli_dfiscal_id;
    END IF;

    IF :new.afip_tipo_id IS NULL THEN
        SELECT cod_afip        INTO :new.afip_tipo_id
        FROM cab_tipo
        WHERE
            id =:new.cab_tipo_id
            AND modo = 1;
    END IF;
    
    select signo_cta into :new.signo 
        from cab_tipo
        where id = :new.cab_tipo_id;

  

    if :new.cab_tipo_id != 1001 then
        :new.total := NVL(:new.NETO_GRAVADO,0) + NVL(:new.IVA,0) + NVL(:new.IIBB,0) + NVL(:new.NETO_EXENTO,0);
    end if;
    
    
END;
"	"
```"
** VTA_FACTURAS_A1	"
*** TRG_VTA_FACTURAS_A1	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"DECLARE
    SALDO_FACTURA NUMBER;

    TOTAL_RECIBO NUMBER;
    APPLY_RECIBO NUMBER;

    ex_custom    EXCEPTION;

BEGIN
  SELECT SEQ_VTA_APPLY.NEXTVAL INTO :NEW.ID FROM DUAL;



SELECT TOTAL - NVL(PAGO,0)
  INTO SALDO_FACTURA
  FROM V1_VTA_FACTURAS
  WHERE ID = :NEW.VTA_FACTURA_ID;


SELECT SUM(IMPORTE)
  INTO TOTAL_RECIBO
  FROM V0_DOCS
  WHERE VTA_RECIBO_ID = :NEW.VTA_RECIBO_ID;

SELECT SUM(IMPORTE)
  INTO APPLY_RECIBO
  FROM VTA_FACTURAS_A1
  WHERE VTA_RECIBO_ID = :NEW.VTA_RECIBO_ID;


:new.IMPORTE := least(
  TOTAL_RECIBO - NVL(APPLY_RECIBO,0) ,  SALDO_FACTURA 
);    

    IF :NEW.IMPORTE = 0 THEN 
      RAISE ex_custom;
    END IF;

EXCEPTION
    WHEN ex_custom THEN
        DBMS_OUTPUT.PUT_LINE(SQLERRM);
END;
"	"
```"
** VTA_FACTURAS_DETALLE	"
*** TRG_VTA_FACTURAS_DETALLE_NEW	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT SEQ_VTA_FACTURAS_DETALLE.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
"	"
```"
** VTA_PEDIDOS	"
*** TRG_VTA_PEDIDOS	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
    IF INSERTING THEN
      SELECT VTA_PEDIDOS_SEQ.nextval into :NEW.ID FROM SYS.DUAL;
      
      :new.created := sysdate;
      :new.created_by := nvl(v('APP_USER'),USER);
      :new.status := 1;
    END IF;
    
        
END;
"	"
```"
** VTA_RECIBOS	"
*** TRG_VTA_RECIBOS_NEW	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"begin  
   if inserting then 
      if :NEW."ID" is null then 
         select SEQ_VTA_RECIBOS.nextval into :NEW."ID" from dual; 
      end if; 
    :new.created := sysdate;
    :new.created_by := nvl(v('APP_USER'),USER);      
      
   end if; 
end;
"	"
```"
** VTA_RECIBOS	"
*** TRG_VTA_RECIBOS_UPD	"	"**BEFORE EACH ROW - UPDATE**
"	"```sql
"	"BEGIN
    :new.UPDATED := sysdate;
    :new.UPDATED_by := nvl(v('APP_USER'),USER);   
    
    SELECT SUM(IMPORTE) INTO :NEW.CAJA FROM DOC_CAJAS WHERE VTA_RECIBO_ID = :NEW.ID;
    SELECT SUM(IMPORTE) INTO :NEW.CHEQUES FROM DOC_CHEQUES WHERE VTA_RECIBO_ID = :NEW.ID;
    SELECT SUM(IMPORTE) INTO :NEW.RETEN FROM DOC_RETEN WHERE VTA_RECIBO_ID = :NEW.ID;   
    :NEW.TOTAL := NVL(:NEW.CAJA,0) + NVL(:NEW.CHEQUES,0) + NVL(:NEW.RETEN,0);
    :NEW.FLG_EDIT := 0;
    
--    IF :new.total is not null then
--     :new.BLOCKED := sysdate;
 --    :new.BLOCKED_by := nvl(v('APP_USER'),USER);      
--     :NEW.status := 2;
--    end if;
END;
"	"
```"
** VTA_REMITOS	"
*** TRG_VTA_REMITO	"	"**BEFORE EACH ROW - INSERT OR UPDATE**
"	"```sql
"	"BEGIN
    IF inserting THEN
        :new.created := SYSDATE;
        :new.created_by := nvl(v('APP_USER'),user);

        IF :new.id IS NULL THEN
            SELECT  vta_remitos_SEQ.NEXTVAL INTO :new.id FROM sys.dual;
        END IF;

        IF :new.status IS NULL THEN
            :new.status := 1;
        END IF;
    END IF;
    
    IF :NEW.CAB_TIPO_ID = 1212  THEN 
        :NEW.SIGNO := -1 ;
    ELSE
        :NEW.SIGNO := 1;
    END IF; 

    IF updating THEN
        SELECT            SUM(cantidad * precio) INTO :NEW.NETO
        FROM            vta_remitos_detalle
        WHERE            vta_remito_id = :NEW.id;

        IF :new.status = 10 THEN
            :new.blocked := SYSDATE;
            :new.blocked_by := nvl(v('APP_USER'),user);
        ELSE
            :new.updated := SYSDATE;
            :new.updated_by := nvl(v('APP_USER'),user);
        END IF;
        
        :NEW.FLG_EDIT := NULL;

    END IF;

END;
"	"
```"
** VTA_REMITOS_A1	"
*** TRG_VTA_REMITOS_A1	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"DECLARE
    TOTAL_REMITO NUMBER;
    APPLY_REMITO NUMBER;
    TOTAL_FACTURA NUMBER;
    APPLY_FACTURA NUMBER;

    ex_custom    EXCEPTION;

BEGIN
  SELECT SEQ_VTA_APPLY.NEXTVAL INTO :NEW.ID FROM DUAL;

SELECT SUM(CANTIDAD * PRECIO) 
  INTO TOTAL_REMITO
  FROM VTA_REMITOS_DETALLE
  WHERE VTA_REMITO_ID = :NEW.VTA_REMITO_ID;

SELECT SUM(IMPORTE)
  INTO APPLY_REMITO
  FROM VTA_REMITOS_A1
  WHERE VTA_REMITO_ID = :NEW.VTA_REMITO_ID;

SELECT  NVL(NETO_GRAVADO,0) + NVL(NETO_EXENTO,0) ,REMITIDO
  INTO TOTAL_FACTURA,APPLY_FACTURA
  FROM V1_VTA_FACTURAS
  WHERE ID = :NEW.VTA_FACTURA_ID;


:new.IMPORTE := least(
  TOTAL_REMITO - NVL(APPLY_REMITO,0) ,
  TOTAL_FACTURA - NVL(APPLY_FACTURA,0) 
);    

    IF :NEW.IMPORTE = 0 THEN 
      RAISE ex_custom;
    END IF;

EXCEPTION
    WHEN ex_custom THEN
        DBMS_OUTPUT.PUT_LINE(SQLERRM);
END;
"	"
```"
** VTA_REMITOS_A2	"
*** TRG_VTA_REMITOS_A2	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"DECLARE
    APPLY_REMITO NUMBER;
    TOTAL_RECIBO NUMBER;
    APPLY_RECIBO NUMBER;

    ex_custom    EXCEPTION;

BEGIN
  SELECT SEQ_VTA_APPLY.NEXTVAL INTO :NEW.ID FROM DUAL;

SELECT signo * neto - nvl(Pago,0)
  INTO APPLY_REMITO
  FROM v2_vta_remitos
  WHERE ID = :NEW.VTA_REMITO_ID;

SELECT total - nvl(pago,0)
  INTO APPLY_RECIBO
  FROM v2_VTA_recibos
  WHERE ID = :NEW.VTA_RECIBO_ID;


:new.IMPORTE := least(  APPLY_RECIBO,  APPLY_REMITO );    

    IF :NEW.IMPORTE = 0 THEN 
      RAISE ex_custom;
    END IF;

EXCEPTION
    WHEN ex_custom THEN
        DBMS_OUTPUT.PUT_LINE(SQLERRM);
END;
"	"
```"
** VTA_REMITOS_DETALLE	"
*** TRG_VTA_REMITOS_DETALLE_NEW	"	"**BEFORE EACH ROW - INSERT**
"	"```sql
"	"BEGIN
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT SEQ_VTA_REMITOS_DETALLE.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
END;
"	"
```"
** VTA_REMITOS_DETALLE	"
*** TRG_PRODUCCION_STOCK_2	"	"**AFTER EACH ROW - INSERT OR UPDATE OR DELETE**
"	"```sql
"	"BEGIN
  UPDATE ARTICULOS ART
    SET 
     STOCKED = NULL
     WHERE ID IN (:NEW.ARTICULO_ID,:OLD.ARTICULO_ID)
     ;
END;
"	"
```"