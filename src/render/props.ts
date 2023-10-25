import history from "./history";

export const getProps = ({ id, image, link, input, placeholder }) => {
  const result = {} as any;
  if (id !== undefined) result.id = id;
  // if (image) result.src = image;
  // if (link) result.href = link;
  if (placeholder) result.placeholder = placeholder;
  if (input) result.value = input;
  return result;
};

const allHovers = new Map();
history.listen(() => {
  for (const v of allHovers.values()) v();
  allHovers.clear();
});

export const getSetters = ({ hover, click, input }) => {
  const result = {} as any;
  if (hover?.__type === "signal" && hover?.set) {
    result.onmouseover = (e) => {
      allHovers.set(e.target, () => hover.set(false));
      hover.set(true);
    };
    result.onmouseleave = (e) => {
      allHovers.delete(e.target);
      hover.set(false);
    };
  }
  if (click?.__type === "signal" && click?.set) {
    result.onclick = (e) => {
      click.set({});
      e.stopPropagation();
    };
  }
  if (input?.__type === "signal" && input?.set) {
    result.oninput = (e) => input.set(e.target.value);
  }
  return result;
};
