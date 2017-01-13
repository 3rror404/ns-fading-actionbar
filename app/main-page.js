var frameModule = require("ui/frame");

function onNavigatingTo(args) {

    var page = args.object;

    if (page.ios) {
		var controller = frameModule.topmost().ios.controller;

		/**
		 * Return actionbar to default after being transaprent
		 */
		// var navBar = controller.navigationBar;
		// navBar.setBackgroundImageForBarMetrics(null, UIBarMetricsDefault);
        // navBar.shadowImage = null;

        // //navBar.translucent = false;
		// navBar.barTintColor = null;

	}
}
exports.onNavigatingTo = onNavigatingTo;

exports.onTap = function() {
    frameModule.topmost().navigate("second-page");
}
