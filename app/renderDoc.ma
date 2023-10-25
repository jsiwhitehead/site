[
  [
    bold: yes
    ~
    writings[1].title
  ]
  for para in writings[1].paragraphs {
    render(para, writings[1].author, writings[1].allSpecial)
  }
]