chrome.action.onClicked.addListener(() => createTab());

function createTab() {
  chrome.tabs.create({
    url: chrome.runtime.getURL("./view/page.html"),
  });
}
