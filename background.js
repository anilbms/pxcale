(function (){
    var isScaleActive = false;
    // Copyright (c) 2011 The Chromium Authors. All rights reserved.
    // Use of this source code is governed by a BSD-style license that can be
    // found in the LICENSE file.	
	// Called when the user clicks on the browser action.
	chrome.browserAction.onClicked.addListener(function(tab) {
	  // No tabs or host permissions needed!
	  console.log('Turning ' + tab.url + ' red!');
       if (!isScaleActive){
            isScaleActive = true;
            chrome.browserAction.setIcon({path:"icon19_selected.png"});
            chrome.tabs.executeScript(null, {file: "content_script.js"});
       }
       else {
        isScaleActive = false;
          chrome.browserAction.setIcon({path:"icon19.png"});
          chrome.tabs.executeScript(null, {file: "toggleContentScript.js"});
        }
	});
})();
