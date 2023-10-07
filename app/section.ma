(title, docs, extraTab) => {
  [
    bold: yes
    underline: yes
    size: 17
    ~
    title
  ]
  for d in docs [
    flow: 5
    color: colors.link[d.author] | colors.link['The World Centre']
    pad: 7.5
    style: [margin: '-7.5px']
    underline: hover
    when click push [d.id] -> url
    ~
    [
      bold: yes
      ~
      d.title | '“{d.initial} . . .”'
      if (title != 'Short (2-5 mins)') then ' ({d.mins})'
    ]
    if d.summary & extraTab != 'Prayers' then [
      italic: yes
      size: 12
      ~
      d.summary
    ]
    if length(d.path) > 0 & d.path[1] != 'Additional' & (extraTab = 'Prayers' | d.path[1] = 'The World Order of Bahá’u’lláh') then [
      italic: yes
      size: 12
      pad: [left: 10]
      ~
      '('
      for p, j in d.path
        if j = length(d.path) then p else '{p}, '
      ')'
    ]
  ]
}