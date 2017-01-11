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
		navBar.setBackgroundImageForBarMetrics(new UIImage(), UIBarMetrics.UIBarMetricsDefault);

		/**
		 * Fade in ActionBar on scroll
		 */
		var scrollView = page.getViewById("scrollView");
		scrollView.on('scroll', function(args){
			var offset = args.object.verticalOffset;
			navBar.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0.20, 0.20, 0.20, (offset-50)/50);
		});
	}
	
}