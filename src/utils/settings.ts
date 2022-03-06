export const default_settings: {
  [key: string]: string | boolean;
} = {
  position: "top",
  autoConnect: true,
  isExpanded: true,
  hideLeaderboard: true,
  disableBadges: false,
  disablePaints: false
};

const getSetting = (id: string) => {
  const value = localStorage.getItem(`42FM:settings:${id}`);
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
    if (key.startsWith("42FM:settings:")) {
      const keyWithoutPrefix = key.replace("42FM:settings:", "");
      settings[keyWithoutPrefix] = getSetting(keyWithoutPrefix);
    }
  }
  return settings;
};

export { getSetting, getSettings };
