(page) => [
  flow: ['row', 5]
  ~
  [
    size: 20
    bold: yes
    fill:
      if page = 'Writings' then
        'lightgreen'
      else if hover then
        'lightblue'
      else
        '#ddd'
    pad: [12, 0]
    width: 0.5
    align: 'center'
    when click push 'Writings' -> page
    ~
    'Bahá’í Writings'
  ]
  [
    size: 20
    bold: yes
    fill:
      if page = 'Prayers' then
        'lightgreen'
      else if hover then
        'lightblue'
      else
        '#ddd'
    pad: [12, 0]
    width: 0.5
    align: 'center'
    when click push 'Prayers' -> page
    ~
    'Bahá’í Prayers'
  ]
]