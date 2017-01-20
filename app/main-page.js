var frameModule = require("ui/frame");

function onNavigatingTo(args) {
	var page = args.object;

    if (page.ios) {
		/**
		 * Must initialise custom actionbar on first page.
		 * Can't use default styles anymore.
		 */
		var controller = frameModule.topmost().ios.controller;

		var navBar = controller.navigationBar;
		navBar.shadowImage = new UIImage();
		navBar.setBackgroundImageForBarMetrics(new UIImage, UIBarMetrics.UIBarMetricsDefault);
		
		var myView;
		var navBounds = navBar.bounds;

		if (navBar.viewWithTag(17) === null) {
			myView = UIView.alloc().init();
			myView.frame = {
				origin: { x: navBounds.origin.x, y: navBounds.origin.y - 20 },
				size: { width: navBounds.size.width, height: navBounds.size.height + 20 }
			};
			myView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
			myView.userInteractionEnabled = false;
			myView.tag = 17;
			navBar.addSubview(myView);

			navBar.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0, 0, 0, 0);
			navBar.sendSubviewToBack(myView);
			myView.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0.11, 0.65, 0.84, 1);
		} else {
			myView = navBar.viewWithTag(17);
			navBar.sendSubviewToBack(myView); // why is this required here?
			UIView.animateWithDurationAnimations(0.3, () => {
				myView.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0.11, 0.65, 0.84, 1);
			});		
		}
	}
}
exports.onNavigatingTo = onNavigatingTo;

function onNavigatedTo(args) {

}
exports.onNavigatedTo = onNavigatedTo;

exports.onTap = function() {
    frameModule.topmost().navigate("second-page");
}
