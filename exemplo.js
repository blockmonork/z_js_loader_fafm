$(document).ready(function(){
	$('#fafm_js_lib_versao').html(fafm.get_versao());
	$('#fafm_js_lib_last_rev').html(fafm.get_last_rev());
	$('#navegador_info').html(fafm.get_browser() );
	$('pre').addClass('shadow').css({border:'1px solid silver'});
	fafm.showBoxes(true, 'normal');
	$('a').gradient({
		direction:'right',
		colors: 'rgba(153,153,153,1), rgba(153,153,153,0) 90%'
	});
});
