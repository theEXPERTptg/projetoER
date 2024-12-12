
function startCall() {
    const peerId = $.peerIdField.value;
    if (peerId) {
      $.webRTCView.evalJS(`callPeer('${peerId}')`);
    } else {
      alert("Enter a Peer ID first.");
    }
  }
  