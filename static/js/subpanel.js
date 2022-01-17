/**
 * colorlastupdate plugin for Etherpad-Lite.
 * use jQuery-Color : http://code.jquery.com/color/
 * client-side JS object file.
 * @author Benoit Lathiere
 * @filesource subpanel.js
 */
//global vars
var editorcontainer = $('#editorcontainer');
var editor = null;	//DOM editor
var panel = $("#colorLastUpdate-panel");
var menu_right = $('div#editbar').find('ul.menu_right');
var currentmagicdomid = 0;
var previoustxt = "";
/**
 * Returns ideal height/bottom space according to client display height (small screen).
 */
var getMenuHeight = function() {
	if(menu_right.css('float')!=='right'){	//right bar is displayed at the bottom of the pad
		return parseInt(menu_right.css('height')+10,10);
	}
	return 0;
};
var subMode = {
	active:false,
	editorcontainer_bottom:0,
	enable: function(){
		this.editorcontainer_bottom = editorcontainer.css('bottom');
		panel.css('display','block');
		this.active = true;
		editorcontainer.css('bottom', (getMenuHeight()+63)+'px');
		panel.css('bottom', getMenuHeight()+'px');
	},
	disable: function(){
		panel.css({'display':'none'});
		editorcontainer.css('bottom', this.editorcontainer_bottom);
		this.active = false;
	},
	toggle: function() {v
		if (this.active){
			this.disable();
		}else{
			this.enable();
		}
	},
	getParam: function(sname) {
		var params = window.location.search.substr(location.search.indexOf("?")+1);
		var sval = '';
		params = params.split('&');
		// split param and value into individual pieces
		for (var i=0; i<params.length; i++)
		{
			var temp = params[i].split("=");
			if(temp[0]===sname){
				sval=temp[1];
			}
		}
		return sval;
	}
};
/**
 * Drop some annoying tags..
 */
var clean_tags = function(text) {
	if (text.length===0){
		return text;
	}
	text = text.replace(/<img.*?>/gi, '');	//drop ep_previewimages behaviour
	text = text.replace('<br>',' ').replace('</br>',' ').replace('<br/>',' ');
	text = text.replace(/<a[^>]*>(.*?)<\/a>/gi, function(match, contents, offset, s) {	//curtail long links
		if (contents.length<50){
			return match;
		}
		return "<u>"+ contents.substring(0, 20)+"..."+contents.substring(contents.length-10)+"</u>";
	});
	return text;
};
/**
 * Fill subtitles panel with new/modified text.
 */
var loop_div = function(magicdomid) {
	var htmlDelay = $('#cLu-time');
	var delay = $('#cLu-time').val() || 4;	//seconds
	if (subMode.active) {
		var lastline = 1;
		var tmphtml = txt = '';
		editor.children().each(function(index) {
			if ($(this).text().trim().length>0) {
				txt = $(this).text().trim();
				tmphtml = $(this).html();
				if (index >= lastline) {
					lastline = index+1;
				}
			}
		});
		var html = ($('#options-linenoscheck').is(':checked')?(lastline)+'&nbsp;:&nbsp;':'')+tmphtml;
		html = clean_tags(html);
		var divid = "cLUdiv"+lastline;
		if (txt != previoustxt) {			//only significant updates
			if (!$('#'+divid).length) {
				panel.append('<div id="'+divid+'" class="colorLastUpdate-span">'+html+'</div>');
			} else {
				panel.find('#'+divid).html(html);
				panel.find('#'+divid).stop(true, false);
				panel.find('#'+divid).css({color:'#fff'});
				panel.find('#'+divid).css({height:'1em'});
			}
			//animations
			panel.find("#"+divid).animate({color:'#000'}, {
				duration:(delay*1000),
				easing:'linear',
				complete : function(){
					panel.find("#"+divid).animate({height:0}, {
						duration:1000,
						easing:'swing',
						complete : function(){
							panel.find('#'+divid).remove();
						},
						fail : function(){ }
					});
				}
			});
			previoustxt = txt;
		}
	}
};