var frameModule = require("ui/frame");

function onNavigatingTo(args) {

    var page = args.object;
}
exports.onNavigatingTo = onNavigatingTo;

exports.onTap = function() {
    frameModule.topmost().navigate("second-page");
}
