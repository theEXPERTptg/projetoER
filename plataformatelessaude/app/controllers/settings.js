function callPeer() {
    const peerId = $.peerIdField.value.trim();
  
    if (peerId) {
      // Send the Peer ID to the WebView
      $.webRTCView.evalJS(`callPeer('${peerId}')`);
    } else {
      alert("Please enter a valid Peer ID.");
    }
  }
 function webViewLoaded(e) {
    // Ask for the Peer ID from the WebView
    $.webRTCView.evalJS("peer.id", function(peerId) {
      alert("Your Peer ID is: " + peerId);
    });
  }
  
  $.webRTCView.addEventListener("load", webViewLoaded);


