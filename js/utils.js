// Убирание скролла
const body = document.body;
const allDocumentHeight = document.documentElement.scrollHeight;
const visibleDocumentHeight = document.documentElement.clientHeight;
let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;
div.remove();

export const band = () => {
  if (allDocumentHeight > visibleDocumentHeight) {
    return body.style.cssText = `overflow: hidden; margin-right: ${scrollWidth}px;`;
  }
};

export const band2 = () => {
  if (allDocumentHeight > visibleDocumentHeight) {
    return body.style.cssText = `overflow: ; margin-right: `;
  }
};

// localStorage
export const getLoacalStorage = key => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const setLocalStorage = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
};