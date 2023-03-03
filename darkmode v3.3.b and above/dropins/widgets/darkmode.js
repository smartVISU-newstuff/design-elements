/**
 * -----------------------------------------------------------------------------
 * @package     smartVISU
 * @author      raman
 * @copyright   2023
 * @license     GPL [http://www.gnu.de]
 *
 * when switching between light/dark mode:
 * - "jquery.mobile.icons" will be changed (black to white and vice versa)
 * - refresh of "basic.roundslider" and "device.rtrslider" to change inline color
 * -----------------------------------------------------------------------------
 */

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
	changeTheme(event.matches);
	refreshItems();
});

document.addEventListener("readystatechange", (event) => {
	if(event.target.readyState === "complete") {
		changeTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
	}
});

function changeTheme(isDark) {
	var styles = document.getElementsByTagName('head')[0].querySelectorAll('link[rel="stylesheet"]');
	var i = 0;
	[].forEach.call(styles, function (style) {
		if(isDark && style.href.indexOf('jquery.mobile.icons.min.css') !== -1) {
			var path = style.href.replace(/sw/gi, "ws");
			document.getElementsByTagName('head')[0].querySelectorAll('link[rel="stylesheet"]')[i].href = path;
		} else if(!isDark && style.href.indexOf('jquery.mobile.icons.min.css') !== -1) {
			var path = style.href.replace(/ws/gi, "sw");
			document.getElementsByTagName('head')[0].querySelectorAll('link[rel="stylesheet"]')[i].href = path;
		}
		i++;
	});
}

function refreshItems() {
	var items = document.querySelectorAll('.ui-page-active div[data-widget="basic.roundslider"], .ui-page-active div[data-widget="device.rtrslider"]');
	[].forEach.call(items, function (item) {
		var dataItem = item.attributes['data-item'].value.split(",");	
		if(dataItem.length > 0) {
			for (var i = 0; i < dataItem.length; i++) { 
				if(dataItem[i] !== '') {
					var val = widget.get(dataItem[i]);
					widget.update(dataItem[i], 0);
					widget.update(dataItem[i], val);
				}
			}
		} else {
			var val = widget.get(item.attributes['data-item'].value);
			widget.update(item.attributes['data-item'].value, 0);
			widget.update(item.attributes['data-item'].value, val);
		}
		
		var spans = item.querySelectorAll('span.rs-number');
		[].forEach.call(spans, function (span) {
			span.style['color'] = getComputedStyle(item)['color'];
		});
	});
}
