/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
Joomla = window.Joomla || {};

(function (Joomla) {
	document.addEventListener('DOMContentLoaded', function () {
		var treeselectmenu = document.querySelector("div#treeselectmenu").innerHTML;
		var treeselect = document.querySelectorAll('.treeselect li');

		var li, div, i;
		for (i = 0; i < treeselect.length; i++) {
			li = event.target;
			div = li.querySelector('div.treeselect-item');

			// Add icons
			treeselect[i].insertAdjacentHTML("beforebegin", "<span class='icon-'></span>");

			if (li.querySelectorAll('ul.treeselect-sub').length) {
				// Add classes to Expand/Collapse icons
				li.querySelector('span.icon-').classList.add('treeselect-toggle');
				li.querySelector('span.icon-').classList.add('fa-chevron-down');

				// Append drop down menu in nodes
				var element = div.querySelector('label');
				element.insertAdjacentHTML('afterend', treeselectmenu);

				if (!li.querySelectorAll('ul.treeselect-sub ul.treeselect-sub').length) {
					li.querySelector('div.treeselect-menu-expand').classList.remove();
				}
			}
		}
	});

	// Takes care of the Expand/Collapse of a node
	document.addEventListener('DOMContentLoaded', function () {
		var toggle = document.getElementsByName('span.treeselect-toggle');
		for (var i = 0; i < toggle.length; i++) {
			var element = toggle[i];
			element.addEventListener('click', function () {
				var i = event.target;

				// Take care of parent UL
				if (i.parentNode.querySelector('ul.treeselect-sub').offsetLeft > 0) {
					i.classList.remove('fa-chevron-down');
					i.classList.add('fa-chevron-right');
					i.parentNode.querySelector('ul.treeselect-sub').style.display = 'none';
					i.parentNode.querySelector('ul.treeselect-sub i.treeselect-toggle').classList.remove('fa-chevron-down');
					i.parentNode.querySelector('ul.treeselect-sub i.treeselect-toggle').classList.add('fa-chevron-right');
				} else {
					i.classList.remove('fa-chevron-right');
					i.classList.add('fa-chevron-down');
					i.parentNode.querySelector('ul.treeselect-sub').style.display = 'visible';
					i.parentNode.querySelector('ul.treeselect-sub i.treeselect-toggle').classList.remove('fa-chevron-right');
					i.parentNode.querySelector('ul.treeselect-sub i.treeselect-toggle').classList.add('fa-chevron-down');
				}
			});
		}
	});

	// Takes care of the filtering
	document.addEventListener('DOMContentLoaded', function () {
		var treeselectfilter = document.querySelectorAll('#treeselectfilter');

		treeselectfilter.forEach(function (filter) {
			filter.addEventListener('keyup', function () {
				var text = this.value.toLowerCase();
				var hidden = 0;
				var results = document.querySelectorAll("#noresultsfound");

				results.forEach(function (result) {
					result.style.display = 'none';
					var elements = document.querySelectorAll('.treeselect li');
					elements.forEach(function () {
						if (event.target.textContent.toLowerCase().indexOf(text) === -1) {
							document.getElementsByClassName('card-block')[1].style.display = 'none';
							hidden++;
						}
						else {
							document.getElementsByClassName('card-block')[1].style.display = 'visible';
						}
					});
				});

				var tar = document.querySelectorAll("#noresultsfound");
				tar.forEach(function (tar1) {
					if (hidden == tar1.length) {
						tar1.style.display = 'visible';
					}
				});

			});
		})
	});

	// Checks all checkboxes the tree
	document.addEventListener('DOMContentLoaded', function () {
		var treeCheckAll = document.querySelectorAll('treeCheckAll');

		treeCheckAll.forEach(function (treeCheck) {
			treeCheck.addEventListener('click', function () {
				document.getElementsByClassName('treeselect').getAttribute('input').checked = 'checked';
			});
		});
	});

	// Unchecks all checkboxes the tree
	document.addEventListener('DOMContentLoaded', function () {
		var treeUncheckAll = document.querySelectorAll('treeUncheckAll');

		treeUncheckAll.forEach(function (treeUncheck) {
			treeUncheck.addEventListener('click', function () {
				document.getElementsByClassName('treeselect').getAttribute('input').checked = 'checked';
			});
		});
	});

	// Checks all checkboxes the tree
	document.addEventListener('DOMContentLoaded', function () {
		var treeExpandAll = document.querySelectorAll('treeExpandAll');

		treeExpandAll.forEach(function (treeExpand) {
			treeExpand.addEventListener('click', function () {
				document.getElementsByClassName('ul.treeselect').getAttribute('ul.treeselect-sub').checked = 'checked';
				document.getElementsByClassName('ul.treeselect').getAttribute('i.treeselect-toggle').removeClass('fa-chevron-right').addClass('fa-chevron-down');
			});
		})
	});

	// Unchecks all checkboxes the tree
	document.addEventListener('DOMContentLoaded', function () {
		var treeCollapseAll = document.querySelectorAll('treeCollapseAll');

		treeCollapseAll.forEach(function (treeCollapse) {
			treeCollapse.addEventListener('click', function () {
				var treeselect = document.getElementsByClassName('treeselect');
				treeselect.querySelector('treeselect-sub').style.display = 'hide';
				treeselect.classList.remove('fa-chevron-down');
				treeselect.classList.add('fa-chevron-right');
			});
		});
	});
	
	// Take care of children check/uncheck all
	document.addEventListener('DOMContentLoaded', function () {
		var checkall = document.querySelectorAll('checkall');

		checkall.forEach(function (check) {
			check.addEventListener('click', function () {
				event.target.document.querySelectorAll('ul.treeselect-sub input')[5].setAttribute('checked', 'checked');
			});
		});
	});

	document.addEventListener('DOMContentLoaded', function () {
		var uncheckall = document.querySelectorAll('uncheckall');

		uncheckall.forEach(function (uncheck) {
			uncheck.addEventListener('click', function () {
				event.target.document.querySelectorAll('ul.treeselect-sub input')[5].setAttribute('checked', false);
			});
		});
	});

	// Take care of children toggle all
	document.addEventListener('DOMContentLoaded', function () {
		var expandall = document.querySelectorAll('expandall');

		expandall.forEach(function (expand) {
			expand.addEventListener('click', function () {
				var element = event.target.parentNode;
				var parent = document.querySelectorAll(element)[6];
				parent.querySelector('ul.treeselect-sub').style.display = 'visible';
				parent.querySelector('ul.treeselect-sub i.treeselect-toggle').classList.remove('fa-chevron-right').addClass('fa-chevron-down');
				parent.querySelector('ul.treeselect-sub i.treeselect-toggle').classList.addClass('fa-chevron-down');
			});
		});
	});

	document.addEventListener('DOMContentLoaded', function () {
		var collapseall = document.querySelectorAll('collapseall');

		collapseall.forEach(function (collapse) {
			collapse.addEventListener('click', function () {
				var element = event.target.parentNode;
				var parent = document.querySelectorAll(element)[6];
				parent.querySelector('li ul.treeselect-sub').style.display = 'none';
				parent.querySelector('li i.treeselect-toggle').classList.remove('fa-chevron-down').addClass('fa-chevron-right');
				parent.querySelector('li i.treeselect-toggle').classList.add('fa-chevron-right');
			});
		});
	});
})(Joomla);