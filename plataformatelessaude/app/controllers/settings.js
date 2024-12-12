var webView = $.webView;

webView.addEventListener('load', function() {
    // Poll for the peer ID every second until we have it
    var checkInterval = setInterval(function() {
        var result = webView.evalJS('currentPeerId');
        // evalJS returns a string. If it's 'null' or empty, we don't have an ID yet.
        if (result && result !== 'null' && result !== '') {
            // result might be quoted. Just trim quotes if present.
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
    // Initiate the call in the WebView
    webView.evalJS('startCall("' + friendId + '")');
});

