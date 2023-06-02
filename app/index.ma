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
  ]
  ~
  if url[1] then {
    id: url[1]
    doc: documentById(id)
    ~
    [
      pad: 50
      ~
      [
        maxWidth: 630
        ~
        render(doc)
      ]
    ]
  } else {
    page is any: 'Writings'
    ~
    [
      flow: 25
      ~
      nav(page)
      if page = 'Writings' then {
        author is any: 'Bahá’í Era'
        view is any: 'Passages'
        ~
        [
          flow: 25
          ~
          [
            pad: [0, 50]
            ~
            authorSelect(author)
          ]
          tabs(view)
          if view = 'Documents' then
            [
              pad: [0, 50, 50]
              ~
              table(author)
            ]
          else
            [
              flow: 80
              maxWidth: 630
              pad: [50, 0]
              ~
              for p in allParagraphs(author, yes) renderPara(p, yes, yes, no)
            ]
        ]
      } else {
        pview is any: 'General'
        ppage is any: 'Illumination'
        ~
        [
          flow: 25
          ~
          [
            flow: ['row', 5, 'center']
            ~
            for x, i in [
              ['General', 'Illumination']
              ['People', 'gathering']
              ['Specific', 'obligatory']
            ]
              [
                size: 15
                bold: yes
                fill:
                  if pview = x[1] then
                    'lightgreen'
                  else if hover then
                    'lightblue'
                  else
                    '#ddd'
                pad: [12, 0]
                width: 150
                align: 'center'
                round: [left: if i = 1 then 40, right: if i = 3 then 40]
                when click push x[1] -> pview
                when click push x[2] -> ppage
                ~
                x[1]
              ]
          ]
          if pview = 'General' then
            [
              flow: ['row', 5]
              pad: [0, 50]
              align: 'center'
              size: 15
              bold: yes
              ~
              for x, i in [
                ['Illumination', 'Light']
                ['Longing', 'Love']
                ['Abundance', 'Bounty']
                ['Compassion', 'Mercy']
                ['Steadfastness', 'Will']
                ['Unity', 'Unity']
              ]
                [
                  width: 1/6
                  fill:
                    if ppage = x[1] then
                      'lightgreen'
                    else if hover then
                      'lightblue'
                    else
                      '#ddd'
                  pad: [12, 0]
                  round: [left: if i = 1 then 100, right: if i = 6 then 100]
                  when click push x[1] -> ppage
                  ~
                  x[1]
                ]
            ]
          else if pview = 'People' then
            [
              flow: ['row', 5]
              pad: [0, 50]
              align: 'center'
              size: 15
              bold: yes
              ~
              for x, i in [
                ['gathering', 'Gathering']
                ['children', 'Children']
                ['youth', 'Youth']
                ['family', 'Family']
                ['parents', 'Parents']
                ['women', 'Women']
                ['departed', 'Departed']
              ]
                [
                  width: 1/7
                  fill:
                    if ppage = x[1] then
                      'lightgreen'
                    else if hover then
                      'lightblue'
                    else
                      '#ddd'
                  pad: [12, 0]
                  round: [left: if i = 1 then 100, right: if i = 7 then 100]
                  when click push x[1] -> ppage
                  ~
                  x[2]
                ]
            ]
          else
            [
              flow: ['row', 5]
              pad: [0, 50]
              align: 'center'
              size: 15
              bold: yes
              ~
              for x, i in [
                ['obligatory', 'Obligatory']
                ['morning', 'Morning']
                ['midnight', 'Midnight']
                ['journey', 'Journey']
                ['healing', 'Healing']
                ['fast', 'Fast']
                ['marriage', 'Marriage']
                ['tests', 'Opposition']
              ]
                [
                  width: 1/8
                  fill:
                    if ppage = x[1] then
                      'lightgreen'
                    else if hover then
                      'lightblue'
                    else
                      '#ddd'
                  pad: [12, 0]
                  round: [left: if i = 1 then 100, right: if i = 8 then 100]
                  when click push x[1] -> ppage
                  ~
                  x[2]
                ]
            ]
          [
            flow: 80
            maxWidth: 630
            pad: [50, 0]
            ~
            for prayer in prayers()[ppage] [
              flow: 25
              ~
              for p in prayer.paragraphs renderPara(p, no, no, yes)
              [
                align: 'right'
                italic: yes
                color: colors.link[prayer.author]
                ~
                '— {prayer.author}'
              ]
            ]
          ]
        ]
      }
    ]
  }
]