(parts, author, citation) => [
  flow: 'inline'
  ~
  for p in parts
    if p.first & !citation then [
      size: 17 * 3
      line: 1
      color:
        colors.link[author] | colors.link['The World Centre']
      pad: [right: 8]
      style: [float: 'left']
      bold: p.quote
      fill: if p.count > 0 & no
        then 'rgb(255, {240 - p.count * 10}, {240 - p.count * 10})'
      ~
      p.text
    ]
    else [
      bold: p.quote
      pad: [2.5, 0]
      fill: if p.count > 0 & no
        then 'rgb(255, {240 - p.count * 10}, {240 - p.count * 10})'
      ~
      p.text
    ]
]