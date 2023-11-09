// ## Regex Definitions

// Regex definition of `double`.
var rgxDouble = /(bb|dd|ff|gg|ll|mm|nn|pp|rr|tt)$/;
// Definition for Step Ia suffixes.
var rgxSFXsses = /(.+)(sses)$/;
var rgxSFXiedORies2 = /(.{2,})(ied|ies)$/;
var rgxSFXiedORies1 = /(.{1})(ied|ies)$/;
var rgxSFXusORss = /(.+)(us|ss)$/;
var rgxSFXs = /(.+)(s)$/;
// Definition for Step Ib suffixes.
var rgxSFXeedlyOReed = /(.*)(eedly|eed|eeth|eest)$/;
var rgxSFXedORedlyORinglyORing = /([aeiouy].*)(ed|edly|ingly|ing|eth|est)$/;
var rgxSFXatORblORis = /(at|bl|is)$/;
// Definition for Step Ic suffixes.
var rgxSFXyOR3 = /(.+[^aeiouy])([y3])$/;
// Definition for Step II suffixes; note we have spot the longest suffix.
var rgxSFXstep2 =
  /(isation|ational|fulness|ousness|iveness|liness|tional|biliti|lessli|entli|ation|alism|aliti|ousli|iviti|fulli|enci|anci|ence?|ance?|abli|iser|ator|alli|elli|bli|aci|eci|ogi|li)$/;
var rgxSFXstep2WithReplacements = [
  // Length 7.
  { rgx: /ational$/, replacement: "ate" },
  { rgx: /isation$/, replacement: "ise" },
  { rgx: /fulness$/, replacement: "ful" },
  { rgx: /ousness$/, replacement: "ous" },
  { rgx: /iveness$/, replacement: "ive" },
  // Length 6.
  { rgx: /tional$/, replacement: "tion" },
  { rgx: /biliti$/, replacement: "ble" },
  { rgx: /lessli$/, replacement: "less" },
  { rgx: /liness$/, replacement: "" },
  // Length 5.
  { rgx: /iviti$/, replacement: "ive" },
  { rgx: /ousli$/, replacement: "ous" },
  { rgx: /ation$/, replacement: "ate" },
  { rgx: /entli$/, replacement: "ent" },
  { rgx: /(.*)(alism|aliti)$/, replacement: "$1al" },
  { rgx: /fulli$/, replacement: "ful" },
  // Length 4.
  { rgx: /alli$/, replacement: "al" },
  { rgx: /elli$/, replacement: "el" },
  { rgx: /ator$/, replacement: "ate" },
  { rgx: /iser$/, replacement: "ise" },
  { rgx: /enci$/, replacement: "ent" },
  { rgx: /anci$/, replacement: "ant" },
  { rgx: /ence?$/, replacement: "ent" },
  { rgx: /ance?$/, replacement: "ant" },
  { rgx: /abli$/, replacement: "able" },
  // Length 3.
  { rgx: /bli$/, replacement: "ble" },
  { rgx: /aci$/, replacement: "at" },
  { rgx: /eci$/, replacement: "et" },
  { rgx: /(.*)(l)(ogi)$/, replacement: "$1$2og" },
  // Length 2.
  { rgx: /(.*)([cdeghikmnrt])(li)$/, replacement: "$1$2" },
];
// Definition for Step III suffixes; once again spot the longest one first!
var rgxSFXstep3 =
  /(ational|tional|alise|iance|icate|iciti|ative|ical|ness|ful)$/;
var rgxSFXstep3WithReplacements = [
  { rgx: /ational$/, replacement: "ate" },
  { rgx: /tional$/, replacement: "tion" },
  { rgx: /alise$/, replacement: "al" },
  { rgx: /iance$/, replacement: "iant" },
  { rgx: /(.*)(icate|iciti|ical)$/, replacement: "$1ic" },
  { rgx: /(ness|ful)$/, replacement: "" },
];
// Definition for Step IV suffixes.
var rgxSFXstep4 =
  /(ement|ance|ence|able|ible|ment|ant|ent|ism|ate|iti|ous|ive|ise|al|er|ic)$/;
