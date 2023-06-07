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
  if url[1] = 'prayers' then prayerspage
  else if url[1] then {
    id: url[1]
    doc: documentById(id)
    ~
    render(doc)
  } else {
    author is any: 'Bahá’í Writings'
    view is any: 'Passages'
    ~
    [
      pad: [top: 10]
      flow: 25
      ~
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
      tabs(view)
      if view = 'Documents' then
        [
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
        ]
      else
        [
          flow: 80
          maxWidth: 630
          pad: [50, 35]
          ~
          for p in allParagraphs(author, yes)
            renderPara(p.partial, no, yes, no, yes, no, p.full)
        ]
    ]
  }
]