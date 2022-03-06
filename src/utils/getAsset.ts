var browser = require("webextension-polyfill/dist/browser-polyfill.min");

const getAsset = (assetName: string) => {
  return browser.runtime.getURL("../assets/" + assetName);
};


export default getAsset;
