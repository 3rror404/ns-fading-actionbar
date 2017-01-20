var frameModule = require("ui/frame");
var animation = require("ui/animation");
var colorModule = require("color");
var Color = colorModule.Color;

var allowActionBarAnimation = true;

exports.pageLoaded = function(args) {
    var page = args.object;

	if (page.ios) {

		var controller = frameModule.topmost().ios.controller;

		/**
		 * Make ActionBar background transparent
		 */
		var navBar = controller.navigationBar;

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
		allowActionBarAnimation = true;
		var scrollView = page.getViewById("scrollView");
		scrollView.on('scroll', function(args){
			console.log('allowActionBarAnimation ' + allowActionBarAnimation)
			if (allowActionBarAnimation == true) {
				var offset = args.object.verticalOffset;
				myView.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0.20, 0.20, 0.20, (offset-50)/50);
			}			
		});

	}
	
}

exports.navigatingFrom = function(args) {
	/**
	 * ## IMPORTANT: Stop color animation before nav back
	 */
	allowActionBarAnimation = false;

}

exports.tapGoBack = function() {
	frameModule.topmost().goBack();
}