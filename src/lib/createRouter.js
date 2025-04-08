import { createObserver } from "./createObserver";

const BASE_PATH = import.meta.env.VITE_BASE_PATH || "/";

export const createRouter = (routes) => {
  const { subscribe, notify } = createObserver();

  const getPath = () => {
    const basePathname = BASE_PATH?.replace(/\/$/, "") || "/";
    return window.location.pathname?.replace(basePathname, "") || "/";
  };

  /**
   * Returns the component for the current path after BASE_PATH removal
   */
  const getTarget = () => routes[getPath()];

  const push = (path) => {
    const newPath = `${BASE_PATH}${path?.replace(/\/$/, "")}`;
    window.history.pushState(null, null, newPath);
    notify();
  };

  window.addEventListener("popstate", () => notify());

  return {
    get path() {
      return getPath();
    },
    push,
    subscribe,
    getTarget,
  };
};
