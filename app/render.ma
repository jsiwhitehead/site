(doc) => [
  for x in [1, 2] [
    id: if x = 1 then 'nav'
    flow: ['row']
    fill: 'lightgreen'
    size: 14
    style: if x = 2 then [
      position: 'fixed'
      width: '100%'
      zIndex: 100
      'min-height': '59px'
    ] else [
      visibility: 'hidden'
      'min-height': '59px'
    ]
    ~
    [
      pad: 10
      width: 33
      fill: if hover then '#84d984'
      flow: ['row', 'center']
      when click push [] -> url
      ~
      '✖'
    ]
    if doc.prev then [
      pad: 10
      width: 33
      fill: if hover then '#84d984'
      flow: ['row', 'center']
      when click push [doc.prev] -> url
      ~
      '◀'
    ] else [
      pad: 10
      width: 33
      style: [visibility: 'hidden']
      ~
      '◀'
    ]
    [
      pad: [10, 0]
      flow: 10
      align: 'center'
      style: [
        'flex-grow': 1
      ]
      ~
      [
        italic: yes
        size: 12
        ~
        [
          style: [display: 'inline-block']
          ~
          if !doc.path then doc.author else '{doc.author},'
        ]
        for t, i in doc.path {
          ' '
          [
            style: [display: 'inline-block']
            ~
            if i = length(doc.path) then t else '{t},'
          ]
        }
      ]
      [
        bold: yes
        size: 17
        ~
        doc.title | (doc.item & '#{doc.item}')
        if doc.compilation then ' (Compilation)'
      ]
    ]
    if doc.next then [
      pad: 10
      fill: if hover then '#84d984'
      flow: ['row', 'center']
      when click push [doc.next] -> url
      ~
      '▶'
    ] else [
      pad: 10
      width: 33
      style: [visibility: 'hidden']
      ~
      '▶'
    ]
    [
      pad: 10
      width: 33
      style: [visibility: 'hidden']
      ~
      '✖'
    ]
  ]
  [
    pad: [50, 35]
    ~
    [
      maxWidth: 630
      flow: 50
      ~
      
      [
        flow: 25
        ~
        for p, i in doc.paragraphs renderPara(p, i - 1, doc.allType, doc.compilation, no, no, p)
      ]
    ]
  ]
]