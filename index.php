<?php
header('Content-Type: text/html; charset=utf-8');
     if ( isset($_GET['teste_ajax']) ){
        $v = trim($_GET['teste_ajax']);
        sleep(2);
        $x = '<p class="bold text_blue">Teste ajax ok (file: index.php?teste_ajax='.$v.')</p>';
        echo utf8_encode($x);
        exit;
     }else if ( isset($_GET['ajaxByHash']) ){
           $v = trim($_GET['ajaxByHash']);
           sleep(2);
           $x = 'Teste chamando ajax através do hash do link. Resultado: '.$v;
           echo utf8_encode($x);
           exit;
     }
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>FAFM js lib</title>
</head>
<body>
<h1 id="top" class="text_center">FAFM_js_lib: vs.
    <span id="fafm_js_lib_versao"></span>
    <small> last rev. <span id="fafm_js_lib_last_rev"></span></small>
</h1>
<h3 class="text_center">Navegador utilizado: <pre style="display:inline;">fafm.get_browser();</pre>
    <span id="navegador_info"></span>
</h3>

<div class="box shadow rounded5 pad5 b_gray central" style="width:800px;">

<p class="text_center">
   <a href="javascript:fafm.suit('#libLoadInfos', 'fast');">loader.js info</a>
</p>
<div class="oculto" id="libLoadInfos">
<p class="text_justify">
&bull; Incluir o arquivo loader.js
<pre>
&lt;script src="loader.js"&gt;&lt;/script&gt;
</pre>
&bull; Carregar módulo padrão:
<pre>
&lt;script&gt;
_fLoad('default');
&lt;/script&gt;
</pre>
&bull; Carregando array com os módulos:
<pre>
&lt;script&gt;
_fLoad( ['default', 'gallery'] );
&lt;/script&gt;
</pre>
&bull; Para arquivos externos (fora do dir FAFM):
<pre>
&lt;script&gt;
_fLoadOut('stringNomeDoArquivo');
OU
_fLoadOut( Array('arquivo1', 'arquivoN') );
&lt;/script&gt;
</pre>
&bull; Caso os scripts estejam num nível diferente do arquivo que os chama, incluir o(s) nível(is):
<pre>
&lt;script&gt;
_fLoad('default', '../') 1 nível
_fLoad( Array('default', 'gallery'), '../../'); 2 níveis ...

_fLoadOut('arquivo', '../');
_fLoadOut( Array('arquivo1', 'arquivoN'), '../');
&lt;/script&gt;
</pre>
</p>
</div>

<hr>
     <p class="text_center">Módulos:</p>
     <p class="text_center">
        <a href="javascript:;" class="show_boxes" data-target="ulModDefault">default</a> &nbsp;
        <a href="javascript:;" class="show_boxes" data-target="ulModGallery">gallery</a>&nbsp;
     </p>
     
     <div class="show_boxes_container">
          <div class="show_boxes_content" id="ulModDefault">
               <ul>
                   <li><a href="?e=FAFM_chart_bar_horizontal#exemplo">FAFM_chart_bar_horizontal</a></li>
                   <li><a href="?e=FAFM_chart_bar_vertical#exemplo">FAFM_chart_bar_vertical</a></li>
                   <li><a href="?e=formularios#exemplo">Formulários</a></li>
                   <li><a href="?e=base64#exemplo">Base64 code/decode</a></li>
                   <li><a href="?e=suit#exemplo">suit</a></li>
                   <li><a href="?e=show_boxes#exemplo">showBoxes</a></li>
                   <li><a href="?e=popup#exemplo">Popup</a></li>
                   <li><a href="?e=ajax#exemplo">Ajax</a></li>
                   <li><a href="?e=ajax_loaders#exemplo">Ajax - modelos de loaders</a></li>
                   <li><a href="?e=get_set_attribute#exemplo">Get set attribute</a></li>
                   <li><a href="?e=get_hash#exemplo">Get url by hash</a></li>
                   <li><a href="?e=screen_size#exemplo">Screen size</a></li>
                   <li><a href="?e=css_text_wrap#exemplo">CSS Text Wrap</a></li>
                   <li><a href="?e=lorem_pangramator#exemplo">jquery.loremPangramator</a></li>
                   <li><a href="?e=gramaptcha#exemplo">jquery.gramaptcha</a></li>
                   <li><a href="?e=data_funcs#exemplo">Data Funcs</a></li>
                   <li><a href="?e=fafm_css#exemplo">fafm.css</a></li>
                   <li><a href="?e=css_break_no_copy#exemplo">CSS break_text e no_copy</a></li>
                   <li><a href="?e=gradientes#exemplo">Plugin gradient</a></li>
                   <li><a href="?e=ws_cookie#exemplo">localStorage (ws) e cookie (cuk) functions</a></li>
                   <li><a href="exemplos/teste_print.html" target="_blank">Classes css para print</a></li>
               </ul>
          </div>
          
          <div class="show_boxes_content" id="ulModGallery">
               <ul>
                   <li><a href="?e=crossfadeimg#exemplo">Crossfade Img</a></li>
                   <li><a href="?e=simple_image_viewer#exemplo">simpleImageViewer</a></li>
               </ul>
          </div>
          
     </div> <!-- show_boxes_container -->
     
<hr>
     <p class="text_center">
        <a href="javascript:;" title="$.scrollTo('#footer', 800);" onclick="$.scrollTo('#footer', 800);">jquery.scrollTo#footer</a>
        <a href="./">home</a>
        <a href="CHANGELOG.txt" target="_blank">Changelog</a>
        Minifiers:
        <a href="http://jscompress.com/" target="_blank">jscompress</a>
        <a href="http://cssminifier.com/" target="_blank">cssminifier</a>
     </p>
</div>

<div id="debug"></div>
<script src="loader.js" type="text/javascript"></script>
<script>

_fLoad( ['default', 'gallery'] );

_fLoadOut( ['exemplo.css', 'exemplo.js'] );

</script>


<div id="ExemplosPageBodyContainer">

<?php
     //--- aqui eu pego os links e dou include no arquivo...
     if ( isset($_GET['e']) ){
        $e = trim($_GET['e']);
        $temp = 'exemplos/'.$e.'.html';
        if ( file_exists($temp) ){
           echo '<div id="exemplo">';
           include($temp);
           echo '</div>';
        }else{
              echo '<p class="text_center text_red bold">arquivo não existe</p>';
        }
     }
?>
<div style="height:100px;"></div>
<hr>
<div id="footer" class="text_center">
     <a href="javascript:;" title="$.scrollTo('#top', 800);" onclick="$.scrollTo('#top', 800);">jquery.scrollTo#top;</a>
</div>

</div>

</body>
</html>
