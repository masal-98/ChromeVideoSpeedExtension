var storage = chrome.storage.local;
//storage.set({ selectedSpeed: 1});

// Add event listener to the document to listen for message from poput telling contentScript that popup has been updated (speed has been chosen)
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

// Add event listener to the document to listen for keydown events
window.addEventListener('keydown', vidCtrl);

////////////////////////////////////////////////////////functions
//f to control playback rate
function setVideoSpeed(selectedSpeed) {
  document.getElementsByTagName("video")[0].playbackRate= selectedSpeed;
  sendResponse({text: document.body.innerText, method: "changeSpeed"}); //same as innerText
};

//f to control arrows
function vidCtrl(e) {
  const vid = document.querySelector('video');
  const key = e.code;

  if (key === 'ArrowLeft') {
    chrome.storage.sync.get(['selectedSpeed'], function(result) {
      const selectedSpeed = result.selectedSpeed;
      vid.currentTime = vid.currentTime+5-5*selectedSpeed; //if you dont put +-5 as an absolute term then the n seconds up or down are just gonna get added to the default +-5 seconds of youtube rewind when pressing the arrow keys
    
    if (vid.currentTime < 0) {
      vid.pause();
      vid.currentTime = 0;
    }
  });
  } else if (key === 'ArrowRight') {
    chrome.storage.sync.get(['selectedSpeed'], function(result) {
      const selectedSpeed = result.selectedSpeed;
      vid.currentTime = vid.currentTime-5+5*selectedSpeed; 

      /*if (vid.currentTime > vid.duration) {
      vid.pause();
      vid.currentTime = vid.duration;
      }*/
    });
  } 
}