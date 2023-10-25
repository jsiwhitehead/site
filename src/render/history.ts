import { createBrowserHistory, Action } from "history";

import { atom } from "../maraca";

export const history = createBrowserHistory();
const getUrlBlock = (location) => ({
  __type: "block",
  values: Object.fromEntries([
    ...(location.hash ? [["", location.hash.slice(1)]] : []),
    ...new URLSearchParams(location.search),
  ]),
  items: location.pathname.split(/\//g).filter((x) => x),
});
const url = atom(getUrlBlock(history.location), (v) => {
  let path = "/";
  path += v.items.join("/");
  if (Object.keys(v.values).filter((x) => x).length > 0) {
    path +=
      "?" +
      Object.keys(v.values)
        .filter((x) => x)
        .map((k) => `${k}=${v.values[k]}`)
        .join("&");
  }
  if (v.values[""] !== undefined) {
    path += "#" + v.values[""];
  }
  if (path !== location.pathname + location.search + location.hash) {
    history.push(path);
  }
  return v;
});

history.listen(({ action, location }) => {
  url.set(getUrlBlock(location));
  if (history.location.hash) {
    setTimeout(() => {
      const elem = document.getElementById(history.location.hash.slice(1));
      if (elem) {
        const top = elem.getBoundingClientRect().top;
        const navHeight = document
          .getElementById("nav")!
          .getBoundingClientRect().height;
        window.scrollBy(0, top - navHeight - 30);
      }
    });
  } else if (action === Action.Push) {
    setTimeout(() => {
      window.scroll(0, 0);
    });
  }
});
document.addEventListener("click", (e: any) => {
  if (!e.metaKey) {
    const origin = e.target.closest("a");
    if (
      origin &&
      origin.role !== "button" &&
      origin.host === window.location.host
    ) {
      e.preventDefault();
      history.push(origin.href);
    }
  }
});

export default history;
