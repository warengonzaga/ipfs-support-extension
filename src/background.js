chrome.runtime.onMessage.addListener(function(message, sender, response) {
    if (message.ipfsURL) {
        const queryParam = sender.tab.url.split("?")[1];
        const urlParams = new URLSearchParams(queryParam);
        const ipfsValue = urlParams.get("q");
        // hardcode for now but will support more public gateway
        const ipfsGateway = "https://gateway.ipfscdn.io/ipfs/";
        const ipfsCID = ipfsValue.slice(7);
        const redirectURL = ipfsGateway + ipfsCID;
        
        // redirect
        chrome.tabs.update(sender.tab.id, {url: redirectURL})     
        
        // debug
        console.log("IPFS native URL detected via google search.");
        console.log("IPFS Native URL: " + ipfsValue);
        console.log("IPFS CID: " + ipfsCID);
        console.log("Redirect URL: " + sender.tab.url);
    }
});