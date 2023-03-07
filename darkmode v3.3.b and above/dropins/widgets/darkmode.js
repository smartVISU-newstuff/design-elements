/**
 * -----------------------------------------------------------------------------
 * @package     smartVISU
 * @author      raman
 * @copyright   2023
 * @license     GPL [http://www.gnu.de]
 *
 * when switching between light/dark mode:
 * - "jquery.mobile.icons" will be changed (black to white and vice versa)
 * -----------------------------------------------------------------------------
 */

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
	changeTheme(event.matches);
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

