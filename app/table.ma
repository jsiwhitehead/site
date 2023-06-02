(selected) => [
  flow: ['grid', 'auto', 'auto', 'auto', 'auto', 'auto']
  ~
  [pad: [10, 15], bold: yes, align: 'center' ~ '#']
  [pad: [10, 15], bold: yes ~ 'Author']
  [pad: [10, 15], bold: yes ~ 'Title']
  [pad: [10, 15], bold: yes ~ 'Collection']
  [pad: [10, 15], bold: yes ~ 'Length']
  for d, i in documents(selected) {
    fill: if i % 2 = 1 then '#eee'
    color: colors.link[d.author] | colors.link['The World Centre']
    hovered is maybe: no
    ~
    [
      pad: [12, 15]
      bold: yes
      size: 13
      align: 'center'
      color: '#999'
      ~
      i
    ]
    [
      pad: [10, 15]
      fill: fill
      round: [topLeft: 10, bottomLeft: 10]
      color: color
      underline: hovered
      when hover push hover -> hovered
      when click push [d.id] -> url
      ~
      d.author
    ]
    [
      pad: [10, 15]
      fill: fill
      color: color
      underline: hovered
      flow: 10
      when hover push hover -> hovered
      when click push [d.id] -> url
      ~
      d.title | '#{d.item}'
      if d.summary then [
        italic: yes
        size: 14
        underline: no
        ~
        d.summary
      ]
    ]
    [
      pad: [10, 15]
      fill: fill
      color: color
      underline: hovered
      when hover push hover -> hovered
      when click push [d.id] -> url
      ~
      '{for p, j in d.path { if j != 1 then ', ', p }}'
    ]
    [
      pad: [10, 15]
      fill: fill
      round: [topRight: 10, bottomRight: 10]
      color: color
      underline: hovered
      when hover push hover -> hovered
      when click push [d.id] -> url
      ~
      d.time
    ]
  }
]