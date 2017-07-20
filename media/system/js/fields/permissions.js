/**
 * @package         Joomla.JavaScript
 * @copyright       Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

/**
 * Function to send Permissions via Ajax to Com-Config Application Controller
 */
Joomla = window.Joomla || {};

(function sendPermissions(event, Joomla) {
	// set the icon while storing the values
	var icon = document.getElementById('icon_' + this.id);
	icon.removeAttribute('class');
	icon.setAttribute('style', 'background: url(../media/system/images/modal/spinner.gif); display: inline-block; width: 16px; height: 16px');

	//get values and prepare GET-Parameter
	var asset = 'not';
	var component = getUrlParam('component');
	var extension = getUrlParam('extension');
	var option    = getUrlParam('option');
	var view      = getUrlParam('view');
	var title     = component;
	var value     = this.value;
	var context   = '';

	if (document.getElementById('jform_context')){
		context = document.getElementById('jform_context').value;
		context = context.split('.')[0];
	}

	if (option == 'com_config' && component == false && extension == false)
	{
		asset = 'root.1';
	}
	else if (extension == false && view == 'component'){
		asset = component;
	}
	else if (context){
		if (view == 'group') {
			asset = context + '.fieldgroup.' + getUrlParam('id');
		}
		else {
			asset = context + '.field.' + getUrlParam('id');
		}
		title = document.getElementById('jform_title').value;
	}
	else if (extension != false && view != false){
		asset = extension + '.' + view + '.' + getUrlParam('id');
		title = document.getElementById('jform_title').value;
	}
	else if (extension == false && view != false){
		asset = option + '.' + view + '.' + getUrlParam('id');
		title = document.getElementById('jform_title').value;
	}

	var id = this.id.replace('jform_rules_', '');
	var lastUnderscoreIndex = id.lastIndexOf('_');

	var permission_data = {
		comp   : asset,
		action : id.substring(0, lastUnderscoreIndex),
		rule   : id.substring(lastUnderscoreIndex + 1),
		value  : value,
		title  : title
	};

	// Remove js messages, if they exist.
	Joomla.removeMessages();

	// doing ajax request
    var request = new XMLHttpRequest();
    request.open("POST", document.getElementById('permissions-sliders').getAttribute('data-ajaxuri'), true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send('')
	.fail(function (jqXHR, textStatus, error) {
		// Remove the spinning icon.
		icon.removeAttribute('style');

		Joomla.renderMessages(Joomla.ajaxErrorsMessages(jqXHR, textStatus, error));

		window.scrollTo(0, 0);

		icon.setAttribute('class', 'icon-cancel');
	})
	.done(function (response) {
		// Remove the spinning icon.
		icon.removeAttribute('style');

		if (response.data)
		{
			// Check if everything is OK
			if (response.data.result == true)
			{
				icon.setAttribute('class', 'icon-save');

				var ele = document.getElementsByTagName('td');
				var next = ele.nextSibling;
				document.getElementById(event.target).next.querySelector("span")
					.removeClass()
					.addClass(response['data']['class'])
					.html(response.data.text);
			}
		}

		// Render messages, if any. There are only message in case of errors.
		if (typeof response.messages == 'object' && response.messages !== null)
		{
			Joomla.renderMessages(response.messages);

			if (response.data && response.data.result == true)
			{
				icon.setAttribute('class', 'icon-save');
			}
			else
			{
				icon.setAttribute('class', 'icon-cancel');
			}

			window.scrollTo(0, 0);
		}
	});
}) (event, Joomla);

/**
 * Function to get parameters out of the url
 */
function getUrlParam(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for (var i=0;i<vars.length;i++)
	{
		var pair = vars[i].split('=');
		if (pair[0] == variable)
		{
			return pair[1];
		}
	}
	return false;
}
