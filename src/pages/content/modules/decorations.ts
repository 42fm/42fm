import { Logger } from "@/utils/log";
import { badgeOwners } from "../badges";
import { watchParentNode } from "@/utils/observer";
import { Attachable } from ".";
import { useSettingsStore, default_settings } from "../stores/settings";

class DecorationsModule implements Attachable {
  private messagesContainer: Element;
  private messagesObserver?: MutationObserver;
  private elementObserver?: MutationObserver;
  private logger: Logger;
  private disableBadges: boolean;
  private disablePaints: boolean;

  constructor({ element }: { element: Element }) {
    this.messagesContainer = element;

    this.disableBadges = default_settings.disableBadges;
    this.disablePaints = default_settings.disablePaints;

    useSettingsStore.subscribe(
      (settings) => (this.disableBadges = settings.disableBadges ?? default_settings.disableBadges),
    );
    useSettingsStore.subscribe(
      (settings) => (this.disablePaints = settings.disablePaints ?? default_settings.disablePaints),
    );

    this.logger = new Logger("DecorationsModule");
  }

  attach() {
    this.messagesObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          const line = node as Element;

          const badgeOwner = badgeOwners.find(
            (b) =>
              b.twitch_id === line.getAttribute("data-user-id") ||
              b.twitch_name === line.querySelector(".chat-author__display-name")?.getAttribute("data-a-user") ||
              b.twitch_id === line.querySelector(".chat-line__message")?.getAttribute("data-user-id") || // ffz
              b.twitch_name === line.querySelector(".chat-line__message")?.getAttribute("data-a-user"), // ffz
          );
          if (!badgeOwner) {
            continue;
          }

          const badgesFFZ: HTMLDivElement | null = line.querySelector(".chat-line__message--badges");
          const badgesTwitch: HTMLDivElement | null = line.querySelector(".chat-line__username-container");
          const author: HTMLSpanElement | null = line.querySelector(".chat-author__display-name");

          if (!this.disablePaints) {
            if (badgeOwner.paint && author) {
              author.classList.add("transparent42fm");
              author.classList.add(badgeOwner.paint);
            }
          }

          if (!this.disableBadges) {
            const clone = badgeOwner.badge.cloneNode();
            if (badgesFFZ !== null) {
              badgesFFZ.appendChild(clone);
            } else if (badgesTwitch) {
              badgesTwitch.firstChild?.appendChild(clone);
            }
          }
        }
      }
    });

    this.messagesObserver.observe(this.messagesContainer, { childList: true });
    this.logger?.info(`Started observer`);

    this.elementObserver = watchParentNode(this.messagesContainer, () => {
      this.detach();
    });
  }

  detach() {
    this.messagesObserver?.disconnect();
    this.elementObserver?.disconnect();
    this.logger?.info(`Stopped observer`);
  }
}

export { DecorationsModule };
