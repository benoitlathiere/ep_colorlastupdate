/**
 * ep_colorlastupdate plugin.
 * Server-side hooks.
 * @author Benoit Lathiere
 * @filesource index.js
 */
//var eejs = require("ep_etherpad-lite/node/eejs/");	// no more required!
exports.eejsBlock_mySettings = function (hook_name, args, cb) {
    var checked_state = 'unchecked';
    //args.content = args.content + eejs.require('ep_colorlastupdate/templates/colorlastupdate_entry.ejs', {checked : checked_state});
    args.content = args.content + require('../ep_colorlastupdate/templates/colorlastupdate_entry.ejs', {checked : checked_state});
    return cb();
};
exports.eejsBlock_styles = function (hook_name, args, cb) {
    args.content = args.content + "<link href='../static/plugins/ep_colorlastupdate/static/css/colorlastupdate_style.css' rel='stylesheet'>";
    return cb();
};
exports.eejsBlock_body = function (hook_name, args, cb) {
	//args.content = args.content + eejs.require("ep_colorlastupdate/templates/colorlastupdate_panel.ejs", {}, module);
    args.content = args.content + require("../ep_colorlastupdate/templates/colorlastupdate_panel.ejs", {}, module);
    return cb();
};
exports.eejsBlock_scripts = function (hook_name, args, cb) {
	args.content += "<script src='../static/plugins/ep_colorlastupdate/static/js/subpanel.js'></script>";
    args.content += "<script src='../static/plugins/ep_colorlastupdate/static/js/jquery.color-2.1.2.min.js'></script>";
    return cb();
};