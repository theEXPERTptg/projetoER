var webView = $.webView;
    var permissions = ['android.permission.CAMERA', 'android.permission.RECORD_AUDIO'];
    Ti.Android.requestPermissions(permissions, function(e) {
        if (e.success) {
        } else {
            alert('You need to grant camera and mic permissions to use video calling.');
        }
    });


webView.addEventListener('load', function() {
    var checkInterval = setInterval(function() {
        var result = webView.evalJS('currentPeerId');
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
    var result = webView.evalJS('startCall("' + friendId + '")');
    Ti.API.info("Result from evalJS: " + result);
});

