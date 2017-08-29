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

	describe('JMultiSelect with Event', function () {
		var spyEvent;

		beforeEach(function () {
			new Joomla.JMultiSelect('#checkbox-event form.test');
		});

		it('Should have trigger checkboxes clicked', function () {
			spyEvent = spyOnEvent('#multiselect-event1', 'click');
			$('#multiselect-event1').trigger( "click" );

			expect('click').toHaveBeenTriggeredOn('#multiselect-event1');
			expect(spyEvent).toHaveBeenTriggered();
		});

		it('Should have trigger shift key click in checkboxes', function () {
			spyEvent = spyOnEvent('#shift', 'click');
			spyEvent.shiftKey = true;

			$("#shift").trigger('click');
			expect(spyEvent).toHaveBeenTriggered();
		});
	});

	describe('JMultiSelect trigger DOMContentLoaded event', function () {

		var spyEvent;
		// Set up the script
		beforeEach(function () {

			new Joomla.JMultiSelect('#checkbox-load form.test');
			spyOnEvent('input[type="checkbox"]', 'click');
			var contentLoadedEvent = document.createEvent("Event");
			contentLoadedEvent.initEvent("DOMContentLoaded", true, true);
			window.document.dispatchEvent(contentLoadedEvent);

		});

		it('Should have "tr" element whose class name begins with "row"', function () {
			var rows = document.querySelectorAll('tr[class^="row"]');
			expect(rows).not.toBeNull();
		});
		it('Should have "tr" element whose class name begins with "row"', function () {
			var length = document.querySelectorAll('tr[class^="row"]').length;
			expect(length).toBeGreaterThan(0);
		});
		it('Should have trigger the click event of multiselect-row', function () {
			spyEvent = spyOnEvent('#multiselect-row', 'click');
			$('#multiselect-row').trigger("click");

			expect('click').toHaveBeenTriggeredOn('#multiselect-row');
			expect(spyEvent).toHaveBeenTriggered();
		});
		it('Should have "checkall-toggle" elements', function () {
			var checkallToggle = document.getElementsByName('checkall-toggle')[0];
			expect(checkallToggle).not.toBeNull();
		});
	});
});
