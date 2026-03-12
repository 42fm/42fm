import badgeBot from "../../assets/badge-bot.png";
import badgeContributor from "../../assets/badge-contributor.png";
import badgeDev from "../../assets/badge-dev.png";

export const badges: {
  [key: string]: {
    icon: string;
    tooltip: string;
  };
} = {
  dev: {
    icon: badgeDev,
    tooltip: "42FM Developer",
  },
  contributor: {
    icon: badgeContributor,
    tooltip: "42FM Contributor",
  },
  bot: {
    icon: badgeBot,
    tooltip: "42FM Bot",
  },
};

const createBadge = (name: string) => {
  const badgeElement = document.createElement("div");
  badgeElement.style.backgroundImage = `url(${badges[name].icon})`;
  badgeElement.setAttribute("class", "badge-42fm ffz-badge");
  badgeElement.setAttribute("data-42fm-badge-tooltip", badges[name].tooltip);
  return badgeElement;
};

export const badgeOwners = [
  {
    twitch_id: "36768120",
    twitch_name: "loczuk",
    badge: createBadge("dev"),
    paint: "goldDev",
  },
  {
    twitch_id: "217273053",
    twitch_name: "mat5son",
    badge: createBadge("contributor"),
  },
  {
    twitch_id: "96104648",
    twitch_name: "vcezv",
    badge: createBadge("contributor"),
  },
  {
    twitch_id: "38871352",
    twitch_name: "oneeyecat99",
    badge: createBadge("contributor"),
  },
  {
    twitch_id: "47930095",
    twitch_name: "syki_",
    badge: createBadge("contributor"),
  },
  {
    twitch_id: "773987717",
    twitch_name: "42fm",
    badge: createBadge("bot"),
    paint: "botPaint",
  },
];
