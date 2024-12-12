var webView = $.webView;
    var permissions = ['android.permission.CAMERA', 'android.permission.RECORD_AUDIO'];
    Ti.Android.requestPermissions(permissions, function(e) {
        if (e.success) {
            // proceed
        } else {
            alert('You need to grant camera and mic permissions to use video calling.');
        }
    });
webView.addEventListener('load', function() {
    // Wait until webView is loaded, then periodically check for currentPeerId
    var checkInterval = setInterval(function() {
        var result = webView.evalJS('currentPeerId');
        if (result && result !== 'null' && result !== '') {
            // Remove any extra quotes
            result = result.replace(/^"|"$/g, '');
            $.myPeerIdLabel.text = "Your Peer ID: " + result;
            clearInterval(checkInterval);
        }
    }, 1000);
});

$.callButton.addEventListener('click', function() {
    var friendId = $.peerIdField.value;
    if (!friendId) {
        alert("Please enter your friend's Peer ID");
        return;
    }
    webView.evalJS('startCall("' + friendId + '")');
});
