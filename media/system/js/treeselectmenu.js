/**
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
Joomla = window.Joomla || {};

(function(Joomla)
{
	var treeselectmenu = document.getElementById("treselectmenu");
	var treeselect = document.getElementsByClassName("treeselect");
	var element = treeselect.getElementsByTagName("li");

	element.forEach(function()
	{
		var li = event.target;
		var div = li.find('div.treeselect-item:first');
		var span = document.createElement("span");

		// Add icons
		li = document.createElement('span');
		li.className = "icon-";

		if (li.querySelector('ul.treeselect-sub').length) {
			// Add classes to Expand/Collapse icons
			li.querySelector('span.icon-').classList.add('treeselect-toggle fa-chevron-down');

			// Append drop down menu in nodes
			// $div.find('label:first').after(treeselectmenu);
			var element = div.querySelector('label:first');
			element.parentNode.insertBefore(treeselectmenu, element);

			if (!li.querySelector('ul.treeselect-sub ul.treeselect-sub').length) {
				li.querySelector('div.treeselect-menu-expand').classList.remove();
			}
		}
	});

	// Takes care of the Expand/Collapse of a node
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

	// Takes care of the filtering
	var treeselectfilter = document.getElementById('treeselectfilter');
	treeselectfilter.addEventListener('keyup', function()
	{
		var text = event.target.toLowerCase();
		var hidden = 0;
		document.getElementById('noresultsfound').style.display = 'none';
		var list_elements = document.getElementsByClassName('treeselect');
		var elements = list_elements.getElementsByTagName('li');
		elements.each(function()
		{
			if (event.target.toLowerCase().indexOf(text) == -1) {
				event.target.style.display = 'none';
				hidden++;
			}
			else {
				event.target.style.display = 'visible';
			}
		});
		if(hidden == list_elements.length)
		{
			event.target.style.display = 'visible';
		}
	});

	// Checks all checkboxes the tree
    document.getElementById('treeCheckAll').addEventListener( 'click', function(){
        document.getElementsByClassName('treeselect').getAttribute('input').checked = 'checked';
    });

	// Unchecks all checkboxes the tree
    document.getElementById('treeUncheckAll').addEventListener( 'click', function(){
        document.getElementsByClassName('treeselect').getAttribute('input').checked = 'checked';
    });

	// Checks all checkboxes the tree
    document.getElementById('treeExpandAll').addEventListener( 'click', function(){
        document.getElementsByClassName('ul.treeselect').getAttribute('ul.treeselect-sub').checked = 'checked';
        document.getElementsByClassName('ul.treeselect').getAttribute('i.treeselect-toggle').removeClass('fa-chevron-right').addClass('fa-chevron-down');
    });

	// Unchecks all checkboxes the tree
	document.getElementById('treeCollapseAll').click(function()
	{
		var treeselect = document.getElementsByClassName('treeselect');
		treeselect.querySelector('treeselect-sub').style.display = 'hide';
		treeselect.classList.remove('fa-chevron-down');
		treeselect.classList.add('fa-chevron-right');
	});
	// Take care of children check/uncheck all
	document.getElementsByClassName('checkall').addEventListener( 'click', function()
	{
		event.target.document.querySelectorAll('ul.treeselect-sub input')[5].setAttribute('checked', 'checked');
	});
	document.getElementsByClassName('uncheckall').addEventListener( 'click', function()
	{
		event.target.document.querySelectorAll('ul.treeselect-sub input')[5].setAttribute('checked', false);
	});

	// Take care of children toggle all
	document.getElementsByClassName('expandall').addEventListener( 'click', function()
	{
		var element =  event.target.parentNode;
		var parent = document.querySelectorAll(element)[6];
		parent.querySelector('ul.treeselect-sub').style.display = 'visible';
		parent.querySelector('ul.treeselect-sub i.treeselect-toggle').classList.remove('fa-chevron-right').addClass('fa-chevron-down');
		parent.querySelector('ul.treeselect-sub i.treeselect-toggle').classList.addClass('fa-chevron-down');
	});
	document.getElementsByClassName('collapseall').addEventListener( 'click', function()
	{
		var element =  event.target.parentNode;
		var parent = document.querySelectorAll(element)[6];
		parent.querySelector('li ul.treeselect-sub').style.display = 'none';
		parent.querySelector('li i.treeselect-toggle').classList.remove('fa-chevron-down').addClass('fa-chevron-right');
		parent.querySelector('li i.treeselect-toggle').classList.add('fa-chevron-right');
	});
})(Joomla);
