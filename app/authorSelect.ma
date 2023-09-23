(selected) => {
  authorItem: (label, pad, span, nested) => [
    pad: [pad, 5, 7.5]
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
      [italic: yes, bold: no, size: 13 ~ '(Letters, Documents & Compilations)']
    else if label = 'The Báb' then
      [italic: yes, bold: no, size: 10 ~ '1844 —']
    else if label = 'Bahá’u’lláh' then
      [italic: yes, bold: no, size: 10 ~ '1853 —']
    else if label = '‘Abdu’l‑Bahá' then
      [italic: yes, bold: no, size: 10 ~ '1892 —']
    else if label = 'First Epoch' then
      [italic: yes, bold: no, size: 10 ~ '1921 —']
    else if label = 'Second Epoch' then
      [italic: yes, bold: no, size: 10 ~ '1946 —']
    else if label = 'Third Epoch' then
      [italic: yes, bold: no, size: 10 ~ '1963 —']
    else if label = 'Fourth Epoch' then
      [italic: yes, bold: no, size: 10 ~ '1986 —']
    else if label = 'Fifth Epoch' then
      [italic: yes, bold: no, size: 10 ~ '2001 —']
    else if label = 'Sixth Epoch' then
      [italic: yes, bold: no, size: 10 ~ '2022 —']
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
    authorItem('‘Abdu’l‑Bahá', 42.5, [1, 2], ['Heroic Age'])
    authorItem('Shoghi Effendi', 7.5, 2, ['Formative Age'])
    authorItem('The Universal House of Justice and World Centre', 7.5, 4, ['Formative Age'])
    authorItem('The Báb', 7.5, 1, ['Heroic Age', 'Word of God'])
    authorItem('Bahá’u’lláh', 7.5, 1, ['Heroic Age', 'Word of God'])
    authorItem('First Epoch', 7.5, 1, ['Formative Age', 'Shoghi Effendi'])
    authorItem('Second Epoch', 7.5, 1, ['Formative Age', 'Shoghi Effendi'])
    authorItem('Third Epoch', 7.5, 1, ['Formative Age', 'The Universal House of Justice and World Centre'])
    authorItem('Fourth Epoch', 7.5, 1, ['Formative Age', 'The Universal House of Justice and World Centre'])
    authorItem('Fifth Epoch', 7.5, 1, ['Formative Age', 'The Universal House of Justice and World Centre'])
    authorItem('Sixth Epoch', 7.5, 1, ['Formative Age', 'The Universal House of Justice and World Centre'])
  ]
}