[
  font: 'Atkinson Hyperlegible'
  size: 17
  color: '#333'
  fill: '#fafaed'
  style: [
    letterSpacing: '0.025em'
    wordSpacing: '0.1em'
    fontVariantLigatures: 'none'
    'min-height': '100%'
    overflow: 'hidden'
  ]
  ~
  if no then infopage
  else if url[1] = 'prayers' then prayerspage
  else if url[1] then {
    id: url[1]
    doc: documentById(id)
    ~
    render(doc)
  } else {
    author is any: ''
    view is any: 'Documents'
    extraTab: if includes(
      ['Heroic Age', 'Word of God', 'The Báb', 'Bahá’u’lláh', '‘Abdu’l‑Bahá'],
      author
    ) then
      'Prayers'
    else if includes(
      ['Formative Age', 'The Universal House of Justice and World Centre', 'Third Epoch', 'Fourth Epoch', 'Fifth Epoch', 'Sixth Epoch'],
      author
    ) then
      'Compilations'
    else
      no
    when author push
      if (extraTab != 'Compilations' & view = 'Compilations') |
        (extraTab != 'Prayers' & view = 'Prayers') then
        'Passages'
      else
        view
      -> view
    ~
    [
      pad: [top: 10]
      flow: 25
      ~
      [
        flow: 10
        ~
        [
          flow: ['row', 40]
          style: ['margin': '0 auto']
          ~
          [
            bold: yes
            size: 20
            ~
            'Bahá’í Explorer'
          ]
        ]
        [
          pad: [0, 10]
          ~
          [
            style: [
              overflow: 'scroll'
            ]
            ~
            authorSelect(author)
          ]
        ]
      ]
      if author != '' then {
        tabs(view, extraTab)
        if view = 'Documents' then [
          pad: [0, 10, 50]
          ~
          [
            style: [
              'overflow-x': 'scroll'
              'overflow-y': 'hidden'
            ]
            ~
            table(author)
          ]
        ] else if view = 'Passages' then [
          flow: 80
          maxWidth: 630
          pad: [50, 35]
          ~
          for p in allParagraphs(author, yes)
            renderPara(p.partial, no, yes, no, yes, no, p.full)
        ] else if view = 'Compilations' then [
          maxWidth: 670
          width: 1
          pad: [30, 35, 50]
          flow: 20
          ~
          for d in compilations(author) [
            bold: yes
            underline: hover
            color: colors.link['The World Centre']
            when click push [d.id] -> url
            ~
            d.title
          ]
        ]
      }
    ]
  }
]