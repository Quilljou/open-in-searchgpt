import browser from 'webextension-polyfill'

const PAGE_ID = "open-in-searchgpt";
const SELECTION_ID = "open-in-searchgpt-selection";
const SEARCH_URL = 'https://chatgpt.com/search';

browser.contextMenus.create({
  id: SELECTION_ID,
  title: 'SearchGPT "%s"',
  contexts: ['selection']
});

browser.contextMenus.create({
  id: PAGE_ID,
  title: 'Open SearchGPT',
  contexts: ['page', 'frame']
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === SELECTION_ID) {
    browser.tabs.create({ url: SEARCH_URL + `?q=${info.selectionText}` });
  } else if (info.menuItemId === PAGE_ID) {
    browser.tabs.create({ url: SEARCH_URL });
  }
});

browser.action.onClicked.addListener((tab) => {
  browser.tabs.create({ url: SEARCH_URL });
});
