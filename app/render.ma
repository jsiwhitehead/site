(doc) => [
  flow: 50
  ~
  [
    align: 'center'
    bold: yes
    flow: 30
    ~
    [
      flow: 15
      ~
      [
        flow: 5
        ~
        for p in doc.path p
      ]
      [doc.author]
    ]
    [
      size: 30
      ~
      doc.title | (doc.item & '#{doc.item}')
    ]
  ]
  [
    flow: 25
    ~
    for p, i in doc.paragraphs renderPara(p, i - 1, doc.allType, no, no, p)
  ]
]