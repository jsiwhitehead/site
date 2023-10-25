const getNumeric = (x) => (x && x < 1 ? `${x * 100}%` : `${x || 0}px`);

const directions = (v) => [
  v.values.top ?? v.items[0],
  v.values.right ?? v.items[3] ?? v.items[1] ?? v.items[0],
  v.values.bottom ?? v.items[2] ?? v.items[0],
  v.values.left ?? v.items[1] ?? v.items[0],
];

const borderDirections = (round) => {
  if (!round) return [0, 0, 0, 0];
  if (typeof round === "number") return [round, round, round, round];
  return [
    round.values.topLeft ??
      round.values.top ??
      round.values.left ??
      round.items[0],
    round.values.topRight ??
      round.values.top ??
      round.values.right ??
      round.items[3] ??
      round.items[1] ??
      round.items[0],
    round.values.bottomRight ??
      round.values.bottom ??
      round.values.right ??
      round.items[2] ??
      round.items[0],
    round.values.bottomLeft ??
      round.values.bottom ??
      round.values.left ??
      round.items[1] ??
      round.items[0],
  ];
};

export default (values, context) => {
  const result = {} as any;
  if (context.inline === "inline") {
    result.display = "inline";
  } else if (context.inline !== "wrap") {
    result.display = "flex";
    result.flexDirection = values.flow || "column";
    result.width = "100%";
  }
  if (context.inline === "wrap") {
    const gap = ((context.line - 1) * context.size) / 2;
    result.marginTop = `${-gap}px`;
    result.marginBottom = `${-gap}px`;
    result.minHeight = `${context.line * context.size}px`;
  }
  if (values.gap) {
    result.gap = `${values.gap}px`;
  }
  if (values.position) {
    result.alignItems = values.position;
  }

  if (values.font) result.fontFamily = values.font;
  if (context.size) result.fontSize = `${context.size}px`;
  if (context.line) result.lineHeight = context.line;
  if (values.bold !== undefined) {
    result.fontWeight = values.bold ? "bold" : "normal";
  }
  if (values.italic !== undefined) {
    result.fontStyle = values.italic ? "italic" : "normal";
  }
  if (values.underline) result.textDecoration = "underline";
  if (values.uppercase) result.textTransform = "uppercase";
  if (values.align) {
    if (values.align.includes("justify")) {
      result.textAlign = "justify";
      result.textAlignLast = values.align.slice(8);
    } else {
      result.textAlign = values.align;
    }
  }
  if (values.indent) result.textIndent = `${values.indent}px`;
  if (values.color) result.color = values.color;

  if (values.pad) {
    result.padding =
      typeof values.pad === "number"
        ? `${values.pad}px`
        : directions(values.pad)
            .map((x) => getNumeric(x))
            .join(" ");
  }
  if (values.fill) result.background = values.fill;
  if (values.round) {
    result.borderRadius = borderDirections(values.round)
      .map((x) => `${x || 0}px`)
      .join(" ");
  }
  if (values.width) {
    result.width = getNumeric(values.width);
    result.flexShrink = "0";
    result.flexGrow = "0";
  }
  if (values.maxWidth) {
    result.maxWidth = getNumeric(values.maxWidth);
  }

  Object.assign(result, values.style?.values || {});
  return result;
};

// const getFlow = ($flow) => {
//   const flow = resolve($flow, true);
//   if (!flow || flow === "inline") return {};
//   const items = flow ? (typeof flow === "object" ? flow.items : [flow]) : [];
//   const values = flow.values || {};
//   if (items.includes("grid")) {
//     return {
//       type: "grid",
//       widths: items.filter((v) => typeof v === "number" || v === "auto"),
//       gap: values.gap,
//     };
//   }
//   return {
//     type: "flow",
//     direction: items.find((v) => ["column", "row"].includes(v)),
//     gap: items.find((v) => typeof v === "number"),
//     align: items.find((v) => ["start", "end", "center"].includes(v)),
//   };
// };

// if (context.inline === "inline") {
//   if (result.display !== "inline-block") result.display = "inline";
// } else if (context.inline !== "wrap" && !flow.type) {
//   result.display = "flex";
//   result.flexDirection = "column";
// }
// if (flow.type === "flow") {
//   result.display = "flex";
//   result.flexDirection = "column";
//   result.gap = flow.gap && `${flow.gap}px`;
//   result.flexDirection = flow.direction || "column";
//   result.alignItems = ["start", "end"].includes(flow.align)
//     ? `flex-${flow.align}`
//     : flow.align || "stretch";
//   result.justifyContent = flow.align === "center" ? "center" : null;
// }
// if (flow.type === "grid") {
//   result.display = "grid";
//   result.gridTemplateColumns = flow.widths
//     .map((x) => (typeof x === "string" ? x : x <= 1 ? `${x}fr` : `${x}px`))
//     .join(" ");
//   result.gap = flow.gap && `${flow.gap}px`;
// }
// if (values.span) {
//   if (typeof values.span === "number") {
//     result.gridColumn = `span ${values.span}`;
//   } else {
//     const [column, row] = values.span.items;
//     result.gridColumn = `span ${column}`;
//     result.gridRow = `span ${row}`;
//   }
// }

// if (values.width) {
//   result.width =
//     typeof values.width === "string"
//       ? values.width
//       : values.width <= 1
//       ? `${values.width * 100}%`
//       : `${values.width}px`;
// }
// if (values.height) {
//   result.height =
//     values.height <= 1 ? `${values.height * 100}%` : `${values.height}px`;
// }
// if (values.maxWidth) {
//   result.maxWidth =
//     values.maxWidth <= 1
//       ? `${values.maxWidth * 100}%`
//       : `${values.maxWidth}px`;
//   result.marginLeft = "auto";
//   result.marginRight = "auto";
// }
// if (values.border) {
//   if (typeof values.border === "number") {
//     result.border = `${values.border}px solid black`;
//   } else {
//     result.borderWidth = directions(values.border)
//       .map((x) => `${x || 0}px`)
//       .join(" ");
//     result.borderStyle =
//       typeof (values.border.values.style || "solid") === "string"
//         ? values.border.values.style || "solid"
//         : directions(values.border.values.style).join(" ");
//     result.borderColor =
//       typeof (values.border.values.color || "black") === "string"
//         ? values.border.values.color || "black"
//         : directions(values.border.values.color).join(" ");
//   }
// }
// if (values.link || values.pointer || values.click !== undefined) {
//   result.cursor = "pointer";
//   // result.userSelect = "none";
// }
