{
  renderLine: (parts, author) => [
    flow: 'inline'
    ~
    for p in parts
      if p.first [
        size: 60
        line: 1
        pad: [right: 8 ~ 2.5, 0]
        color:
          colors.link[author] | colors.link['The World Centre']
        fill: if p.citations > 0
          'rgb(255, {240 - p.allCitations * 10}, {240 - p.allCitations * 10})'
        style: [float: 'left', margin: '-6px 0 -10px']
        ~
        p.text
      ] else [
        bold: if p.doc yes
        pad: [2.5, 0]
        fill: if p.citations > 0
          'rgb(255, {240 - p.allCitations * 10}, {240 - p.allCitations * 10})'
        ~
        p.text
      ]
  ]
  ~
  (para, author, allSpecial) => [
    flow: 'row'
    gap: config.baseSize / 2
    ~
    [
      width: config.sideWidth - gap
      color: '#999'
      size: 12
      align: 'right'
      pad: [top: 2.5]
      ~
      if para.index (para.index)
    ]

    [
      gap: 15
      ~
      if para.section {
        level: length(para.section)
        ~
        [
          size: 25 - level * 2
          uppercase: level = 1
          bold: level <= 2
          italic: level > 2
          align: if !para.title 'center'
          pad:
            if level = 1
              [top: 20]
            else if level <= 2
              0
            else
              [0, (level - 2) * 20]
          ~
          para.title | '* * *'
        ]
      } else if para.lines [
        gap: config.baseSize / 2
        pad: if !allSpecial [0, 70]
        indent: if !allSpecial -30
        style: [whiteSpace: 'pre-wrap']
        ~
        for line in para.lines {
          renderLine(line, author)
        }
      ] else [
        uppercase: para.type = 'call'
        italic: para.type = 'info'
        bold: para.quote
        align: if para.type 'justify-center'
        indent: if para.index != 1 & !para.type 20
        pad:
          if para.type
            [0, 40]
          else if allSpecial
            0
          else if para.quote
            [0, 20]
        ~
        renderLine(para.parts, author)
      ]

      for ref in para.ref [
        size: 15
        italic: yes
        align: 'right'
        color: colors.link[ref[1]] | colors.link['The World Centre']
        pad: [0, 20]
        underline: hover
        ~
        for t, i in ref {
          if i > 1 ' '
          [
            underline: hover
            style: [display: 'inline-block']
            ~
            if i = length(ref) t else '{t},'
          ]
        }
      ]
    ]

    [
      width: config.sideWidth - gap
      ~
    ]
  ]
}