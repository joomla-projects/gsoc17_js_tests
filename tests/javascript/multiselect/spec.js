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

	describe('JCaption applied to single image', function () {
		var form = document.getElementById('adminForm');
		// Set up the script
		beforeAll(function () {

			spyOnEvent('#adminForm', 'submit');
			new Joomla.JMultiSelect(form);
		});

		it('Should have checkbox element', function () {
			expect($('#adminForm')).toContainElement('input[type="checkbox"]');
		});
	});

});
