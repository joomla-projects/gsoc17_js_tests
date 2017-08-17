/**
 * @package         Joomla.JavaScript
 * @copyright       Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

/**
 * Function to send Permissions via Ajax to Com-Config Application Controller
 */
Joomla = window.Joomla || {};

(function(Joomla) {

	window.sendPermissions = function(event) {
		// set the icon while storing the values
		var icon = document.getElementById('icon_' + this.id);
		icon.removeAttribute('class');
		icon.setAttribute('class', 'fa fa-spinner fa-spin');

		//get values and prepare GET-Parameter
		var asset = 'not';
		var component = Joomla.getUrlParam('component');
		var extension = Joomla.getUrlParam('extension');
		var option    = Joomla.getUrlParam('option');
		var view      = Joomla.getUrlParam('view');
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
				asset = context + '.fieldgroup.' + Joomla.getUrlParam('id');
			}
			else {
				asset = context + '.field.' + Joomla.getUrlParam('id');
			}
			title = document.getElementById('jform_title').value;
		}
		else if (extension != false && view != false){
			asset = extension + '.' + view + '.' + Joomla.getUrlParam('id');
			title = document.getElementById('jform_title').value;
		}
		else if (extension == false && view != false){
			asset = option + '.' + view + '.' + Joomla.getUrlParam('id');
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
		Joomla.request({
			method: 'POST',
			url: document.getElementById('permissions-sliders').getAttribute('data-ajaxuri'),
			data: permission_data,
			perform: true,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},

			onError: function (xhr) {
				// Remove the spinning icon.
				icon.removeAttribute('style');

				Joomla.renderMessages(Joomla.ajaxErrorsMessages(xhr));

				window.scrollTo(0, 0);

				icon.setAttribute('class', 'fa fa-times');
			},
			onSuccess: function (response, xhr) {
				// Remove the spinning icon.
				icon.removeAttribute('style');
				response = JSON.parse(response);

				if (response.data) {
					// Check if everything is OK
					if (response.data.result == true) {
						icon.setAttribute('class', 'fa fa-check');
						var next = event.target.parentElement.nextElementSibling;
						next.removeChild(next.querySelector('span'));
						next.classList.setAttribute("class", "badge");
						next.innerHTML= response.data.text;
					}
				}

				// Render messages, if any. There are only message in case of errors.
				if (typeof response.messages == 'object' && response.messages !== null) {
					Joomla.renderMessages(response.messages);

					if (response.data && response.data.result == true) {
						icon.setAttribute('class', 'fa fa-check');
					}
					else {
						icon.setAttribute('class', 'fa fa-times');
					}

					window.scrollTo(0, 0);
				}
			}
		});
	}
})(Joomla);


/**
 * Function to get parameters out of the url
 */
Joomla.getUrlParam = function(variable) {
	var query = window.location.search.substring(1);
	var vars  = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return false;
};