var rgxSFXstep4Full =
  /(ement|ance|ence|able|ible|ment|ant|ent|ism|ate|iti|ous|ive|ise|ion|al|er|ic)$/;
var rgxSFXstep4ion = /(.*)(s|t)(ion)$/;
// Exceptions Set I.
var exceptions1 = Object.create(null);
// Mapped!
exceptions1.skis = "ski";
exceptions1.skies = "sky";
exceptions1.dying = "die";
exceptions1.lying = "lie";
exceptions1.tying = "tie";
exceptions1.idly = "idl";
exceptions1.gently = "gentl";
exceptions1.ugly = "ugli";
exceptions1.early = "earli";
exceptions1.earliest = "earli";
exceptions1.only = "onli";
exceptions1.singly = "singl";
exceptions1.humility = "humbl";
exceptions1.cruelly = "cruel";
exceptions1.lowliness = "lowli";
exceptions1.ironically = "ironi";
exceptions1.pacification = "pacifi";
exceptions1.haply = "happ";
exceptions1.institutes = "institute";
exceptions1.lieth = "lie";
exceptions1.dieth = "die";
// Invariants!
exceptions1.institute = "institute";
exceptions1.sky = "sky";
exceptions1.news = "news";
exceptions1.atlas = "atlas";
exceptions1.cosmos = "cosmos";
exceptions1.bias = "bias";
exceptions1.andes = "andes";

const ilEndings = ["beli", "layli", "tripli"];

const iEndings = [
  "allegi",
  "anti",
  "appli",
  "armi",
  "batteri",
  "belli",
  "benefici",
  "booti",
  "bulli",
  "busi",
  "commodi",
  "contenti",
  "conveni",
  "crafti",
  "credenti",
  "delici",
  "deni",
  "directori",
  "elegi",
  "faceti",
  "factori",
  "forti",
  "furi",
  "heavi",
  "illustri",
  "imparti",
  "imperi",
  "insidi",
  "ironi",
  "ladi",
  "licenti",
  "liveri",
  "mani",
  "mari",
  "milli",
  "pacifi",
  "pari",
  "parti",
  "piti",
  "polici",
  "politi",
  "potenti",
  "presenti",
  "readi",
  "recipi",
  "registri",
  "reveri",
  "rubi",
  "slipperi",
  "steadi",
  "studi",
  "tini",
  "treati",
  "tricki",
  "victori",
  "wari",
  "weari",
];

const erEndings = [
  "adder",
  "adulter",
  "arter",
  "barber",
  "baser",
  "beer",
  "bower",
  "buckler",
  "butter",
  "career",
  "cater",
  "charter",
  "collater",
  "corner",
  "counter",
  "defer",
  "deleter",
  "ember",
  "feder",
  "finer",
  "flower",
  "folder",
  "forger",
  "former",
  "further",
  "halter",
  "hater",
  "hoover",
  "hunger",
  "imper",
  "inner",
  "inoper",
  "lacer",
  "layer",
  "lever",
  "liter",
  "master",
  "mater",
  "matter",
  "mother",
  "muster",
  "number",
  "nurser",
  "outer",
  "per",
  "peter",
  "pitcher",
  "ponder",
  "porter",
  "poster",
  "proper",
  "quer",
  "render",
  "rider",
  "riper",
  "ser",
  "shower",
  "sincer",
  "slaver",
  "sober",
  "sticker",
  "stranger",
  "supper",
  "surer",
  "taper",
  "teller",
  "temper",
  "templer",
  "tender",
  "tiller",
  "under",
  "user",
  "ver",
  "wager",
  "waver",
  "writer",
];

// Exceptions Set II.
// Note, these are to be treated as full words.
var rgxException2 =
  /^(inning|outing|canning|herring|proceed|exceed|succeed|earring)$/;

// ## Private functions

// ### prelude
/**
 * Performs initial pre-processing by transforming the input string `s` as
 * per the replacements.
 *
 * @param {String} s Input string
 * @return {String} Processed string
 * @private
 */
