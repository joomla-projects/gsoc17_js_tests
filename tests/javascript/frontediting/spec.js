/**
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 * @package     Joomla
 * @subpackage  JavaScript Tests
 * @since       3.7.0
 * @version     1.0.0
 */

define(['jquery', 'testsRoot/frontediting/spec-setup', 'jasmineJquery'], function ($) {

	describe('Frontediting jEditMakeAbsolute with argument true', function () {
		beforeAll(function () {
			$('.fr-ed-make-abs-true').jEditMakeAbsolute(true);
		});

		it('Should change style of all selected elements ', function () {
			var $elements = $('.fr-ed-make-abs-true');
			var $first = $elements.first();
			var $last = $elements.last();

			expect($first).toHaveCss({position: "absolute", marginLeft: '0px', marginTop: '0px'});
			expect($last).toHaveCss({position: "absolute", marginLeft: '0px', marginTop: '0px'});
		});

		it('Should detach all selected elements from jEditMakeAbsolute div', function () {
			expect($('#jEditMakeAbsolute')).not.toContainElement('.fr-ed-make-abs-true');
		});

		it('Should append all detached elements to body', function () {
			expect($('body>div.fr-ed-make-abs-true').length).toEqual(2);
		});
	});

	describe('Frontediting jEditMakeAbsolute with argument false', function () {
		beforeAll(function () {
			$('.fr-ed-make-abs-false').jEditMakeAbsolute(false);
		});

		it('Should change style of all selected elements ', function () {
			var $elements = $('.fr-ed-make-abs-false');
			var $first = $elements.first();
			var $last = $elements.last();

			expect($first).toHaveCss({position: "absolute", marginLeft: '0px', marginTop: '0px'});
			expect($last).toHaveCss({position: "absolute", marginLeft: '0px', marginTop: '0px'});
		});

		it('Should not detach any selected elements from jEditMakeAbsolute div', function () {
			expect($('#jEditMakeAbsolute')).toContainElement('.fr-ed-make-abs-false');
		});
	});
});