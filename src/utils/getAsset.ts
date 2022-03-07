import browser from "webextension-polyfill";

const getAsset = (assetName: string) => {
  return browser.runtime.getURL("../assets/" + assetName);
};

export default getAsset;
