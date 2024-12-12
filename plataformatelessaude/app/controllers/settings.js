var webView = $.webView;

webView.addEventListener('load', function() {
    // Wait until webView is loaded, then periodically check for currentPeerId
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
        alert("Please enter your friend's Peer ID");
        return;
    }
    webView.evalJS('startCall("' + friendId + '")');
});


