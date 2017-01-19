var frameModule = require("ui/frame");
var animation = require("ui/animation");
var colorModule = require("color");
var Color = colorModule.Color;

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
		 * Add custom view to navBar - if doesn't exist
		 */
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

			navBar.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0.20, 0.20, 0.20, 0.0);
			navBar.sendSubviewToBack(myView);
		} else {
			myView = navBar.viewWithTag(17);
			navBar.sendSubviewToBack(myView); // why is this required here?
			UIView.animateWithDurationAnimations(0.3, () => {
				myView.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0.20, 0.20, 0.20, 0.0);
			});		
		}
		
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

exports.navigatedFrom = function(args) {
	// var page = args.object;

    // if (page.ios) {
	// 	var controller = frameModule.topmost().ios.controller;

	// 	var navBar = controller.navigationBar;
	// 	var myView = navBar.viewWithTag(17);

	// 	UIView.animateWithDurationAnimations(0.3, () => {
	// 		myView.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(1, 0.20, 0.20, 1);
	// 	});	
	// }
}

exports.tapGoBack = function() {
	frameModule.topmost().goBack();
}