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
		
		describe('Treeselectmenu Checks all expanded checkboxes the tree', function () {
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
});
