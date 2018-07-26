/**
 * @package     Joomla.Tests
 * @subpackage  JavaScript Tests
 *
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 *
 * @since       3.6.3
 * @version     1.0.0
 */

define(['jquery', 'testsRoot/treeselectmenu/spec-setup', 'jasmineJquery'], function ($) {
	
	describe('Treeselectmenu Expand/Collapse of a node', function () {

		var $toggle = $('span.treeselect-toggle');

		beforeEach(function () {
			spyOnEvent('span.treeselect-toggle', 'click');
			$('span.treeselect-toggle').click();
		});
		it('Should have trigger treeselect-toggle click', function () {
			expect('click').toHaveBeenTriggeredOn('span.treeselect-toggle');
		});
		it('Should have parent node element to "ul.treeselect-sub"', function () {
			expect($toggle.parent().find('ul.treeselect-sub')).toExist();
		});
		it('Should parent node element "ul.treeselect-sub" visible', function () {
			expect($toggle.parent().find('ul.treeselect-sub').is(':visible')).toBe(true);
		});
	});

	describe('Treeselectmenu Checks all checkboxes the tree', function () {
		var spyEvent;

		beforeEach(function () {
			spyEvent = spyOnEvent('#treeCheckAll', 'click');
			$('#treeCheckAll').click();
		});

		it('Should have trigger treeCheckAll click', function () {
			expect('click').toHaveBeenTriggeredOn('#treeCheckAll');
			expect(spyEvent).toHaveBeenTriggered();
		});
		it('Should have checked the checkbox', function () {
			expect($('#treeCheckAll')).toBeChecked();
		});
	});

	describe('Treeselectmenu Unchecks all checkboxes the tree', function () {
		var spyEvent;

		beforeEach(function () {
			spyEvent = spyOnEvent('#treeUncheckAll', 'click');
			$('#treeUncheckAll').click();
		});

		it('Should have trigger treeUncheckAll click', function () {
			expect('click').toHaveBeenTriggeredOn('#treeUncheckAll');
			expect(spyEvent).toHaveBeenTriggered();
		});
		it('Should not have checked the checkbox', function () {
			expect($('#treeUncheckAll')).not.toBeChecked();
		});
	});
	
	describe('Treeselectmenu ExpandAll all expanded checkboxes the tree', function () {
		var spyEvent;

		beforeEach(function () {
			spyEvent = spyOnEvent('#treeExpandAll', 'click');
			$('#treeExpandAll').click();
		});

		it('Should have trigger treeCheckAll click', function () {
			expect('click').toHaveBeenTriggeredOn('#treeExpandAll');
			expect(spyEvent).toHaveBeenTriggered();
		});
		it('Should have show the treeselect elements', function () {
			spyOnEvent('ul.treeselect ul.treeselect-sub', 'show');
			$('ul.treeselect ul.treeselect-sub').show();
		});
	});

	describe('Treeselectmenu tree Collapse All the tree', function () {
		var spyEvent;
		
		beforeEach(function () {
			spyEvent = spyOnEvent('#treeCollapseAll', 'click');
			$('#treeCollapseAll').click();
		});
		it('Should not have show the treeselect elements', function () {
			spyOnEvent('ul.treeselect ul.treeselect-sub', 'show');
			$('ul.treeselect ul.treeselect-sub').hide();
		});
	});
});
