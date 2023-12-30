const numbers = [
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
  "thirty",
  "fourty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
  "hundred",
  "thousand",
];
const isNumeric = (word) => word.split("‑").every((w) => numbers.includes(w));

const wordMap = {};
const addWordMap = (key, word, prev, next) => {
  if (!wordMap[key]) wordMap[key] = new Set();
  wordMap[key].add(
    prev[0] +
      " " +
      next[0] +
      "|" +
      [...prev.slice(0, 2).reverse(), word, ...next.slice(0, 2)].join(" ")
  );
};
setTimeout(() => {
  for (const key of Object.keys(wordMap).sort()) {
    console.log(key);
    [...wordMap[key]].sort().forEach((r) => console.log(r));
  }
});

export default (wordCap, prevCap, nextCap) => {
  const word = wordCap.toLowerCase();
  if (word === "just") {
    const prev = prevCap.map((x) => x.toLowerCase());
    const next = nextCap.map((x) => x.toLowerCase());
    if (!prev[0] && !next[0]) return "just";
    if (!next[0]) return "just";
    if (
      [
        "govern",
        "king",
        "law",
        "world",
        "relation",
        "deserts",
        "means",
        "legislation",
        "societ",
        "ministers",
        "degrees",
        "tribute",
        "copartnership",
        "distribution",
        "administration",
        "system",
        "authority",
        "witnesses",
        "rights",
        "power",
        "reward",
        "treatment",
      ].some((x) => next[0].startsWith(x))
    ) {
      return "just";
    }
    if (next[0] === "and") return "just";
    if (!prev[0]) return "jus";
    if (next[0] === "as") return "jus";
    if (
      ["had", "have", "has", "hath", "would", "will", "must"].includes(prev[0])
    ) {
      return "jus";
    }
    if (["a", "an", "the"].includes(prev[0])) return "just";
    if (["a", "an", "the"].includes(next[0])) return "jus";
    if (next[0].endsWith("ed")) return "jus";
    if (next[0].endsWith("ing") && !["king", "something"].includes(next[0])) {
      return "jus";
    }
    if (isNumeric(next[0])) return "jus";
    if (prev[0] === "and") return "just";
    if (next[0] === "or") return "just";
    if (["equally", "infinitely"].includes(prev[0])) return "just";
    if (
      [
        "every just one bears",
        "is it just to demand",
        "is neither just nor lawful",
        "it be just if he",
        "thee o just one",
        "assuredly be just in thy",
        "assuredly no just man can",
      ].includes(
        [...prev.slice(0, 2).reverse(), word, ...next.slice(0, 2)].join(" ")
      )
    ) {
      return "just";
    }
    return "jus";
  }
  if (word === "utter") {
    const prev = prevCap.map((x) => x.toLowerCase());
    const next = nextCap.map((x) => x.toLowerCase());
    if (!prev[0] && !next[0]) return "utt";
    if (
      [
        "an",
        "in",
        "the",
        "is",
        "his",
        "my",
        "this",
        "was",
        "of",
        "with",
        "into",
      ].includes(prev[0])
    ) {
      return "utterly";
    }
    if (
      [
        "a",
        "the",
        "no",
        "not",
        "their",
        "that",
        "this",
        "thy",
        "these",
        "such",
        "only",
        "in",
        "is",
        "but",
        "what",
        "his",
        "naught",
        "on",
        "one",
        "why",
        "its",
        "amidst",
        "any",
        "those",
        "for",
        "your",
        "about",
        "can",
        "hereafter",
      ].includes(next[0])
    ) {
      return "utt";
    }
    if (["they", "he", "she", "ye", "you"].includes(prev[0])) {
      return "utt";
    }
    if (!next[0]) {
      return "utt";
    }
    if (
      [
        "prais",
        "calumn",
        "word",
        "cries",
        "cry",
        "denunciations",
        "slander",
      ].some((x) => next.slice(0, 2).some((y) => y.startsWith(x)))
    ) {
      return "utt";
    }
    return "utterly";
  }
  if (word === "will") {
    const prev = prevCap.map((x) => x.toLowerCase());
    const next = nextCap.map((x) => x.toLowerCase());
    if (!prev[0] && !next[0]) return "will";
    if (next[1] === "testament") {
      return "will";
    }
    if (
      [
        "i",
        "it",
        "they",
        "he",
        "she",
        "ye",
        "you",
        "we",
        "but",
        "which",
        "that",
        "whoso",
      ].includes(prev[0])
    ) {
      return "willl";
    }
    if (
      [
        "a",
        "the",
        "thy",
        "your",
        "her",
        "his",
        "their",
        "our",
        "whose",
        "no",
        "own",
        "my",
        "at",
        "of",
      ].includes(prev[0])
    ) {
      return "will";
    }
    if (
      [
        "be",
        "never",
        "have",
        "not",
        "then",
        "also",
        "ensure",
        "it",
        "enhance",
        "likewise",
        "as",
        "became",
      ].includes(next[0])
    ) {
      return "willl";
    }
    if (
      ["is", "and", "are", "shall", "may", "can", "nor", "or"].includes(next[0])
    ) {
      return "will";
    }
    if (next[0] === "to" && next[1] !== "a") {
      return "will";
    }
    if (!prev[0]) return "willl";
    if (prev[0].endsWith("’s")) return "will";
    if (
      [
        "adamantine",
        "authentic",
        "capricious",
        "collective",
        "combined",
        "common",
        "compelling",
        "consultative",
        "divine",
        "embracing",
        "eternal",
        "exalted",
        "express",
        "free",
        "good",
        "holy",
        "human",
        "ill",
        "immutable",
        "indomitable",
        "inscrutable",
        "invincible",
        "irresistible",
        "irrevocable",
        "mighty",
        "moral",
        "omnipotent",
        "personal",
        "pervading",
        "pervasive",
        "political",
        "potent",
        "primal",
        "resolute",
        "sacred",
        "single",
        "sovereign",
        "superior",
        "ultimate",
        "unfolding",
        "united",
        "unrestrained",
        "unsubduable",
        "wholehearted",
      ].includes(prev[0])
    ) {
      return "will";
    }
    return "willl";
  }
  if (word === "might") {
    const prev = prevCap.map((x) => x.toLowerCase());
    const next = nextCap.map((x) => x.toLowerCase());
    if (!prev[0] && !next[0]) return "might";
    if (prev[0] && prev[0].endsWith("’s")) return "might";
    if (
      [
        "is",
        "a",
        "the",
        "his",
        "her",
        "my",
        "of",
        "or",
        "own",
        "such",
        "to",
        "its",
        "your",
        "their",
        "whose",
        "thy",
        "our",
        "with",
        "into",
      ].includes(prev[0])
    ) {
      return "might";
    }
    if (
      [
        "absolute",
        "ancient",
        "bodily",
        "celestial",
        "compelling",
        "conquering",
        "consummate",
        "divine",
        "dreadful",
        "effective",
        "eternal",
        "everlasting",
        "exalted",
        "glorious",
        "great",
        "inherent",
        "invincible",
        "masculine",
        "military",
        "omnipotent",
        "outward",
        "overpowering",
        "overwhelming",
        "penetrating",
        "perfect",
        "resistless",
        "resplendent",
        "sovereign",
        "spiritual",
        "stupendous",
        "subduing",
        "supernal",
        "terrible",
        "transcendent",
        "triumphant",
        "undefeatable",
        "utmost",
        "valiant",
        "vehement",
      ].includes(prev[0]) &&
      next[0] !== "be"
    ) {
      return "might";
    }
    if (next[0] === "and") return "might";
    if (prev[0] === "and" && prev[1]) return "might";
    return "migh";
  }
  if (word === "kind") {
    const prev = prevCap.map((x) => x.toLowerCase());
    const next = nextCap.map((x) => x.toLowerCase());
    if (!prev[0] && !next[0]) return "kind";
    if (
      [
        "another",
        "any",
        "every",
        "fellow",
        "native",
        "first",
        "second",
        "third",
        "fourth",
        "fifth",
        "one",
        "in",
        "its",
        "each",
        "his",
        "human",
        "man",
        "of",
        "own",
        "or",
        "particular",
        "related",
        "same",
        "similar",
        "single",
        "special",
        "their",
        "what",
      ].includes(prev[0]) &&
      !["protector", "beloved"].includes(next[0])
    ) {
      return "kinds";
    }
    if (
      ["race", "species", "of"].includes(prev[1]) &&
      !["friends", "lord", "beloved"].includes(next[0])
    ) {
      return "kinds";
    }
    if (["of"].includes(next[0])) return "kinds";
    if (prev[1] === "the" && prev[0] === "other") return "kinds";
    return "kind";
  }
  if (word === "art") {
    const prev = prevCap.map((x) => x.toLowerCase());
    const next = nextCap.map((x) => x.toLowerCase());
    if (!prev[0] && !next[0]) return "art";
    if (["thou", "who"].includes(prev[0])) return "artt";
    if (["thou", "thy", "the", "my"].includes(next[0])) return "artt";
    if (
      [
        "of",
        "an",
        "at",
        "baha’i",
        "every",
        "folk",
        "in",
        "one’s",
        "the",
        "thine",
        "to",
        "healing",
      ].includes(prev[0])
    ) {
      return "art";
    }
    if (!next[0] && prev[0] !== "which") return "art";
    if (
      [
        "is",
        "has",
        "and",
        "as",
        "can",
        "were",
        "work",
        "prints",
        "objects",
        "grows",
      ].includes(next[0])
    ) {
      return "art";
    }
    if (["highly", "science"].includes(prev[1])) return "art";
    return "artt";
  }
  if (word === "wise") {
    const prev = prevCap.map((x) => x.toLowerCase());
    const next = nextCap.map((x) => x.toLowerCase());
    if (!prev[0] && !next[0]) return "wise";
    if (prev[0] === "stephen") return "*wise";
    if (
      prev[1] === "in" &&
      ["no", "such", "this"].includes(prev[0]) &&
      next[0] !== "religion"
    ) {
      return "wisee";
    }
    return "wise";
  }
  if (word === "long") {
    const prev = prevCap.map((x) => x.toLowerCase());
    const next = nextCap.map((x) => x.toLowerCase());
    if (!prev[0] && !next[0]) return "long";
    if (prev[0] && prev[0].startsWith("long‑")) return "longer";
    if (prev[0] === "they" || prev[1] === "labour") return "long";
    if (
      ["at", "for", "that", "to", "with", "ye"].includes(next[0]) &&
      !["so", "too"].includes(prev[0])
    ) {
      return "long";
    }
    return "longer";
  }
  if (word === "rest") {
    const prev = prevCap.map((x) => x.toLowerCase());
    const next = nextCap.map((x) => x.toLowerCase());
    if (!prev[0] && !next[0]) return "rest";
    if (
      ["bones", "forgotten", "gone", "laid"].includes(prev[1]) ||
      (next[0] === "in" && next[1] === "peace") ||
      (prev[1] === "their" && prev[0] === "everlasting") ||
      (prev[1] === "may" && prev[0] === "he") ||
      (prev[1] === "to" && prev[0] === "his") ||
      (prev[1] === "come" && prev[0] === "to" && !next[0])
    ) {
      return "restlie";
    }
    if (
      [
        "and",
        "by",
        "for",
        "in",
        "nor",
        "not",
        "or",
        "at",
        "whilst",
        "within",
        "house",
        "neither",
        "beneath",
      ].includes(next[0]) &&
      !["matter"].includes(prev[0]) &&
      !["diffusing"].includes(next[1])
    ) {
      return "rest";
    }
    if (prev[0] === "and" && prev[1]) return "rest";
    if (prev[0] && prev[0].endsWith("’s")) return "rest";
    if (
      [
        "abiding",
        "any",
        "at",
        "brief",
        "days",
        "everlasting",
        "findeth",
        "find",
        "have",
        "he",
        "lasting",
        "material",
        "needed",
        "nor",
        "not",
        "no",
        "of",
        "our",
        "partial",
        "peaceful",
        "scorned",
        "shalt",
        "they",
        "to",
        "without",
        "with",
      ].includes(prev[0]) &&
      !["on", "upon", "content"].includes(next[0])
    ) {
      return "rest";
    }
    return "restt";
  }
  if (word === "faith") {
    if (!prevCap[0] && !nextCap[0]) return "faith";
    if (wordCap === "Faith" && prevCap[0]) {
      return "faithrel";
    }
    if (nextCap[0] === "BAHA’U’LLAH") {
      return "faithrel";
    }
    if (wordCap === "FAITH") {
      if (
        [
          "DYNAMIC",
          "EXEMPLARY",
          "INDOMITABLE",
          "RADIANT",
          "RECANTATION",
          "RECANTING",
        ].includes(prevCap[0])
      ) {
        return "faith";
      }
      if (["INDESTRUCTIBILITY", "RECANT", "DENY"].includes(prevCap[1])) {
        return "faith";
      }
      return "faithrel";
    }
    if (
      prevCap[1] &&
      prevCap[0][0].toLowerCase() !== prevCap[0][0] &&
      !["Divine", "Peter’s"].includes(prevCap[1])
    ) {
      return "faithrel";
    }
    if (nextCap[0] === "of" && ["God", "Islam"].includes(nextCap[1])) {
      return "faithrel";
    }
    if (nextCap[0] === "or" && !["materialism", "the"].includes(nextCap[1])) {
      return "faithrel";
    }
    if (
      nextCap[0] === "and" &&
      ["creed", "religion"].includes(nextCap[1]) &&
      !["of"].includes(prevCap[0])
    ) {
      return "faithrel";
    }
    if (prevCap[1] === "new" && prevCap[0] === "born") {
      return "faithrel";
    }
    if (nextCap[0] === "bestoweth") {
      return "faithrel";
    }
    if (prevCap[1] === "with" && prevCap[0] === "a") {
      return "faithrel";
    }
    if (["creed", "religion", "follow"].includes(prevCap[1])) {
      return "faithrel";
    }
    if (
      [
        "any",
        "common",
        "every",
        "hostile",
        "new",
        "no",
        "sic",
        "this",
        "universal",
      ].includes(prevCap[0])
    ) {
      return "faithrel";
    }
    if (["communities", "superior"].includes(nextCap[0])) {
      return "faithrel";
    }
    if (["pilgrimage"].includes(nextCap[1])) {
      return "faithrel";
    }
    if (prevCap[1] === "in" && prevCap[0] === "the" && !nextCap[0]) {
      return "faithrel";
    }
    return "faith";
  }
  if (word === "order") {
    const prev = prevCap.map((x) => x.toLowerCase());
    const next = nextCap.map((x) => x.toLowerCase());
    if (!prev[0] && !next[0]) return "ord"; // return "ordersys";
    const phrase = [
      ...prev.slice(0, 2).reverse(),
      word,
      ...next.slice(0, 2),
    ].join(" ");

    if (["Court", "written"].includes(prevCap[0])) return "orders";
    if (wordCap === "Order" && prevCap[0]) return "ord"; // return "ordersys";
    if (
      [
        "ADMINISTRATIVE",
        "administrative",
        "international",
        "sacerdotal",
        "WORLD",
      ].includes(prevCap[0])
    ) {
      return "ord"; // return "ordersys";
    }
    if (
      prev[0] === "in" &&
      (!prev[1] ||
        [
          "is",
          "be",
          "so",
          "april",
          "where",
          "authorities",
          "built",
          "so",
          "songs",
        ].includes(prev[1]) ||
        ["concerns"].includes(prev[2]) ||
        ["for", "not", "that", "to"].includes(next[0]))
    ) {
      return "order";
    }
    if (prev[0] === "to" && ["the", "to", "his"].includes(next[0])) {
      return "orders";
    }
    if (
      prev[0] === "the" &&
      ["for", "he", "issued", "on", "that", "to"].includes(next[0])
    ) {
      return "orders";
    }
    if (
      prev[0] === "an" &&
      ["by", "came", "for", "from", "has", "was"].includes(next[0])
    ) {
      return "orders";
    }
    if (prev[2] === "gave") {
      return "orders";
    }
    if (
      [
        "by",
        "his",
        "royal",
        "official",
        "desired",
        "didst",
        "drastic",
        "explicit",
        "express",
        "fresh",
        "historic",
        "original",
        "second",
        "majesty’s",
        "sovereign’s",
      ].includes(prev[0]) ||
      [
        "this order",
        "an order with which",
        "and order him to",
        "of the order of his",
        "by the order of its",
        "when the order was issued",
        "order it to",
        "of which order was this",
      ].includes(phrase)
    ) {
      return "orders";
    }
    if (prev[1] === "age" && prev[0] === "old") {
      return "ord";
    }
    if (
      [
        "baha’u’llah’s",
        "emerging",
        "international",
        "mighty",
        "old",
        "redeeming",
        "rising",
        "supernatural",
        "apostolic",
        "appointed",
        "aristocratic",
        "clerical",
        "day",
        "declining",
        "dervish",
        "dying",
        "ecclesiastical",
        "economic",
        "embracing",
        "enfolded",
        "entire",
        "established",
        "existing",
        "future",
        "global",
        "moribund",
        "ordained",
        "outmoded",
        "outworn",
        "present",
        "prevailing",
        "revolting",
        "same",
        "similar",
      ].includes(prev[0])
    ) {
      return "ord"; // return "ordersys";
    }
    if (
      [
        "absolute",
        "and",
        "best",
        "chronological",
        "civil",
        "complete",
        "descending",
        "develop",
        "different",
        "exact",
        "excellent",
        "general",
        "good",
        "higher",
        "highest",
        "in",
        "innate",
        "internal",
        "keeping",
        "lower",
        "maintain",
        "moral",
        "natural",
        "noblest",
        "of",
        "perfect",
        "political",
        "proper",
        "public",
        "should",
        "order",
        "special",
        "such",
        "their",
        "to",
        "universal",
        "utmost",
        "visible",
        "whole",
        "working",
        "worst",
      ].includes(prev[0])
    ) {
      return "ord";
    }
    if (
      [
        "but",
        "may",
        "constituting",
        "given",
        "set",
        "has",
        "your",
        "expounded",
        "hath",
        "promotes",
        "taken",
        "calls",
        "have",
        "represented",
        "structured",
        "with",
      ].includes(next[0])
    ) {
      return "ord";
    }
    if (
      [
        "were",
        "as",
        "so",
        "he",
        "to",
        "for",
        "into",
        "recognised",
        "proclaimed",
        "are",
        "serves",
        "brought",
        "increase",
        "sorely",
        "around",
        "blur",
        "comes",
        "intensifies",
        "manifest",
        "gathers",
        "both",
        "lamentably",
        "through",
        "ushered",
        "characterised",
        "whose",
      ].includes(next[0])
    ) {
      return "ord"; // return "ordersys";
    }
    if (
      [
        "joined",
        "new",
        "old",
        "defective",
        "embryonic",
        "embryonic",
        "effective",
        "future",
        "just",
        "present",
        "current",
      ].includes(prev[1])
    ) {
      return "ord"; // return "ordersys";
    }
    if (
      [
        "of an order that posterity",
        "of an order",
        "an order which is",
        "with its order",
        "a new order can be",
        "a new order in its",
        "a new order in which",
        "one order",
        "of that order",
        "order",
        "the world order which it",
        "a world order",
        "the world order",
        "true world order",
        "the world’s order",
        "a new order",
        "order and any",
      ].includes(phrase)
    ) {
      return "ord"; // return "ordersys";
    }
    if (prev[2] === "enter") {
      return "ord"; // return "ordersys";
    }
    return "ord";
  }
  if (word === "orders") {
    const prev = prevCap.map((x) => x.toLowerCase());
    const next = nextCap.map((x) => x.toLowerCase());
    if (!prev[0] && !next[0]) return "orders";
    if (!prev[0]) {
      return "ord";
    }
    if (
      [
        "monastic",
        "sacerdotal",
        "religious",
        "ecclesiastical",
        "social",
        "various",
      ].includes(prev[0])
    ) {
      return "ord"; // return "ordersys";
    }
    if (["magnitude", "complexity"].includes(next[1])) {
      return "ord"; // return "ordersys";
    }
    if (prev[1] === "systems") {
      return "ord"; // return "ordersys";
    }
    if (prev[2] === "hostile") {
      return "ord"; // return "ordersys";
    }
    return "orders";
  }
  if (word === "ordering") {
    const prev = prevCap.map((x) => x.toLowerCase());
    const next = nextCap.map((x) => x.toLowerCase());
    if (!prev[0] && !next[0]) return "ord";
    if (["the", "that", "a", "him"].includes(next[0])) {
      return "orders";
    }
    return "ord";
  }
  if (word === "ordered") {
    const prev = prevCap.map((x) => x.toLowerCase());
    const next = nextCap.map((x) => x.toLowerCase());
    if (!prev[0] && !next[0]) return "ord";
    if (
      prevCap[1] &&
      prevCap[0][0].toLowerCase() !== prevCap[0][0].toLowerCase()
    ) {
      return "orders";
    }
    if (
      [
        "him",
        "his",
        "them",
        "the",
        "that",
        "for",
        "to",
        "a",
        "vacate",
        "close",
        "subsequently",
        "release",
        "chastisement",
        "my",
        "new",
        "offhand",
        "it",
        "by",
        "this",
      ].includes(next[0])
    ) {
      return "orders";
    }
    if (["when", "been", "having"].includes(prev[0])) {
      return "orders";
    }
    return "ord";
  }
};

// system
// mind
// matter
// well
// cause
// being
// spirit
// like
// present
// mean
// still
// part
// turn
// state
// fire
// stage
// second
// good
