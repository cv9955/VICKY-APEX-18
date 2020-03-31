CREATE TABLE "VIC"."ARTICULOS"
  (
    "ID"              NUMBER(*,0) NOT NULL ENABLE,
    "REV"             NUMBER(*,0),
    "CODIGO"          VARCHAR2(50 BYTE),
    "STATUS"          NUMBER(*,0),

    "CLIENTE_ID"      NUMBER(*,0),
    "CLI_GRUPO_ID"    NUMBER,
    "ART_TIPO_ID"     NUMBER(*,0),
    "ART_CALIDAD_ID"  NUMBER(*,0),

    "LARGO"           NUMBER(*,0),
    "ANCHO"           NUMBER(*,0),
    "ALTO"            NUMBER(*,0),
    "PLARGO"          NUMBER(*,0),
    "PANCHO"          NUMBER,
    "TRAZADOS"        VARCHAR2(200 BYTE),
    "SLOTTER"         VARCHAR2(200 BYTE),
    "OBS"             VARCHAR2(400 BYTE),

    "MULT_X"          NUMBER(*,0),
    "MULT_Y"          NUMBER(*,0),
    "DESARROLLO"      NUMBER(*,0),
    "CIERRE_TIPO"     NUMBER(*,0),
    "CIERRE_VALOR"    NUMBER(*,0),
    "ALETA_SUP_TIPO"  NUMBER(*,0),
    "ALETA_SUP_VALOR" NUMBER(*,0),
    "ALETA_INF_TIPO"  NUMBER(*,0),
    "ALETA_INF_VALOR" NUMBER(*,0),
    "CENTRO"          NUMBER,
    "MULT"            NUMBER DEFAULT 1 NOT NULL ENABLE,
    "REFILE"          NUMBER,
    "COLOR"           VARCHAR2(200 BYTE),
    "AJ_PRECIO"       NUMBER,
    "CALCULAR"        NUMBER,
    "PRIORIDAD"       NUMBER,

    "CREATED"         DATE,
    "CREATED_BY"      VARCHAR2(200 BYTE),
    "UPDATED"         DATE,
    "UPDATED_BY"      VARCHAR2(200 BYTE),
    "SIGNED"    	  DATE,
    "SIGNED_BY" 	  VARCHAR2(20 BYTE),
    
    "IMAGEN" BLOB,
    "MIMETYPE"  VARCHAR2(40 BYTE),
    "FILENAME"  VARCHAR2(200 BYTE),

    "ALTA_PL"   NUMBER,
    "BAJA_PL"   NUMBER,
    "ALTA"      NUMBER,
    "BAJA"      NUMBER,
    "STOCKED"   DATE,
    CONSTRAINT "ART_MULT" CHECK (MULT > 0) ENABLE,
    CONSTRAINT "ARTICULOS_PK" PRIMARY KEY ("ID") USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT) TABLESPACE "VICKY" ENABLE,
    CONSTRAINT "ART_CLIENTES" FOREIGN KEY ("CLIENTE_ID") REFERENCES "VIC"."CLIENTES" ("ID") ENABLE,
    CONSTRAINT "ART_GRUPOS_FK" FOREIGN KEY ("CLI_GRUPO_ID") REFERENCES "VIC"."CLI_GRUPOS" ("ID") ON
  DELETE
    SET NULL ENABLE,
    CONSTRAINT "ART_TIPO_FK" FOREIGN KEY ("ART_TIPO_ID") REFERENCES "VIC"."ART_TIPO" ("ID") ENABLE
  )
  SEGMENT CREATION IMMEDIATE PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING STORAGE
  (
    INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
  )
  TABLESPACE "VICKY" LOB
  (
    "IMAGEN"
  )
  STORE AS BASICFILE "LOB_ARTICULOS"
  (
    TABLESPACE "VICKY_LOB" ENABLE STORAGE IN ROW CHUNK 8192 RETENTION NOCACHE LOGGING STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  ) ;
  
