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
          pad: [0, 35, 50]
          ~
          [
            style: [
              'overflow-x': 'scroll'
              'overflow-y': 'hidden'
            ]
            ~
            {
              allDocs: documents(author)
              ~
              [
                flow: 'row'
                ~
                [
                  width: 0.5
                  flow: 20
                  pad: [right: 30]
                  size: 14
                  ~
                  section('Long (30+ mins)', allDocs[4], extraTab)
                  section('Medium (5-30 mins)', allDocs[3], extraTab)
                ]
                [
                  width: 0.5
                  flow: 20
                  pad: [left: 30]
                  size: 14
                  ~
                  section('Short (2-5 mins)', allDocs[2], extraTab)
                ]
              ]
            }
          ]
        ] else if view = 'Passages' then {
          allDocs: documents(author)
          selectedType is any: ''
          selectedNum is any: 0
          ~
          [
            flow: 'row'
            pad: [0, 35, 50]
            ~
            [
              width: 0.5
              flow: 30
              pad: [right: 30]
              size: 14
              ~
              [
                bold: yes
                underline: yes
                size: 17
                ~
                'From documents'
              ]
              for p, i in allParagraphs(author, yes) {
                [
                  pad: [top: 1]
                  fill: '#ccc'
                ]
                [
                  flow: 10
                  pad: 7.5
                  style: [margin: '-7.5px']
                  when click push
                    if (selectedType = 'docs' & selectedNum = i) then ''
                    else 'docs'
                    -> selectedType
                  when click push i -> selectedNum
                  ~
                  if (selectedType = 'docs' & selectedNum = i) then [
                    flow: if p.full.type = 'lines' then 17 / 2
                    style: if p.full.type = 'lines' then [whiteSpace: 'pre-wrap']
                    ~
                    if p.full.type = 'lines' then
                      for l in p.full.lines [for s in l.text s.text]
                    else
                      [for s in p.full.text s.text]
                  ] else [
                    '{p.initial} . . .'
                  ]
                  if p.path[1] != 'Additional' then [
                    color: colors.link[p.author] | colors.link['The World Centre']
                    italic: yes
                    size: 12
                    pad: [left: 10]
                    ~
                    '('
                    for x, j in p.path
                      if j = length(p.path) then x else '{x}, '
                    ')'
                  ]
                ]
              }
            ]
            [
              width: 0.5
              flow: 30
              pad: [left: 30]
              size: 14
              ~
              [
                bold: yes
                underline: yes
                size: 17
                ~
                'Additional passages'
              ]
              for d, i in allDocs[1] {
                [
                  pad: [top: 1]
                  fill: '#ccc'
                ]
                [
                  flow: 10
                  pad: 7.5
                  style: [margin: '-7.5px']
                  when click push
                    if (selectedType = 'extra' & selectedNum = i) then ''
                    else 'extra'
                    -> selectedType
                  when click push i -> selectedNum
                  ~
                  if (selectedType = 'extra' & selectedNum = i) then [
                    flow: 14
                    ~
                    for p, j in d.paragraphs [
                      flow: if p.type = 'lines' then 17 / 2
                      indent: if (j != 1) then 20
                      style: if p.type = 'lines' then [whiteSpace: 'pre-wrap']
                      ~
                      if p.type = 'lines' then
                        for l in p.lines [for s in l.text s.text]
                      else
                        [for s in p.text s.text]
                    ]
                  ] else [
                    '{d.initialLong} . . .'
                  ]
                  if d.summary & extraTab != 'Prayers' then [
                    color: colors.link[d.author] | colors.link['The World Centre']
                    italic: yes
                    size: 12
                    pad: [left: 10]
                    ~
                    d.summary
                  ]
                  if length(d.path) > 0 & d.path[1] != 'Additional' & (extraTab = 'Prayers' | d.path[1] = 'The World Order of Bahá’u’lláh') then [
                    color: colors.link[d.author] | colors.link['The World Centre']
                    italic: yes
                    size: 12
                    pad: [left: 10]
                    ~
                    '('
                    for p, j in d.path
                      if j = length(d.path) then p else '{p}, '
                    ')'
                  ]
                ]
              }
            ]
          ]
        } else if view = 'Compilations' then [
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