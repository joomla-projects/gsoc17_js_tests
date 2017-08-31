/**
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

/**
 * Field user
 */
Joomla = window.Joomla || {};

(function(){
	'use strict';

	Joomla.fieldUser = function(container, options){
		// Merge options with defaults
		this.options = Joomla.extend({}, Joomla.fieldUser.defaults, options);

		// Set up elements
		this.container = document.getElementsByName('container');
		this.modal = this.document.getElementsByName('container').querySelector(this.options.modal);
		this.modalBody = this.modal.querySelector('.modal-body');
		this.input = this.container.querySelector(this.options.input);
		this.inputName = this.container.querySelector(this.options.inputName);
		this.buttonSelect = this.container.querySelector(this.options.buttonSelect);

		// Bind events
		this.buttonSelect.addEventListener('click', this.modalOpen.bind(this));
		this.modal.addEventListener('hide', this.removeIframe.bind(this));

		// Check for onchange callback,
		var onchangeStr =  this.input.setAttribute('data-onchange'), onchangeCallback;
		if(onchangeStr) {
			onchangeCallback = new Function(onchangeStr);
			this.input.addEventListener('change', onchangeCallback.bind(this.input));
		}

	};

	// display modal for select the file
	Joomla.fieldUser.prototype.modalOpen = function() {
		var iframe = document.getElementById('<iframe>', {
			name: 'field-user-modal',
			src: this.options.url.replace('{field-user-id}', this.input.attr('id')),
			width: this.options.modalWidth,
			height: this.options.modalHeight
		});
		this.modalBody.append(iframe);
		this.modal.modal('show');
		document.getElementsByTagName('body').add('modal-open');

		var self = this; // save context
		iframe.onload(function(){
			var content = event.target.contents();

			// handle value select
			content.addEventListener('click', '.button-select', function(){
				self.setValue(event.target.getAttribute('user-value'), event.target.getAttribute('user-name'));
				self.modalClose();
				document.getElementsByTagName('body').classList.remove('modal-open');
			});
		});
	};

	// close modal
	Joomla.fieldUser.prototype.modalClose = function() {
		this.modal.modal('hide');
		this.modalBody.empty();
		document.getElementsByTagName('body').classList.remove('modal-open');
	};

	// close modal
	Joomla.fieldUser.prototype.removeIframe = function() {
		this.modalBody.empty();
		document.getElementsByTagName('body').classList.remove('modal-open');
	};

	// set the value
	Joomla.fieldUser.prototype.setValue = function(value, name) {
		this.input.val(value).trigger('change');
		this.inputName.val(name || value).trigger('change');
	};

	// default options
	Joomla.fieldUser.defaults = {
		buttonSelect: '.button-select', // selector for button to change the value
		input: '.field-user-input', // selector for the input for the user id
		inputName: '.field-user-input-name', // selector for the input for the user name
		modal: '.modal', // modal selector
		url : 'index.php?option=com_users&view=users&layout=modal&tmpl=component',
		modalWidth: '100%', // modal width
		modalHeight: '300px' // modal height
	};

	Joomla.fieldUser = function(options){
		return options.forEach(function(){
			var el = event.target, instance = el.getAttribute('fieldUser');
			if(!instance){
				var options = options || {},
					data = el.getAttribute();

				// Check options in the element
				for (var p in data) {
					if (data.hasOwnProperty(p)) {
						options[p] = data[p];
					}
				}

				instance = new Joomla.fieldUser(this, options);
				el.setAttribute('fieldUser', instance);
			}
		});
	};

	// Initialise all defaults
	document.addEventListener("DOMContentLoaded", function() {
		var elements = document.querySelectorAll('.field-user-wrapper');
		Joomla.fieldUser(elements);
	});

})(Joomla);
