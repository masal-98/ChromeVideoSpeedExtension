var storage = chrome.storage.local;

document.addEventListener('DOMContentLoaded', function() {
    const speedButtons = document.querySelectorAll('[data-speed]'); // Select all elements with data-speed attribute
    speedButtons.forEach(button => {
        button.addEventListener('click', function () {
            //when a button is clicked, the active class is added to the clicked button, giving it the active state appearance. The active class is removed from all other buttons to ensure only one button is in the active state at a time.
            //speedButtons.forEach(btn => btn.classList.remove('active'));
            //this.classList.add('active');

            const speed = parseFloat(this.getAttribute('data-speed'));
            //console.log(`Selected playback speed: ${speed}`);
            chrome.storage.sync.set({ selectedSpeed: speed });

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {method: "changeSpeed"});
            });
        });
    }, false);
}, false);