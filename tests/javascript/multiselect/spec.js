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

define(['jquery', 'testsRoot/multiselect/spec-setup', 'jasmineJquery'], function ($) {

	describe('JMultiSelect applied to single form', function () {

		// Set up the script
		beforeAll(function () {
			new Joomla.JMultiSelect('#single-form form.test');
		});

		it('Should have form element', function () {
			expect($('#single-form')).toContainElement('form');
		});

		it('Should not have multiple form element', function () {
			var ele = document.querySelectorAll('#single-form form').length;
			expect(ele).not.toBeGreaterThan(1);
		});
	});

	describe('JMultiSelect with multiple checkboxes', function () {

		// Set up the script
		beforeAll(function () {
			new Joomla.JMultiSelect('#checkbox form.test');
		});

		it('Should have checkboxes', function () {
			expect($('#checkbox')).toContainElement('input[type="checkbox"]');
		});

		it('Should have multiple checkboxes elements', function () {
			var ele = document.querySelectorAll('#checkbox input[type="checkbox"]').length;
			expect(ele).toBeGreaterThan(1);
		});
	});
});