CREATE OR REPLACE EDITIONABLE TRIGGER "VIC"."ARTICULOS_TRG" 
BEFORE  INSERT OR  UPDATE ON ARTICULOS 
FOR EACH ROW
BEGIN 
  IF INSERTING THEN 
    :NEW.CREATED :=SYSDATE;
    :NEW.CREATED_BY:= NVL(V('APP_USER'),USER);
    IF :new.ART_TIPO_ID IS NULL THEN
      Raise_Application_Error(-2010, 'Tipo No se Puede ser NULL.');
    END IF;
    IF :NEW.ID IS NULL THEN
      SELECT ARTICULOS_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
    :new.status           := 1;
    :new.rev              := 0;
    :new.calcular         := 1;
    :new.mult_x           := 1;
    :new.mult_y           := 1;
    IF :new.ART_TIPO_ID    = 4 THEN
      :new.aleta_sup_tipo := 0;
      :new.aleta_inf_tipo := 0;
      :new.desarrollo     := 0;
      :new.cierre_tipo    := 1;
    elsif :new.ART_TIPO_ID = 5 THEN
      :new.aleta_sup_tipo := 0;
      :new.aleta_inf_tipo := 1;
      :new.desarrollo     := 0;
      :new.cierre_tipo    := 1;
    elsif :new.ART_TIPO_ID = 6 THEN
      :new.aleta_sup_tipo := 1;
      :new.aleta_inf_tipo := 0;
      :new.desarrollo     := 0;
      :new.cierre_tipo    := 1;
    elsif :new.ART_TIPO_ID = 7 THEN
      :new.aleta_sup_tipo := 1;
      :new.aleta_inf_tipo := 1;
      :new.desarrollo     := 0;
      :new.cierre_tipo    := 1;
    elsif :new.ART_TIPO_ID = 8 THEN
      :new.aleta_sup_tipo := 1;
      :new.aleta_inf_tipo := 1;
      :new.desarrollo     := 0;
    elsif :new.ART_TIPO_ID = 9 THEN
      :new.aleta_sup_tipo := 0;
      :new.aleta_inf_tipo := 0;
      :new.desarrollo     := 0;
      :new.cierre_tipo    := 1;
    END IF;
  END IF;
  IF UPDATING THEN
    :NEW.UPDATED    :=SYSDATE;
    :NEW.UPDATED_BY := NVL(V('APP_USER'),USER);
  END IF;
END;
/
ALTER TRIGGER "VIC"."ARTICULOS_TRG" ENABLE;
/
CREATE OR REPLACE EDITIONABLE TRIGGER "VIC"."ARTICULOS_HIST" BEFORE
  UPDATE OF ALTO,    ANCHO,    ART_CALIDAD_ID,    TRAZADOS,    PANCHO,
    PLARGO,    LARGO,    OBS,    COLOR,    STATUS ON ARTICULOS 
    FOR EACH ROW 
    BEGIN 
    IF :old.status =3  AND :new.status=4 THEN
      :new.rev := NVL(:old.rev,0) +1;
      :new.SIGNED:= sysdate;
      :new.SIGNED_by:= NVL(v('APP_USER'),USER);
  INSERT
  INTO H_ARTICULOS
    (
      ID,      REV,      CLIENTE_ID,      CODIGO,
      ART_TIPO_ID,      LARGO,      ANCHO,      ALTO,
      ART_CALIDAD_ID,      PLARGO,      PANCHO,      OBS,
      MULT_X,      MULT_Y,      DESARROLLO,
      CIERRE_TIPO,      CIERRE_VALOR,
      ALETA_SUP_TIPO,      ALETA_SUP_VALOR,
      ALETA_INF_TIPO,      ALETA_INF_VALOR,
      CENTRO,      MULT,      REFILE,      COLOR,
      TRAZADOS,      SLOTTER,      CLI_GRUPO_ID,
      UPDATED_BY,      UPDATED_FEC
    )
    VALUES
    (
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
      NVL(v('APP_USER'),USER),
      sysdate
    );
END IF;
END;
/
ALTER TRIGGER "VIC"."ARTICULOS_HIST" ENABLE;
