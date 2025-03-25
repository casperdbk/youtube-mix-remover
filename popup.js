document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const status = document.getElementById('status');

  chrome.storage.local.get(['extensionEnabled'], function(result) {
    if (result.extensionEnabled === false) {
      toggleButton.textContent = 'Enable Extension';
      status.textContent = 'Youtube URL Remover is inactive';
    } else {
      toggleButton.textContent = 'Disable Extension';
      status.textContent = 'Youtube URL Remover is active';
    }
  });

  toggleButton.addEventListener('click', function() {
    chrome.storage.local.get(['extensionEnabled'], function(result) {
      const newState = !result.extensionEnabled;
      chrome.storage.local.set({ extensionEnabled: newState }, function() {
        if (newState) {
            toggleButton.textContent = "Disable extension";
            status.textContent = 'Youtube URL Remover is active';
        }
        else {
            toggleButton.textContent = "Enable extension";
            status.textContent = 'Youtube URL Remover is inactive';
        }
      });
    });
  });
});