{
  search:: ''
  ~
  [
    font: 'Atkinson Hyperlegible'
    color: '#333'
    position: 'center'
    size: config.baseSize
    fill: '#fafaed'
    style: [
      letterSpacing: '0.025em'
      wordSpacing: '0.1em'
      fontVariantLigatures: 'none'
    ]
    ~
    [
      gap: 40
      pad: [40, 0]
      maxWidth: config.textWidth + (2 * config.sideWidth)
      ~
      [
        bold: yes
        size: 24
        ~
        'Bahá’í Library'
      ]
      [
        pad: [5, 10]
        placeholder: 'Search here...'
        input: search
      ]
      [
        gap: 40
        position: 'center'
        ~
        for passage in passages(search) {
          [
            gap: 25
            maxWidth: config.textWidth
            ~
            for para in passage.paragraphs [
              flow: 'inline'
              ~
              for part in para [
                fill: if part.highlight '#fff79e'
                pad: [2.5, 3.5]
                style: [margin: '0 -3.5px']
                ~
                part.text
              ]
            ]
          ]
          [
            fill: '#ddd'
            pad: [top: 2]
          ]
        }
      ]
    ]
  ]
}