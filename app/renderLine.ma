(parts, author, citation, highlight) => [
  flow: 'inline'
  ~
  for p in parts
    if p.first & !citation then [
      size: 60
      line: 1
      color:
        colors.link[author] | colors.link['The World Centre']
      pad: [right: 8]
      style: [float: 'left', margin: '-6px 0 -10px']
      bold: p.quote
      fill: if p.count > 0 & highlight
        then 'rgb(255, {240 - p.count * 10}, {240 - p.count * 10})'
      ~
      p.text
    ]
    else if p.ref then {
      if highlight then [
        size: 15
        italic: yes
        pad: [5, 0]
        color: colors.link[p.ref.path[1]] | colors.link['The World Centre']
        fill: if p.count > 0
          then 'rgb(255, {240 - p.count * 10}, {240 - p.count * 10})'
        underline: hover
        when click push ['': p.ref.paragraph ~ p.ref.id] -> url
        ~
        p.text
      ]
    }
    else [
      bold: p.quote
      pad: [2.5, 0]
      fill: if p.count > 0 & highlight
        then 'rgb(255, {240 - p.count * 10}, {240 - p.count * 10})'
      ~
      p.text
    ]
]