# TEMPLATES

## HERO_CLIENTES
- USAGE : 100 107 108 109 111 114 123 124

- LEFT MARGIN : LARGE
[X] REMOVE BODY PADDING

```HTML
<div class="t-HeroRegion #REGION_CSS_CLASSES#" id="#REGION_STATIC_ID#" #REGION_ATTRIBUTES#>
  <div class="t-HeroRegion-wrap">
    <div class="t-HeroRegion-col t-HeroRegion-col--left"><span class="t-HeroRegion-icon t-Icon #ICON_CSS_CLASSES#">&G_CLIENTE_ID.</span></div>
    <div class="t-HeroRegion-col t-HeroRegion-col--content">
      <h1 class="t-HeroRegion-title">&G_CLIENTE_TITLE.</h1>
      #BODY#
    </div>
    <div class="t-HeroRegion-col t-HeroRegion-col--right"><div class="t-HeroRegion-form">#SUB_REGIONS#</div><div class="t-HeroRegion-buttons">#NEXT#</div></div>
  </div>
</div>
```




## CAV_RECIBO_1
```SQL
<!DOCTYPE html>
<html class="no-js #RTL_CLASS# page-&APP_PAGE_ID. app-&APP_ALIAS." lang="&BROWSER_LANGUAGE." #TEXT_DIRECTION#>
<head>
  <meta http-equiv="x-ua-compatible" content="IE=edge" />
  <meta charset="utf-8">
  <title>#TITLE#</title>
  #APEX_CSS#
  #THEME_CSS#
  #TEMPLATE_CSS#
  #THEME_STYLE_CSS#
  #APPLICATION_CSS#
  #PAGE_CSS#  
  #FAVICONS#
  #HEAD#
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
</head>

<body class="t-PageBody t-PageBody--hideLeft t-PageBody--hideActions no-anim #PAGE_CSS_CLASSES# t-PageBody--noNav" #TEXT_DIRECTION# #ONLOAD# id="t_PageBody">
#FORM_OPEN#
<header class="t-Header" id="t_Header">
  #REGION_POSITION_07#
  <div class="t-Header-branding">
    <div class="t-Header-controls">
      <button class="t-Button t-Button--icon t-Button--header t-Button--headerTree" title="#EXPAND_COLLAPSE_NAV_LABEL#" id="t_Button_navControl" type="button"><span class="t-Icon fa fa-bars" aria-hidden="true"></span></button>
    </div>
    <div class="t-Header-logo screenOnly">
      <a href="#HOME_LINK#" class="t-Header-logo-link">#LOGO#</a>
      <a href="javascript:window.print();" class="t-Header-logo-link">Imprimir</a>     
      <a href="javascript:history.go(-1);" class="t-Header-logo-link">Volver</a>
    </div>
    <div class="t-Header-navBar screenOnly">
      #NAVIGATION_BAR#
    </div>
  </div>
</header>

<div class="t-Body">
  <div class="t-Body-main">
      <div class="t-Body-title screenOnly" id="t_Body_title">
        #REGION_POSITION_01#
      </div>
      <div class="t-Body-content" id="t_Body_content">
        #SUCCESS_MESSAGE##NOTIFICATION_MESSAGE##GLOBAL_NOTIFICATION#
        <div class="t-Body-contentInner">
          #BODY#
        </div>
        <footer class="t-Footer screenOnly">
          <div class="t-Footer-body">
            <div class="t-Footer-content">#REGION_POSITION_05#</div>
            <div class="t-Footer-apex">
              <div class="t-Footer-version">#APP_VERSION#</div>  
              <div class="t-Footer-customize">#CUSTOMIZE#</div>
              <div class="t-Footer-srMode">#SCREEN_READER_TOGGLE#</div>
            </div>
          </div>
          <div class="t-Footer-top">
            <a href="#top" class="t-Footer-topButton" id="t_Footer_topButton"><span class="a-Icon icon-up-chevron"></span></a>
          </div>
        </footer>
      </div>
  </div>
</div>
<div class="t-Body-inlineDialogs">
  #REGION_POSITION_04#
</div>

#FORM_CLOSE#
#DEVELOPER_TOOLBAR#
#APEX_JAVASCRIPT#
#GENERATED_CSS#
#THEME_JAVASCRIPT#
#TEMPLATE_JAVASCRIPT#
#APPLICATION_JAVASCRIPT#
#PAGE_JAVASCRIPT#  
#GENERATED_JAVASCRIPT#
</body>
</html>

``` 

```CSS
@media print
{
    .screenOnly {display:none;}
    
    header nav, footer {
        display: none;
    }
    
   div.saltopagina{ 
        display:block; 
        page-break-before:always;    
    }
    #apexDevToolbar {display:none;}
}    

@media all {
   div.saltopagina{
      display: none;
      
   }
}


@page {
    size: A4; 
    margin-top: 0;
    margin-bottom:0;
 }
```  
 
P146_PRINT_RECIBO.CSS
