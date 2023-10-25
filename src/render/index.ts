import { resolve } from "../maraca";

import history from "./history";
import { getProps, getSetters } from "./props";
import getStyle from "./style";

const onChanged = (prev, next, func) => {
  for (const key in { ...prev, ...next }) {
    if (next[key] !== prev) func(key, next[key], prev[key]);
  }
  return next;
};

const updateChildren = (node, children) => {
  if (
    node.childNodes.length !== children.length ||
    [...node.childNodes].some((c, i) => children[i] !== c)
  ) {
    node.replaceChildren(...children);
  }
};

const getTag = ($values) => {
  // if (resolve($values.image)) return "img";
  // if (resolve($values.link)) return "a";
  if ($values.input) return "input";
  return resolve($values.tag) || "div";
};

const getItems = (items, $values) => {
  const flow = resolve($values.flow);
  if ((flow && flow !== "inline") || resolve($values.gap)) {
    return items.map((x) =>
      typeof x === "number" || typeof x === "string"
        ? { __type: "block", values: {}, items: [x] }
        : x
    );
  }
  return items;
};

const getContext = ($values, items, context) => {
  return {
    size: resolve($values.size) || context.size,
    line: resolve($values.line) || context.line,
    inline: context.inline
      ? "inline"
      : resolve($values.flow) === "inline" ||
        (items.length > 0 &&
          items.some(
            (x) => typeof x === "number" || typeof x === "string"
            // resolve(x.values.input) !== undefined
          ))
      ? "wrap"
      : false,
  };
};

const updateNode = (effect, node, data, prevContext) => {
  if (!data && data !== 0) return null;

  if (typeof data === "number" || typeof data === "string") {
    const text = `${data}`;
    const next =
      node?.nodeName === "#text" ? node : document.createTextNode(text);
    next.textContent = text;
    return next;
  }

  // const flow = getFlow(data.values.flow);
  const tag = getTag(data.values);
  const items = getItems(
    data.items.map((d) => resolve(d)),
    data.values
  );
  const context = getContext(data.values, items, prevContext);
  const next =
    node?.nodeName.toLowerCase() === tag ? node : document.createElement(tag);

  effect(() => {
    const values = resolve(data.values, true);
    next.__props = onChanged(
      next.__props || {},
      { ...getProps(values), ...getSetters(data.values) },
      (k, v) => {
        if (k === "focus") {
          if (v) setTimeout(() => next.focus());
        } else {
          next[k] = v === null || v === undefined ? null : v;
        }
      }
    );
    next.__style = onChanged(
      next.__style || {},
      getStyle(values, context),
      (k, v) => {
        next.style[k] = v || null;
      }
    );
    if (history.location.hash && history.location.hash.slice(1) === next.id) {
      setTimeout(() => {
        const top = next.getBoundingClientRect().top;
        const navHeight = document
          .getElementById("nav")!
          .getBoundingClientRect().height;
        window.scrollBy(0, top - navHeight - 30);
        history.replace(history.location.pathname + history.location.search);
      });
    }
  });

  effect((effect) => {
    updateChildren(
      next,
      items
        .map((x, i) => updateNode(effect, next.childNodes[i], x, context))
        .filter((x) => x)
    );
  });

  return next;
};

export default (root, size = 16, line = 1.5) =>
  (effect, data) => {
    updateChildren(root, [
      updateNode(
        effect,
        root.childNodes[0],
        resolve(resolve(data).values.index),
        { size, line }
      ),
    ]);
  };
