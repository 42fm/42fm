export const default_settings: {
  [key: string]: string | boolean;
} = {
  position: "top",
  autoConnect: true,
  isExpanded: true,
  hideLeaderboard: true,
  disableBadges: false,
  disablePaints: false,
};

const setSetting = (id: string, value: any) => {
  localStorage.setItem(`42fm:settings:${id}`, value);
};

const setSettings = (map: { [key: string]: any }) => {
  for (let key in map) {
    setSetting(key, map[key]);
  }
};

const getSetting = (id: string) => {
  const value = localStorage.getItem(`42fm:settings:${id}`);
  if (value === null) {
    return default_settings[id];
  }

  if (value === "true" || value === "false") {
    return value === "true";
  }

  return value;
};

const getSettings = () => {
  const items = { ...localStorage };

  let settings: { [key: string]: string | boolean } = { ...default_settings };

  for (let key in items) {
    if (key.startsWith("42fm:settings:")) {
      const keyWithoutPrefix = key.replace("42fm:settings:", "");
      settings[keyWithoutPrefix] = getSetting(keyWithoutPrefix);
    }
  }
  return settings;
};

export { getSetting, getSettings, setSetting };
