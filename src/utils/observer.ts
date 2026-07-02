function createCallback(element: Element, callback: (element: Element) => void) {
  const detachCallback = (mutations: MutationRecord[], observer: MutationObserver) => {
    for (const mutation of mutations) {
      for (const removed of mutation.removedNodes) {
        if (removed === element || removed.contains(element)) {
          observer.disconnect();
          callback(element);
          return;
        }
      }
    }
  };
  return detachCallback;
}

/**
 * Watches the `#root` and calls back when the node is removed
 */
function watchParentNode(element: Element, callback: (element: Element) => void) {
  const observer = new MutationObserver(createCallback(element, callback));

  observer.observe(document.body.querySelector("#root")!, { childList: true, subtree: true });

  return observer;
}

function waitForNodeWithID(id: string, callback: (element: Element) => void) {
  const observer = new MutationObserver((mutations, observer) => {
    const element = document.getElementById(id);
    if (element) {
      callback(element);
    }
  });

  observer.observe(document.body.querySelector("#root")!, { childList: true, subtree: true });

  setTimeout(() => {
    observer.disconnect();
  }, 2000);

  return observer;
}

function waitElementID(
  id: string,
  options: { target?: Element; signal: AbortSignal } = { signal: AbortSignal.timeout(5000) },
) {
  return new Promise<Element>((resolve, reject) => {
    const element = document.getElementById(id);
    if (element) {
      resolve(element);
    }

    const observer = new MutationObserver((mutations, observer) => {
      const element = document.getElementById(id);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    options.signal.addEventListener("abort", () => {
      observer.disconnect();
      reject("wait for element timeout exceeded");
    });

    observer.observe(options?.target ?? document.getElementById("root")!, { childList: true, subtree: true });
  });
}

function waitElement(query: string, options: { target: Element; signal?: AbortSignal }) {
  return new Promise<Element>((resolve, reject) => {
    const element = options.target.querySelector(query);
    if (element) {
      resolve(element);
    }

    const observer = new MutationObserver((_, observer) => {
      const element = options.target.querySelector(query);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    const signal = options.signal ?? AbortSignal.timeout(5000);

    signal.addEventListener("abort", () => {
      observer.disconnect();
      reject("wait for element timeout exceeded");
    });

    observer.observe(options.target, { childList: true, subtree: true });
  });
}

export { watchParentNode, waitForNodeWithID, waitElementID, waitElement };
