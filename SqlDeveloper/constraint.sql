select OWNER ,CONSTRAINT_NAME ,CONSTRAINT_TYPE ,
TABLE_NAME ,R_CONSTRAINT_NAME ,
DELETE_RULE ,STATUS ,VALIDATED,LAST_CHANGE ,INVALID
from user_constraints
where constraint_type = 'R' 
--AND table_name like '%CLI_%'
AND R_constraint_name LIKE '%CLI_%'
ORDER BY 4
;


alter table "VIC"."CLI_GRUPOS" 
    add constraint CLI_DEPOSITOS_FK00
    foreign key("CLI_DEPOSITO_ID") 
    references "CLI_DEPOSITOS"("ID");


alter table "VIC"."ARTICULOS"
drop constraint "ART_CLIENTES";
