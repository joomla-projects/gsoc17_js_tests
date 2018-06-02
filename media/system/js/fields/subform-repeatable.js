/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
Joomla = window.Joomla || {};

(function(Joomla) {
	"use strict";
	Joomla.subformRepeatable = function(container, options){
		this.container = document.querySelector(container);

		// check if alredy exist
		if(this.container.getAttribute("data-subformRepeatable")){
			return self;
		}

		// Add a reverse reference to the DOM object
		this.container.setAttribute("subformRepeatable", self);

		// merge options
		this.options = Joomla.extend({}, Joomla.subformRepeatable.defaults, options);

		// template for the repeating group
		this.template = '';

		// prepare a row template, and find available field names
		this.prepareTemplate();

		// check rows container
		this.containerRows = this.options.rowsContainer ? this.this.document.getElementsByName('container').querySelector(this.options.rowsContainer) : this.container;

		// last row number, help to avoid the name duplications
        this.lastRowNum = this.containerRows.querySelector(this.options.repeatableElement).length;

		// To avoid scope issues,
		var self = this;

		// bind add button
		this.container.addEventListener('click', this.options.btAdd, function (e) {
			e.preventDefault();
			var after = this.querySelector(self.options.repeatableElement).parentNode;
			if(!after.length){
				after = null;
			}
			self.addRow(after);
		});

		// bind remove button
		this.container.on('click', this.options.btRemove, function (e) {
			e.preventDefault();
			var row = this.querySelector(self.options.repeatableElement).parentNode;
			self.removeRow(row);
		});

		// bind move button
		if(this.options.btMove){
			if (Joomla.fn.sortable){
				this.document.getElementsByName('containerRows').sortable({
					items: this.options.repeatableElement,
					handle: this.options.btMove,
					tolerance: 'pointer'
				});
			}
		}

		// tell all that we a ready
		var event = this.createEvent('HTMLEvents');
		event.initEvent('subform-ready', true, false);
		el.dispatchEvent(event);
	};

	// prepare a template that we will use repeating
	Joomla.subformRepeatable.prototype.prepareTemplate = function(){
		// create from template
		if(this.options.rowTemplateSelector){
			var tmplElement = this.document.getElementsByName('container').querySelector(this.options.rowTemplateSelector)[0] || {};
			this.template = (tmplElement.text || tmplElement.textContent).trim(); //(text || textContent) is IE8 fix
		}
		// create from existing rows
		else {
			//find first available
			var row = this.container.querySelector(this.options.repeatableElement),
				row = document.querySelector('row').clone();

			// clear scripts that can be attached to the fields
			try {
				this.clearScripts(document.getElementsByName('row'));
			} catch (e) {
				if(window.console){
					console.log(e);
				}
			}

			this.template = document.getElementsByName('row').prop('outerHTML');
		}
	};

	// add new row
	Joomla.subformRepeatable.prototype.addRow = function(after){
		// count how much we already have
		var count = this.document.getElementsByName('containerRows').querySelector(this.options.repeatableElement).length;
		if(count >= this.options.maximum){
			return null;
		}

		// make new from template
		var parseHTML = function(str) {
			var tmp = document.implementation.createHTMLDocument();
			tmp.body.innerHTML = str;
			return tmp.body.children;
		};
		var row = parseHTML(this.template);

		//add to container
		if(after){
			var after = document.querySelector(after);
			after.insertAdjacentHTML('afterend',row);
		} else {
			var append = this.document.getElementsByName('containerRows');
			append.appendChild(row);
		}

		var row = document.querySelector(row);
		//add marker that it is new
		row.setAttribute('data-new', 'true');
		// fix names and id`s, and reset values
		this.fixUniqueAttributes($row, count);

		// try find out with related scripts,
		// tricky thing, so be careful
		try {
			this.fixScripts($row);
		} catch (e) {
			if(window.console){
				console.log(e);
			}
		}

		// tell everyone about the new row
		this.document.getElementsByName('container').trigger('subform-row-add', $row);
		Joomla.Event.dispatch($row.get(0), 'joomla:updated');
		return $row;
	};

	// remove row
	Joomla.subformRepeatable.prototype.removeRow = function($row){
		// count how much we have
		var count = this.document.getElementsByName('containerRows').find(this.options.repeatableElement).length;
		if(count <= this.options.minimum){
			return;
		}

		// tell everyoune about the row will be removed
		this.document.getElementsByName('container').trigger('subform-row-remove', $row);
		Joomla.Event.dispatch($row.get(0), 'joomla:removed');
		$row.remove();
	};

	// fix names ind id`s for field that in $row
	Joomla.subformRepeatable.prototype.fixUniqueAttributes = function($row, count){
		this.lastRowNum++;
		var group = $row.attr('data-group'),// current group name
			basename = $row.attr('data-base-name'), // group base name, without count
			count    = count || 0,
			countnew = Math.max(this.lastRowNum, count + 1),
    		groupnew = basename + countnew; // new group name

		this.lastRowNum = countnew;
		$row.attr('data-group', groupnew);

		// Fix inputs that have a "name" attribute
		var haveName = $row.find('[name]'),
			ids = {}; // Collect id for fix checkboxes and radio

		for (var i = 0, l = haveName.length; i < l; i++) {
			var $el     = $(haveName[i]),
				name    = $el.attr('name'),
				id      = name.replace(/(\[\]$)/g, '').replace(/(\]\[)/g, '__').replace(/\[/g, '_').replace(/\]/g, ''), // id from name
				nameNew = name.replace('[' + group + '][', '['+ groupnew +']['), // New name
				idNew   = id.replace(group, groupnew), // Count new id
				countMulti = 0, // count for multiple radio/checkboxes
				forOldAttr = id; // Fix "for" in the labels

			if ($el.prop('type') === 'checkbox' && name.match(/\[\]$/)) { // <input type="checkbox" name="name[]"> fix
				// Recount id
				countMulti = ids[id] ? ids[id].length : 0;
				if (!countMulti) {
					// Set the id for fieldset and group label
					$el.closest('fieldset.checkboxes').attr('id', idNew);
					$row.find('label[for="' + id + '"]').attr('for', idNew).attr('id', idNew + '-lbl');
				}
				forOldAttr = forOldAttr + countMulti;
				idNew = idNew + countMulti;
			}
			else if ($el.prop('type') === 'radio') { // <input type="radio"> fix
				// Recount id
				countMulti = ids[id] ? ids[id].length : 0;
				if (!countMulti) {
					// Set the id for fieldset and group label
					$el.closest('fieldset.radio').attr('id', idNew);
					$row.find('label[for="' + id + '"]').attr('for', idNew).attr('id', idNew + '-lbl');
				}
				forOldAttr = forOldAttr + countMulti;
				idNew = idNew + countMulti;
			}

			// Cache already used id
			if (ids[id]) {
				ids[id].push(true);
			} else {
				ids[id] = [true];
			}

			// Replace the name to new one
			$el.attr('name', nameNew);
			// Set new id
			$el.attr('id', idNew);
			// Guess there a label for this input
			$row.find('label[for="' + forOldAttr + '"]').attr('for', idNew).attr('id', idNew + '-lbl');
		}
	};

	// remove scripts attached to fields
	// @TODO: make thing better when something like that will be accepted https://github.com/joomla/joomla-cms/pull/6357
	Joomla.subformRepeatable.prototype.clearScripts = function($row){
		// destroy chosen if any
		if($.fn.chosen){
			$row.find('select.chzn-done').each(function(){
				var $el = $(this);
				$el.next('.chzn-container').remove();
				$el.show().addClass('fix-chosen');
			});
		}
	};

	// method for hack the scripts that can be related
	// to the one of field that in given $row
	Joomla.subformRepeatable.prototype.fixScripts = function($row){
		// fix media field
		$row.find('a[onclick*="jInsertFieldValue"]').each(function(){
				var $el = $(this),
				inputId = $el.siblings('input[type="text"]').attr('id'),
				$select = $el.prev(),
				oldHref = $select.attr('href');
			// update the clear button
			$el.attr('onclick', "jInsertFieldValue('', '" + inputId + "');return false;")
			// update select button
			$select.attr('href', oldHref.replace(/&fieldid=(.+)&/, '&fieldid=' + inputId + '&'));
		});

		// bootstrap based Media field
		if($.fn.fieldMedia){
			$row.find('.field-media-wrapper').fieldMedia();
		}

		// bootstrap tooltips
		if($.fn.tooltip){
			$row.find('.hasTooltip').tooltip({html: true, container: "body"});
		}

		// bootstrap based User field
		if($.fn.fieldUser){
			$row.find('.field-user-wrapper').fieldUser();
		}

		// another modals
		if(window.SqueezeBox && window.SqueezeBox.assign){
			SqueezeBox.assign($row.find('a.modal').get(), {parse: 'rel'});
		}
	};

	// defaults
	Joomla.subformRepeatable.defaults = {
		btAdd: ".group-add", //  button selector for "add" action
		btRemove: ".group-remove",//  button selector for "remove" action
		btMove: ".group-move",//  button selector for "move" action
		minimum: 0, // minimum repeating
		maximum: 10, // maximum repeating
		repeatableElement: ".subform-repeatable-group",
		rowTemplateSelector: 'script.subform-repeatable-template-section', // selector for the row template <script>
		rowsContainer: null // container for rows, same as main container by default
	};

	Joomla.subformRepeatable = function(options){
		return this.each(function(){
			var options = options || {},
				data = $(this).data();

			if(data.subformRepeatable){
				// Alredy initialized, nothing to do here
				return;
			}

			for (var p in data) {
				// check options in the element
				if (data.hasOwnProperty(p)) {
					options[p] = data[p];
				}
			}

			var inst = new Joomla.subformRepeatable(this, options);
			event.target.setAttribute('subformRepeatable', inst);
		});
	};

	// initialise all available
	// wait when all will be loaded, important for scripts fix
	window.addEventListener('load', function(){
		document.getElementsByClassName('subform-repeatable').subformRepeatable();
	})

})(Joomla);
