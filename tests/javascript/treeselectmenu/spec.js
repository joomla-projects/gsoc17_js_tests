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

	describe('Treeselectmenu list of elements', function () {
		it('Should have the message in paragraph', function () {
			expect($('#treeselectmenu').html()).toContain('<p>treeselectmenu</p>');
		});
		it('Should have treeselect-item value correctly', function () {
			expect($('.treeselect').find('div.treeselect-item:first')).toEqual('#treeselect1')
		});
		it('Should add new span class', function () {
			expect($('.icon-')).toExist();
		});
	});

	describe('Treeselectmenu Expand/Collapse of a node', function () {
		beforeAll(function () {
			spyOnEvent('.select-toggle', 'click');
			$('span.select-toggle').trigger("click");
		});

		it('Should visible parent node', function () {
			expect($('.treeselect').parent().find('ul.select-sub:visible').count()).toBe(1);
		});
	});

});
