export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const orderByDate = (array) => {
  return array.sort(
    (a, b) =>
      a.years[0] + a.years[1] - (b.years[0] + b.years[1]) ||
      a.id.localeCompare(b.id) ||
      a.index - b.index
  );
};

const authors = {
  "Heroic Age": ["The Báb", "Bahá’u’lláh", "‘Abdu’l‑Bahá"],
  "Formative Age": [
    "Shoghi Effendi",
    "Third Epoch",
    "Fourth Epoch",
    "Fifth Epoch",
    "Sixth Epoch",
  ],
  "The Universal House of Justice and World Centre": [
    "Third Epoch",
    "Fourth Epoch",
    "Fifth Epoch",
    "Sixth Epoch",
  ],
  "Word of God": ["The Báb", "Bahá’u’lláh"],
};
export const getAuthors = (author) => authors[author] || (author && [author]);
