var storage = chrome.storage.local;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if(request.method == "changeSpeed"){
        chrome.storage.sync.get(['selectedSpeed'], function(result) {
          const selectedSpeed = result.selectedSpeed; 
          setVideoSpeed(selectedSpeed);
        });
      };
  } 
);
        
function setVideoSpeed(selectedSpeed) {
  document.getElementsByTagName("video")[0].playbackRate= selectedSpeed;
  sendResponse({text: document.body.innerText, method: "changeSpeed"}); //same as innerText
};