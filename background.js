const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+|(?:v|e(?:mbed)?)\/\S+|watch\?v=([^\/\n\s]+))|youtu\.be\/(\S+))/;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && youtubeRegex.test(changeInfo.url)) {
    chrome.storage.local.get(['extensionEnabled'], function(result) {
      if (result.extensionEnabled === false) {
        return;
      }

      try {
        const urlObj = new URL(changeInfo.url);

        if (urlObj.searchParams.has('list')) {
          urlObj.searchParams.delete('list');
        }

        if (urlObj.searchParams.has('start_radio')) {
          urlObj.searchParams.delete('start_radio');
        }

        const cleanedUrl = urlObj.toString();
        chrome.tabs.update(tabId, { url: cleanedUrl });
      } catch (error) {
        console.error('Error when parsing URL:', error);
      }
    });
  }
});