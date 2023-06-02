(p, allType, citation, prayer) => {
  level: if p.section & p.title then length(p.section)
  ~
  [
    flow: 15
    ~
    [
      style: [
        position: 'relative'
      ]
      ~
      if p.index & !citation & !prayer then [
        size: 13
        color: '#999'
        align: 'right'
        width: 50
        style: [
          position: 'absolute'
          top: '2px'
          left: '-60px'
          userSelect: 'none'
        ]
        ~
        p.index
      ]
      [
        align:
          if p.section & !p.title then 'center'
          else if p.section then 'left'
          else if p.type = 'quote' | p.type = 'lines' then 'left'
          else if p.type then 'center'
          else 'left'
        size: if level then 25 - level * 2
        uppercase: level = 1 | p.type = 'call'
        bold: level <= 2 | p.type = 'quote'
        italic: level > 2 | p.type = 'info'
        indent: if !p.type & (p.index != 1) & !citation then  20
        pad:
          if p.type = 'call' | p.type = 'info' then [0, 40]
          else if allType then 0
          else if p.type = 'quote' then [0, 20]
          else if p.type = 'lines' then [0, 40]
          else if level = 1 then [top: 20]
          else if level <= 2 then 0
          else [0, (level - 2) * 20]
        flow: if p.type = 'lines' then 17 / 2
        style: if p.type = 'lines' then [whiteSpace: 'pre-wrap']
        ~
        if p.section then p.title | '* * *'
        else if p.type = 'quote' then p.text
        else if p.type = 'lines' then for l in p.lines renderLine(l, p.author, yes)
        else renderLine(p.text, p.author, citation)
      ]
    ]
    if p.type = 'quote' then [
      size: 16
      italic: yes
      align: 'right'
      color: colors.link[p.author] | colors.link['The World Centre']
      pad: [left: 0.25, right: 20]
      style: [
        'overflow-wrap': 'anywhere'
      ]
      ~
      p.ref
    ]
    if citation then [
      align: 'right'
      italic: yes
      color: colors.link[p.author] | colors.link['The World Centre']
      pad: [left: 0.25]
      style: [
        'overflow-wrap': 'anywhere'
      ]
      ~
      p.ref
    ]
  ]
}