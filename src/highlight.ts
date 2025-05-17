import stem from "../data/stem";
import { getParagraphLines } from "../data/utils";

const prayerPhrases = [
  "AyyamiHa",
  "NawRuz",
  "Bestow happiness and blessings upon Washington",
  "From America",
  "we hastened to the Holy Land",
  "The Prayer for the Dead",
  "The Purest Branch",
  "this American democracy",
  "this just government",
  "this just authority and triumphant government",
  "the great emperor George V",
  "the King of England",
  "erection of this House",
  "erection of the Mashriqu’lAdhkar",
  "erection of the Mashriqu’l Adhkar",
  "rearing of the Mashriqu’lAdhkar",
  "rearing of the Mashriqu’l Adhkar",
  "that which is in my womb",
  "bestow upon me a righteous child",
  "leave me not childless",
  "bless the gift which Thou hast bestowed upon me",
  "for me and for her mother",
  "as well as for her",
  "ease the pangs of labour for this handmaiden",
  "the Fast",
  "days of fasting",
  "the intercession of children in behalf of their parents",
  "his father",
  "my loving mother",
  "the father and mother of this servant",
  "marriage",
  "married",
  "matrimony",
  "they are married",
  "this marriage",
  "their marriage",
  "these two souls",
  "these two unrestrained birds",
  "this family",
  "remote from my native home",
  "travels in foreign lands",
  "left my home",
  "set out from my home",
  "return home",
  "return to my home",
  "I have wakened",
  "I have risen from my couch at this dawntide",
  "She is sick",
  "this suckling babe",
  "this suckling",
  "this little babe",
  "ye are suckling babes",
  "These lovely children",
  "these children",
  "These children",
  "these little children",
  "I am a little child",
  "O thou sapling",
  "This is a child",
  "O thou verdant plant",
  "O thou tender sapling",
  "Thou seest these children",
  "I am a child",
  "O beloved child",
  "the children",
  "O thou hyacinth",
  "these two little children",
  "these young children",
  "We are children",
  "this poor child",
  "We are poor children",
  "this infant",
  "a tiny seed",
  "this tender seedling",
  "these fragile seedlings",
  "This is a hyacinth",
  "This is a choice sapling",
  "We are saplings",
  "Let these saplings",
  "O thou tender plant",
  "O ye two tender plants",
  "this plant",
  "this little maidservant",
  "O thou little handmaid",
  "such as have abandoned the physical garment",
  "A noble soul hath ascended",
  "Glorify the abode of this newly arrived guest",
  "Thy handmaiden who hath ascended",
  "the surviving kindred of this noble soul",
  "guided that bird of faithfulness to the nest of the Abha Kingdom",
  "He hath abandoned this mortal life",
  "These servants were noble souls",
  "this daughter",
  "One of Thy handmaidens",
  "This dearly cherished maidservant was attracted to Thee",
  "Thou seest Thy handmaiden",
  "Behold Thy handmaiden",
  "I am one of Thy handmaidens",
  "for such of Thy handmaidens",
  "the chosen ones among Thy handmaidens",
  "guard Thy handmaidens",
  "wed him to her",
  "guard this handmaiden",
  "refresh me amongst the handmaids",
  "This Thy handmaid is calling",
  "my husband",
  "assembled in this spiritual meeting",
  "gathered in this meeting",
  "gathered here together",
  "gathered in this Spiritual Assembly",
  "this assemblage",
  "This assemblage",
  "this gathering",
  "this gathering",
  "This gathering",
  "first of the days of Riḍván",
  "ninth day of Riḍván",
  "the festival Thou hast named Riḍván",
  "Thy Riḍván Festival",
].map((p) => p.split(" "));

// I am, O my Lord, Thy handmaiden
// "these are",
// "these servants are",
// "these souls have",
// "mischief",
// "enemies",
// "adversaries",
// "wicked",
// "repudiat",
// "infidel",

export default (doc, tokens, prayers) => {
  const check = (t, prev, next) => {
    const s = stem(t, prev, next);
    if (tokens.includes(s)) return true;
    if (!prayers) return false;
    const whole = [...prev.reverse(), t, ...next];
    if (
      prayerPhrases.some((p) => {
        if (!p.includes(t)) return false;
        const index = prev.length;
        for (let i = -p.length + 1; i <= 0; i++) {
          if (
            whole.slice(index + i, index + i + p.length).join(" ") ===
            p.join(" ")
          ) {
            return true;
          }
        }
      })
    ) {
      return true;
    }
    // if (prayers && prayerTokens.includes(s)) return true;
    // if (prayers && /[0A-Z]/.test(t)) return true;
    return false;
  };

  const lines = doc.paragraphs.map((para) => getParagraphLines(para));
  const highlighted = lines.map((texts) =>
    texts.map(({ text, ...info }) => {
      const phrases = text.split(/([.,;:!?](?=$|[^a-z]* [^a-z]*[a-z])|—)/gi);
      const split = phrases.flatMap((phrase, i) => {
        if (i % 2 === 1) return [{ text: phrase, highlight: false }];
        const words = phrase.split(" ").map((w) => w.split("‑"));
        const cleaned = words.map((group) =>
          group.map((w) =>
            w
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .normalize("NFC")
              .replace(/[^ a-z0-9‑’']/gi, "")
          )
        );
        return cleaned.flatMap((group, j) => {
          const prev = cleaned.slice(0, j).reverse().flat();
          const next = cleaned.slice(j + 1).flat();
          if (
            group.length > 1 &&
            (check(group.join(""), prev, next) ||
              group.every((c, k) =>
                check(
                  c,
                  [...group.slice(0, k).reverse(), ...prev],
                  [...group.slice(k + 1), ...next]
                )
              ))
          ) {
            return [
              ...(j > 0 ? [{ text: " ", highlight: false, ...info }] : []),
              { text: words[j].join("‑"), highlight: true, ...info },
            ];
          }
          return [
            ...(j > 0 ? [{ text: " ", highlight: false, ...info }] : []),
            ...group.flatMap((c, k) => [
              ...(k > 0 ? [{ text: "‑", highlight: false, ...info }] : []),
              {
                text: words[j][k],
                highlight: check(
                  c,
                  [...group.slice(0, k).reverse(), ...prev],
                  [...group.slice(k + 1), ...next]
                ),
                ...info,
              },
            ]),
          ];
        });
      });
      const res = [{ text: "", ...info }];
      for (const s of split) {
        if (s.highlight) res.push(s, { text: "", ...info });
        else res[res.length - 1].text += s.text;
      }
      return res;
    })
  );
  return {
    ...doc,
    paragraphs: highlighted,
  };
};
