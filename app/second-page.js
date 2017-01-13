var frameModule = require("ui/frame");

exports.pageLoaded = function(args) {
    var page = args.object;

	if (page.ios) {

		var controller = frameModule.topmost().ios.controller;

		/**
		 * Make ActionBar background transparent
		 */
		var navBar = controller.navigationBar;
		navBar.shadowImage = new UIImage();
		navBar.setBackgroundImageForBarMetrics(new UIImage, UIBarMetrics.UIBarMetricsDefault);

		/**
		 * Add custom view to navBar
		 */
		var navBounds = navBar.bounds;
		var myView = UIView.alloc().init();
		myView.frame = {
			origin: { x: navBounds.origin.x, y: navBounds.origin.y - 20 },
			size: { width: navBounds.size.width, height: navBounds.size.height + 20 }
		};
		myView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
		navBar.addSubview(myView);

		navBar.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0.20, 0.20, 0.20, 0.0);
		navBar.sendSubviewToBack(myView);

		/**
		 * Fade in myView on scroll
		 */
		var scrollView = page.getViewById("scrollView");
		scrollView.on('scroll', function(args){
			var offset = args.object.verticalOffset;
			myView.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0.20, 0.20, 0.20, (offset-50)/50);
		});

	}
	
}


exports.tapGoBack = function() {
	frameModule.topmost().goBack();
}