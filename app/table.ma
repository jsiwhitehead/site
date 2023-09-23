(selected) => {
  withAuthor: includes(
    ['Heroic Age', 'Word of God'],
    selected
  )
  withCollection: includes(
    ['Heroic Age', 'Word of God', 'The Báb', 'Bahá’u’lláh', '‘Abdu’l‑Bahá'],
    selected
  )
  ~
  [
    size: 15
    flow: [
      'grid'
      47
      71
      if withAuthor then 'auto'
      'auto'
      if withCollection then 'auto'
    ]
    ~
    [pad: [7, 10], bold: yes, align: 'center' ~ '#']
    [pad: [7, 10], bold: yes ~ 'Length']
    if withAuthor then [pad: [7, 10], bold: yes ~ 'Author']
    [pad: [7, 10], bold: yes ~ 'Title']
    if withCollection then [pad: [7, 10], bold: yes ~ 'Collection']
    for d, i in documents(selected) {
      fill: if i % 2 = 1 then '#eee'
      color: colors.link[d.author] | colors.link['The World Centre']
      hovered is maybe: no
      ~
      [
        pad: [8, 10]
        bold: yes
        size: 13
        align: 'center'
        color: '#999'
        ~
        i
      ]
      [
        pad: [7, 10]
        fill: fill
        round: [topLeft: 10, bottomLeft: 10]
        color: color
        underline: hovered
        when hover push hover -> hovered
        when click push [d.id] -> url
        ~
        d.time
      ]
      if withAuthor then [
        pad: [7, 10]
        fill: fill
        color: color
        underline: hovered
        when hover push hover -> hovered
        when click push [d.id] -> url
        ~
        d.author
      ]
      [
        pad: [7, 10]
        fill: fill
        round: if !withCollection then [topRight: 10, bottomRight: 10]
        color: color
        underline: hovered
        flow: 10
        when hover push hover -> hovered
        when click push [d.id] -> url
        ~
        [
          flow: 'inline'
          ~
          [
            bold: yes
            ~
            d.title | '#{d.item}'
          ]
          if d.epoch & d.author != 'Shoghi Effendi'
            & d.author != 'The Universal House of Justice' then [
            italic: yes
            size: 13
            ~
            ' ({d.author})'
          ]
        ]
        
        if d.summary then [
          italic: yes
          size: 13
          underline: no
          ~
          d.summary
        ]
      ]
      if withCollection then [
        pad: [7, 10]
        fill: fill
        round: [topRight: 10, bottomRight: 10]
        color: color
        underline: hovered
        flow: 7.5
        when hover push hover -> hovered
        when click push [d.id] -> url
        ~
        for p, j in d.path
          if j = length(d.path) then p else '{p},'
      ]
    }
  ]
}