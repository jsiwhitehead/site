(selected) => {
  authorItem: (label, pad, span, nested) => [
    pad: [pad, 5]
    fill:
      if (selected = label | hover) then
        'lightgreen'
      else if includes(nested, selected) then
        'lightblue'
      else
        '#ddd'
    span: span
    when click push label -> selected
    ~
    label
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
    authorItem('Bahá’í Writings', 7.5, 9, [])
    authorItem('Heroic Age', 7.5, 3, ['Bahá’í Writings'])
    authorItem('Formative Age', 7.5, 6, ['Bahá’í Writings'])
    authorItem('Word of God', 7.5, 2, ['Bahá’í Writings', 'Heroic Age'])
    authorItem('‘Abdu’l‑Bahá', 25, [1, 2], ['Bahá’í Writings', 'Heroic Age'])
    authorItem('Shoghi Effendi', 7.5, 2, ['Bahá’í Writings', 'Formative Age'])
    authorItem('The Universal House of Justice', 7.5, 4, ['Bahá’í Writings', 'Formative Age'])
    authorItem('The Báb', 7.5, 1, ['Bahá’í Writings', 'Heroic Age', 'Word of God'])
    authorItem('Bahá’u’lláh', 7.5, 1, ['Bahá’í Writings', 'Heroic Age', 'Word of God'])
    authorItem('First Epoch', 7.5, 1, ['Bahá’í Writings', 'Formative Age', 'Shoghi Effendi'])
    authorItem('Second Epoch', 7.5, 1, ['Bahá’í Writings', 'Formative Age', 'Shoghi Effendi'])
    authorItem('Third Epoch', 7.5, 1, ['Bahá’í Writings', 'Formative Age', 'The Universal House of Justice'])
    authorItem('Fourth Epoch', 7.5, 1, ['Bahá’í Writings', 'Formative Age', 'The Universal House of Justice'])
    authorItem('Fifth Epoch', 7.5, 1, ['Bahá’í Writings', 'Formative Age', 'The Universal House of Justice'])
    authorItem('Sixth Epoch', 7.5, 1, ['Bahá’í Writings', 'Formative Age', 'The Universal House of Justice'])
  ]
}