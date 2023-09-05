var storage = chrome.storage.local;

document.addEventListener('DOMContentLoaded', function() {
    const speedButtons = document.querySelectorAll('[data-speed]'); // Select all elements with data-speed attribute

    // Load the last selected button index from storage and set the active state
    storage.get(['lastSelectedIndex', 'selectedSpeed'], function(result) {
        const lastIndex = result.lastSelectedIndex; // Default to 3 if not found (3 is speed 1)
        const velocita = result.selectedSpeed || 1; // Default to 1x if not found
        if (lastIndex >= 0 && lastIndex < speedButtons.length) { //this is basically just checking if lastIndex is a valid number between the possible ones (0 to 8)
            speedButtons[lastIndex].classList.add('active');
        }
        chrome.storage.sync.set({ selectedSpeed: velocita });
        chrome.storage.sync.set({ lastSelectedIndex: lastIndex });
    });

    speedButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            //when a button is clicked, the active class is added to the clicked button, giving it the active state appearance. The active class is removed from all other buttons to ensure only one button is in the active state at a time.
            speedButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const speed = parseFloat(this.getAttribute('data-speed'));
            
            // Store the index and the speed of the clicked button in storage
            chrome.storage.sync.set({ selectedSpeed: speed });
            chrome.storage.sync.set({lastSelectedIndex: index});

            console.log(`Clicked on button at position ${index} with speed ${speed}x`);

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {method: "changeSpeed"});
            });
        });
    }, false);
}, false);