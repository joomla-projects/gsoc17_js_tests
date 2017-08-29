/**
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 * @package     Joomla
 * @subpackage  JavaScript Tests
 * @since       3.7.0
 * @version     1.0.0
 */

define(['jquery', 'text!testsRoot/frontediting/fixtures/fixture.html', 'libs/core', 'libs/frontediting'], function ($, fixture) {
	$('body').append(fixture);
});