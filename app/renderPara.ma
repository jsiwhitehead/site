(p, paraIndex, allType, compilation, citation, prayer, fullPara) => {
  level: if p.section & p.title then length(p.section)
  showCitations is any: no
  ~
  [
    id: paraIndex
    flow: 15
    ~
    [
      style: [
        position: 'relative'
      ]
      ~
      if p.index & !citation & !prayer then [
        size: 13
        color: if p.max = 0 then '#999' else '#cc6666'
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
          else if p.type = 'blockquote' | p.type = 'lines' then 'left'
          else if p.type then 'center'
          else 'left'
        size: if level then 25 - level * 2
        uppercase: level = 1 | p.type = 'call'
        bold: level <= 2
        italic: level > 2 | p.type = 'info'
        indent:
          if !p.type & (p.index != 1) & !citation then  20
          else if p.type = 'lines' & !allType then -30
        pad:
          if p.type = 'call' | p.type = 'info' then [0, 40]
          else if allType then 0
          else if p.type = 'blockquote' then [0, 20]
          else if p.type = 'lines' then [0, 70]
          else if level = 1 then [top: 20]
          else if level <= 2 then 0
          else [0, (level - 2) * 20]
        flow: if p.type = 'lines' then 17 / 2
        style: if p.type = 'lines' then [whiteSpace: 'pre-wrap']
        when click push !showCitations -> showCitations
        ~
        if p.section then
          p.title | '* * *'
        else if p.type = 'lines' then
          for l in (if showCitations then fullPara else p).lines 
            renderLine(l, p.author, yes, showCitations)
        else
          renderLine((if showCitations then fullPara else p).text, p.author, citation, showCitations)
      ]
    ]
    if p.type = 'quote' then [
      size: 15
      italic: yes
      align: 'right'
      color: colors.link[p.author] | colors.link['The World Centre']
      pad: [0, 20]
      style: [
        'max-width': '470px'
        'margin-left': 'auto'
      ]
      underline: hover
      when click push ['': p.ref.paragraph ~ p.ref.id] -> url
      ~
      for t, i in p.ref.path {
        if i > 1 then ' '
        [
          underline: hover
          style: [display: 'inline-block']
          ~
          if i = length(p.ref.path) then t else '{t},'
        ]
      }
    ]
    if citation then [
      size: 15
      align: 'right'
      italic: yes
      color: colors.link[p.author] | colors.link['The World Centre']
      style: [
        'max-width': '450px'
        'margin-left': 'auto'
      ]
      underline: hover
      when click push ['': p.ref.paragraph ~ p.ref.id] -> url
      ~
      for t, i in p.ref.path {
        if i > 1 then ' '
        [
          underline: hover
          style: [display: 'inline-block']
          ~
          if i = length(p.ref.path) then t else '{t},'
        ]
      }
    ]
    if showCitations & p.citations then [
      flow: 12
      pad: [left: 13]
      ~
      for ref, index in p.citations [
        size: 12
        italic: yes
        color: colors.link[ref.path[1]] | colors.link['The World Centre']
        pad: [top: if index = 1 then 10, left: 15]
        indent: -12
        style: [
          'display': 'list-item'
          'list-style-type': 'disc'
        ]
        underline: hover
        when click push ['': ref.paragraph ~ ref.id] -> url
        ~
        for t, i in ref.path
          if i = length(ref.path) then t else '{t}, '
      ]
    ]
  ]
}