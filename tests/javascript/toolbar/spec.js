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

define(['jquery', 'testsRoot/toolbar/spec-setup', 'jasmineJquery'], function ($) {
	
	describe('Toolbar trigger DOMContentLoaded event', function () {
		
		var option = document.getElementById('toolbar-option'),
			help = document.getElementById('toolbar-help');
		
		beforeEach(function () {
			var contentLoadedEvent = document.createEvent("Event");
			contentLoadedEvent.initEvent("DOMContentLoaded", true, true);
			window.document.dispatchEvent(contentLoadedEvent);
		});
		
		it('Should have "toolbar-option" element Id', function () {
			
			expect(option).not.toBeNull();
		});
		it('Should have "toolbar-help" element Id', function () {
			expect(help).not.toBeNull();
		});
		it('Should add toolbarHelp class ml-auto to element', function () {
			setTimeout(function () {
				expect(help).toHaveClass('ml-auto');
			}, 100)
		});
		it('Should add toolbarOptions class ml-auto to element', function () {
			setTimeout(function () {
				expect(option).toHaveClass('ml-auto');
			}, 100)
		});
	});
	
	describe('Joomla.popupWindow method in toolbar', function () {
		
		beforeEach(function () {
			Joomla.popupWindow(toolbarvalue.mypage,toolbarvalue.myname,toolbarvalue.w,toolbarvalue.h,toolbarvalue.scroll);
			spyOnEvent(window, 'open');
		});
		
		it('Should have trigger window.open method', function () {
			expect(window.open(toolbarvalue.mypage,toolbarvalue.myname,toolbarvalue)).not.toBeNull();
		});
	});
});
