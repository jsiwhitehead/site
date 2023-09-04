(selected) => {
  authorItem: (label, pad, span, nested) => [
    pad: [pad, 5]
    flow: 5
    fill:
      if (selected = label | hover) then
        'lightgreen'
      else if includes(nested, selected) then
        'lightblue'
      else
        '#ddd'
    span: span
    when click push (if label = selected then '' else label) -> selected
    ~
    label
    if label = 'Heroic Age' then
      [italic: yes, bold: no, size: 13 ~ '(Writings, Talks & Prayers)']
    else if label = 'Formative Age' then
      [italic: yes, bold: no, size: 13 ~ '(Letters & Documents of Guidance)']
  ]
  ~
  [
    bold: yes
    align: 'center'
    size: 15
    flow: [gap: 5 ~ 'grid', 1, 1, 1, 1, 1, 1, 1, 1, 1]
    style: [
      'max-width': '1100px'
      'margin': '0 auto'
    ]
    ~
    authorItem('Heroic Age', 7.5, 3, [])
    authorItem('Formative Age', 7.5, 6, [])
    authorItem('Word of God', 7.5, 2, ['Heroic Age'])
    authorItem('‘Abdu’l‑Bahá', 25, [1, 2], ['Heroic Age'])
    authorItem('Shoghi Effendi', 7.5, 2, ['Formative Age'])
    authorItem('The Universal House of Justice', 7.5, 4, ['Formative Age'])
    authorItem('The Báb', 7.5, 1, ['Heroic Age', 'Word of God'])
    authorItem('Bahá’u’lláh', 7.5, 1, ['Heroic Age', 'Word of God'])
    authorItem('First Epoch', 7.5, 1, ['Formative Age', 'Shoghi Effendi'])
    authorItem('Second Epoch', 7.5, 1, ['Formative Age', 'Shoghi Effendi'])
    authorItem('Third Epoch', 7.5, 1, ['Formative Age', 'The Universal House of Justice'])
    authorItem('Fourth Epoch', 7.5, 1, ['Formative Age', 'The Universal House of Justice'])
    authorItem('Fifth Epoch', 7.5, 1, ['Formative Age', 'The Universal House of Justice'])
    authorItem('Sixth Epoch', 7.5, 1, ['Formative Age', 'The Universal House of Justice'])
  ]
}