import { Logger } from "@/utils/log";
import { badgeOwners } from "../badges";
import { getSetting } from "@/utils/settings";
import { watchParentNode } from "@/utils/observer";
import { Attachable } from ".";

class DecorationsModule implements Attachable {
  private messagesContainer: Element;
  private messagesObserver?: MutationObserver;
  private elementObserver?: MutationObserver;
  private logger: Logger;

  constructor({ element }: { element: Element }) {
    this.messagesContainer = element;
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

          if (!getSetting("disablePaints")) {
            if (badgeOwner.paint && author) {
              author.classList.add("transparent42fm");
              author.classList.add(badgeOwner.paint);
            }
          }

          if (!getSetting("disableBadges")) {
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
