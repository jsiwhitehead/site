(view) => [
  flow: ['row', 5, 'center']
  ~
  [
    size: 15
    bold: yes
    fill:
      if view = 'Passages' then
        'lightgreen'
      else if hover then
        'lightblue'
      else
        '#ddd'
    pad: [10, 0]
    width: 150
    align: 'center'
    round: [left: 40]
    when click push 'Passages' -> view
    ~
    'Passages'
  ]
  [
    size: 15
    bold: yes
    fill:
      if view = 'Documents' then
        'lightgreen'
      else if hover then
        'lightblue'
      else
        '#ddd'
    pad: [10, 0]
    width: 150
    align: 'center'
    round: [right: 40]
    when click push 'Documents' -> view
    ~
    'Documents'
  ]
]