var prelude = function (s) {
  return (
    s
      // Handle `y`'s.
      .replace(/^y/, "3")
      .replace(/([aeiou])y/, "$13")
      // Handle apostrophe.
      .replace(/\’s$|\'s$/, "")
      .replace(/s\’$|s\'$/, "")
      .replace(/[\’\']$/, "")
  );
}; // prelude()

// ### isShort
/**
 * @param {String} s Input string
 * @return {Boolean} `true` if `s` is a short syllable, `false` otherwise
 * @private
 */
var isShort = function (s) {
  // (a) a vowel followed by a non-vowel other than w, x or 3 and
  // preceded by a non-vowel, **or** (b) a vowel at the beginning of the word
  // followed by a non-vowel.
  return (
    /[^aeiouy][aeiouy][^aeiouywx3]$/.test(s) ||
    /^[aeiouy][^aeiouy]{0,1}$/.test(s) // Removed this new changed??
  );
}; // isShort()

// ### markRegions
/**
 * @param {String} s Input string
 * @return {Object} the `R1` and `R2` regions as an object from the input string `s`.
 * @private
 */
var markRegions = function (s) {
  // Matches of `R1` and `R2`.
  var m1, m2;
  // To detect regions i.e. `R1` and `R2`.
  var rgxRegions = /[aeiouy]+([^aeiouy]{1}.+)/;
  m1 = rgxRegions.exec(s);
  if (!m1) return { r1: "", r2: "" };
  m1 = m1[1].slice(1);
  // Handle exceptions here to prevent over stemming.
  m1 = /^(gener|commun|arsen)/.test(s)
    ? s.replace(/^(gener|commun|arsen)(.*)/, "$2")
    : m1;
  m2 = rgxRegions.exec(m1);
  if (!m2) return { r1: m1, r2: "" };
  m2 = m2[1].slice(1);
  return { r1: m1, r2: m2 };
}; // markRegions()

// ### step1a
/**
 * @param {String} s Input string
 * @return {String} Processed string
 * @private
 */
var step1a = function (s) {
  var wordPart;
  if (rgxSFXsses.test(s)) return s.replace(rgxSFXsses, "$1ss");
  if (rgxSFXiedORies2.test(s)) return s.replace(rgxSFXiedORies2, "$1i");
  if (rgxSFXiedORies1.test(s)) return s.replace(rgxSFXiedORies1, "$1ie");
  if (rgxSFXusORss.test(s)) return s;
  wordPart = s.replace(rgxSFXs, "$1");
  if (/[aeiuouy](.+)$/.test(wordPart)) return s.replace(rgxSFXs, "$1");
  return s;
}; // step1a()

// ### step1b
/**
 * @param {String} s Input string
 * @return {String} Processed string
 * @private
 */
var step1b = function (s) {
  var rgn = markRegions(s),
    sd;
  // Search for the longest among the `eedly|eed` suffixes.
  if (rgxSFXeedlyOReed.test(s))
    // Replace by ee if in R1.
    return rgxSFXeedlyOReed.test(rgn.r1)
      ? s.replace(rgxSFXeedlyOReed, "$1ee")
      : s;
  // Delete `ed|edly|ingly|ing` if the preceding word part contains a vowel.
  if (rgxSFXedORedlyORinglyORing.test(s)) {
    sd = s.replace(rgxSFXedORedlyORinglyORing, "$1");
    rgn = markRegions(sd);
    // And after deletion, return either
    return rgxSFXatORblORis.test(sd)
      ? sd + "e"
      : // or
      rgxDouble.test(sd)
      ? sd.replace(/.$/, "")
      : // or
      isShort(sd) && rgn.r1 === ""
      ? sd + "e"
      : // or
        sd;
  }
  return s;
}; // step1b()

// ### step1c
/**
 * @param {String} s Input string
 * @return {String} Processed string
 * @private
 */
var step1c = function (s) {
  return s.replace(rgxSFXyOR3, "$1i");
}; // step1c()

// ### step2
/**
 * @param {String} s Input string
 * @return {String} Processed string
 * @private
 */
var step2 = function (s) {
  var i,
    imax,
    rgn = markRegions(s),
    us; // updated s.
  var match = s.match(rgxSFXstep2);
  match = match === null ? "$$$$$" : match[1];
  if (rgn.r1.indexOf(match) !== -1) {
    for (i = 0, imax = rgxSFXstep2WithReplacements.length; i < imax; i += 1) {
      us = s.replace(
        rgxSFXstep2WithReplacements[i].rgx,
        rgxSFXstep2WithReplacements[i].replacement
      );
      if (s !== us) return us;
    }
  }
  return s;
}; // step2()

// ### step3
/**
 * @param {String} s Input string
 * @return {String} Processed string
 * @private
 */
var step3 = function (s) {
  var i,
    imax,
    rgn = markRegions(s),
    us; // updated s.
  var match = s.match(rgxSFXstep3);
  match = match === null ? "$$$$$" : match[1];

  if (rgn.r1.indexOf(match) !== -1) {
    for (i = 0, imax = rgxSFXstep3WithReplacements.length; i < imax; i += 1) {
      us = s.replace(
        rgxSFXstep3WithReplacements[i].rgx,
        rgxSFXstep3WithReplacements[i].replacement
      );
      if (s !== us) return us;
    }
    if (/ative/.test(rgn.r2)) return s.replace(/ative$/, "");
  }
  return s;
}; // step3()

// ### step4
/**
 * @param {String} s Input string
 * @return {String} Processed string
 * @private
 */
var step4 = function (s) {
  var rgn = markRegions(s);
  var match = s.match(rgxSFXstep4Full);
  match = match === null ? "$$$$$" : match[1];
  if (rgxSFXstep4Full.test(s) && rgn.r2.indexOf(match) !== -1) {
    return rgxSFXstep4.test(s)
      ? s.replace(rgxSFXstep4, "")
      : rgxSFXstep4ion.test(s)
      ? s.replace(rgxSFXstep4ion, "$1$2")
      : s;
  }
  return s;
}; // step4()

// ### step5
/**
 * @param {String} s Input string
 * @return {String} Processed string
 * @private
 */
var step5 = function (s) {
  var preceding, rgn;
  // Search for the `e` suffixes.
  rgn = markRegions(s);
  if (/e$/i.test(s)) {
    preceding = s.replace(/e$/, "");
    return (
      // Found: delete if in R2, or in R1 and not preceded by a short syllable
      /e/.test(rgn.r2) || (/e/.test(rgn.r1) && !isShort(preceding))
        ? preceding
        : s
    );
  }
  // Search for the `l` suffixes.
  if (/l$/.test(s)) {
    rgn = markRegions(s);
    // Found: delete if in R2
    return rgn.r2 && /l$/.test(rgn.r2) ? s.replace(/ll$/, "l") : s;
  }
  // If nothing happens, must return the string!
  return s;
}; // step5()

// ## Public functions
// ### stem
/**
 *
 * Stems an inflected `word` using Porter2 stemming algorithm.
 *
 * @param {string} word — word to be stemmed.
 * @return {string} — the stemmed word.
 *
 * @example
 * stem( 'consisting' );
 * // -> consist
 */
var stem = function (word) {
  var str = word.toLowerCase();
  if (str.length < 3) return str;
  if (exceptions1[str]) return exceptions1[str];
  str = prelude(str);
  str = step1a(str);

  // console.log(word);
  // console.log("1a", str);

  if (!rgxException2.test(str)) {
    str = step1b(str);
    // console.log("1b", str);
    str = step1c(str);
    // console.log("1c", str);
    str = step2(str);
    // console.log("2", str);
    str = step3(str);
    // console.log("3", str);
    str = step4(str);
    // console.log("4", str);
    str = step5(str);
    // console.log("5", str);
  }

  if (/li$/.test(str) && !ilEndings.includes(str)) str = str.slice(0, -2);
  // console.log("li", str);

  if (/i$/.test(str) && !iEndings.includes(str)) str = str.slice(0, -1);
  // console.log("i", str);

  if (/er$/.test(str) && !erEndings.includes(str)) str = str.slice(0, -2);
  // console.log("er", str);

  str = str.replace(/3/g, "y");
  // console.log("y", str);
  return str;
}; // stem()

// Export stem function.
export default stem;
