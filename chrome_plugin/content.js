// content.js
const postDetails = {
    image: document.querySelector('article img')?.src,
    text: document.querySelector('article div[role="presentation"]')?.innerText,
    author: document.querySelector('a[title]')?.title,
    date: document.querySelector('time')?.getAttribute('datetime')
};

chrome.storage.local.set({ postDetails });