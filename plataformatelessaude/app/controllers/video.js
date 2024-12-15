var permissions = ['android.permission.CAMERA', 'android.permission.RECORD_AUDIO'];
Ti.Android.requestPermissions(permissions, function(e) {
    if (!e.success) {
        alert('You need to grant camera and mic permissions to use video calling.');
    }
});

// Once your layout is ready:
var webView = $.webView;

// Require the helper and set the WebView client AFTER webView is created
webView.addEventListener('load', function() {
    var checkInterval = setInterval(function() {
        var result = webView.evalJS('currentPeerId');
        Ti.API.info("currentPeerId: " + result);
        if (result && result !== 'null' && result !== '') {
            result = result.replace(/^"|"$/g, '');
            $.myPeerIdLabel.text = "Your Peer ID: " + result;
            clearInterval(checkInterval);
        }
    }, 1000);
});

$.callButton.addEventListener('click', function() {
    var friendId = $.peerIdField.value;
    if (!friendId) {
        alert("No ID provided.");
        return;
    }
    webView.evalJS('startCall("' + friendId + '")');
});


