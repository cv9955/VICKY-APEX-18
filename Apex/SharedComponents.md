# APPLICATION ITEMS

## A001_ARTICULO
	AFTER_SUBMIT	Restricted - May not be set from browser	Application	1	0	0	0

## A001_ART_ID
	-	Restricted - May not be set from browser	Application	0	0	0	0

## A001_CLIENTE
	AFTER_SUBMIT	Restricted - May not be set from browser	Application	1	0	0	0

## A001_CLIENTE_ID
	-	Restricted - May not be set from browser	Application	0	0	0	0

## A001_CTA
	AFTER_LOGIN Page: 102	Restricted - May not be set from browser	Application	1	0	2	0

## A001_PROVEDOR
	Page: 402 408	Restricted - May not be set from browser	Application	0	0	2	0

## A001_PROV_ID
	Page: 402 408	Restricted - May not be set from browser	Application	0	0	2	0

## A001_USER
	AFTER_LOGIN	Restricted - May not be set from browser	Application	1	0	0	1

## B01_ARTICULO
	-	Unrestricted	Application	0	0	0	0

## B01_BOBINA
	-	Unrestricted	Application	0	0	0	0

## B01_CLIENTE
	-	Unrestricted	Application	0	0	0	0

## G_ARTICULO_ID
	Page: 30 31 32	Checksum Required - Session Level	Application	0	0	3	0

## G_ARTICULO_STATUS
	Page: 30	Checksum Required - Session Level	Application	0	0	1	0

## G_CLIENTE_ID
	Page: 30 31 114 500 502 508 541	Checksum Required - Session Level	Application	0	0	7	1

## P01_RETURN
	-	Unrestricted	Application	0	0	0	0

## PAGE_CLIENTE
	BEFORE_HEADER ON_NEW_INSTANCE	Checksum Required - Session Level	Application	2	0	0	0

## PAGE_CLIENTE_TITLE
	BEFORE_HEADER Page: 31	Restricted - May not be set from browser	Application	1	0	1	0

## U_VENDEDOR_ID
> CONTROL DE AUTORIZACION - ACCESO VENDEDOR
- AFTER_LOGIN	
- Restricted 
- May not be set from browser	
- Global

### COMPUTATIONS
- AFTER Authentication 
- ACCESS CONTROL - VENDEDOR 
```SQL
SELECT ID FROM VENDEDORES 
	WHERE APEXUSER = nvl(v('APP_USER'),USER)
```
## VTA_CLIENTE_ID
	Page: 520 530 540	Checksum Required - Session Level	Application	0	0	6	

# APPLICATION PROCESS

## CLIENTE SEARCH PAGE BRANCH
> On Submit: After Page Submission - Before Computations and Validations
>> REQUEST = P0_SEARCH_CLIENTE	
```SQL
DECLARE
  l_url VARCHAR2(1000);
  p_cliente_id NUMBER;
  p_cantidad NUMBER; -- 1 VA DIRECTO A PAG CLIENTES 
BEGIN
 -- IS NUMERIC ??
  IF LENGTH(TRIM(TRANSLATE(:P0_SEARCH_CLIENTE, '0123456789', ' '))) is null then 
      SELECT count(1),max(id) into p_cantidad,p_cliente_id
          FROM CLIENTES  where id = :P0_SEARCH_CLIENTE;
  ELSE
      SELECT count(1),max(id) into p_cantidad,p_cliente_id
          FROM CLIENTES 
          WHERE NOMBRE LIKE '%'||:P0_SEARCH_CLIENTE||'%'
          OR UPPER(ALIAS) LIKE '%'||upper(:P0_SEARCH_CLIENTE)||'%'
          OR UPPER(TAGS) LIKE '%'||upper(:P0_SEARCH_CLIENTE)||'%';
  END IF;
  
  IF p_cantidad = 1 then 
          l_url := apex_page.get_url(p_application => :app_id,
                             p_page        => 100,
             				 p_request      => '',
                             p_clear_cache => 100, 
                             p_items       => 'G_CLIENTE_ID',
                             p_values      => p_cliente_id ); 
   else
          l_url := apex_page.get_url(p_application => :app_id,
                             p_page        => 101,
             				 p_request      => '',
                             p_clear_cache => 101, 
                             p_items       => 'P101_SEARCH', 
                             p_values      => :P0_SEARCH_CLIENTE) ;
   end if ;
        htp.init;
        apex_util.redirect_url(l_url);
END;
```

## ARTICULO SEARCH PAGE BRANCH
> On Submit: After Page Submission - Before Computations and Validations
```sql

```

## BOBINA SEARCH PAGE BRANCH
> On Submit: After Page Submission - Before Computations and Validations
```sql

```

## preparar_mapa
> After Authentication
```sql
	APEX_COLLECTION.CREATE_OR_TRUNCATE_COLLECTION( p_collection_name => 'MAPAS'); ...
```

# APPLICATION COMPUTATIONS

## A001_ARTICULO
	After Submit	SQL Query (return single value)	-

## A001_CLIENTE
	After Submit	SQL Query (return single value)	-

## A001_CTA
	After Authentication	Static Assignment	-

## A001_USER
	After Authentication	PL/SQL Expression	-

## PAGE_CLIENTE
	Before Header	PL/SQL Expression	-

## PAGE_CLIENTE
	On New Instance (new session)	Static Assignment	-

## PAGE_CLIENTE_TITLE
	Before Header	SQL Query (return single value)	-

