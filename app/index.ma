{
  search:: ''
  filter:: 'All Writings and Prayers'
  current: passages(search, filter)
  similarWords: similar(search, filter)
  ~
  [
    font: 'Atkinson Hyperlegible, sans-serif'
    color: '#333'
    position: 'center'
    size: config.baseSize
    fill: '#fafaed'
    style: [
      letterSpacing: '0.025em'
      wordSpacing: '0.1em'
      fontVariantLigatures: 'none'
    ]
    ~
    [
      gap: 40
      pad: [20, 15, 40]
      maxWidth: config.textWidth + (2 * config.sideWidth)
      ~
      [
        gap: 25
        ~
        [
          bold: yes
          size: 20
          ~
          'Bahá’í Explore'
        ]
        [
          flow: 'row'
          position: 'center'
          gap: 10
          bold: yes
          ~
          'Filter:'
          [
            pad: [5, 10]
            border: '2px solid #aaa'
            round: 3
            options: [
              'All Writings and Prayers',
              'All Prayers',
              'Bahá’u’lláh',
              'The Báb',
              '‘Abdu’l‑Bahá',
              'Shoghi Effendi',
              'The Universal House of Justice'
            ]
            input: filter
          ]
        ]
        [
          gap: 10
          ~
          [
            pad: [5, 18]
            round: 100
            border: '2px solid #aaa'
            placeholder: 'Enter keywords to search...'
            input: search
          ]
          [
            size: 14
            pad: [0, 20]
            ~
            [
              bold: yes
              ~
              if (length(similarWords) > 0) 'Often appear with: ' else ' '
            ]
            for s, i in similarWords {
              if i = 1 (s) else ', {s}'
            }
          ]
        ]
      ]
      [
        gap: 40
        ~
        for passage in current {
          [
            gap: 25
            position: 'center'
            ~
            [
              gap: 10
              color: colors.link[passage.author] | colors.link['The World Centre']
              ~
              [
                bold: yes
                flow: 'inline'
                ~
                if passage.title
                  for p, i in [passage.author, passage.title] {
                    if i > 1 ' '
                    [
                      style: [display: 'inline-block']
                      ~
                      if i = 2 p else '{p},'
                    ]
                  }
                else
                  [
                    style: [display: 'inline-block']
                    ~
                    passage.author
                  ]
              ]
              if length(passage.path) > 0 [
                size: 14
                italic: yes
                ~
                for p, i in passage.path {
                  if i > 1 ' '
                  [
                    style: [display: 'inline-block']
                    ~
                    if i = length(passage.path) p else '{p},'
                  ]
                }
              ]
            ]
            [
              gap: 25
              maxWidth: config.textWidth
              ~
              for para in passage.paragraphs [
                flow: 'inline'
                ~
                for part in para [
                  fill: if part.highlight '#fff79e'
                  pad: [2.5, 3.5]
                  style: [margin: '0 -3.5px']
                  ~
                  part.text
                ]
              ]
            ]
          ]
          [
            fill: '#ddd'
            pad: [top: 2]
          ]
        }
        if length(current) < 30 [
          align: 'center'
          ~
          'Loading . . .'
        ]
      ]
    ]
  ]
}