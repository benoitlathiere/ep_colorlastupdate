/**
 * colorlastupdate plugin for Etherpad-Lite.
 * use jQuery-Color : http://code.jquery.com/color/
 * client-side JS hooks file.
 * @author Benoit Lathiere
 * @sourcefile hooks.js
 */
var count = 0;
exports.postAceInit = function(hook_name, context) {
	$('#options-cLU').on('click', function() {
		if ($('#options-cLU').is(':checked')) {
			subMode.enable();
		} else {
			$('#options-cLU').attr('checked', false);
			subMode.disable();
		}
	});
	if ($('#options-cLU').is(':checked')){
		subMode.enable();
	}else{
		subMode.disable();
	}
	// if the url param is set
	if(subMode.getParam('ep_colorlastupdate')==='true'||subMode.getParam('ep_colorlastupdate')==='1'){
		$('#options-cLU').attr('checked', 'checked');
		subMode.enable();
	} else if(subMode.getParam('ep_colorlastupdate')==='false'||subMode.getParam('ep_colorlastupdate')==='0'){
		$('#options-cLU').attr('checked', false);
		subMode.disable();
	}
	editor = $('iframe[name="ace_outer"]').contents().find("body#outerdocbody").find('iframe[name="ace_inner"]').contents().find("body#innerdocbody");
	loop_div(currentmagicdomid);
};
exports.aceRegisterBlockElements = function(){
	return ['div'];
};
exports.aceEditEvent = function (hook_name, context, cb) {
	if(context.callstack.docTextChanged) {
		loop_div();
	}
	return false;
};
exports.acePostWriteDomLineHTML = function(hook, context) { // context.node : the DOM node that just got written to the page
	count++;
	if (subMode.enable){
		var id = 0;
		if (context.node.id.indexOf('magicdomid')!==-1){
			id = context.node.id.replace(/^\D+/g, '');
		}
		currentmagicdomid = id;
	}
};