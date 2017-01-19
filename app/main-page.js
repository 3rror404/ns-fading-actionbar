var frameModule = require("ui/frame");

function onNavigatingTo(args) {

}
exports.onNavigatingTo = onNavigatingTo;

function onNavigatedTo(args) {

	/**
	 * ## Moved to navigatedTo
	 * If subpage scrollView is still scrolling when navigating back
	 * the animation will not take place 
	 */
    var page = args.object;

    if (page.ios) {
		var controller = frameModule.topmost().ios.controller;

		var navBar = controller.navigationBar;
		navBar.shadowImage = new UIImage();
		
		if (navBar.viewWithTag(17) !== null) {
			var myView = navBar.viewWithTag(17);

			UIView.animateWithDurationAnimations(0.3, () => {
				myView.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(1, 0.20, 0.20, 1);
			});	

		}
	}
}
exports.onNavigatedTo = onNavigatedTo;

exports.onTap = function() {
    frameModule.topmost().navigate("second-page");
}
