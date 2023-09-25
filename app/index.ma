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
                  flow: 15
                  pad: [right: 30]
                  size: 14
                  ~
                  [
                    flow: 15
                    ~
                    [
                      bold: yes
                      underline: yes
                      size: 17
                      ~
                      'Long (30+ mins)'
                    ]
                    for d in allDocs[4] [
                      flow: 5
                      color: colors.link[d.author] | colors.link['The World Centre']
                      pad: 7.5
                      style: [margin: '-7.5px']
                      underline: hover
                      when click push [d.id] -> url
                      ~
                      [
                        bold: yes
                        ~
                        d.title | '“{d.initial} . . .”'
                        ' ({d.mins})'
                      ]
                      if d.summary & extraTab != 'Prayers' then [
                        italic: yes
                        size: 12
                        ~
                        d.summary
                      ]
                      if length(d.path) > 0 & d.path[1] != 'Additional' & ( extraTab = 'Prayers' | d.path[1] = 'The World Order of Bahá’u’lláh') then [
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
                    [
                      bold: yes
                      underline: yes
                      size: 17
                      pad: [top: 20]
                      ~
                      'Medium (5-30 mins)'
                    ]
                    for d in allDocs[3] [
                      flow: 5
                      color: colors.link[d.author] | colors.link['The World Centre']
                      pad: 7.5
                      style: [margin: '-7.5px']
                      underline: hover
                      when click push [d.id] -> url
                      ~
                      [
                        bold: yes
                        ~
                        d.title | '“{d.initial} . . .”'
                        ' ({d.mins})'
                      ]
                      if d.summary & extraTab != 'Prayers' then [
                        italic: yes
                        size: 12
                        ~
                        d.summary
                      ]
                      if length(d.path) > 0 & d.path[1] != 'Additional' & ( extraTab = 'Prayers' | d.path[1] = 'The World Order of Bahá’u’lláh') then [
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
                  ]
                ]
                [
                  width: 0.5
                  flow: 15
                  pad: [left: 30]
                  size: 14
                  ~
                  [
                    bold: yes
                    underline: yes
                    size: 17
                    ~
                    'Short (2-5 mins)'
                  ]
                  for d in allDocs[2] [
                    flow: 5
                    color: colors.link[d.author] | colors.link['The World Centre']
                    pad: 7.5
                    style: [margin: '-7.5px']
                    underline: hover
                    when click push [d.id] -> url
                    ~
                    [
                      bold: yes
                      ~
                      d.title | '“{d.initial} . . .”'
                    ]
                    if d.summary & extraTab != 'Prayers' then [
                      italic: yes
                      size: 12
                      ~
                      d.summary
                    ]
                    if length(d.path) > 0 & d.path[1] != 'Additional' & ( extraTab = 'Prayers' | d.path[1] = 'The World Order of Bahá’u’lláh') then [
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
                ]
              ]
            }
          ]
        ] else if view = 'Passages' then {
          allDocs: documents(author)
          ~
          [
            flow: 'row'
            pad: [0, 35, 50]
            ~
            [
              width: 0.5
              flow: 15
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
              [
                flow: 50
                ~
                for p in allParagraphs(author, yes)
                  renderPara(p.partial, no, yes, no, yes, no, p.full)
              ]
            ]
            [
              width: 0.5
              flow: 15
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
              for d in allDocs[1] [
                flow: 5
                color: colors.link[d.author] | colors.link['The World Centre']
                pad: 7.5
                style: [margin: '-7.5px']
                underline: hover
                when click push [d.id] -> url
                ~
                [
                  bold: yes
                  ~
                  d.title | '“{d.initial} . . .”'
                ]
                if d.summary & extraTab != 'Prayers' then [
                  italic: yes
                  size: 12
                  ~
                  d.summary
                ]
                if length(d.path) > 0 & d.path[1] != 'Additional' & ( extraTab = 'Prayers' | d.path[1] = 'The World Order of Bahá’u’lláh') then [
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