for c, i in collections('Bahá’u’lláh') [
  fill: if i % 2 = 1 then '#eee'
  round: 10
  ~
  c.title
  [
    flow: 17 / 2
    ~
    for d in c.documents if d.title then [d.title]
  ]
  c.time
]