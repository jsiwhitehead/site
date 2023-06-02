(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();const dr=`(selected) => {
  authorItem: (label, pad, span, nested) => [
    pad: [pad, 0]
    fill:
      if (selected = label | hover) then
        'lightgreen'
      else if includes(nested, selected) then
        'lightblue'
      else
        '#ddd'
    span: span
    when click push label -> selected
    ~
    label
  ]
  ~
  [
    bold: yes
    align: 'center'
    size: 15
    flow: [gap: 5 ~ 'grid', 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ~
    authorItem('Bahá’í Era', 7.5, 9, [])
    authorItem('Heroic Age', 7.5, 3, ['Bahá’í Era'])
    authorItem('Formative Age', 7.5, 6, ['Bahá’í Era'])
    authorItem('Word of God', 7.5, 2, ['Bahá’í Era', 'Heroic Age'])
    authorItem('‘Abdu’l‑Bahá', 25, [1, 2], ['Bahá’í Era', 'Heroic Age'])
    authorItem('Shoghi Effendi', 7.5, 2, ['Bahá’í Era', 'Formative Age'])
    authorItem('The Universal House of Justice', 7.5, 4, ['Bahá’í Era', 'Formative Age'])
    authorItem('The Báb', 7.5, 1, ['Bahá’í Era', 'Heroic Age', 'Word of God'])
    authorItem('Bahá’u’lláh', 7.5, 1, ['Bahá’í Era', 'Heroic Age', 'Word of God'])
    authorItem('First Epoch', 7.5, 1, ['Bahá’í Era', 'Formative Age', 'Shoghi Effendi'])
    authorItem('Second Epoch', 7.5, 1, ['Bahá’í Era', 'Formative Age', 'Shoghi Effendi'])
    authorItem('Third Epoch', 7.5, 1, ['Bahá’í Era', 'Formative Age', 'The Universal House of Justice'])
    authorItem('Fourth Epoch', 7.5, 1, ['Bahá’í Era', 'Formative Age', 'The Universal House of Justice'])
    authorItem('Fifth Epoch', 7.5, 1, ['Bahá’í Era', 'Formative Age', 'The Universal House of Justice'])
    authorItem('Sixth Epoch', 7.5, 1, ['Bahá’í Era', 'Formative Age', 'The Universal House of Justice'])
  ]
}`,gr=`for c, i in collections('Bahá’u’lláh') [
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
]`,yr=`[
  'original': [
    'The Báb': '#D1F7C4',
    'Bahá’u’lláh': '#FFDCE5',
    '‘Abdu’l‑Bahá': '#D0F0FD',
    'Shoghi Effendi': '#FFEAB6',
    'The Universal House of Justice': '#EDE2FE',
    'Bahá’í International Community': '#CFDFFF'
  ],
  'base': [
    'The Báb': '#cbf6bc',
    'Bahá’u’lláh': '#ffb3c6',
    '‘Abdu’l‑Bahá': '#b6e8fc',
    'Shoghi Effendi': '#ffe9b3',
    'The Universal House of Justice': '#d1b5fc',
  ],
  'light': [
    'The Báb': '#f1fded',
    'Bahá’u’lláh': '#ffebef',
    '‘Abdu’l‑Bahá': '#ebf8fe',
    'Shoghi Effendi': '#fff9eb',
    'The Universal House of Justice': '#f3ebfe',
  ],
  'dark': [
    'The Báb': '#96ed78',
    'Bahá’u’lláh': '#ff668b',
    '‘Abdu’l‑Bahá': '#6cd0f9',
    'Shoghi Effendi': '#ffd266',
    'The Universal House of Justice': '#a46cf9',
  ],
  'link': [
    'The Báb': '#27ae60',
    'Bahá’u’lláh': '#c0392b',
    '‘Abdu’l‑Bahá': '#2980b9',
    'Shoghi Effendi': '#f39c12',
    'The Universal House of Justice': '#4834d4',
    'Commissioned by the Universal House of Justice': '#4834d4',
    'The World Centre': '#8e44ad',
    'Bahá’í International Community': '#8e44ad',
    'The International Teaching Centre': '#8e44ad',
    'The International Development Organisation': '#8e44ad',
    'The Office of Social and Economic Development': '#8e44ad',
    'The Department of Statistics': '#8e44ad',
    'The Research Department': '#8e44ad',
    'Compilation': '#8e44ad',
    'The Ruhi Institute': '#8e44ad',
  ]
]`,vr=`[
  font: 'Atkinson Hyperlegible'
  size: 17
  color: '#333'
  fill: '#fafaed'
  style: [
    letterSpacing: '0.025em'
    wordSpacing: '0.1em'
    fontVariantLigatures: 'none'
    'min-height': '100%'
  ]
  ~
  if url[1] then {
    id: url[1]
    doc: documentById(id)
    ~
    [
      pad: 50
      ~
      [
        maxWidth: 630
        ~
        render(doc)
      ]
    ]
  } else {
    page is any: 'Writings'
    ~
    [
      flow: 25
      ~
      nav(page)
      if page = 'Writings' then {
        author is any: 'Bahá’í Era'
        view is any: 'Passages'
        ~
        [
          flow: 25
          ~
          [
            pad: [0, 50]
            ~
            authorSelect(author)
          ]
          tabs(view)
          if view = 'Documents' then
            [
              pad: [0, 50, 50]
              ~
              table(author)
            ]
          else
            [
              flow: 80
              maxWidth: 630
              pad: [50, 0]
              ~
              for p in allParagraphs(author, yes) renderPara(p, yes, yes, no)
            ]
        ]
      } else {
        pview is any: 'General'
        ppage is any: 'Illumination'
        ~
        [
          flow: 25
          ~
          [
            flow: ['row', 5, 'center']
            ~
            for x, i in [
              ['General', 'Illumination']
              ['People', 'gathering']
              ['Specific', 'obligatory']
            ]
              [
                size: 15
                bold: yes
                fill:
                  if pview = x[1] then
                    'lightgreen'
                  else if hover then
                    'lightblue'
                  else
                    '#ddd'
                pad: [12, 0]
                width: 150
                align: 'center'
                round: [left: if i = 1 then 40, right: if i = 3 then 40]
                when click push x[1] -> pview
                when click push x[2] -> ppage
                ~
                x[1]
              ]
          ]
          if pview = 'General' then
            [
              flow: ['row', 5]
              pad: [0, 50]
              align: 'center'
              size: 15
              bold: yes
              ~
              for x, i in [
                ['Illumination', 'Light']
                ['Longing', 'Love']
                ['Abundance', 'Bounty']
                ['Compassion', 'Mercy']
                ['Steadfastness', 'Will']
                ['Unity', 'Unity']
              ]
                [
                  width: 1/6
                  fill:
                    if ppage = x[1] then
                      'lightgreen'
                    else if hover then
                      'lightblue'
                    else
                      '#ddd'
                  pad: [12, 0]
                  round: [left: if i = 1 then 100, right: if i = 6 then 100]
                  when click push x[1] -> ppage
                  ~
                  x[1]
                ]
            ]
          else if pview = 'People' then
            [
              flow: ['row', 5]
              pad: [0, 50]
              align: 'center'
              size: 15
              bold: yes
              ~
              for x, i in [
                ['gathering', 'Gathering']
                ['children', 'Children']
                ['youth', 'Youth']
                ['family', 'Family']
                ['parents', 'Parents']
                ['women', 'Women']
                ['departed', 'Departed']
              ]
                [
                  width: 1/7
                  fill:
                    if ppage = x[1] then
                      'lightgreen'
                    else if hover then
                      'lightblue'
                    else
                      '#ddd'
                  pad: [12, 0]
                  round: [left: if i = 1 then 100, right: if i = 7 then 100]
                  when click push x[1] -> ppage
                  ~
                  x[2]
                ]
            ]
          else
            [
              flow: ['row', 5]
              pad: [0, 50]
              align: 'center'
              size: 15
              bold: yes
              ~
              for x, i in [
                ['obligatory', 'Obligatory']
                ['morning', 'Morning']
                ['midnight', 'Midnight']
                ['journey', 'Journey']
                ['healing', 'Healing']
                ['fast', 'Fast']
                ['marriage', 'Marriage']
                ['tests', 'Opposition']
              ]
                [
                  width: 1/8
                  fill:
                    if ppage = x[1] then
                      'lightgreen'
                    else if hover then
                      'lightblue'
                    else
                      '#ddd'
                  pad: [12, 0]
                  round: [left: if i = 1 then 100, right: if i = 8 then 100]
                  when click push x[1] -> ppage
                  ~
                  x[2]
                ]
            ]
          [
            flow: 80
            maxWidth: 630
            pad: [50, 0]
            ~
            for prayer in prayers()[ppage] [
              flow: 25
              ~
              for p in prayer.paragraphs renderPara(p, no, no, yes)
              [
                align: 'right'
                italic: yes
                color: colors.link[prayer.author]
                ~
                '— {prayer.author}'
              ]
            ]
          ]
        ]
      }
    ]
  }
]`,Ir=`(page) => [
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
]`,_r=`(doc) => [
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
      doc.title | '#{doc.item}'
    ]
  ]
  [
    flow: 25
    ~
    for p in doc.paragraphs renderPara(p, doc.allType, no, no)
  ]
]`,br=`(parts, author, citation) => [
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
]`,wr=`(p, allType, citation, prayer) => {
  level: if p.section & p.title then length(p.section)
  ~
  [
    flow: 15
    ~
    [
      style: [
        position: 'relative'
      ]
      ~
      if p.index & !citation & !prayer then [
        size: 13
        color: '#999'
        align: 'right'
        width: 50
        style: [
          position: 'absolute'
          top: '2px'
          left: '-60px'
          userSelect: 'none'
        ]
        ~
        p.index
      ]
      [
        align:
          if p.section & !p.title then 'center'
          else if p.section then 'left'
          else if p.type = 'quote' | p.type = 'lines' then 'left'
          else if p.type then 'justify-center'
          else 'left'
        size: if level then 25 - level * 2
        uppercase: level = 1 | p.type = 'call'
        bold: level <= 2 | p.type = 'quote'
        italic: level > 2 | p.type = 'info'
        indent: if !p.type & (p.index != 1) & !citation then  20
        pad:
          if p.type = 'call' | p.type = 'info' then [0, 60]
          else if allType then 0
          else if p.type = 'quote' then [0, 20]
          else if p.type = 'lines' then [0, 40]
          else if level = 1 then [top: 20]
          else if level <= 2 then 0
          else [0, (level - 2) * 20]
        flow: if p.type = 'lines' then 17 / 2
        style: if p.type = 'lines' then [whiteSpace: 'pre-wrap']
        ~
        if p.section then p.title | '* * *'
        else if p.type = 'quote' then p.text
        else if p.type = 'lines' then for l in p.lines renderLine(l, p.author, yes)
        else renderLine(p.text, p.author, citation)
      ]
    ]
    if p.type = 'quote' then [
      size: 16
      italic: yes
      align: 'right'
      color: colors.link[p.author] | colors.link['The World Centre']
      pad: [left: 0.25, right: 20]
      ~
      p.ref
    ]
    if citation then [
      align: 'right'
      italic: yes
      color: colors.link[p.author] | colors.link['The World Centre']
      pad: [left: 0.25]
      ~
      p.ref
    ]
  ]
}`,xr=`(selected) => [
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
]`,Sr=`(view) => [
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
    pad: [12, 0]
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
    pad: [12, 0]
    width: 150
    align: 'center'
    round: [right: 40]
    when click push 'Documents' -> view
    ~
    'Documents'
  ]
]`;function Ar(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var _n={exports:{}};(function(t){(function(){function e(o,l,m){return o.call.apply(o.bind,arguments)}function n(o,l,m){if(!o)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var y=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(y,f),o.apply(l,y)}}return function(){return o.apply(l,arguments)}}function r(o,l,m){return r=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?e:n,r.apply(null,arguments)}var i=Date.now||function(){return+new Date};function s(o,l){this.a=o,this.o=l||o,this.c=this.o.document}var a=!!window.FontFace;function u(o,l,m,f){if(l=o.c.createElement(l),m)for(var y in m)m.hasOwnProperty(y)&&(y=="style"?l.style.cssText=m[y]:l.setAttribute(y,m[y]));return f&&l.appendChild(o.c.createTextNode(f)),l}function p(o,l,m){o=o.c.getElementsByTagName(l)[0],o||(o=document.documentElement),o.insertBefore(m,o.lastChild)}function d(o){o.parentNode&&o.parentNode.removeChild(o)}function c(o,l,m){l=l||[],m=m||[];for(var f=o.className.split(/\s+/),y=0;y<l.length;y+=1){for(var I=!1,_=0;_<f.length;_+=1)if(l[y]===f[_]){I=!0;break}I||f.push(l[y])}for(l=[],y=0;y<f.length;y+=1){for(I=!1,_=0;_<m.length;_+=1)if(f[y]===m[_]){I=!0;break}I||l.push(f[y])}o.className=l.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function h(o,l){for(var m=o.className.split(/\s+/),f=0,y=m.length;f<y;f++)if(m[f]==l)return!0;return!1}function g(o){return o.o.location.hostname||o.a.location.hostname}function v(o,l,m){function f(){S&&y&&I&&(S(_),S=null)}l=u(o,"link",{rel:"stylesheet",href:l,media:"all"});var y=!1,I=!0,_=null,S=m||null;a?(l.onload=function(){y=!0,f()},l.onerror=function(){y=!0,_=Error("Stylesheet failed to load"),f()}):setTimeout(function(){y=!0,f()},0),p(o,"head",l)}function x(o,l,m,f){var y=o.c.getElementsByTagName("head")[0];if(y){var I=u(o,"script",{src:l}),_=!1;return I.onload=I.onreadystatechange=function(){_||this.readyState&&this.readyState!="loaded"&&this.readyState!="complete"||(_=!0,m&&m(null),I.onload=I.onreadystatechange=null,I.parentNode.tagName=="HEAD"&&y.removeChild(I))},y.appendChild(I),setTimeout(function(){_||(_=!0,m&&m(Error("Script load timeout")))},f||5e3),I}return null}function L(){this.a=0,this.c=null}function E(o){return o.a++,function(){o.a--,ie(o)}}function te(o,l){o.c=l,ie(o)}function ie(o){o.a==0&&o.c&&(o.c(),o.c=null)}function ye(o){this.a=o||"-"}ye.prototype.c=function(o){for(var l=[],m=0;m<arguments.length;m++)l.push(arguments[m].replace(/[\W_]+/g,"").toLowerCase());return l.join(this.a)};function Y(o,l){this.c=o,this.f=4,this.a="n";var m=(l||"n4").match(/^([nio])([1-9])$/i);m&&(this.a=m[1],this.f=parseInt(m[2],10))}function ve(o){return N(o)+" "+(o.f+"00")+" 300px "+qe(o.c)}function qe(o){var l=[];o=o.split(/,\s*/);for(var m=0;m<o.length;m++){var f=o[m].replace(/['"]/g,"");f.indexOf(" ")!=-1||/^\d/.test(f)?l.push("'"+f+"'"):l.push(f)}return l.join(",")}function b(o){return o.a+o.f}function N(o){var l="normal";return o.a==="o"?l="oblique":o.a==="i"&&(l="italic"),l}function M(o){var l=4,m="n",f=null;return o&&((f=o.match(/(normal|oblique|italic)/i))&&f[1]&&(m=f[1].substr(0,1).toLowerCase()),(f=o.match(/([1-9]00|normal|bold)/i))&&f[1]&&(/bold/i.test(f[1])?l=7:/[1-9]00/.test(f[1])&&(l=parseInt(f[1].substr(0,1),10)))),m+l}function oe(o,l){this.c=o,this.f=o.o.document.documentElement,this.h=l,this.a=new ye("-"),this.j=l.events!==!1,this.g=l.classes!==!1}function ne(o){o.g&&c(o.f,[o.a.c("wf","loading")]),ce(o,"loading")}function ue(o){if(o.g){var l=h(o.f,o.a.c("wf","active")),m=[],f=[o.a.c("wf","loading")];l||m.push(o.a.c("wf","inactive")),c(o.f,m,f)}ce(o,"inactive")}function ce(o,l,m){o.j&&o.h[l]&&(m?o.h[l](m.c,b(m)):o.h[l]())}function Oe(){this.c={}}function kt(o,l,m){var f=[],y;for(y in l)if(l.hasOwnProperty(y)){var I=o.c[y];I&&f.push(I(l[y],m))}return f}function $e(o,l){this.c=o,this.f=l,this.a=u(this.c,"span",{"aria-hidden":"true"},this.f)}function Ue(o){p(o.c,"body",o.a)}function He(o){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+qe(o.c)+";"+("font-style:"+N(o)+";font-weight:"+(o.f+"00")+";")}function Dt(o,l,m,f,y,I){this.g=o,this.j=l,this.a=f,this.c=m,this.f=y||3e3,this.h=I||void 0}Dt.prototype.start=function(){var o=this.c.o.document,l=this,m=i(),f=new Promise(function(_,S){function A(){i()-m>=l.f?S():o.fonts.load(ve(l.a),l.h).then(function(P){1<=P.length?_():setTimeout(A,25)},function(){S()})}A()}),y=null,I=new Promise(function(_,S){y=setTimeout(S,l.f)});Promise.race([I,f]).then(function(){y&&(clearTimeout(y),y=null),l.g(l.a)},function(){l.j(l.a)})};function jt(o,l,m,f,y,I,_){this.v=o,this.B=l,this.c=m,this.a=f,this.s=_||"BESbswy",this.f={},this.w=y||3e3,this.u=I||null,this.m=this.j=this.h=this.g=null,this.g=new $e(this.c,this.s),this.h=new $e(this.c,this.s),this.j=new $e(this.c,this.s),this.m=new $e(this.c,this.s),o=new Y(this.a.c+",serif",b(this.a)),o=He(o),this.g.a.style.cssText=o,o=new Y(this.a.c+",sans-serif",b(this.a)),o=He(o),this.h.a.style.cssText=o,o=new Y("serif",b(this.a)),o=He(o),this.j.a.style.cssText=o,o=new Y("sans-serif",b(this.a)),o=He(o),this.m.a.style.cssText=o,Ue(this.g),Ue(this.h),Ue(this.j),Ue(this.m)}var ze={D:"serif",C:"sans-serif"},lt=null;function Bt(){if(lt===null){var o=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);lt=!!o&&(536>parseInt(o[1],10)||parseInt(o[1],10)===536&&11>=parseInt(o[2],10))}return lt}jt.prototype.start=function(){this.f.serif=this.j.a.offsetWidth,this.f["sans-serif"]=this.m.a.offsetWidth,this.A=i(),Gt(this)};function Mt(o,l,m){for(var f in ze)if(ze.hasOwnProperty(f)&&l===o.f[ze[f]]&&m===o.f[ze[f]])return!0;return!1}function Gt(o){var l=o.g.a.offsetWidth,m=o.h.a.offsetWidth,f;(f=l===o.f.serif&&m===o.f["sans-serif"])||(f=Bt()&&Mt(o,l,m)),f?i()-o.A>=o.w?Bt()&&Mt(o,l,m)&&(o.u===null||o.u.hasOwnProperty(o.a.c))?ct(o,o.v):ct(o,o.B):tr(o):ct(o,o.v)}function tr(o){setTimeout(r(function(){Gt(this)},o),50)}function ct(o,l){setTimeout(r(function(){d(this.g.a),d(this.h.a),d(this.j.a),d(this.m.a),l(this.a)},o),0)}function ut(o,l,m){this.c=o,this.a=l,this.f=0,this.m=this.j=!1,this.s=m}var We=null;ut.prototype.g=function(o){var l=this.a;l.g&&c(l.f,[l.a.c("wf",o.c,b(o).toString(),"active")],[l.a.c("wf",o.c,b(o).toString(),"loading"),l.a.c("wf",o.c,b(o).toString(),"inactive")]),ce(l,"fontactive",o),this.m=!0,qt(this)},ut.prototype.h=function(o){var l=this.a;if(l.g){var m=h(l.f,l.a.c("wf",o.c,b(o).toString(),"active")),f=[],y=[l.a.c("wf",o.c,b(o).toString(),"loading")];m||f.push(l.a.c("wf",o.c,b(o).toString(),"inactive")),c(l.f,f,y)}ce(l,"fontinactive",o),qt(this)};function qt(o){--o.f==0&&o.j&&(o.m?(o=o.a,o.g&&c(o.f,[o.a.c("wf","active")],[o.a.c("wf","loading"),o.a.c("wf","inactive")]),ce(o,"active")):ue(o.a))}function $t(o){this.j=o,this.a=new Oe,this.h=0,this.f=this.g=!0}$t.prototype.load=function(o){this.c=new s(this.j,o.context||this.j),this.g=o.events!==!1,this.f=o.classes!==!1,rr(this,new oe(this.c,o),o)};function nr(o,l,m,f,y){var I=--o.h==0;(o.f||o.g)&&setTimeout(function(){var _=y||null,S=f||null||{};if(m.length===0&&I)ue(l.a);else{l.f+=m.length,I&&(l.j=I);var A,P=[];for(A=0;A<m.length;A++){var R=m[A],z=S[R.c],ae=l.a,Ne=R;if(ae.g&&c(ae.f,[ae.a.c("wf",Ne.c,b(Ne).toString(),"loading")]),ce(ae,"fontloading",Ne),ae=null,We===null)if(window.FontFace){var Ne=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),mr=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);We=Ne?42<parseInt(Ne[1],10):!mr}else We=!1;We?ae=new Dt(r(l.g,l),r(l.h,l),l.c,R,l.s,z):ae=new jt(r(l.g,l),r(l.h,l),l.c,R,l.s,_,z),P.push(ae)}for(A=0;A<P.length;A++)P[A].start()}},0)}function rr(o,l,m){var y=[],f=m.timeout;ne(l);var y=kt(o.a,m,o.c),I=new ut(o.c,l,f);for(o.h=y.length,l=0,m=y.length;l<m;l++)y[l].load(function(_,S,A){nr(o,I,_,S,A)})}function Ut(o,l){this.c=o,this.a=l}Ut.prototype.load=function(o){function l(){if(I["__mti_fntLst"+f]){var _=I["__mti_fntLst"+f](),S=[],A;if(_)for(var P=0;P<_.length;P++){var R=_[P].fontfamily;_[P].fontStyle!=null&&_[P].fontWeight!=null?(A=_[P].fontStyle+_[P].fontWeight,S.push(new Y(R,A))):S.push(new Y(R))}o(S)}else setTimeout(function(){l()},50)}var m=this,f=m.a.projectId,y=m.a.version;if(f){var I=m.c.o;x(this.c,(m.a.api||"https://fast.fonts.net/jsapi")+"/"+f+".js"+(y?"?v="+y:""),function(_){_?o([]):(I["__MonotypeConfiguration__"+f]=function(){return m.a},l())}).id="__MonotypeAPIScript__"+f}else o([])};function Ht(o,l){this.c=o,this.a=l}Ht.prototype.load=function(o){var l,m,f=this.a.urls||[],y=this.a.families||[],I=this.a.testStrings||{},_=new L;for(l=0,m=f.length;l<m;l++)v(this.c,f[l],E(_));var S=[];for(l=0,m=y.length;l<m;l++)if(f=y[l].split(":"),f[1])for(var A=f[1].split(","),P=0;P<A.length;P+=1)S.push(new Y(f[0],A[P]));else S.push(new Y(f[0]));te(_,function(){o(S,I)})};function ir(o,l){o?this.c=o:this.c=sr,this.a=[],this.f=[],this.g=l||""}var sr="https://fonts.googleapis.com/css";function or(o,l){for(var m=l.length,f=0;f<m;f++){var y=l[f].split(":");y.length==3&&o.f.push(y.pop());var I="";y.length==2&&y[1]!=""&&(I=":"),o.a.push(y.join(I))}}function ar(o){if(o.a.length==0)throw Error("No fonts to load!");if(o.c.indexOf("kit=")!=-1)return o.c;for(var l=o.a.length,m=[],f=0;f<l;f++)m.push(o.a[f].replace(/ /g,"+"));return l=o.c+"?family="+m.join("%7C"),0<o.f.length&&(l+="&subset="+o.f.join(",")),0<o.g.length&&(l+="&text="+encodeURIComponent(o.g)),l}function lr(o){this.f=o,this.a=[],this.c={}}var zt={latin:"BESbswy","latin-ext":"çöüğş",cyrillic:"йяЖ",greek:"αβΣ",khmer:"កខគ",Hanuman:"កខគ"},cr={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},ur={i:"i",italic:"i",n:"n",normal:"n"},pr=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;function hr(o){for(var l=o.f.length,m=0;m<l;m++){var f=o.f[m].split(":"),y=f[0].replace(/\+/g," "),I=["n4"];if(2<=f.length){var _,S=f[1];if(_=[],S)for(var S=S.split(","),A=S.length,P=0;P<A;P++){var R;if(R=S[P],R.match(/^[\w-]+$/)){var z=pr.exec(R.toLowerCase());if(z==null)R="";else{if(R=z[2],R=R==null||R==""?"n":ur[R],z=z[1],z==null||z=="")z="4";else var ae=cr[z],z=ae||(isNaN(z)?"4":z.substr(0,1));R=[R,z].join("")}}else R="";R&&_.push(R)}0<_.length&&(I=_),f.length==3&&(f=f[2],_=[],f=f?f.split(","):_,0<f.length&&(f=zt[f[0]])&&(o.c[y]=f))}for(o.c[y]||(f=zt[y])&&(o.c[y]=f),f=0;f<I.length;f+=1)o.a.push(new Y(y,I[f]))}}function Wt(o,l){this.c=o,this.a=l}var fr={Arimo:!0,Cousine:!0,Tinos:!0};Wt.prototype.load=function(o){var l=new L,m=this.c,f=new ir(this.a.api,this.a.text),y=this.a.families;or(f,y);var I=new lr(y);hr(I),v(m,ar(f),E(l)),te(l,function(){o(I.a,I.c,fr)})};function Kt(o,l){this.c=o,this.a=l}Kt.prototype.load=function(o){var l=this.a.id,m=this.c.o;l?x(this.c,(this.a.api||"https://use.typekit.net")+"/"+l+".js",function(f){if(f)o([]);else if(m.Typekit&&m.Typekit.config&&m.Typekit.config.fn){f=m.Typekit.config.fn;for(var y=[],I=0;I<f.length;I+=2)for(var _=f[I],S=f[I+1],A=0;A<S.length;A++)y.push(new Y(_,S[A]));try{m.Typekit.load({events:!1,classes:!1,async:!0})}catch{}o(y)}},2e3):o([])};function Vt(o,l){this.c=o,this.f=l,this.a=[]}Vt.prototype.load=function(o){var l=this.f.id,m=this.c.o,f=this;l?(m.__webfontfontdeckmodule__||(m.__webfontfontdeckmodule__={}),m.__webfontfontdeckmodule__[l]=function(y,I){for(var _=0,S=I.fonts.length;_<S;++_){var A=I.fonts[_];f.a.push(new Y(A.name,M("font-weight:"+A.weight+";font-style:"+A.style)))}o(f.a)},x(this.c,(this.f.api||"https://f.fontdeck.com/s/css/js/")+g(this.c)+"/"+l+".js",function(y){y&&o([])})):o([])};var fe=new $t(window);fe.a.c.custom=function(o,l){return new Ht(l,o)},fe.a.c.fontdeck=function(o,l){return new Vt(l,o)},fe.a.c.monotype=function(o,l){return new Ut(l,o)},fe.a.c.typekit=function(o,l){return new Kt(l,o)},fe.a.c.google=function(o,l){return new Wt(l,o)};var Jt={load:r(fe.load,fe)};t.exports?t.exports=Jt:(window.WebFont=Jt,window.WebFontConfig&&fe.load(window.WebFontConfig))})()})(_n);var Or=_n.exports;const Nr=Ar(Or);function Qe(){return Qe=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Qe.apply(this,arguments)}var Ee;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(Ee||(Ee={}));var Qt=function(t){return t},Yt="beforeunload",Lr="popstate";function Er(t){t===void 0&&(t={});var e=t,n=e.window,r=n===void 0?document.defaultView:n,i=r.history;function s(){var b=r.location,N=b.pathname,M=b.search,oe=b.hash,ne=i.state||{};return[ne.idx,Qt({pathname:N,search:M,hash:oe,state:ne.usr||null,key:ne.key||"default"})]}var a=null;function u(){if(a)v.call(a),a=null;else{var b=Ee.Pop,N=s(),M=N[0],oe=N[1];if(v.length){if(M!=null){var ne=c-M;ne&&(a={action:b,location:oe,retry:function(){ve(ne*-1)}},ve(ne))}}else ie(b)}}r.addEventListener(Lr,u);var p=Ee.Pop,d=s(),c=d[0],h=d[1],g=Xt(),v=Xt();c==null&&(c=0,i.replaceState(Qe({},i.state,{idx:c}),""));function x(b){return typeof b=="string"?b:Rr(b)}function L(b,N){return N===void 0&&(N=null),Qt(Qe({pathname:h.pathname,hash:"",search:""},typeof b=="string"?Fr(b):b,{state:N,key:Pr()}))}function E(b,N){return[{usr:b.state,key:b.key,idx:N},x(b)]}function te(b,N,M){return!v.length||(v.call({action:b,location:N,retry:M}),!1)}function ie(b){p=b;var N=s();c=N[0],h=N[1],g.call({action:p,location:h})}function ye(b,N){var M=Ee.Push,oe=L(b,N);function ne(){ye(b,N)}if(te(M,oe,ne)){var ue=E(oe,c+1),ce=ue[0],Oe=ue[1];try{i.pushState(ce,"",Oe)}catch{r.location.assign(Oe)}ie(M)}}function Y(b,N){var M=Ee.Replace,oe=L(b,N);function ne(){Y(b,N)}if(te(M,oe,ne)){var ue=E(oe,c),ce=ue[0],Oe=ue[1];i.replaceState(ce,"",Oe),ie(M)}}function ve(b){i.go(b)}var qe={get action(){return p},get location(){return h},createHref:x,push:ye,replace:Y,go:ve,back:function(){ve(-1)},forward:function(){ve(1)},listen:function(N){return g.push(N)},block:function(N){var M=v.push(N);return v.length===1&&r.addEventListener(Yt,Zt),function(){M(),v.length||r.removeEventListener(Yt,Zt)}}};return qe}function Zt(t){t.preventDefault(),t.returnValue=""}function Xt(){var t=[];return{get length(){return t.length},push:function(n){return t.push(n),function(){t=t.filter(function(r){return r!==n})}},call:function(n){t.forEach(function(r){return r&&r(n)})}}}function Pr(){return Math.random().toString(36).substr(2,8)}function Rr(t){var e=t.pathname,n=e===void 0?"/":e,r=t.search,i=r===void 0?"":r,s=t.hash,a=s===void 0?"":s;return i&&i!=="?"&&(n+=i.charAt(0)==="?"?i:"?"+i),a&&a!=="#"&&(n+=a.charAt(0)==="#"?a:"#"+a),n}function Fr(t){var e={};if(t){var n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));var r=t.indexOf("?");r>=0&&(e.search=t.substr(r),t=t.substr(0,r)),t&&(e.pathname=t)}return e}function K(t){const e=t||"";return function(){throw new Error("this method "+e+" is abstract! (it has no implementation in class "+this.constructor.name+")")}}function ge(t,e){if(!t)throw new Error(e||"Assertion failed")}function mt(t,e,n){let r;Object.defineProperty(t,e,{get(){return r||(r=n.call(this)),r}})}function Tr(t){return t&&Object.assign({},t)}function bn(t,e){const n=[];for(;e-- >0;)n.push(t());return n}function wn(t,e){return new Array(e+1).join(t)}function nt(t,e){return bn(()=>t,e)}function dt(t){const e=[];for(let n=0;n<t.length;n++){const r=t[n];t.lastIndexOf(r)!==n&&e.indexOf(r)<0&&e.push(r)}return e}function xn(t){const e=[];return t.forEach(n=>{e.indexOf(n)<0&&e.push(n)}),e}function be(t){const e=t[0];return e===e.toUpperCase()}function Sn(t){return!be(t)}function An(t,e,n){const r=n||" ";return t.length<e?wn(r,e-t.length)+t:t}function we(){this.strings=[]}we.prototype.append=function(t){this.strings.push(t)};we.prototype.contents=function(){return this.strings.join("")};const pt=t=>String.fromCodePoint(parseInt(t,16));function On(t){if(t.charAt(0)==="\\")switch(t.charAt(1)){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"x":return pt(t.slice(2,4));case"u":return t.charAt(2)==="{"?pt(t.slice(3,-1)):pt(t.slice(2,6));default:return t.charAt(1)}else return t}function St(t){if(t==null)return String(t);const e=Object.prototype.toString.call(t);try{let n;return t.constructor&&t.constructor.name?n=t.constructor.name:e.indexOf("[object ")===0?n=e.slice(8,-1):n=typeof t,n+": "+JSON.stringify(String(t))}catch{return e}}const Cr=Object.freeze(Object.defineProperty({__proto__:null,StringBuffer:we,abstract:K,assert:ge,clone:Tr,copyWithoutDuplicates:xn,defineLazyProperty:mt,getDuplicates:dt,isLexical:Sn,isSyntactic:be,padLeft:An,repeat:nt,repeatFn:bn,repeatStr:wn,unescapeCodePoint:On,unexpectedObjToString:St},Symbol.toStringTag,{value:"Module"})),kr={Lu:/\p{Lu}/u,Ll:/\p{Ll}/u,Lt:/\p{Lt}/u,Lm:/\p{Lm}/u,Lo:/\p{Lo}/u,Nl:/\p{Nl}/u,Nd:/\p{Nd}/u,Mn:/\p{Mn}/u,Mc:/\p{Mc}/u,Pc:/\p{Pc}/u,Zs:/\p{Zs}/u,L:/\p{Letter}/u,Ltmo:/\p{Lt}|\p{Lm}|\p{Lo}/u};class w{constructor(){if(this.constructor===w)throw new Error("PExpr cannot be instantiated -- it's abstract")}withSource(e){return e&&(this.source=e.trimmed()),this}}const q=Object.create(w.prototype),$=Object.create(w.prototype);class B extends w{constructor(e){super(),this.obj=e}}class U extends w{constructor(e,n){super(),this.from=e,this.to=n,this.matchCodePoint=e.length>1||n.length>1}}class H extends w{constructor(e){super(),this.index=e}}class C extends w{constructor(e){super(),this.terms=e}}class rt extends C{constructor(e,n,r){const i=e.rules[n].body;super([r,i]),this.superGrammar=e,this.name=n,this.body=r}}class it extends C{constructor(e,n,r,i){const s=e.rules[n].body;super([...r,s,...i]),this.superGrammar=e,this.ruleName=n,this.expansionPos=r.length}}class k extends w{constructor(e){super(),this.factors=e}}class V extends w{constructor(e){super(),this.expr=e}}class xe extends V{}class Te extends V{}class he extends V{}xe.prototype.operator="*";Te.prototype.operator="+";he.prototype.operator="?";xe.prototype.minNumMatches=0;Te.prototype.minNumMatches=1;he.prototype.minNumMatches=0;xe.prototype.maxNumMatches=Number.POSITIVE_INFINITY;Te.prototype.maxNumMatches=Number.POSITIVE_INFINITY;he.prototype.maxNumMatches=1;class J extends w{constructor(e){super(),this.expr=e}}class Q extends w{constructor(e){super(),this.expr=e}}class X extends w{constructor(e){super(),this.expr=e}}class O extends w{constructor(e,n=[]){super(),this.ruleName=e,this.args=n}isSyntactic(){return be(this.ruleName)}toMemoKey(){return this._memoKey||Object.defineProperty(this,"_memoKey",{value:this.toString()}),this._memoKey}}class j extends w{constructor(e){super(),this.category=e,this.pattern=kr[e]}}function F(t,e){let n;return e?(n=new Error(e.getLineAndColumnMessage()+t),n.shortMessage=t,n.interval=e):n=new Error(t),n}function gt(){return F("Interval sources don't match")}function Dr(t){const e=new Error;return Object.defineProperty(e,"message",{enumerable:!0,get(){return t.message}}),Object.defineProperty(e,"shortMessage",{enumerable:!0,get(){return"Expected "+t.getExpectedText()}}),e.interval=t.getInterval(),e}function jr(t,e,n){const r=e?`Grammar ${t} is not declared in namespace '${e}'`:"Undeclared grammar "+t;return F(r,n)}function Br(t,e){return F("Grammar "+t.name+" is already declared in this namespace")}function Mr(t){return F(`Grammar '${t.name}' does not support incremental parsing`)}function Nn(t,e,n){return F("Rule "+t+" is not declared in grammar "+e,n)}function Gr(t,e,n){return F("Cannot override rule "+t+" because it is not declared in "+e,n)}function qr(t,e,n){return F("Cannot extend rule "+t+" because it is not declared in "+e,n)}function en(t,e,n,r){let i="Duplicate declaration for rule '"+t+"' in grammar '"+e+"'";return e!==n&&(i+=" (originally declared in '"+n+"')"),F(i,r)}function Ln(t,e,n,r){return F("Wrong number of parameters for rule "+t+" (expected "+e+", got "+n+")",r)}function $r(t,e,n,r){return F("Wrong number of arguments for rule "+t+" (expected "+e+", got "+n+")",r)}function tn(t,e,n){return F("Duplicate parameter names in rule "+t+": "+e.join(", "),n)}function Ur(t,e){return F("Invalid parameter to rule "+t+": "+e+" has arity "+e.getArity()+", but parameter expressions must have arity 1",e.source)}const Hr="NOTE: A _syntactic rule_ is a rule whose name begins with a capital letter. See https://ohmjs.org/d/svl for more details.";function zr(t,e){return F("Cannot apply syntactic rule "+t+" from here (inside a lexical context)",e.source)}function Wr(t){const{ruleName:e}=t;return F(`applySyntactic is for syntactic rules, but '${e}' is a lexical rule. `+Hr,t.source)}function Kr(t){return F("applySyntactic is not required here (in a syntactic context)",t.source)}function nn(t,e){return F("Incorrect argument type: expected "+t,e.source)}function Vr(t){return F("'...' can appear at most once in a rule body",t.source)}function Jr(t){const e=t._node;ge(e&&e.isNonterminal()&&e.ctorName==="escapeChar_unicodeCodePoint");const n=t.children.slice(1,-1).map(i=>i.source),r=n[0].coverageWith(...n.slice(1));return F(`U+${r.contents} is not a valid Unicode code point`,r)}function En(t,e){const n=e.length>0?e[e.length-1].args:[];let i="Nullable expression "+t.expr.substituteParams(n)+" is not allowed inside '"+t.operator+"' (possible infinite loop)";if(e.length>0){const s=e.map(a=>new O(a.ruleName,a.args)).join(`
`);i+=`
Application stack (most recent application last):
`+s}return F(i,t.expr.source)}function Pn(t,e,n,r){return F("Rule "+t+" involves an alternation which has inconsistent arity (expected "+e+", got "+n+")",r.source)}function Qr(t){const e=t.map(n=>n.message);return F(["Errors:"].concat(e).join(`
- `),t[0].interval)}function Yr(t,e,n,r){let i=r.slice(0,-1).map(p=>{const d="  "+p[0].name+" > "+p[1];return p.length===3?d+" for '"+p[2]+"'":d}).join(`
`);i+=`
  `+e+" > "+t;let s="";t==="_iter"&&(s=[`
NOTE: as of Ohm v16, there is no default action for iteration nodes — see `,"  https://ohmjs.org/d/dsa for details."].join(`
`));const a=[`Missing semantic action for '${t}' in ${n} '${e}'.${s}`,"Action stack (most recent call last):",i].join(`
`),u=F(a);return u.name="missingSemanticAction",u}function Zr(t){if(t.length===1)throw t[0];if(t.length>1)throw Qr(t)}function Xr(t){let e=0;return t.map(r=>{const i=r.toString();return e=Math.max(e,i.length),i}).map(r=>An(r,e))}function rn(t,e,n){const r=t.length,i=t.slice(0,n),s=t.slice(n+e.length);return(i+e+s).substr(0,r)}function ei(...t){const e=this,{offset:n}=e,{repeatStr:r}=Cr,i=new we;i.append("Line "+e.lineNum+", col "+e.colNum+`:
`);const s=Xr([e.prevLine==null?0:e.lineNum-1,e.lineNum,e.nextLine==null?0:e.lineNum+1]),a=(c,h,g)=>{i.append(g+s[c]+" | "+h+`
`)};e.prevLine!=null&&a(0,e.prevLine,"  "),a(1,e.line,"> ");const u=e.line.length;let p=r(" ",u+1);for(let c=0;c<t.length;++c){let h=t[c][0],g=t[c][1];ge(h>=0&&h<=g,"range start must be >= 0 and <= end");const v=n-e.colNum+1;h=Math.max(0,h-v),g=Math.min(g-v,u),p=rn(p,r("~",g-h),h)}const d=2+s[1].length+3;return i.append(r(" ",d)),p=rn(p,"^",e.colNum-1),i.append(p.replace(/ +$/,"")+`
`),e.nextLine!=null&&a(2,e.nextLine,"  "),i.contents()}let yt=[];function Rn(t){yt.push(t)}function ti(t){yt.forEach(e=>{e(t)}),yt=null}function At(t,e){let n=1,r=1,i=0,s=0,a=null,u=null,p=-1;for(;i<e;){const h=t.charAt(i++);h===`
`?(n++,r=1,p=s,s=i):h!=="\r"&&r++}let d=t.indexOf(`
`,s);if(d===-1)d=t.length;else{const h=t.indexOf(`
`,d+1);a=h===-1?t.slice(d):t.slice(d,h),a=a.replace(/^\r?\n/,"").replace(/\r$/,"")}p>=0&&(u=t.slice(p,s).replace(/\r?\n$/,""));const c=t.slice(s,d).replace(/\r$/,"");return{offset:e,lineNum:n,colNum:r,line:c,prevLine:u,nextLine:a,toString:ei}}function Ot(t,e,...n){return At(t,e).toString(...n)}const sn=(()=>{let t=0;return e=>""+e+t++})();class G{constructor(e,n,r){this.sourceString=e,this.startIdx=n,this.endIdx=r}get contents(){return this._contents===void 0&&(this._contents=this.sourceString.slice(this.startIdx,this.endIdx)),this._contents}get length(){return this.endIdx-this.startIdx}coverageWith(...e){return G.coverage(...e,this)}collapsedLeft(){return new G(this.sourceString,this.startIdx,this.startIdx)}collapsedRight(){return new G(this.sourceString,this.endIdx,this.endIdx)}getLineAndColumn(){return At(this.sourceString,this.startIdx)}getLineAndColumnMessage(){const e=[this.startIdx,this.endIdx];return Ot(this.sourceString,this.startIdx,e)}minus(e){if(this.sourceString!==e.sourceString)throw gt();return this.startIdx===e.startIdx&&this.endIdx===e.endIdx?[]:this.startIdx<e.startIdx&&e.endIdx<this.endIdx?[new G(this.sourceString,this.startIdx,e.startIdx),new G(this.sourceString,e.endIdx,this.endIdx)]:this.startIdx<e.endIdx&&e.endIdx<this.endIdx?[new G(this.sourceString,e.endIdx,this.endIdx)]:this.startIdx<e.startIdx&&e.startIdx<this.endIdx?[new G(this.sourceString,this.startIdx,e.startIdx)]:[this]}relativeTo(e){if(this.sourceString!==e.sourceString)throw gt();return ge(this.startIdx>=e.startIdx&&this.endIdx<=e.endIdx,"other interval does not cover this one"),new G(this.sourceString,this.startIdx-e.startIdx,this.endIdx-e.startIdx)}trimmed(){const{contents:e}=this,n=this.startIdx+e.match(/^\s*/)[0].length,r=this.endIdx-e.match(/\s*$/)[0].length;return new G(this.sourceString,n,r)}subInterval(e,n){const r=this.startIdx+e;return new G(this.sourceString,r,r+n)}}G.coverage=function(t,...e){let{startIdx:n,endIdx:r}=t;for(const i of e){if(i.sourceString!==t.sourceString)throw gt();n=Math.min(n,i.startIdx),r=Math.max(r,i.endIdx)}return new G(t.sourceString,n,r)};const ni=65535;class st{constructor(e){this.source=e,this.pos=0,this.examinedLength=0}atEnd(){const e=this.pos>=this.source.length;return this.examinedLength=Math.max(this.examinedLength,this.pos+1),e}next(){const e=this.source[this.pos++];return this.examinedLength=Math.max(this.examinedLength,this.pos),e}nextCharCode(){const e=this.next();return e&&e.charCodeAt(0)}nextCodePoint(){const e=this.source.slice(this.pos++).codePointAt(0);return e>ni&&(this.pos+=1),this.examinedLength=Math.max(this.examinedLength,this.pos),e}matchString(e,n){let r;if(n){for(r=0;r<e.length;r++){const i=this.next(),s=e[r];if(i==null||i.toUpperCase()!==s.toUpperCase())return!1}return!0}for(r=0;r<e.length;r++)if(this.next()!==e[r])return!1;return!0}sourceSlice(e,n){return this.source.slice(e,n)}interval(e,n){return new G(this.source,e,n||this.pos)}}class Fn{constructor(e,n,r,i,s,a,u){this.matcher=e,this.input=n,this.startExpr=r,this._cst=i,this._cstOffset=s,this._rightmostFailurePosition=a,this._rightmostFailures=u,this.failed()&&(mt(this,"message",function(){const p="Expected "+this.getExpectedText();return Ot(this.input,this.getRightmostFailurePosition())+p}),mt(this,"shortMessage",function(){const p="expected "+this.getExpectedText(),d=At(this.input,this.getRightmostFailurePosition());return"Line "+d.lineNum+", col "+d.colNum+": "+p}))}succeeded(){return!!this._cst}failed(){return!this.succeeded()}getRightmostFailurePosition(){return this._rightmostFailurePosition}getRightmostFailures(){if(!this._rightmostFailures){this.matcher.setInput(this.input);const e=this.matcher._match(this.startExpr,{tracing:!1,positionToRecordFailures:this.getRightmostFailurePosition()});this._rightmostFailures=e.getRightmostFailures()}return this._rightmostFailures}toString(){return this.succeeded()?"[match succeeded]":"[match failed at position "+this.getRightmostFailurePosition()+"]"}getExpectedText(){if(this.succeeded())throw new Error("cannot get expected text of a successful MatchResult");const e=new we;let n=this.getRightmostFailures();n=n.filter(r=>!r.isFluffy());for(let r=0;r<n.length;r++)r>0&&(r===n.length-1?e.append(n.length>2?", or ":" or "):e.append(", ")),e.append(n[r].toString());return e.contents()}getInterval(){const e=this.getRightmostFailurePosition();return new G(this.input,e,e)}}class ri{constructor(){this.applicationMemoKeyStack=[],this.memo={},this.maxExaminedLength=0,this.maxRightmostFailureOffset=-1,this.currentLeftRecursion=void 0}isActive(e){return this.applicationMemoKeyStack.indexOf(e.toMemoKey())>=0}enter(e){this.applicationMemoKeyStack.push(e.toMemoKey())}exit(){this.applicationMemoKeyStack.pop()}startLeftRecursion(e,n){n.isLeftRecursion=!0,n.headApplication=e,n.nextLeftRecursion=this.currentLeftRecursion,this.currentLeftRecursion=n;const{applicationMemoKeyStack:r}=this,i=r.indexOf(e.toMemoKey())+1,s=r.slice(i);n.isInvolved=function(a){return s.indexOf(a)>=0},n.updateInvolvedApplicationMemoKeys=function(){for(let a=i;a<r.length;a++){const u=r[a];this.isInvolved(u)||s.push(u)}}}endLeftRecursion(){this.currentLeftRecursion=this.currentLeftRecursion.nextLeftRecursion}shouldUseMemoizedResult(e){if(!e.isLeftRecursion)return!0;const{applicationMemoKeyStack:n}=this;for(let r=0;r<n.length;r++){const i=n[r];if(e.isInvolved(i))return!1}return!0}memoize(e,n){return this.memo[e]=n,this.maxExaminedLength=Math.max(this.maxExaminedLength,n.examinedLength),this.maxRightmostFailureOffset=Math.max(this.maxRightmostFailureOffset,n.rightmostFailureOffset),n}clearObsoleteEntries(e,n){if(e+this.maxExaminedLength<=n)return;const{memo:r}=this;this.maxExaminedLength=0,this.maxRightmostFailureOffset=-1,Object.keys(r).forEach(i=>{const s=r[i];e+s.examinedLength>n?delete r[i]:(this.maxExaminedLength=Math.max(this.maxExaminedLength,s.examinedLength),this.maxRightmostFailureOffset=Math.max(this.maxRightmostFailureOffset,s.rightmostFailureOffset))})}}const ii="✗",si="✓",oi="⋅",ai="⇒",li="␉",ci="␊",ui="␍",vt={succeeded:1,isRootNode:2,isImplicitSpaces:4,isMemoized:8,isHeadOfLeftRecursion:16,terminatesLR:32};function pi(t){return nt(" ",t).join("")}function hi(t,e,n){const r=Tn(t.slice(e,e+n));return r.length<n?r+nt(" ",n-r.length).join(""):r}function Tn(t){return typeof t=="string"?t.replace(/ /g,oi).replace(/\t/g,li).replace(/\n/g,ci).replace(/\r/g,ui):String(t)}class de{constructor(e,n,r,i,s,a,u){this.input=e,this.pos=this.pos1=n,this.pos2=r,this.source=new G(e,n,r),this.expr=i,this.bindings=a,this.children=u||[],this.terminatingLREntry=null,this._flags=s?vt.succeeded:0}get displayString(){return this.expr.toDisplayString()}clone(){return this.cloneWithExpr(this.expr)}cloneWithExpr(e){const n=new de(this.input,this.pos,this.pos2,e,this.succeeded,this.bindings,this.children);return n.isHeadOfLeftRecursion=this.isHeadOfLeftRecursion,n.isImplicitSpaces=this.isImplicitSpaces,n.isMemoized=this.isMemoized,n.isRootNode=this.isRootNode,n.terminatesLR=this.terminatesLR,n.terminatingLREntry=this.terminatingLREntry,n}recordLRTermination(e,n){this.terminatingLREntry=new de(this.input,this.pos,this.pos2,this.expr,!1,[n],[e]),this.terminatingLREntry.terminatesLR=!0}walk(e,n){let r=e;typeof r=="function"&&(r={enter:r});function i(s,a,u){let p=!0;r.enter&&r.enter.call(n,s,a,u)===de.prototype.SKIP&&(p=!1),p&&(s.children.forEach(d=>{i(d,s,u+1)}),r.exit&&r.exit.call(n,s,a,u))}this.isRootNode?this.children.forEach(s=>{i(s,null,0)}):i(this,null,0)}toString(){const e=new we;return this.walk((n,r,i)=>{if(!n)return this.SKIP;if(n.expr.constructor.name!=="Alt"){if(e.append(hi(n.input,n.pos,10)+pi(i*2+1)),e.append((n.succeeded?si:ii)+" "+n.displayString),n.isHeadOfLeftRecursion&&e.append(" (LR)"),n.succeeded){const a=Tn(n.source.contents);e.append(" "+ai+"  "),e.append(typeof a=="string"?'"'+a+'"':a)}e.append(`
`)}}),e.contents()}}de.prototype.SKIP={};Object.keys(vt).forEach(t=>{const e=vt[t];Object.defineProperty(de.prototype,t,{get(){return(this._flags&e)!==0},set(n){n?this._flags|=e:this._flags&=~e}})});w.prototype.allowsSkippingPrecedingSpace=K("allowsSkippingPrecedingSpace");q.allowsSkippingPrecedingSpace=$.allowsSkippingPrecedingSpace=O.prototype.allowsSkippingPrecedingSpace=B.prototype.allowsSkippingPrecedingSpace=U.prototype.allowsSkippingPrecedingSpace=j.prototype.allowsSkippingPrecedingSpace=function(){return!0};C.prototype.allowsSkippingPrecedingSpace=V.prototype.allowsSkippingPrecedingSpace=X.prototype.allowsSkippingPrecedingSpace=Q.prototype.allowsSkippingPrecedingSpace=J.prototype.allowsSkippingPrecedingSpace=H.prototype.allowsSkippingPrecedingSpace=k.prototype.allowsSkippingPrecedingSpace=function(){return!1};let Ce;Rn(t=>{Ce=t});let Ye;w.prototype.assertAllApplicationsAreValid=function(t,e){Ye=0,this._assertAllApplicationsAreValid(t,e)};w.prototype._assertAllApplicationsAreValid=K("_assertAllApplicationsAreValid");q._assertAllApplicationsAreValid=$._assertAllApplicationsAreValid=B.prototype._assertAllApplicationsAreValid=U.prototype._assertAllApplicationsAreValid=H.prototype._assertAllApplicationsAreValid=j.prototype._assertAllApplicationsAreValid=function(t,e){};X.prototype._assertAllApplicationsAreValid=function(t,e){Ye++,this.expr._assertAllApplicationsAreValid(t,e),Ye--};C.prototype._assertAllApplicationsAreValid=function(t,e){for(let n=0;n<this.terms.length;n++)this.terms[n]._assertAllApplicationsAreValid(t,e)};k.prototype._assertAllApplicationsAreValid=function(t,e){for(let n=0;n<this.factors.length;n++)this.factors[n]._assertAllApplicationsAreValid(t,e)};V.prototype._assertAllApplicationsAreValid=J.prototype._assertAllApplicationsAreValid=Q.prototype._assertAllApplicationsAreValid=function(t,e){this.expr._assertAllApplicationsAreValid(t,e)};O.prototype._assertAllApplicationsAreValid=function(t,e,n=!1){const r=e.rules[this.ruleName],i=be(t)&&Ye===0;if(!r)throw Nn(this.ruleName,e.name,this.source);if(!n&&be(this.ruleName)&&!i)throw zr(this.ruleName,this);const s=this.args.length,a=r.formals.length;if(s!==a)throw $r(this.ruleName,a,s,this.source);const u=Ce&&r===Ce.rules.applySyntactic;if(Ce&&r===Ce.rules.caseInsensitive&&!(this.args[0]instanceof B))throw nn('a Terminal (e.g. "abc")',this.args[0]);if(u){const d=this.args[0];if(!(d instanceof O))throw nn("a syntactic rule application",d);if(!be(d.ruleName))throw Wr(d);if(i)throw Kr(this)}this.args.forEach(d=>{if(d._assertAllApplicationsAreValid(t,e,u),d.getArity()!==1)throw Ur(this.ruleName,d)})};w.prototype.assertChoicesHaveUniformArity=K("assertChoicesHaveUniformArity");q.assertChoicesHaveUniformArity=$.assertChoicesHaveUniformArity=B.prototype.assertChoicesHaveUniformArity=U.prototype.assertChoicesHaveUniformArity=H.prototype.assertChoicesHaveUniformArity=X.prototype.assertChoicesHaveUniformArity=j.prototype.assertChoicesHaveUniformArity=function(t){};C.prototype.assertChoicesHaveUniformArity=function(t){if(this.terms.length===0)return;const e=this.terms[0].getArity();for(let n=0;n<this.terms.length;n++){const r=this.terms[n];r.assertChoicesHaveUniformArity();const i=r.getArity();if(e!==i)throw Pn(t,e,i,r)}};rt.prototype.assertChoicesHaveUniformArity=function(t){const e=this.terms[0].getArity(),n=this.terms[1].getArity();if(e!==n)throw Pn(t,n,e,this.terms[0])};k.prototype.assertChoicesHaveUniformArity=function(t){for(let e=0;e<this.factors.length;e++)this.factors[e].assertChoicesHaveUniformArity(t)};V.prototype.assertChoicesHaveUniformArity=function(t){this.expr.assertChoicesHaveUniformArity(t)};J.prototype.assertChoicesHaveUniformArity=function(t){};Q.prototype.assertChoicesHaveUniformArity=function(t){this.expr.assertChoicesHaveUniformArity(t)};O.prototype.assertChoicesHaveUniformArity=function(t){};w.prototype.assertIteratedExprsAreNotNullable=K("assertIteratedExprsAreNotNullable");q.assertIteratedExprsAreNotNullable=$.assertIteratedExprsAreNotNullable=B.prototype.assertIteratedExprsAreNotNullable=U.prototype.assertIteratedExprsAreNotNullable=H.prototype.assertIteratedExprsAreNotNullable=j.prototype.assertIteratedExprsAreNotNullable=function(t){};C.prototype.assertIteratedExprsAreNotNullable=function(t){for(let e=0;e<this.terms.length;e++)this.terms[e].assertIteratedExprsAreNotNullable(t)};k.prototype.assertIteratedExprsAreNotNullable=function(t){for(let e=0;e<this.factors.length;e++)this.factors[e].assertIteratedExprsAreNotNullable(t)};V.prototype.assertIteratedExprsAreNotNullable=function(t){if(this.expr.assertIteratedExprsAreNotNullable(t),this.expr.isNullable(t))throw En(this,[])};he.prototype.assertIteratedExprsAreNotNullable=J.prototype.assertIteratedExprsAreNotNullable=Q.prototype.assertIteratedExprsAreNotNullable=X.prototype.assertIteratedExprsAreNotNullable=function(t){this.expr.assertIteratedExprsAreNotNullable(t)};O.prototype.assertIteratedExprsAreNotNullable=function(t){this.args.forEach(e=>{e.assertIteratedExprsAreNotNullable(t)})};class Nt{constructor(e){this.matchLength=e}get ctorName(){throw new Error("subclass responsibility")}numChildren(){return this.children?this.children.length:0}childAt(e){if(this.children)return this.children[e]}indexOfChild(e){return this.children.indexOf(e)}hasChildren(){return this.numChildren()>0}hasNoChildren(){return!this.hasChildren()}onlyChild(){if(this.numChildren()!==1)throw new Error("cannot get only child of a node of type "+this.ctorName+" (it has "+this.numChildren()+" children)");return this.firstChild()}firstChild(){if(this.hasNoChildren())throw new Error("cannot get first child of a "+this.ctorName+" node, which has no children");return this.childAt(0)}lastChild(){if(this.hasNoChildren())throw new Error("cannot get last child of a "+this.ctorName+" node, which has no children");return this.childAt(this.numChildren()-1)}childBefore(e){const n=this.indexOfChild(e);if(n<0)throw new Error("Node.childBefore() called w/ an argument that is not a child");if(n===0)throw new Error("cannot get child before first child");return this.childAt(n-1)}childAfter(e){const n=this.indexOfChild(e);if(n<0)throw new Error("Node.childAfter() called w/ an argument that is not a child");if(n===this.numChildren()-1)throw new Error("cannot get child after last child");return this.childAt(n+1)}isTerminal(){return!1}isNonterminal(){return!1}isIteration(){return!1}isOptional(){return!1}}class Se extends Nt{get ctorName(){return"_terminal"}isTerminal(){return!0}get primitiveValue(){throw new Error("The `primitiveValue` property was removed in Ohm v17.")}}class fi extends Nt{constructor(e,n,r,i){super(i),this.ruleName=e,this.children=n,this.childOffsets=r}get ctorName(){return this.ruleName}isNonterminal(){return!0}isLexical(){return Sn(this.ctorName)}isSyntactic(){return be(this.ctorName)}}class Cn extends Nt{constructor(e,n,r,i){super(r),this.children=e,this.childOffsets=n,this.optional=i}get ctorName(){return"_iter"}isIteration(){return!0}isOptional(){return this.optional}}w.prototype.eval=K("eval");q.eval=function(t){const{inputStream:e}=t,n=e.pos,r=e.nextCodePoint();return r!==void 0?(t.pushBinding(new Se(String.fromCodePoint(r).length),n),!0):(t.processFailure(n,this),!1)};$.eval=function(t){const{inputStream:e}=t,n=e.pos;return e.atEnd()?(t.pushBinding(new Se(0),n),!0):(t.processFailure(n,this),!1)};B.prototype.eval=function(t){const{inputStream:e}=t,n=e.pos;return e.matchString(this.obj)?(t.pushBinding(new Se(this.obj.length),n),!0):(t.processFailure(n,this),!1)};U.prototype.eval=function(t){const{inputStream:e}=t,n=e.pos,r=this.matchCodePoint?e.nextCodePoint():e.nextCharCode();return r!==void 0&&this.from.codePointAt(0)<=r&&r<=this.to.codePointAt(0)?(t.pushBinding(new Se(String.fromCodePoint(r).length),n),!0):(t.processFailure(n,this),!1)};H.prototype.eval=function(t){return t.eval(t.currentApplication().args[this.index])};X.prototype.eval=function(t){t.enterLexifiedContext();const e=t.eval(this.expr);return t.exitLexifiedContext(),e};C.prototype.eval=function(t){for(let e=0;e<this.terms.length;e++)if(t.eval(this.terms[e]))return!0;return!1};k.prototype.eval=function(t){for(let e=0;e<this.factors.length;e++){const n=this.factors[e];if(!t.eval(n))return!1}return!0};V.prototype.eval=function(t){const{inputStream:e}=t,n=e.pos,r=this.getArity(),i=[],s=[];for(;i.length<r;)i.push([]),s.push([]);let a=0,u=n,p;for(;a<this.maxNumMatches&&t.eval(this.expr);){if(e.pos===u)throw En(this,t._applicationStack);u=e.pos,a++;const g=t._bindings.splice(t._bindings.length-r,r),v=t._bindingOffsets.splice(t._bindingOffsets.length-r,r);for(p=0;p<g.length;p++)i[p].push(g[p]),s[p].push(v[p])}if(a<this.minNumMatches)return!1;let d=t.posToOffset(n),c=0;if(a>0){const g=i[r-1],v=s[r-1],x=v[v.length-1]+g[g.length-1].matchLength;d=s[0][0],c=x-d}const h=this instanceof he;for(p=0;p<i.length;p++)t._bindings.push(new Cn(i[p],s[p],c,h)),t._bindingOffsets.push(d);return!0};J.prototype.eval=function(t){const{inputStream:e}=t,n=e.pos;t.pushFailuresInfo();const r=t.eval(this.expr);return t.popFailuresInfo(),r?(t.processFailure(n,this),!1):(e.pos=n,!0)};Q.prototype.eval=function(t){const{inputStream:e}=t,n=e.pos;return t.eval(this.expr)?(e.pos=n,!0):!1};O.prototype.eval=function(t){const e=t.currentApplication(),n=e?e.args:[],r=this.substituteParams(n),i=t.getCurrentPosInfo();if(i.isActive(r))return r.handleCycle(t);const s=r.toMemoKey(),a=i.memo[s];if(a&&i.shouldUseMemoizedResult(a)){if(t.hasNecessaryInfo(a))return t.useMemoizedResult(t.inputStream.pos,a);delete i.memo[s]}return r.reallyEval(t)};O.prototype.handleCycle=function(t){const e=t.getCurrentPosInfo(),{currentLeftRecursion:n}=e,r=this.toMemoKey();let i=e.memo[r];return n&&n.headApplication.toMemoKey()===r?i.updateInvolvedApplicationMemoKeys():i||(i=e.memoize(r,{matchLength:0,examinedLength:0,value:!1,rightmostFailureOffset:-1}),e.startLeftRecursion(this,i)),t.useMemoizedResult(t.inputStream.pos,i)};O.prototype.reallyEval=function(t){const{inputStream:e}=t,n=e.pos,r=t.getCurrentPosInfo(),i=t.grammar.rules[this.ruleName],{body:s}=i,{description:a}=i;t.enterApplication(r,this),a&&t.pushFailuresInfo();const u=e.examinedLength;e.examinedLength=0;let p=this.evalOnce(s,t);const d=r.currentLeftRecursion,c=this.toMemoKey(),h=d&&d.headApplication.toMemoKey()===c;let g;t.doNotMemoize?t.doNotMemoize=!1:h?(p=this.growSeedResult(s,t,n,d,p),r.endLeftRecursion(),g=d,g.examinedLength=e.examinedLength-n,g.rightmostFailureOffset=t._getRightmostFailureOffset(),r.memoize(c,g)):(!d||!d.isInvolved(c))&&(g=r.memoize(c,{matchLength:e.pos-n,examinedLength:e.examinedLength-n,value:p,failuresAtRightmostPosition:t.cloneRecordedFailures(),rightmostFailureOffset:t._getRightmostFailureOffset()}));const v=!!p;if(a&&(t.popFailuresInfo(),v||t.processFailure(n,this),g&&(g.failuresAtRightmostPosition=t.cloneRecordedFailures())),t.isTracing()&&g){const x=t.getTraceEntry(n,this,v,v?[p]:[]);h&&(ge(x.terminatingLREntry!=null||!v),x.isHeadOfLeftRecursion=!0),g.traceEntry=x}return e.examinedLength=Math.max(e.examinedLength,u),t.exitApplication(r,p),v};O.prototype.evalOnce=function(t,e){const{inputStream:n}=e,r=n.pos;if(e.eval(t)){const i=t.getArity(),s=e._bindings.splice(e._bindings.length-i,i),a=e._bindingOffsets.splice(e._bindingOffsets.length-i,i),u=n.pos-r;return new fi(this.ruleName,s,a,u)}else return!1};O.prototype.growSeedResult=function(t,e,n,r,i){if(!i)return!1;const{inputStream:s}=e;for(;;){if(r.matchLength=s.pos-n,r.value=i,r.failuresAtRightmostPosition=e.cloneRecordedFailures(),e.isTracing()){const a=e.trace[e.trace.length-1];r.traceEntry=new de(e.input,n,s.pos,this,!0,[i],[a.clone()])}if(s.pos=n,i=this.evalOnce(t,e),s.pos-n<=r.matchLength)break;e.isTracing()&&e.trace.splice(-2,1)}return e.isTracing()&&r.traceEntry.recordLRTermination(e.trace.pop(),i),s.pos=n+r.matchLength,r.value};j.prototype.eval=function(t){const{inputStream:e}=t,n=e.pos,r=e.next();return r&&this.pattern.test(r)?(t.pushBinding(new Se(r.length),n),!0):(t.processFailure(n,this),!1)};w.prototype.getArity=K("getArity");q.getArity=$.getArity=B.prototype.getArity=U.prototype.getArity=H.prototype.getArity=O.prototype.getArity=j.prototype.getArity=function(){return 1};C.prototype.getArity=function(){return this.terms.length===0?0:this.terms[0].getArity()};k.prototype.getArity=function(){let t=0;for(let e=0;e<this.factors.length;e++)t+=this.factors[e].getArity();return t};V.prototype.getArity=function(){return this.expr.getArity()};J.prototype.getArity=function(){return 0};Q.prototype.getArity=X.prototype.getArity=function(){return this.expr.getArity()};function le(t,e){const n={};if(t.source&&e){const r=t.source.relativeTo(e);n.sourceInterval=[r.startIdx,r.endIdx]}return n}w.prototype.outputRecipe=K("outputRecipe");q.outputRecipe=function(t,e){return["any",le(this,e)]};$.outputRecipe=function(t,e){return["end",le(this,e)]};B.prototype.outputRecipe=function(t,e){return["terminal",le(this,e),this.obj]};U.prototype.outputRecipe=function(t,e){return["range",le(this,e),this.from,this.to]};H.prototype.outputRecipe=function(t,e){return["param",le(this,e),this.index]};C.prototype.outputRecipe=function(t,e){return["alt",le(this,e)].concat(this.terms.map(n=>n.outputRecipe(t,e)))};rt.prototype.outputRecipe=function(t,e){return this.terms[0].outputRecipe(t,e)};it.prototype.outputRecipe=function(t,e){const n=this.terms.slice(0,this.expansionPos),r=this.terms.slice(this.expansionPos+1);return["splice",le(this,e),n.map(i=>i.outputRecipe(t,e)),r.map(i=>i.outputRecipe(t,e))]};k.prototype.outputRecipe=function(t,e){return["seq",le(this,e)].concat(this.factors.map(n=>n.outputRecipe(t,e)))};xe.prototype.outputRecipe=Te.prototype.outputRecipe=he.prototype.outputRecipe=J.prototype.outputRecipe=Q.prototype.outputRecipe=X.prototype.outputRecipe=function(t,e){return[this.constructor.name.toLowerCase(),le(this,e),this.expr.outputRecipe(t,e)]};O.prototype.outputRecipe=function(t,e){return["app",le(this,e),this.ruleName,this.args.map(n=>n.outputRecipe(t,e))]};j.prototype.outputRecipe=function(t,e){return["unicodeChar",le(this,e),this.category]};w.prototype.introduceParams=K("introduceParams");q.introduceParams=$.introduceParams=B.prototype.introduceParams=U.prototype.introduceParams=H.prototype.introduceParams=j.prototype.introduceParams=function(t){return this};C.prototype.introduceParams=function(t){return this.terms.forEach((e,n,r)=>{r[n]=e.introduceParams(t)}),this};k.prototype.introduceParams=function(t){return this.factors.forEach((e,n,r)=>{r[n]=e.introduceParams(t)}),this};V.prototype.introduceParams=J.prototype.introduceParams=Q.prototype.introduceParams=X.prototype.introduceParams=function(t){return this.expr=this.expr.introduceParams(t),this};O.prototype.introduceParams=function(t){const e=t.indexOf(this.ruleName);if(e>=0){if(this.args.length>0)throw new Error("Parameterized rules cannot be passed as arguments to another rule.");return new H(e).withSource(this.source)}else return this.args.forEach((n,r,i)=>{i[r]=n.introduceParams(t)}),this};w.prototype.isNullable=function(t){return this._isNullable(t,Object.create(null))};w.prototype._isNullable=K("_isNullable");q._isNullable=U.prototype._isNullable=H.prototype._isNullable=Te.prototype._isNullable=j.prototype._isNullable=function(t,e){return!1};$._isNullable=function(t,e){return!0};B.prototype._isNullable=function(t,e){return typeof this.obj=="string"?this.obj==="":!1};C.prototype._isNullable=function(t,e){return this.terms.length===0||this.terms.some(n=>n._isNullable(t,e))};k.prototype._isNullable=function(t,e){return this.factors.every(n=>n._isNullable(t,e))};xe.prototype._isNullable=he.prototype._isNullable=J.prototype._isNullable=Q.prototype._isNullable=function(t,e){return!0};X.prototype._isNullable=function(t,e){return this.expr._isNullable(t,e)};O.prototype._isNullable=function(t,e){const n=this.toMemoKey();if(!Object.prototype.hasOwnProperty.call(e,n)){const{body:r}=t.rules[this.ruleName],i=r.substituteParams(this.args);e[n]=!1,e[n]=i._isNullable(t,e)}return e[n]};w.prototype.substituteParams=K("substituteParams");q.substituteParams=$.substituteParams=B.prototype.substituteParams=U.prototype.substituteParams=j.prototype.substituteParams=function(t){return this};H.prototype.substituteParams=function(t){return t[this.index]};C.prototype.substituteParams=function(t){return new C(this.terms.map(e=>e.substituteParams(t)))};k.prototype.substituteParams=function(t){return new k(this.factors.map(e=>e.substituteParams(t)))};V.prototype.substituteParams=J.prototype.substituteParams=Q.prototype.substituteParams=X.prototype.substituteParams=function(t){return new this.constructor(this.expr.substituteParams(t))};O.prototype.substituteParams=function(t){if(this.args.length===0)return this;{const e=this.args.map(n=>n.substituteParams(t));return new O(this.ruleName,e)}};function on(t){return/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(t)}function Lt(t){const e=Object.create(null);t.forEach(n=>{e[n]=(e[n]||0)+1}),Object.keys(e).forEach(n=>{if(e[n]<=1)return;let r=1;t.forEach((i,s)=>{i===n&&(t[s]=i+"_"+r++)})})}w.prototype.toArgumentNameList=K("toArgumentNameList");q.toArgumentNameList=function(t,e){return["any"]};$.toArgumentNameList=function(t,e){return["end"]};B.prototype.toArgumentNameList=function(t,e){return typeof this.obj=="string"&&/^[_a-zA-Z0-9]+$/.test(this.obj)?["_"+this.obj]:["$"+t]};U.prototype.toArgumentNameList=function(t,e){let n=this.from+"_to_"+this.to;return on(n)||(n="_"+n),on(n)||(n="$"+t),[n]};C.prototype.toArgumentNameList=function(t,e){const n=this.terms.map(s=>s.toArgumentNameList(t,!0)),r=[],i=n[0].length;for(let s=0;s<i;s++){const a=[];for(let p=0;p<this.terms.length;p++)a.push(n[p][s]);const u=xn(a);r.push(u.join("_or_"))}return e||Lt(r),r};k.prototype.toArgumentNameList=function(t,e){let n=[];return this.factors.forEach(r=>{const i=r.toArgumentNameList(t,!0);n=n.concat(i),t+=i.length}),e||Lt(n),n};V.prototype.toArgumentNameList=function(t,e){const n=this.expr.toArgumentNameList(t,e).map(r=>r[r.length-1]==="s"?r+"es":r+"s");return e||Lt(n),n};he.prototype.toArgumentNameList=function(t,e){return this.expr.toArgumentNameList(t,e).map(n=>"opt"+n[0].toUpperCase()+n.slice(1))};J.prototype.toArgumentNameList=function(t,e){return[]};Q.prototype.toArgumentNameList=X.prototype.toArgumentNameList=function(t,e){return this.expr.toArgumentNameList(t,e)};O.prototype.toArgumentNameList=function(t,e){return[this.ruleName]};j.prototype.toArgumentNameList=function(t,e){return["$"+t]};H.prototype.toArgumentNameList=function(t,e){return["param"+this.index]};w.prototype.toDisplayString=K("toDisplayString");C.prototype.toDisplayString=k.prototype.toDisplayString=function(){return this.source?this.source.trimmed().contents:"["+this.constructor.name+"]"};q.toDisplayString=$.toDisplayString=V.prototype.toDisplayString=J.prototype.toDisplayString=Q.prototype.toDisplayString=X.prototype.toDisplayString=B.prototype.toDisplayString=U.prototype.toDisplayString=H.prototype.toDisplayString=function(){return this.toString()};O.prototype.toDisplayString=function(){if(this.args.length>0){const t=this.args.map(e=>e.toDisplayString());return this.ruleName+"<"+t.join(",")+">"}else return this.ruleName};j.prototype.toDisplayString=function(){return"Unicode ["+this.category+"] character"};function mi(t){return t==="description"||t==="string"||t==="code"}class ee{constructor(e,n,r){if(!mi(r))throw new Error("invalid Failure type: "+r);this.pexpr=e,this.text=n,this.type=r,this.fluffy=!1}getPExpr(){return this.pexpr}getText(){return this.text}getType(){return this.type}isDescription(){return this.type==="description"}isStringTerminal(){return this.type==="string"}isCode(){return this.type==="code"}isFluffy(){return this.fluffy}makeFluffy(){this.fluffy=!0}clearFluffy(){this.fluffy=!1}subsumes(e){return this.getText()===e.getText()&&this.type===e.type&&(!this.isFluffy()||this.isFluffy()&&e.isFluffy())}toString(){return this.type==="string"?JSON.stringify(this.getText()):this.getText()}clone(){const e=new ee(this.pexpr,this.text,this.type);return this.isFluffy()&&e.makeFluffy(),e}toKey(){return this.toString()+"#"+this.type}}w.prototype.toFailure=K("toFailure");q.toFailure=function(t){return new ee(this,"any object","description")};$.toFailure=function(t){return new ee(this,"end of input","description")};B.prototype.toFailure=function(t){return new ee(this,this.obj,"string")};U.prototype.toFailure=function(t){return new ee(this,JSON.stringify(this.from)+".."+JSON.stringify(this.to),"code")};J.prototype.toFailure=function(t){const e=this.expr===q?"nothing":"not "+this.expr.toFailure(t);return new ee(this,e,"description")};Q.prototype.toFailure=function(t){return this.expr.toFailure(t)};O.prototype.toFailure=function(t){let{description:e}=t.rules[this.ruleName];return e||(e=(/^[aeiouAEIOU]/.test(this.ruleName)?"an":"a")+" "+this.ruleName),new ee(this,e,"description")};j.prototype.toFailure=function(t){return new ee(this,"a Unicode ["+this.category+"] character","description")};C.prototype.toFailure=function(t){const n="("+this.terms.map(r=>r.toFailure(t)).join(" or ")+")";return new ee(this,n,"description")};k.prototype.toFailure=function(t){const n="("+this.factors.map(r=>r.toFailure(t)).join(" ")+")";return new ee(this,n,"description")};V.prototype.toFailure=function(t){const e="("+this.expr.toFailure(t)+this.operator+")";return new ee(this,e,"description")};w.prototype.toString=K("toString");q.toString=function(){return"any"};$.toString=function(){return"end"};B.prototype.toString=function(){return JSON.stringify(this.obj)};U.prototype.toString=function(){return JSON.stringify(this.from)+".."+JSON.stringify(this.to)};H.prototype.toString=function(){return"$"+this.index};X.prototype.toString=function(){return"#("+this.expr.toString()+")"};C.prototype.toString=function(){return this.terms.length===1?this.terms[0].toString():"("+this.terms.map(t=>t.toString()).join(" | ")+")"};k.prototype.toString=function(){return this.factors.length===1?this.factors[0].toString():"("+this.factors.map(t=>t.toString()).join(" ")+")"};V.prototype.toString=function(){return this.expr+this.operator};J.prototype.toString=function(){return"~"+this.expr};Q.prototype.toString=function(){return"&"+this.expr};O.prototype.toString=function(){if(this.args.length>0){const t=this.args.map(e=>e.toString());return this.ruleName+"<"+t.join(",")+">"}else return this.ruleName};j.prototype.toString=function(){return"\\p{"+this.category+"}"};class Et extends w{constructor(e){super(),this.obj=e}_getString(e){const n=e.currentApplication().args[this.obj.index];return ge(n instanceof B,"expected a Terminal expression"),n.obj}allowsSkippingPrecedingSpace(){return!0}eval(e){const{inputStream:n}=e,r=n.pos,i=this._getString(e);return n.matchString(i,!0)?(e.pushBinding(new Se(i.length),r),!0):(e.processFailure(r,this),!1)}getArity(){return 1}substituteParams(e){return new Et(this.obj.substituteParams(e))}toDisplayString(){return this.obj.toDisplayString()+" (case-insensitive)"}toFailure(e){return new ee(this,this.obj.toFailure(e)+" (case-insensitive)","description")}_isNullable(e,n){return this.obj._isNullable(e,n)}}let kn;Rn(t=>{kn=t.rules.applySyntactic.body});const ht=new O("spaces");class di{constructor(e,n,r){this.matcher=e,this.startExpr=n,this.grammar=e.grammar,this.input=e.getInput(),this.inputStream=new st(this.input),this.memoTable=e._memoTable,this.userData=void 0,this.doNotMemoize=!1,this._bindings=[],this._bindingOffsets=[],this._applicationStack=[],this._posStack=[0],this.inLexifiedContextStack=[!1],this.rightmostFailurePosition=-1,this._rightmostFailurePositionStack=[],this._recordedFailuresStack=[],r!==void 0&&(this.positionToRecordFailures=r,this.recordedFailures=Object.create(null))}posToOffset(e){return e-this._posStack[this._posStack.length-1]}enterApplication(e,n){this._posStack.push(this.inputStream.pos),this._applicationStack.push(n),this.inLexifiedContextStack.push(!1),e.enter(n),this._rightmostFailurePositionStack.push(this.rightmostFailurePosition),this.rightmostFailurePosition=-1}exitApplication(e,n){const r=this._posStack.pop();this._applicationStack.pop(),this.inLexifiedContextStack.pop(),e.exit(),this.rightmostFailurePosition=Math.max(this.rightmostFailurePosition,this._rightmostFailurePositionStack.pop()),n&&this.pushBinding(n,r)}enterLexifiedContext(){this.inLexifiedContextStack.push(!0)}exitLexifiedContext(){this.inLexifiedContextStack.pop()}currentApplication(){return this._applicationStack[this._applicationStack.length-1]}inSyntacticContext(){const e=this.currentApplication();return e?e.isSyntactic()&&!this.inLexifiedContext():this.startExpr.factors[0].isSyntactic()}inLexifiedContext(){return this.inLexifiedContextStack[this.inLexifiedContextStack.length-1]}skipSpaces(){return this.pushFailuresInfo(),this.eval(ht),this.popBinding(),this.popFailuresInfo(),this.inputStream.pos}skipSpacesIfInSyntacticContext(){return this.inSyntacticContext()?this.skipSpaces():this.inputStream.pos}maybeSkipSpacesBefore(e){return e.allowsSkippingPrecedingSpace()&&e!==ht?this.skipSpacesIfInSyntacticContext():this.inputStream.pos}pushBinding(e,n){this._bindings.push(e),this._bindingOffsets.push(this.posToOffset(n))}popBinding(){this._bindings.pop(),this._bindingOffsets.pop()}numBindings(){return this._bindings.length}truncateBindings(e){for(;this._bindings.length>e;)this.popBinding()}getCurrentPosInfo(){return this.getPosInfo(this.inputStream.pos)}getPosInfo(e){let n=this.memoTable[e];return n||(n=this.memoTable[e]=new ri),n}processFailure(e,n){if(this.rightmostFailurePosition=Math.max(this.rightmostFailurePosition,e),this.recordedFailures&&e===this.positionToRecordFailures){const r=this.currentApplication();r&&(n=n.substituteParams(r.args)),this.recordFailure(n.toFailure(this.grammar),!1)}}recordFailure(e,n){const r=e.toKey();this.recordedFailures[r]?this.recordedFailures[r].isFluffy()&&!e.isFluffy()&&this.recordedFailures[r].clearFluffy():this.recordedFailures[r]=n?e.clone():e}recordFailures(e,n){Object.keys(e).forEach(r=>{this.recordFailure(e[r],n)})}cloneRecordedFailures(){if(!this.recordedFailures)return;const e=Object.create(null);return Object.keys(this.recordedFailures).forEach(n=>{e[n]=this.recordedFailures[n].clone()}),e}getRightmostFailurePosition(){return this.rightmostFailurePosition}_getRightmostFailureOffset(){return this.rightmostFailurePosition>=0?this.posToOffset(this.rightmostFailurePosition):-1}getMemoizedTraceEntry(e,n){const r=this.memoTable[e];if(r&&n instanceof O){const i=r.memo[n.toMemoKey()];if(i&&i.traceEntry){const s=i.traceEntry.cloneWithExpr(n);return s.isMemoized=!0,s}}return null}getTraceEntry(e,n,r,i){if(n instanceof O){const s=this.currentApplication(),a=s?s.args:[];n=n.substituteParams(a)}return this.getMemoizedTraceEntry(e,n)||new de(this.input,e,this.inputStream.pos,n,r,i,this.trace)}isTracing(){return!!this.trace}hasNecessaryInfo(e){return this.trace&&!e.traceEntry?!1:this.recordedFailures&&this.inputStream.pos+e.rightmostFailureOffset===this.positionToRecordFailures?!!e.failuresAtRightmostPosition:!0}useMemoizedResult(e,n){this.trace&&this.trace.push(n.traceEntry);const r=this.inputStream.pos+n.rightmostFailureOffset;return this.rightmostFailurePosition=Math.max(this.rightmostFailurePosition,r),this.recordedFailures&&this.positionToRecordFailures===r&&n.failuresAtRightmostPosition&&this.recordFailures(n.failuresAtRightmostPosition,!0),this.inputStream.examinedLength=Math.max(this.inputStream.examinedLength,n.examinedLength+e),n.value?(this.inputStream.pos+=n.matchLength,this.pushBinding(n.value,e),!0):!1}eval(e){const{inputStream:n}=this,r=this._bindings.length,i=this.userData;let s;this.recordedFailures&&(s=this.recordedFailures,this.recordedFailures=Object.create(null));const a=n.pos,u=this.maybeSkipSpacesBefore(e);let p;this.trace&&(p=this.trace,this.trace=[]);const d=e.eval(this);if(this.trace){const c=this._bindings.slice(r),h=this.getTraceEntry(u,e,d,c);h.isImplicitSpaces=e===ht,h.isRootNode=e===this.startExpr,p.push(h),this.trace=p}return d?this.recordedFailures&&n.pos===this.positionToRecordFailures&&Object.keys(this.recordedFailures).forEach(c=>{this.recordedFailures[c].makeFluffy()}):(n.pos=a,this.truncateBindings(r),this.userData=i),this.recordedFailures&&this.recordFailures(s,!1),e===kn&&this.skipSpaces(),d}getMatchResult(){this.grammar._setUpMatchState(this),this.eval(this.startExpr);let e;this.recordedFailures&&(e=Object.keys(this.recordedFailures).map(r=>this.recordedFailures[r]));const n=this._bindings[0];return n&&(n.grammar=this.grammar),new Fn(this.matcher,this.input,this.startExpr,n,this._bindingOffsets[0],this.rightmostFailurePosition,e)}getTrace(){this.trace=[];const e=this.getMatchResult(),n=this.trace[this.trace.length-1];return n.result=e,n}pushFailuresInfo(){this._rightmostFailurePositionStack.push(this.rightmostFailurePosition),this._recordedFailuresStack.push(this.recordedFailures)}popFailuresInfo(){this.rightmostFailurePosition=this._rightmostFailurePositionStack.pop(),this.recordedFailures=this._recordedFailuresStack.pop()}}class gi{constructor(e){this.grammar=e,this._memoTable=[],this._input="",this._isMemoTableStale=!1}_resetMemoTable(){this._memoTable=[],this._isMemoTableStale=!1}getInput(){return this._input}setInput(e){return this._input!==e&&this.replaceInputRange(0,this._input.length,e),this}replaceInputRange(e,n,r){const i=this._input,s=this._memoTable;if(e<0||e>i.length||n<0||n>i.length||e>n)throw new Error("Invalid indices: "+e+" and "+n);this._input=i.slice(0,e)+r+i.slice(n),this._input!==i&&s.length>0&&(this._isMemoTableStale=!0);const a=s.slice(n);s.length=e;for(let u=0;u<r.length;u++)s.push(void 0);for(const u of a)s.push(u);for(let u=0;u<e;u++){const p=s[u];p&&p.clearObsoleteEntries(u,e)}return this}match(e,n={incremental:!0}){return this._match(this._getStartExpr(e),{incremental:n.incremental,tracing:!1})}trace(e,n={incremental:!0}){return this._match(this._getStartExpr(e),{incremental:n.incremental,tracing:!0})}_match(e,n={}){const r={tracing:!1,incremental:!0,positionToRecordFailures:void 0,...n};if(!r.incremental)this._resetMemoTable();else if(this._isMemoTableStale&&!this.grammar.supportsIncrementalParsing)throw Mr(this.grammar);const i=new di(this,e,r.positionToRecordFailures);return r.tracing?i.getTrace():i.getMatchResult()}_getStartExpr(e){const n=e||this.grammar.defaultStartRule;if(!n)throw new Error("Missing start rule argument -- the grammar has no default start rule.");const r=this.grammar.parseApplication(n);return new k([r,$])}}const ke=[],It=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);class an{constructor(e,n,r){this._node=e,this.source=n,this._baseInterval=r,e.isNonterminal()&&ge(n===r),this._childWrappers=[]}_forgetMemoizedResultFor(e){delete this._node[this._semantics.attributeKeys[e]],this.children.forEach(n=>{n._forgetMemoizedResultFor(e)})}child(e){if(!(0<=e&&e<this._node.numChildren()))return;let n=this._childWrappers[e];if(!n){const r=this._node.childAt(e),i=this._node.childOffsets[e],s=this._baseInterval.subInterval(i,r.matchLength),a=r.isNonterminal()?s:this._baseInterval;n=this._childWrappers[e]=this._semantics.wrap(r,s,a)}return n}_children(){for(let e=0;e<this._node.numChildren();e++)this.child(e);return this._childWrappers}isIteration(){return this._node.isIteration()}isTerminal(){return this._node.isTerminal()}isNonterminal(){return this._node.isNonterminal()}isSyntactic(){return this.isNonterminal()&&this._node.isSyntactic()}isLexical(){return this.isNonterminal()&&this._node.isLexical()}isOptional(){return this._node.isOptional()}iteration(e){const n=e||[],r=n.map(a=>a._node),i=new Cn(r,[],-1,!1),s=this._semantics.wrap(i,null,null);return s._childWrappers=n,s}get children(){return this._children()}get ctorName(){return this._node.ctorName}get numChildren(){return this._node.numChildren()}get sourceString(){return this.source.contents}}class Z{constructor(e,n){const r=this;if(this.grammar=e,this.checkedActionDicts=!1,this.Wrapper=class extends(n?n.Wrapper:an){constructor(i,s,a){super(i,s,a),r.checkActionDictsIfHaventAlready(),this._semantics=r}toString(){return"[semantics wrapper for "+r.grammar.name+"]"}},this.super=n,n){if(!(e.equals(this.super.grammar)||e._inheritsFrom(this.super.grammar)))throw new Error("Cannot extend a semantics for grammar '"+this.super.grammar.name+"' for use with grammar '"+e.name+"' (not a sub-grammar)");this.operations=Object.create(this.super.operations),this.attributes=Object.create(this.super.attributes),this.attributeKeys=Object.create(null);for(const i in this.attributes)Object.defineProperty(this.attributeKeys,i,{value:sn(i)})}else this.operations=Object.create(null),this.attributes=Object.create(null),this.attributeKeys=Object.create(null)}toString(){return"[semantics for "+this.grammar.name+"]"}checkActionDictsIfHaventAlready(){this.checkedActionDicts||(this.checkActionDicts(),this.checkedActionDicts=!0)}checkActionDicts(){let e;for(e in this.operations)this.operations[e].checkActionDict(this.grammar);for(e in this.attributes)this.attributes[e].checkActionDict(this.grammar)}toRecipe(e){function n(i){return i.super!==Z.BuiltInSemantics._getSemantics()}let r=`(function(g) {
`;if(n(this)){r+="  var semantics = "+this.super.toRecipe(!0)+"(g";const i=this.super.grammar;let s=this.grammar;for(;s!==i;)r+=".superGrammar",s=s.superGrammar;r+=`);
`,r+="  return g.extendSemantics(semantics)"}else r+="  return g.createSemantics()";return["Operation","Attribute"].forEach(i=>{const s=this[i.toLowerCase()+"s"];Object.keys(s).forEach(a=>{const{actionDict:u,formals:p,builtInDefault:d}=s[a];let c=a;p.length>0&&(c+="("+p.join(", ")+")");let h;n(this)&&this.super[i.toLowerCase()+"s"][a]?h="extend"+i:h="add"+i,r+=`
    .`+h+"("+JSON.stringify(c)+", {";const g=[];Object.keys(u).forEach(v=>{if(u[v]!==d){let x=u[v].toString().trim();x=x.replace(/^.*\(/,"function("),g.push(`
      `+JSON.stringify(v)+": "+x)}}),r+=g.join(",")+`
    })`})}),r+=`;
  })`,e||(r=`(function() {
  var grammar = this.fromRecipe(`+this.grammar.toRecipe()+`);
  var semantics = `+r+`(grammar);
  return semantics;
});
`),r}addOperationOrAttribute(e,n,r){const i=e+"s",s=ln(n,e),{name:a}=s,{formals:u}=s;this.assertNewName(a,e);const p=yi(e,a,h),d={_default:p};Object.keys(r).forEach(g=>{d[g]=r[g]});const c=e==="operation"?new Be(a,u,d,p):new _t(a,d,p);c.checkActionDict(this.grammar),this[i][a]=c;function h(...g){const v=this._semantics[i][a];if(arguments.length!==v.formals.length)throw new Error("Invalid number of arguments passed to "+a+" "+e+" (expected "+v.formals.length+", got "+arguments.length+")");const x=Object.create(null);for(const[te,ie]of Object.entries(g)){const ye=v.formals[te];x[ye]=ie}const L=this.args;this.args=x;const E=v.execute(this._semantics,this);return this.args=L,E}e==="operation"?(this.Wrapper.prototype[a]=h,this.Wrapper.prototype[a].toString=function(){return"["+a+" operation]"}):(Object.defineProperty(this.Wrapper.prototype,a,{get:h,configurable:!0}),Object.defineProperty(this.attributeKeys,a,{value:sn(a)}))}extendOperationOrAttribute(e,n,r){const i=e+"s";if(ln(n,"attribute"),!(this.super&&n in this.super[i]))throw new Error("Cannot extend "+e+" '"+n+"': did not inherit an "+e+" with that name");if(It(this[i],n))throw new Error("Cannot extend "+e+" '"+n+"' again");const s=this[i][n].formals,a=this[i][n].actionDict,u=Object.create(a);Object.keys(r).forEach(p=>{u[p]=r[p]}),this[i][n]=e==="operation"?new Be(n,s,u):new _t(n,u),this[i][n].checkActionDict(this.grammar)}assertNewName(e,n){if(It(an.prototype,e))throw new Error("Cannot add "+n+" '"+e+"': that's a reserved name");if(e in this.operations)throw new Error("Cannot add "+n+" '"+e+"': an operation with that name already exists");if(e in this.attributes)throw new Error("Cannot add "+n+" '"+e+"': an attribute with that name already exists")}wrap(e,n,r){const i=r||n;return e instanceof this.Wrapper?e:new this.Wrapper(e,n,i)}}function ln(t,e){if(!Z.prototypeGrammar)return ge(t.indexOf("(")===-1),{name:t,formals:[]};const n=Z.prototypeGrammar.match(t,e==="operation"?"OperationSignature":"AttributeSignature");if(n.failed())throw new Error(n.message);return Z.prototypeGrammarSemantics(n).parse()}function yi(t,e,n){return function(...r){const s=(this._semantics.operations[e]||this._semantics.attributes[e]).formals.map(a=>this.args[a]);if(!this.isIteration()&&r.length===1)return n.apply(r[0],s);throw Yr(this.ctorName,e,t,ke)}}Z.createSemantics=function(t,e){const n=new Z(t,e!==void 0?e:Z.BuiltInSemantics._getSemantics()),r=function(s){if(!(s instanceof Fn))throw new TypeError("Semantics expected a MatchResult, but got "+St(s));if(s.failed())throw new TypeError("cannot apply Semantics to "+s.toString());const a=s._cst;if(a.grammar!==t)throw new Error("Cannot use a MatchResult from grammar '"+a.grammar.name+"' with a semantics for '"+t.name+"'");const u=new st(s.input);return n.wrap(a,u.interval(s._cstOffset,s.input.length))};return r.addOperation=function(i,s){return n.addOperationOrAttribute("operation",i,s),r},r.extendOperation=function(i,s){return n.extendOperationOrAttribute("operation",i,s),r},r.addAttribute=function(i,s){return n.addOperationOrAttribute("attribute",i,s),r},r.extendAttribute=function(i,s){return n.extendOperationOrAttribute("attribute",i,s),r},r._getActionDict=function(i){const s=n.operations[i]||n.attributes[i];if(!s)throw new Error('"'+i+'" is not a valid operation or attribute name in this semantics for "'+t.name+'"');return s.actionDict},r._remove=function(i){let s;return i in n.operations?(s=n.operations[i],delete n.operations[i]):i in n.attributes&&(s=n.attributes[i],delete n.attributes[i]),delete n.Wrapper.prototype[i],s},r.getOperationNames=function(){return Object.keys(n.operations)},r.getAttributeNames=function(){return Object.keys(n.attributes)},r.getGrammar=function(){return n.grammar},r.toRecipe=function(i){return n.toRecipe(i)},r.toString=n.toString.bind(n),r._getSemantics=function(){return n},r};class Be{constructor(e,n,r,i){this.name=e,this.formals=n,this.actionDict=r,this.builtInDefault=i}checkActionDict(e){e._checkTopDownActionDict(this.typeName,this.name,this.actionDict)}execute(e,n){try{const{ctorName:r}=n._node;let i=this.actionDict[r];return i?(ke.push([this,r]),i.apply(n,n._children())):n.isNonterminal()&&(i=this.actionDict._nonterminal,i)?(ke.push([this,"_nonterminal",r]),i.apply(n,n._children())):(ke.push([this,"default action",r]),this.actionDict._default.apply(n,n._children()))}finally{ke.pop()}}}Be.prototype.typeName="operation";class _t extends Be{constructor(e,n,r){super(e,[],n,r)}execute(e,n){const r=n._node,i=e.attributeKeys[this.name];return It(r,i)||(r[i]=Be.prototype.execute.call(this,e,n)),r[i]}}_t.prototype.typeName="attribute";const cn=["_iter","_terminal","_nonterminal","_default"];function un(t){return Object.keys(t.rules).sort().map(e=>t.rules[e])}const vi=t=>t.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029");let Dn,jn;class W{constructor(e,n,r,i){if(this.name=e,this.superGrammar=n,this.rules=r,i){if(!(i in r))throw new Error("Invalid start rule: '"+i+"' is not a rule in grammar '"+e+"'");this.defaultStartRule=i}this._matchStateInitializer=void 0,this.supportsIncrementalParsing=!0}matcher(){return new gi(this)}isBuiltIn(){return this===W.ProtoBuiltInRules||this===W.BuiltInRules}equals(e){if(this===e)return!0;if(e==null||this.name!==e.name||this.defaultStartRule!==e.defaultStartRule||!(this.superGrammar===e.superGrammar||this.superGrammar.equals(e.superGrammar)))return!1;const n=un(this),r=un(e);return n.length===r.length&&n.every((i,s)=>i.description===r[s].description&&i.formals.join(",")===r[s].formals.join(",")&&i.body.toString()===r[s].body.toString())}match(e,n){const r=this.matcher();return r.replaceInputRange(0,0,e),r.match(n)}trace(e,n){const r=this.matcher();return r.replaceInputRange(0,0,e),r.trace(n)}createSemantics(){return Z.createSemantics(this)}extendSemantics(e){return Z.createSemantics(this,e._getSemantics())}_checkTopDownActionDict(e,n,r){const i=[];for(const s in r){const a=r[s];if(!cn.includes(s)&&!(s in this.rules)){i.push(`'${s}' is not a valid semantic action for '${this.name}'`);continue}if(typeof a!="function"){i.push(`'${s}' must be a function in an action dictionary for '${this.name}'`);continue}const p=a.length,d=this._topDownActionArity(s);if(p!==d){let c;s==="_iter"||s==="_nonterminal"?c=`it should use a rest parameter, e.g. \`${s}(...children) {}\`. NOTE: this is new in Ohm v16 — see https://ohmjs.org/d/ati for details.`:c=`expected ${d}, got ${p}`,i.push(`Semantic action '${s}' has the wrong arity: ${c}`)}}if(i.length>0){const s=i.map(u=>"- "+u),a=new Error([`Found errors in the action dictionary of the '${n}' ${e}:`,...s].join(`
`));throw a.problems=i,a}}_topDownActionArity(e){return cn.includes(e)?0:this.rules[e].body.getArity()}_inheritsFrom(e){let n=this.superGrammar;for(;n;){if(n.equals(e,!0))return!0;n=n.superGrammar}return!1}toRecipe(e=void 0){const n={};this.source&&(n.source=this.source.contents);let r=null;this.defaultStartRule&&(r=this.defaultStartRule);const i={};Object.keys(this.rules).forEach(u=>{const p=this.rules[u],{body:d}=p,c=!this.superGrammar||!this.superGrammar.rules[u];let h;c?h="define":h=d instanceof rt?"extend":"override";const g={};if(p.source&&this.source){const L=p.source.relativeTo(this.source);g.sourceInterval=[L.startIdx,L.endIdx]}const v=c?p.description:null,x=d.outputRecipe(p.formals,this.source);i[u]=[h,g,v,p.formals,x]});let s="null";e?s=e:this.superGrammar&&!this.superGrammar.isBuiltIn()&&(s=this.superGrammar.toRecipe());const a=[...["grammar",n,this.name].map(JSON.stringify),s,...[r,i].map(JSON.stringify)];return vi(`[${a.join(",")}]`)}toOperationActionDictionaryTemplate(){return this._toOperationOrAttributeActionDictionaryTemplate()}toAttributeActionDictionaryTemplate(){return this._toOperationOrAttributeActionDictionaryTemplate()}_toOperationOrAttributeActionDictionaryTemplate(){const e=new we;e.append("{");let n=!0;for(const r in this.rules){const{body:i}=this.rules[r];n?n=!1:e.append(","),e.append(`
`),e.append("  "),this.addSemanticActionTemplate(r,i,e)}return e.append(`
}`),e.contents()}addSemanticActionTemplate(e,n,r){r.append(e),r.append(": function(");const i=this._topDownActionArity(e);r.append(nt("_",i).join(", ")),r.append(`) {
`),r.append("  }")}parseApplication(e){let n;if(e.indexOf("<")===-1)n=new O(e);else{const i=Dn.match(e,"Base_application");n=jn(i,{})}if(!(n.ruleName in this.rules))throw Nn(n.ruleName,this.name);const{formals:r}=this.rules[n.ruleName];if(r.length!==n.args.length){const{source:i}=this.rules[n.ruleName];throw Ln(n.ruleName,r.length,n.args.length,i)}return n}_setUpMatchState(e){this._matchStateInitializer&&this._matchStateInitializer(e)}}W.ProtoBuiltInRules=new W("ProtoBuiltInRules",void 0,{any:{body:q,formals:[],description:"any character",primitive:!0},end:{body:$,formals:[],description:"end of input",primitive:!0},caseInsensitive:{body:new Et(new H(0)),formals:["str"],primitive:!0},lower:{body:new j("Ll"),formals:[],description:"a lowercase letter",primitive:!0},upper:{body:new j("Lu"),formals:[],description:"an uppercase letter",primitive:!0},unicodeLtmo:{body:new j("Ltmo"),formals:[],description:"a Unicode character in Lt, Lm, or Lo",primitive:!0},spaces:{body:new xe(new O("space")),formals:[]},space:{body:new U("\0"," "),formals:[],description:"a space"}});W.initApplicationParser=function(t,e){Dn=t,jn=e};class pn{constructor(e){this.name=e}sourceInterval(e,n){return this.source.subInterval(e,n-e)}ensureSuperGrammar(){return this.superGrammar||this.withSuperGrammar(this.name==="BuiltInRules"?W.ProtoBuiltInRules:W.BuiltInRules),this.superGrammar}ensureSuperGrammarRuleForOverriding(e,n){const r=this.ensureSuperGrammar().rules[e];if(!r)throw Gr(e,this.superGrammar.name,n);return r}installOverriddenOrExtendedRule(e,n,r,i){const s=dt(n);if(s.length>0)throw tn(e,s,i);const a=this.ensureSuperGrammar().rules[e],u=a.formals,p=u?u.length:0;if(n.length!==p)throw Ln(e,p,n.length,i);return this.install(e,n,r,a.description,i)}install(e,n,r,i,s,a=!1){return this.rules[e]={body:r.introduceParams(n),formals:n,description:i,source:s,primitive:a},this}withSuperGrammar(e){if(this.superGrammar)throw new Error("the super grammar of a GrammarDecl cannot be set more than once");return this.superGrammar=e,this.rules=Object.create(e.rules),e.isBuiltIn()||(this.defaultStartRule=e.defaultStartRule),this}withDefaultStartRule(e){return this.defaultStartRule=e,this}withSource(e){return this.source=new st(e).interval(0,e.length),this}build(){const e=new W(this.name,this.ensureSuperGrammar(),this.rules,this.defaultStartRule);e._matchStateInitializer=e.superGrammar._matchStateInitializer,e.supportsIncrementalParsing=e.superGrammar.supportsIncrementalParsing;const n=[];let r=!1;return Object.keys(e.rules).forEach(i=>{const{body:s}=e.rules[i];try{s.assertChoicesHaveUniformArity(i)}catch(a){n.push(a)}try{s.assertAllApplicationsAreValid(i,e)}catch(a){n.push(a),r=!0}}),r||Object.keys(e.rules).forEach(i=>{const{body:s}=e.rules[i];try{s.assertIteratedExprsAreNotNullable(e,[])}catch(a){n.push(a)}}),n.length>0&&Zr(n),this.source&&(e.source=this.source),e}define(e,n,r,i,s,a){if(this.ensureSuperGrammar(),this.superGrammar.rules[e])throw en(e,this.name,this.superGrammar.name,s);if(this.rules[e])throw en(e,this.name,this.name,s);const u=dt(n);if(u.length>0)throw tn(e,u,s);return this.install(e,n,r,i,s,a)}override(e,n,r,i,s){return this.ensureSuperGrammarRuleForOverriding(e,s),this.installOverriddenOrExtendedRule(e,n,r,s),this}extend(e,n,r,i,s){if(!this.ensureSuperGrammar().rules[e])throw qr(e,this.superGrammar.name,s);const u=new rt(this.superGrammar,e,r);return u.source=r.source,this.installOverriddenOrExtendedRule(e,n,u,s),this}}class Ze{constructor(){this.currentDecl=null,this.currentRuleName=null}newGrammar(e){return new pn(e)}grammar(e,n,r,i,s){const a=new pn(n);return r&&a.withSuperGrammar(r instanceof W?r:this.fromRecipe(r)),i&&a.withDefaultStartRule(i),e&&e.source&&a.withSource(e.source),this.currentDecl=a,Object.keys(s).forEach(u=>{this.currentRuleName=u;const p=s[u],d=p[0],c=p[1],h=p[2],g=p[3],v=this.fromRecipe(p[4]);let x;a.source&&c&&c.sourceInterval&&(x=a.source.subInterval(c.sourceInterval[0],c.sourceInterval[1]-c.sourceInterval[0])),a[d](u,g,v,h,x)}),this.currentRuleName=this.currentDecl=null,a.build()}terminal(e){return new B(e)}range(e,n){return new U(e,n)}param(e){return new H(e)}alt(...e){let n=[];for(let r of e)r instanceof w||(r=this.fromRecipe(r)),r instanceof C?n=n.concat(r.terms):n.push(r);return n.length===1?n[0]:new C(n)}seq(...e){let n=[];for(let r of e)r instanceof w||(r=this.fromRecipe(r)),r instanceof k?n=n.concat(r.factors):n.push(r);return n.length===1?n[0]:new k(n)}star(e){return e instanceof w||(e=this.fromRecipe(e)),new xe(e)}plus(e){return e instanceof w||(e=this.fromRecipe(e)),new Te(e)}opt(e){return e instanceof w||(e=this.fromRecipe(e)),new he(e)}not(e){return e instanceof w||(e=this.fromRecipe(e)),new J(e)}lookahead(e){return e instanceof w||(e=this.fromRecipe(e)),new Q(e)}lex(e){return e instanceof w||(e=this.fromRecipe(e)),new X(e)}app(e,n){return n&&n.length>0&&(n=n.map(function(r){return r instanceof w?r:this.fromRecipe(r)},this)),new O(e,n)}splice(e,n){return new it(this.currentDecl.superGrammar,this.currentRuleName,e.map(r=>this.fromRecipe(r)),n.map(r=>this.fromRecipe(r)))}fromRecipe(e){const n=e[0]==="grammar"?e.slice(1):e.slice(2),r=this[e[0]](...n),i=e[1];return i&&i.sourceInterval&&this.currentDecl&&r.withSource(this.currentDecl.sourceInterval(...i.sourceInterval)),r}}function Pt(t){return typeof t=="function"?t.call(new Ze):(typeof t=="string"&&(t=JSON.parse(t)),new Ze().fromRecipe(t))}const Rt=Pt(["grammar",{source:`BuiltInRules {

  alnum  (an alpha-numeric character)
    = letter
    | digit

  letter  (a letter)
    = lower
    | upper
    | unicodeLtmo

  digit  (a digit)
    = "0".."9"

  hexDigit  (a hexadecimal digit)
    = digit
    | "a".."f"
    | "A".."F"

  ListOf<elem, sep>
    = NonemptyListOf<elem, sep>
    | EmptyListOf<elem, sep>

  NonemptyListOf<elem, sep>
    = elem (sep elem)*

  EmptyListOf<elem, sep>
    = /* nothing */

  listOf<elem, sep>
    = nonemptyListOf<elem, sep>
    | emptyListOf<elem, sep>

  nonemptyListOf<elem, sep>
    = elem (sep elem)*

  emptyListOf<elem, sep>
    = /* nothing */

  // Allows a syntactic rule application within a lexical context.
  applySyntactic<app> = app
}`},"BuiltInRules",null,null,{alnum:["define",{sourceInterval:[18,78]},"an alpha-numeric character",[],["alt",{sourceInterval:[60,78]},["app",{sourceInterval:[60,66]},"letter",[]],["app",{sourceInterval:[73,78]},"digit",[]]]],letter:["define",{sourceInterval:[82,142]},"a letter",[],["alt",{sourceInterval:[107,142]},["app",{sourceInterval:[107,112]},"lower",[]],["app",{sourceInterval:[119,124]},"upper",[]],["app",{sourceInterval:[131,142]},"unicodeLtmo",[]]]],digit:["define",{sourceInterval:[146,177]},"a digit",[],["range",{sourceInterval:[169,177]},"0","9"]],hexDigit:["define",{sourceInterval:[181,254]},"a hexadecimal digit",[],["alt",{sourceInterval:[219,254]},["app",{sourceInterval:[219,224]},"digit",[]],["range",{sourceInterval:[231,239]},"a","f"],["range",{sourceInterval:[246,254]},"A","F"]]],ListOf:["define",{sourceInterval:[258,336]},null,["elem","sep"],["alt",{sourceInterval:[282,336]},["app",{sourceInterval:[282,307]},"NonemptyListOf",[["param",{sourceInterval:[297,301]},0],["param",{sourceInterval:[303,306]},1]]],["app",{sourceInterval:[314,336]},"EmptyListOf",[["param",{sourceInterval:[326,330]},0],["param",{sourceInterval:[332,335]},1]]]]],NonemptyListOf:["define",{sourceInterval:[340,388]},null,["elem","sep"],["seq",{sourceInterval:[372,388]},["param",{sourceInterval:[372,376]},0],["star",{sourceInterval:[377,388]},["seq",{sourceInterval:[378,386]},["param",{sourceInterval:[378,381]},1],["param",{sourceInterval:[382,386]},0]]]]],EmptyListOf:["define",{sourceInterval:[392,434]},null,["elem","sep"],["seq",{sourceInterval:[438,438]}]],listOf:["define",{sourceInterval:[438,516]},null,["elem","sep"],["alt",{sourceInterval:[462,516]},["app",{sourceInterval:[462,487]},"nonemptyListOf",[["param",{sourceInterval:[477,481]},0],["param",{sourceInterval:[483,486]},1]]],["app",{sourceInterval:[494,516]},"emptyListOf",[["param",{sourceInterval:[506,510]},0],["param",{sourceInterval:[512,515]},1]]]]],nonemptyListOf:["define",{sourceInterval:[520,568]},null,["elem","sep"],["seq",{sourceInterval:[552,568]},["param",{sourceInterval:[552,556]},0],["star",{sourceInterval:[557,568]},["seq",{sourceInterval:[558,566]},["param",{sourceInterval:[558,561]},1],["param",{sourceInterval:[562,566]},0]]]]],emptyListOf:["define",{sourceInterval:[572,682]},null,["elem","sep"],["seq",{sourceInterval:[685,685]}]],applySyntactic:["define",{sourceInterval:[685,710]},null,["app"],["param",{sourceInterval:[707,710]},0]]}]);W.BuiltInRules=Rt;ti(W.BuiltInRules);const Ft=Pt(["grammar",{source:`Ohm {

  Grammars
    = Grammar*

  Grammar
    = ident SuperGrammar? "{" Rule* "}"

  SuperGrammar
    = "<:" ident

  Rule
    = ident Formals? ruleDescr? "="  RuleBody  -- define
    | ident Formals?            ":=" OverrideRuleBody  -- override
    | ident Formals?            "+=" RuleBody  -- extend

  RuleBody
    = "|"? NonemptyListOf<TopLevelTerm, "|">

  TopLevelTerm
    = Seq caseName  -- inline
    | Seq

  OverrideRuleBody
    = "|"? NonemptyListOf<OverrideTopLevelTerm, "|">

  OverrideTopLevelTerm
    = "..."  -- superSplice
    | TopLevelTerm

  Formals
    = "<" ListOf<ident, ","> ">"

  Params
    = "<" ListOf<Seq, ","> ">"

  Alt
    = NonemptyListOf<Seq, "|">

  Seq
    = Iter*

  Iter
    = Pred "*"  -- star
    | Pred "+"  -- plus
    | Pred "?"  -- opt
    | Pred

  Pred
    = "~" Lex  -- not
    | "&" Lex  -- lookahead
    | Lex

  Lex
    = "#" Base  -- lex
    | Base

  Base
    = ident Params? ~(ruleDescr? "=" | ":=" | "+=")  -- application
    | oneCharTerminal ".." oneCharTerminal           -- range
    | terminal                                       -- terminal
    | "(" Alt ")"                                    -- paren

  ruleDescr  (a rule description)
    = "(" ruleDescrText ")"

  ruleDescrText
    = (~")" any)*

  caseName
    = "--" (~"\\n" space)* name (~"\\n" space)* ("\\n" | &"}")

  name  (a name)
    = nameFirst nameRest*

  nameFirst
    = "_"
    | letter

  nameRest
    = "_"
    | alnum

  ident  (an identifier)
    = name

  terminal
    = "\\"" terminalChar* "\\""

  oneCharTerminal
    = "\\"" terminalChar "\\""

  terminalChar
    = escapeChar
      | ~"\\\\" ~"\\"" ~"\\n" "\\u{0}".."\\u{10FFFF}"

  escapeChar  (an escape sequence)
    = "\\\\\\\\"                                     -- backslash
    | "\\\\\\""                                     -- doubleQuote
    | "\\\\\\'"                                     -- singleQuote
    | "\\\\b"                                      -- backspace
    | "\\\\n"                                      -- lineFeed
    | "\\\\r"                                      -- carriageReturn
    | "\\\\t"                                      -- tab
    | "\\\\u{" hexDigit hexDigit? hexDigit?
             hexDigit? hexDigit? hexDigit? "}"   -- unicodeCodePoint
    | "\\\\u" hexDigit hexDigit hexDigit hexDigit  -- unicodeEscape
    | "\\\\x" hexDigit hexDigit                    -- hexEscape

  space
   += comment

  comment
    = "//" (~"\\n" any)* &("\\n" | end)  -- singleLine
    | "/*" (~"*/" any)* "*/"  -- multiLine

  tokens = token*

  token = caseName | comment | ident | operator | punctuation | terminal | any

  operator = "<:" | "=" | ":=" | "+=" | "*" | "+" | "?" | "~" | "&"

  punctuation = "<" | ">" | "," | "--"
}`},"Ohm",null,"Grammars",{Grammars:["define",{sourceInterval:[9,32]},null,[],["star",{sourceInterval:[24,32]},["app",{sourceInterval:[24,31]},"Grammar",[]]]],Grammar:["define",{sourceInterval:[36,83]},null,[],["seq",{sourceInterval:[50,83]},["app",{sourceInterval:[50,55]},"ident",[]],["opt",{sourceInterval:[56,69]},["app",{sourceInterval:[56,68]},"SuperGrammar",[]]],["terminal",{sourceInterval:[70,73]},"{"],["star",{sourceInterval:[74,79]},["app",{sourceInterval:[74,78]},"Rule",[]]],["terminal",{sourceInterval:[80,83]},"}"]]],SuperGrammar:["define",{sourceInterval:[87,116]},null,[],["seq",{sourceInterval:[106,116]},["terminal",{sourceInterval:[106,110]},"<:"],["app",{sourceInterval:[111,116]},"ident",[]]]],Rule_define:["define",{sourceInterval:[131,181]},null,[],["seq",{sourceInterval:[131,170]},["app",{sourceInterval:[131,136]},"ident",[]],["opt",{sourceInterval:[137,145]},["app",{sourceInterval:[137,144]},"Formals",[]]],["opt",{sourceInterval:[146,156]},["app",{sourceInterval:[146,155]},"ruleDescr",[]]],["terminal",{sourceInterval:[157,160]},"="],["app",{sourceInterval:[162,170]},"RuleBody",[]]]],Rule_override:["define",{sourceInterval:[188,248]},null,[],["seq",{sourceInterval:[188,235]},["app",{sourceInterval:[188,193]},"ident",[]],["opt",{sourceInterval:[194,202]},["app",{sourceInterval:[194,201]},"Formals",[]]],["terminal",{sourceInterval:[214,218]},":="],["app",{sourceInterval:[219,235]},"OverrideRuleBody",[]]]],Rule_extend:["define",{sourceInterval:[255,305]},null,[],["seq",{sourceInterval:[255,294]},["app",{sourceInterval:[255,260]},"ident",[]],["opt",{sourceInterval:[261,269]},["app",{sourceInterval:[261,268]},"Formals",[]]],["terminal",{sourceInterval:[281,285]},"+="],["app",{sourceInterval:[286,294]},"RuleBody",[]]]],Rule:["define",{sourceInterval:[120,305]},null,[],["alt",{sourceInterval:[131,305]},["app",{sourceInterval:[131,170]},"Rule_define",[]],["app",{sourceInterval:[188,235]},"Rule_override",[]],["app",{sourceInterval:[255,294]},"Rule_extend",[]]]],RuleBody:["define",{sourceInterval:[309,362]},null,[],["seq",{sourceInterval:[324,362]},["opt",{sourceInterval:[324,328]},["terminal",{sourceInterval:[324,327]},"|"]],["app",{sourceInterval:[329,362]},"NonemptyListOf",[["app",{sourceInterval:[344,356]},"TopLevelTerm",[]],["terminal",{sourceInterval:[358,361]},"|"]]]]],TopLevelTerm_inline:["define",{sourceInterval:[385,408]},null,[],["seq",{sourceInterval:[385,397]},["app",{sourceInterval:[385,388]},"Seq",[]],["app",{sourceInterval:[389,397]},"caseName",[]]]],TopLevelTerm:["define",{sourceInterval:[366,418]},null,[],["alt",{sourceInterval:[385,418]},["app",{sourceInterval:[385,397]},"TopLevelTerm_inline",[]],["app",{sourceInterval:[415,418]},"Seq",[]]]],OverrideRuleBody:["define",{sourceInterval:[422,491]},null,[],["seq",{sourceInterval:[445,491]},["opt",{sourceInterval:[445,449]},["terminal",{sourceInterval:[445,448]},"|"]],["app",{sourceInterval:[450,491]},"NonemptyListOf",[["app",{sourceInterval:[465,485]},"OverrideTopLevelTerm",[]],["terminal",{sourceInterval:[487,490]},"|"]]]]],OverrideTopLevelTerm_superSplice:["define",{sourceInterval:[522,543]},null,[],["terminal",{sourceInterval:[522,527]},"..."]],OverrideTopLevelTerm:["define",{sourceInterval:[495,562]},null,[],["alt",{sourceInterval:[522,562]},["app",{sourceInterval:[522,527]},"OverrideTopLevelTerm_superSplice",[]],["app",{sourceInterval:[550,562]},"TopLevelTerm",[]]]],Formals:["define",{sourceInterval:[566,606]},null,[],["seq",{sourceInterval:[580,606]},["terminal",{sourceInterval:[580,583]},"<"],["app",{sourceInterval:[584,602]},"ListOf",[["app",{sourceInterval:[591,596]},"ident",[]],["terminal",{sourceInterval:[598,601]},","]]],["terminal",{sourceInterval:[603,606]},">"]]],Params:["define",{sourceInterval:[610,647]},null,[],["seq",{sourceInterval:[623,647]},["terminal",{sourceInterval:[623,626]},"<"],["app",{sourceInterval:[627,643]},"ListOf",[["app",{sourceInterval:[634,637]},"Seq",[]],["terminal",{sourceInterval:[639,642]},","]]],["terminal",{sourceInterval:[644,647]},">"]]],Alt:["define",{sourceInterval:[651,685]},null,[],["app",{sourceInterval:[661,685]},"NonemptyListOf",[["app",{sourceInterval:[676,679]},"Seq",[]],["terminal",{sourceInterval:[681,684]},"|"]]]],Seq:["define",{sourceInterval:[689,704]},null,[],["star",{sourceInterval:[699,704]},["app",{sourceInterval:[699,703]},"Iter",[]]]],Iter_star:["define",{sourceInterval:[719,736]},null,[],["seq",{sourceInterval:[719,727]},["app",{sourceInterval:[719,723]},"Pred",[]],["terminal",{sourceInterval:[724,727]},"*"]]],Iter_plus:["define",{sourceInterval:[743,760]},null,[],["seq",{sourceInterval:[743,751]},["app",{sourceInterval:[743,747]},"Pred",[]],["terminal",{sourceInterval:[748,751]},"+"]]],Iter_opt:["define",{sourceInterval:[767,783]},null,[],["seq",{sourceInterval:[767,775]},["app",{sourceInterval:[767,771]},"Pred",[]],["terminal",{sourceInterval:[772,775]},"?"]]],Iter:["define",{sourceInterval:[708,794]},null,[],["alt",{sourceInterval:[719,794]},["app",{sourceInterval:[719,727]},"Iter_star",[]],["app",{sourceInterval:[743,751]},"Iter_plus",[]],["app",{sourceInterval:[767,775]},"Iter_opt",[]],["app",{sourceInterval:[790,794]},"Pred",[]]]],Pred_not:["define",{sourceInterval:[809,824]},null,[],["seq",{sourceInterval:[809,816]},["terminal",{sourceInterval:[809,812]},"~"],["app",{sourceInterval:[813,816]},"Lex",[]]]],Pred_lookahead:["define",{sourceInterval:[831,852]},null,[],["seq",{sourceInterval:[831,838]},["terminal",{sourceInterval:[831,834]},"&"],["app",{sourceInterval:[835,838]},"Lex",[]]]],Pred:["define",{sourceInterval:[798,862]},null,[],["alt",{sourceInterval:[809,862]},["app",{sourceInterval:[809,816]},"Pred_not",[]],["app",{sourceInterval:[831,838]},"Pred_lookahead",[]],["app",{sourceInterval:[859,862]},"Lex",[]]]],Lex_lex:["define",{sourceInterval:[876,892]},null,[],["seq",{sourceInterval:[876,884]},["terminal",{sourceInterval:[876,879]},"#"],["app",{sourceInterval:[880,884]},"Base",[]]]],Lex:["define",{sourceInterval:[866,903]},null,[],["alt",{sourceInterval:[876,903]},["app",{sourceInterval:[876,884]},"Lex_lex",[]],["app",{sourceInterval:[899,903]},"Base",[]]]],Base_application:["define",{sourceInterval:[918,979]},null,[],["seq",{sourceInterval:[918,963]},["app",{sourceInterval:[918,923]},"ident",[]],["opt",{sourceInterval:[924,931]},["app",{sourceInterval:[924,930]},"Params",[]]],["not",{sourceInterval:[932,963]},["alt",{sourceInterval:[934,962]},["seq",{sourceInterval:[934,948]},["opt",{sourceInterval:[934,944]},["app",{sourceInterval:[934,943]},"ruleDescr",[]]],["terminal",{sourceInterval:[945,948]},"="]],["terminal",{sourceInterval:[951,955]},":="],["terminal",{sourceInterval:[958,962]},"+="]]]]],Base_range:["define",{sourceInterval:[986,1041]},null,[],["seq",{sourceInterval:[986,1022]},["app",{sourceInterval:[986,1001]},"oneCharTerminal",[]],["terminal",{sourceInterval:[1002,1006]},".."],["app",{sourceInterval:[1007,1022]},"oneCharTerminal",[]]]],Base_terminal:["define",{sourceInterval:[1048,1106]},null,[],["app",{sourceInterval:[1048,1056]},"terminal",[]]],Base_paren:["define",{sourceInterval:[1113,1168]},null,[],["seq",{sourceInterval:[1113,1124]},["terminal",{sourceInterval:[1113,1116]},"("],["app",{sourceInterval:[1117,1120]},"Alt",[]],["terminal",{sourceInterval:[1121,1124]},")"]]],Base:["define",{sourceInterval:[907,1168]},null,[],["alt",{sourceInterval:[918,1168]},["app",{sourceInterval:[918,963]},"Base_application",[]],["app",{sourceInterval:[986,1022]},"Base_range",[]],["app",{sourceInterval:[1048,1056]},"Base_terminal",[]],["app",{sourceInterval:[1113,1124]},"Base_paren",[]]]],ruleDescr:["define",{sourceInterval:[1172,1231]},"a rule description",[],["seq",{sourceInterval:[1210,1231]},["terminal",{sourceInterval:[1210,1213]},"("],["app",{sourceInterval:[1214,1227]},"ruleDescrText",[]],["terminal",{sourceInterval:[1228,1231]},")"]]],ruleDescrText:["define",{sourceInterval:[1235,1266]},null,[],["star",{sourceInterval:[1255,1266]},["seq",{sourceInterval:[1256,1264]},["not",{sourceInterval:[1256,1260]},["terminal",{sourceInterval:[1257,1260]},")"]],["app",{sourceInterval:[1261,1264]},"any",[]]]]],caseName:["define",{sourceInterval:[1270,1338]},null,[],["seq",{sourceInterval:[1285,1338]},["terminal",{sourceInterval:[1285,1289]},"--"],["star",{sourceInterval:[1290,1304]},["seq",{sourceInterval:[1291,1302]},["not",{sourceInterval:[1291,1296]},["terminal",{sourceInterval:[1292,1296]},`
`]],["app",{sourceInterval:[1297,1302]},"space",[]]]],["app",{sourceInterval:[1305,1309]},"name",[]],["star",{sourceInterval:[1310,1324]},["seq",{sourceInterval:[1311,1322]},["not",{sourceInterval:[1311,1316]},["terminal",{sourceInterval:[1312,1316]},`
`]],["app",{sourceInterval:[1317,1322]},"space",[]]]],["alt",{sourceInterval:[1326,1337]},["terminal",{sourceInterval:[1326,1330]},`
`],["lookahead",{sourceInterval:[1333,1337]},["terminal",{sourceInterval:[1334,1337]},"}"]]]]],name:["define",{sourceInterval:[1342,1382]},"a name",[],["seq",{sourceInterval:[1363,1382]},["app",{sourceInterval:[1363,1372]},"nameFirst",[]],["star",{sourceInterval:[1373,1382]},["app",{sourceInterval:[1373,1381]},"nameRest",[]]]]],nameFirst:["define",{sourceInterval:[1386,1418]},null,[],["alt",{sourceInterval:[1402,1418]},["terminal",{sourceInterval:[1402,1405]},"_"],["app",{sourceInterval:[1412,1418]},"letter",[]]]],nameRest:["define",{sourceInterval:[1422,1452]},null,[],["alt",{sourceInterval:[1437,1452]},["terminal",{sourceInterval:[1437,1440]},"_"],["app",{sourceInterval:[1447,1452]},"alnum",[]]]],ident:["define",{sourceInterval:[1456,1489]},"an identifier",[],["app",{sourceInterval:[1485,1489]},"name",[]]],terminal:["define",{sourceInterval:[1493,1531]},null,[],["seq",{sourceInterval:[1508,1531]},["terminal",{sourceInterval:[1508,1512]},'"'],["star",{sourceInterval:[1513,1526]},["app",{sourceInterval:[1513,1525]},"terminalChar",[]]],["terminal",{sourceInterval:[1527,1531]},'"']]],oneCharTerminal:["define",{sourceInterval:[1535,1579]},null,[],["seq",{sourceInterval:[1557,1579]},["terminal",{sourceInterval:[1557,1561]},'"'],["app",{sourceInterval:[1562,1574]},"terminalChar",[]],["terminal",{sourceInterval:[1575,1579]},'"']]],terminalChar:["define",{sourceInterval:[1583,1660]},null,[],["alt",{sourceInterval:[1602,1660]},["app",{sourceInterval:[1602,1612]},"escapeChar",[]],["seq",{sourceInterval:[1621,1660]},["not",{sourceInterval:[1621,1626]},["terminal",{sourceInterval:[1622,1626]},"\\"]],["not",{sourceInterval:[1627,1632]},["terminal",{sourceInterval:[1628,1632]},'"']],["not",{sourceInterval:[1633,1638]},["terminal",{sourceInterval:[1634,1638]},`
`]],["range",{sourceInterval:[1639,1660]},"\0","􏿿"]]]],escapeChar_backslash:["define",{sourceInterval:[1703,1758]},null,[],["terminal",{sourceInterval:[1703,1709]},"\\\\"]],escapeChar_doubleQuote:["define",{sourceInterval:[1765,1822]},null,[],["terminal",{sourceInterval:[1765,1771]},'\\"']],escapeChar_singleQuote:["define",{sourceInterval:[1829,1886]},null,[],["terminal",{sourceInterval:[1829,1835]},"\\'"]],escapeChar_backspace:["define",{sourceInterval:[1893,1948]},null,[],["terminal",{sourceInterval:[1893,1898]},"\\b"]],escapeChar_lineFeed:["define",{sourceInterval:[1955,2009]},null,[],["terminal",{sourceInterval:[1955,1960]},"\\n"]],escapeChar_carriageReturn:["define",{sourceInterval:[2016,2076]},null,[],["terminal",{sourceInterval:[2016,2021]},"\\r"]],escapeChar_tab:["define",{sourceInterval:[2083,2132]},null,[],["terminal",{sourceInterval:[2083,2088]},"\\t"]],escapeChar_unicodeCodePoint:["define",{sourceInterval:[2139,2243]},null,[],["seq",{sourceInterval:[2139,2221]},["terminal",{sourceInterval:[2139,2145]},"\\u{"],["app",{sourceInterval:[2146,2154]},"hexDigit",[]],["opt",{sourceInterval:[2155,2164]},["app",{sourceInterval:[2155,2163]},"hexDigit",[]]],["opt",{sourceInterval:[2165,2174]},["app",{sourceInterval:[2165,2173]},"hexDigit",[]]],["opt",{sourceInterval:[2188,2197]},["app",{sourceInterval:[2188,2196]},"hexDigit",[]]],["opt",{sourceInterval:[2198,2207]},["app",{sourceInterval:[2198,2206]},"hexDigit",[]]],["opt",{sourceInterval:[2208,2217]},["app",{sourceInterval:[2208,2216]},"hexDigit",[]]],["terminal",{sourceInterval:[2218,2221]},"}"]]],escapeChar_unicodeEscape:["define",{sourceInterval:[2250,2309]},null,[],["seq",{sourceInterval:[2250,2291]},["terminal",{sourceInterval:[2250,2255]},"\\u"],["app",{sourceInterval:[2256,2264]},"hexDigit",[]],["app",{sourceInterval:[2265,2273]},"hexDigit",[]],["app",{sourceInterval:[2274,2282]},"hexDigit",[]],["app",{sourceInterval:[2283,2291]},"hexDigit",[]]]],escapeChar_hexEscape:["define",{sourceInterval:[2316,2371]},null,[],["seq",{sourceInterval:[2316,2339]},["terminal",{sourceInterval:[2316,2321]},"\\x"],["app",{sourceInterval:[2322,2330]},"hexDigit",[]],["app",{sourceInterval:[2331,2339]},"hexDigit",[]]]],escapeChar:["define",{sourceInterval:[1664,2371]},"an escape sequence",[],["alt",{sourceInterval:[1703,2371]},["app",{sourceInterval:[1703,1709]},"escapeChar_backslash",[]],["app",{sourceInterval:[1765,1771]},"escapeChar_doubleQuote",[]],["app",{sourceInterval:[1829,1835]},"escapeChar_singleQuote",[]],["app",{sourceInterval:[1893,1898]},"escapeChar_backspace",[]],["app",{sourceInterval:[1955,1960]},"escapeChar_lineFeed",[]],["app",{sourceInterval:[2016,2021]},"escapeChar_carriageReturn",[]],["app",{sourceInterval:[2083,2088]},"escapeChar_tab",[]],["app",{sourceInterval:[2139,2221]},"escapeChar_unicodeCodePoint",[]],["app",{sourceInterval:[2250,2291]},"escapeChar_unicodeEscape",[]],["app",{sourceInterval:[2316,2339]},"escapeChar_hexEscape",[]]]],space:["extend",{sourceInterval:[2375,2394]},null,[],["app",{sourceInterval:[2387,2394]},"comment",[]]],comment_singleLine:["define",{sourceInterval:[2412,2458]},null,[],["seq",{sourceInterval:[2412,2443]},["terminal",{sourceInterval:[2412,2416]},"//"],["star",{sourceInterval:[2417,2429]},["seq",{sourceInterval:[2418,2427]},["not",{sourceInterval:[2418,2423]},["terminal",{sourceInterval:[2419,2423]},`
`]],["app",{sourceInterval:[2424,2427]},"any",[]]]],["lookahead",{sourceInterval:[2430,2443]},["alt",{sourceInterval:[2432,2442]},["terminal",{sourceInterval:[2432,2436]},`
`],["app",{sourceInterval:[2439,2442]},"end",[]]]]]],comment_multiLine:["define",{sourceInterval:[2465,2501]},null,[],["seq",{sourceInterval:[2465,2487]},["terminal",{sourceInterval:[2465,2469]},"/*"],["star",{sourceInterval:[2470,2482]},["seq",{sourceInterval:[2471,2480]},["not",{sourceInterval:[2471,2476]},["terminal",{sourceInterval:[2472,2476]},"*/"]],["app",{sourceInterval:[2477,2480]},"any",[]]]],["terminal",{sourceInterval:[2483,2487]},"*/"]]],comment:["define",{sourceInterval:[2398,2501]},null,[],["alt",{sourceInterval:[2412,2501]},["app",{sourceInterval:[2412,2443]},"comment_singleLine",[]],["app",{sourceInterval:[2465,2487]},"comment_multiLine",[]]]],tokens:["define",{sourceInterval:[2505,2520]},null,[],["star",{sourceInterval:[2514,2520]},["app",{sourceInterval:[2514,2519]},"token",[]]]],token:["define",{sourceInterval:[2524,2600]},null,[],["alt",{sourceInterval:[2532,2600]},["app",{sourceInterval:[2532,2540]},"caseName",[]],["app",{sourceInterval:[2543,2550]},"comment",[]],["app",{sourceInterval:[2553,2558]},"ident",[]],["app",{sourceInterval:[2561,2569]},"operator",[]],["app",{sourceInterval:[2572,2583]},"punctuation",[]],["app",{sourceInterval:[2586,2594]},"terminal",[]],["app",{sourceInterval:[2597,2600]},"any",[]]]],operator:["define",{sourceInterval:[2604,2669]},null,[],["alt",{sourceInterval:[2615,2669]},["terminal",{sourceInterval:[2615,2619]},"<:"],["terminal",{sourceInterval:[2622,2625]},"="],["terminal",{sourceInterval:[2628,2632]},":="],["terminal",{sourceInterval:[2635,2639]},"+="],["terminal",{sourceInterval:[2642,2645]},"*"],["terminal",{sourceInterval:[2648,2651]},"+"],["terminal",{sourceInterval:[2654,2657]},"?"],["terminal",{sourceInterval:[2660,2663]},"~"],["terminal",{sourceInterval:[2666,2669]},"&"]]],punctuation:["define",{sourceInterval:[2673,2709]},null,[],["alt",{sourceInterval:[2687,2709]},["terminal",{sourceInterval:[2687,2690]},"<"],["terminal",{sourceInterval:[2693,2696]},">"],["terminal",{sourceInterval:[2699,2702]},","],["terminal",{sourceInterval:[2705,2709]},"--"]]]}]),ft=Object.create(w.prototype);function hn(t,e){for(const n in t)if(n===e)return!0;return!1}function Bn(t,e,n){const r=new Ze;let i,s,a,u=!1;return(n||Ft).createSemantics().addOperation("visit",{Grammars(c){return c.children.map(h=>h.visit())},Grammar(c,h,g,v,x){const L=c.visit();i=r.newGrammar(L),h.child(0)&&h.child(0).visit(),v.children.map(te=>te.visit());const E=i.build();if(E.source=this.source.trimmed(),hn(e,L))throw Br(E);return e[L]=E,E},SuperGrammar(c,h){const g=h.visit();if(g==="null")i.withSuperGrammar(null);else{if(!e||!hn(e,g))throw jr(g,e,h.source);i.withSuperGrammar(e[g])}},Rule_define(c,h,g,v,x){s=c.visit(),a=h.children.map(ie=>ie.visit())[0]||[],!i.defaultStartRule&&i.ensureSuperGrammar()!==W.ProtoBuiltInRules&&i.withDefaultStartRule(s);const L=x.visit(),E=g.children.map(ie=>ie.visit())[0],te=this.source.trimmed();return i.define(s,a,L,E,te)},Rule_override(c,h,g,v){s=c.visit(),a=h.children.map(E=>E.visit())[0]||[];const x=this.source.trimmed();i.ensureSuperGrammarRuleForOverriding(s,x),u=!0;const L=v.visit();return u=!1,i.override(s,a,L,null,x)},Rule_extend(c,h,g,v){s=c.visit(),a=h.children.map(E=>E.visit())[0]||[];const x=v.visit(),L=this.source.trimmed();return i.extend(s,a,x,null,L)},RuleBody(c,h){return r.alt(...h.visit()).withSource(this.source)},OverrideRuleBody(c,h){const g=h.visit(),v=g.indexOf(ft);if(v>=0){const x=g.slice(0,v),L=g.slice(v+1);return L.forEach(E=>{if(E===ft)throw Vr(E)}),new it(i.superGrammar,s,x,L).withSource(this.source)}else return r.alt(...g).withSource(this.source)},Formals(c,h,g){return h.visit()},Params(c,h,g){return h.visit()},Alt(c){return r.alt(...c.visit()).withSource(this.source)},TopLevelTerm_inline(c,h){const g=s+"_"+h.visit(),v=c.visit(),x=this.source.trimmed(),L=!(i.superGrammar&&i.superGrammar.rules[g]);u&&!L?i.override(g,a,v,null,x):i.define(g,a,v,null,x);const E=a.map(te=>r.app(te));return r.app(g,E).withSource(v.source)},OverrideTopLevelTerm_superSplice(c){return ft},Seq(c){return r.seq(...c.children.map(h=>h.visit())).withSource(this.source)},Iter_star(c,h){return r.star(c.visit()).withSource(this.source)},Iter_plus(c,h){return r.plus(c.visit()).withSource(this.source)},Iter_opt(c,h){return r.opt(c.visit()).withSource(this.source)},Pred_not(c,h){return r.not(h.visit()).withSource(this.source)},Pred_lookahead(c,h){return r.lookahead(h.visit()).withSource(this.source)},Lex_lex(c,h){return r.lex(h.visit()).withSource(this.source)},Base_application(c,h){const g=h.children.map(v=>v.visit())[0]||[];return r.app(c.visit(),g).withSource(this.source)},Base_range(c,h,g){return r.range(c.visit(),g.visit()).withSource(this.source)},Base_terminal(c){return r.terminal(c.visit()).withSource(this.source)},Base_paren(c,h,g){return h.visit()},ruleDescr(c,h,g){return h.visit()},ruleDescrText(c){return this.sourceString.trim()},caseName(c,h,g,v,x){return g.visit()},name(c,h){return this.sourceString},nameFirst(c){},nameRest(c){},terminal(c,h,g){return h.children.map(v=>v.visit()).join("")},oneCharTerminal(c,h,g){return h.visit()},escapeChar(c){try{return On(this.sourceString)}catch(h){throw h instanceof RangeError&&h.message.startsWith("Invalid code point ")?Jr(c):h}},NonemptyListOf(c,h,g){return[c.visit()].concat(g.children.map(v=>v.visit()))},EmptyListOf(){return[]},_terminal(){return this.sourceString}})(t).visit()}const Ii=Pt(["grammar",{source:`OperationsAndAttributes {

  AttributeSignature =
    name

  OperationSignature =
    name Formals?

  Formals
    = "(" ListOf<name, ","> ")"

  name  (a name)
    = nameFirst nameRest*

  nameFirst
    = "_"
    | letter

  nameRest
    = "_"
    | alnum

}`},"OperationsAndAttributes",null,"AttributeSignature",{AttributeSignature:["define",{sourceInterval:[29,58]},null,[],["app",{sourceInterval:[54,58]},"name",[]]],OperationSignature:["define",{sourceInterval:[62,100]},null,[],["seq",{sourceInterval:[87,100]},["app",{sourceInterval:[87,91]},"name",[]],["opt",{sourceInterval:[92,100]},["app",{sourceInterval:[92,99]},"Formals",[]]]]],Formals:["define",{sourceInterval:[104,143]},null,[],["seq",{sourceInterval:[118,143]},["terminal",{sourceInterval:[118,121]},"("],["app",{sourceInterval:[122,139]},"ListOf",[["app",{sourceInterval:[129,133]},"name",[]],["terminal",{sourceInterval:[135,138]},","]]],["terminal",{sourceInterval:[140,143]},")"]]],name:["define",{sourceInterval:[147,187]},"a name",[],["seq",{sourceInterval:[168,187]},["app",{sourceInterval:[168,177]},"nameFirst",[]],["star",{sourceInterval:[178,187]},["app",{sourceInterval:[178,186]},"nameRest",[]]]]],nameFirst:["define",{sourceInterval:[191,223]},null,[],["alt",{sourceInterval:[207,223]},["terminal",{sourceInterval:[207,210]},"_"],["app",{sourceInterval:[217,223]},"letter",[]]]],nameRest:["define",{sourceInterval:[227,257]},null,[],["alt",{sourceInterval:[242,257]},["terminal",{sourceInterval:[242,245]},"_"],["app",{sourceInterval:[252,257]},"alnum",[]]]]}]);_i(W.BuiltInRules);bi(Ii);function _i(t){const e={empty(){return this.iteration()},nonEmpty(n,r,i){return this.iteration([n].concat(i.children))}};Z.BuiltInSemantics=Z.createSemantics(t,null).addOperation("asIteration",{emptyListOf:e.empty,nonemptyListOf:e.nonEmpty,EmptyListOf:e.empty,NonemptyListOf:e.nonEmpty})}function bi(t){Z.prototypeGrammarSemantics=t.createSemantics().addOperation("parse",{AttributeSignature(e){return{name:e.parse(),formals:[]}},OperationSignature(e,n){return{name:e.parse(),formals:n.children.map(r=>r.parse())[0]||[]}},Formals(e,n,r){return n.asIteration().children.map(i=>i.parse())},name(e,n){return this.sourceString}}),Z.prototypeGrammar=t}function wi(t){let e=0;const n=[0],r=()=>n[n.length-1],i={},s=/( *).*(?:$|\r?\n|\r)/g;let a;for(;(a=s.exec(t))!=null;){const[u,p]=a;if(u.length===0)break;const d=p.length,c=r(),h=e+d;if(d>c)n.push(d),i[h]=1;else if(d<c){const g=n.length;for(;r()!==d;)n.pop();i[h]=-1*(g-n.length)}e+=u.length}return n.length>1&&(i[e]=1-n.length),i}const Mn="an indented block",Gn="a dedent",fn=1114111+1;class xi extends st{constructor(e){super(e.input),this.state=e}_indentationAt(e){return this.state.userData[e]||0}atEnd(){return super.atEnd()&&this._indentationAt(this.pos)===0}next(){if(this._indentationAt(this.pos)!==0){this.examinedLength=Math.max(this.examinedLength,this.pos);return}return super.next()}nextCharCode(){return this._indentationAt(this.pos)!==0?(this.examinedLength=Math.max(this.examinedLength,this.pos),fn):super.nextCharCode()}nextCodePoint(){return this._indentationAt(this.pos)!==0?(this.examinedLength=Math.max(this.examinedLength,this.pos),fn):super.nextCodePoint()}}class mn extends w{constructor(e=!0){super(),this.isIndent=e}allowsSkippingPrecedingSpace(){return!0}eval(e){const{inputStream:n}=e,r=e.userData;e.doNotMemoize=!0;const i=n.pos,s=this.isIndent?1:-1;return(r[i]||0)*s>0?(e.userData=Object.create(r),e.userData[i]-=s,e.pushBinding(new Se(0),i),!0):(e.processFailure(i,this),!1)}getArity(){return 1}_assertAllApplicationsAreValid(e,n){}_isNullable(e,n){return!1}assertChoicesHaveUniformArity(e){}assertIteratedExprsAreNotNullable(e){}introduceParams(e){return this}substituteParams(e){return this}toString(){return this.isIndent?"indent":"dedent"}toDisplayString(){return this.toString()}toFailure(e){const n=this.isIndent?Mn:Gn;return new ee(this,n,"description")}}const Si=new O("indent"),Ai=new O("dedent"),Oi=new it(Rt,"any",[Si,Ai],[]),Ni=new Ze().newGrammar("IndentationSensitive").withSuperGrammar(Rt).define("indent",[],new mn(!0),Mn,void 0,!0).define("dedent",[],new mn(!1),Gn,void 0,!0).extend("any",[],Oi,"any character",void 0).build();Object.assign(Ni,{_matchStateInitializer(t){t.userData=wi(t.input),t.inputStream=new xi(t)},supportsIncrementalParsing:!1});W.initApplicationParser(Ft,Bn);const Li=t=>!!t.constructor&&typeof t.constructor.isBuffer=="function"&&t.constructor.isBuffer(t);function Ei(t,e){const n=Ft.match(t,"Grammars");if(n.failed())throw Dr(n);return Bn(n,e)}function Pi(t,e){const n=Ri(t,e),r=Object.keys(n);if(r.length===0)throw new Error("Missing grammar definition");if(r.length>1){const s=n[r[1]].source;throw new Error(Ot(s.sourceString,s.startIdx)+"Found more than one grammar definition -- use ohm.grammars() instead.")}return n[r[0]]}function Ri(t,e){const n=Object.create(e||{});if(typeof t!="string")if(Li(t))t=t.toString();else throw new TypeError("Expected string as first argument, got "+St(t));return Ei(t,n),n}const Fi=String.raw`Maraca {

  start
    = space* value? space*

  value
    = or

  or
    = or space* "|" space* and -- or
    | and

  and
    = and space* "&" space* equal -- and
    | equal

  equal
    = equal space* ("!=" | "=") space* compare -- equal
    | compare

  compare
    = compare space* ("<=" | ">=" | "<" | ">") space* sum -- compare
    | sum

  sum
    = sum space* ("+" | "-") space* product -- sum
    | product

  product
    = product space* ("*" | "/" | "%") space* power -- product
    | power

  power
    = power space* "^" space* unary -- power
    | unary

  unary
    = ("-" | "!" | "...") space* unary -- unary
    | apply

  apply
    = apply "." label -- key
    | apply "[" space* value space* "]" -- get
    | apply "(" space* items space* ")" -- call
    | atom

  atom
    = if | for | function | block | fragment | content | string | number | boolean | label | brackets

  if
    = "if" space* value space* "then" space* value (space* "else" space* value)?

  for
    = "for" space* pattern (space* "," space* pattern)? space* "in" space* value space* value

  function
    = "(" space* listOf<pattern, separator> space* ")" space* "=>" space* value

  block
    = "[" space* values (space* "~" space* items)? space* "]" -- both
    | "[" space* values space* "]" -- values
    | "[" space* items space* "]" -- items

  fragment
    = "{" space* values (space* "~" space* items)? space* "}" -- both
    | "{" space* items space* "}" -- items

  values
    = listOf<(assign | push), separator> space* ","?

  assign
    = (pattern | string) space* ":" space* value

  push
    = ("when" space* value space*)? "push" space* value space* "->" space* label

  items
    = listOf<value, separator> space* ","?

  pattern
    = label space* "is" space* t_or -- is
    | (t_or | label)

  t_or
    = t_or space* "|" space* t_and -- or
    | t_and

  t_and
    = t_and space* "&" space* test -- and
    | test

  test
    = ("any" | "string" | "number" | "integer" | "maybe") -- type
    | ("!=" | "=" | "<=" | ">=" | "<" | ">") value -- compare
    | "(" space* pattern space* ")" -- brackets
    | t_block -- block

  t_block
    = "[" space* t_values (space* "~" space* pattern)? space* "]" -- both
    | "[" space* t_values space* "]" -- values
    | "[" space* pattern space* "]" -- items

  t_values
    = listOf<t_assign, separator> space* ","?

  t_assign
    = label space* ":" space* pattern

  content
    = "\"" (fragment | c_chunk)* "\""

  c_chunk
    = (c_char | escape)+

  c_char
    = ~("\"" | "\\" | "{") any

  string
    = "'" (fragment | s_chunk)* "'"

  s_chunk
    = (s_char | escape)+

  s_char
    = ~("'" | "\\" | "{") any

  escape
    = "\\" any

  number
    = digit+ ("." digit+)?

  boolean
    = ("yes" | "no")

  label
    = ~("if" | "then" | "else" | "yes" | "no") alnum+

  brackets
    = "(" space* value space* ")"

  separator
    = space* "," space*
    | (linespace* "\n")+ linespace*

  linespace
    = ~"\n" "\x00".."\x20"
}`,qn=Pi(Fi),$n=qn.createSemantics(),Ie=(t,e,n,r,i)=>({type:"operation",operation:n.sourceString,nodes:[t.ast,i.ast]});$n.addAttribute("ast",{start:(t,e,n)=>e.ast[0],value:t=>t.ast,or_or:Ie,or:t=>t.ast,and_and:Ie,and:t=>t.ast,equal_equal:Ie,equal:t=>t.ast,compare_compare:Ie,compare:t=>t.ast,sum_sum:Ie,sum:t=>t.ast,product_product:Ie,product:t=>t.ast,power_power:Ie,power:t=>t.ast,unary_unary:(t,e,n)=>({type:"operation",operation:t.sourceString,nodes:[n.ast]}),unary:t=>t.ast,apply_key:(t,e,n)=>({type:"get",nodes:[t.ast,{type:"value",value:n.ast.value}]}),apply_get:(t,e,n,r,i,s)=>({type:"get",nodes:[t.ast,r.ast]}),apply_call:(t,e,n,r,i,s)=>({type:"call",nodes:[t.ast,...r.ast]}),apply:t=>t.ast,atom:t=>t.ast,if:(t,e,n,r,i,s,a,u,p,d,c)=>({type:"if",nodes:[n.ast,a.ast,c.ast[0]].filter(h=>h)}),for:(t,e,n,r,i,s,a,u,p,d,c,h,g)=>({type:"for",patterns:[n.ast,a.ast[0]].filter(v=>v),nodes:[c.ast,g.ast]}),function:(t,e,n,r,i,s,a,u,p)=>({type:"function",patterns:n.ast,nodes:[p.ast]}),block_both:(t,e,n,r,i,s,a,u,p)=>({type:"block",nodes:[...n.ast,...a.ast[0]||[]]}),block_values:(t,e,n,r,i)=>({type:"block",nodes:n.ast}),block_items:(t,e,n,r,i)=>({type:"block",nodes:n.ast}),fragment_both:(t,e,n,r,i,s,a,u,p)=>({type:"fragment",nodes:[...n.ast,...a.ast[0]||[]]}),fragment_items:(t,e,n,r,i)=>({type:"fragment",nodes:n.ast}),values:(t,e,n)=>t.ast,assign:(t,e,n,r,i)=>({type:"assign",pattern:t.ast.type==="value"?{type:"label",value:t.ast.value}:t.ast,nodes:[i.ast]}),push:(t,e,n,r,i,s,a,u,p,d,c)=>({type:"push",key:c.ast,nodes:[a.ast,n.ast[0]].filter(h=>h)}),items:(t,e,n)=>t.ast,pattern_is:(t,e,n,r,i)=>({type:"is",nodes:[t.ast,i.ast]}),pattern:t=>t.ast,t_or_or:(t,e,n,r,i)=>({type:"or",nodes:[t.ast,i.ast]}),t_or:t=>t.ast,t_and_and:(t,e,n,r,i)=>({type:"and",nodes:[t.ast,i.ast]}),t_and:t=>t.ast,test_type:t=>({type:"type",value:t.sourceString}),test_compare:(t,e)=>({type:"compare",operation:t.sourceString,value:e.ast}),test_brackets:(t,e,n,r,i)=>n.ast,test_block:t=>t.ast,t_block_both:(t,e,n,r,i,s,a,u,p)=>({type:"block",nodes:[...n.ast,a.ast[0]].filter(d=>d)}),t_block_values:(t,e,n,r,i)=>({type:"block",nodes:n.ast}),t_block_items:(t,e,n,r,i)=>({type:"block",nodes:[n.ast]}),t_values:(t,e,n)=>t.ast,t_assign:(t,e,n,r,i)=>({type:"assign",key:t.ast,nodes:[i.ast]}),content:(t,e,n)=>({type:"block",nodes:e.ast}),c_chunk:t=>({type:"value",value:t.sourceString.replace(/\\(.)/g,(e,n)=>n)}),c_char:t=>null,string:(t,e,n)=>e.ast.length===0||e.ast.length===1&&e.ast[0].type==="value"?e.ast[0]||{type:"value",value:""}:{type:"operation",operation:"concat",nodes:e.ast},s_chunk:t=>({type:"value",value:t.sourceString.replace(/\\(.)/g,(e,n)=>n)}),s_char:t=>null,escape:(t,e)=>null,number:(t,e,n)=>({type:"value",value:parseFloat([t,e,n].map(r=>r.sourceString).join(""))}),boolean:t=>({type:"value",value:t.sourceString==="yes"}),label:t=>({type:"label",value:t.sourceString}),brackets:(t,e,n,r,i)=>n.ast,separator:(t,e,n)=>null,linespace:t=>null,listOf:t=>t.ast,nonemptyListOf:(t,e,n)=>[t.ast,...n.ast],emptyListOf:()=>[],_iter:(...t)=>t.map(e=>e.ast),_terminal:()=>null});const Ti=t=>{const e=qn.match(t);if(e.failed())throw console.error(e.message),new Error("Parser error");return $n(e).ast},Me=t=>t.type==="label"?[t.value]:t.nodes?t.nodes.flatMap(e=>Me(e)):[],Le=(t,e,n)=>{if(t.type==="block"||t.type==="fragment"){const i=t.nodes.filter(s=>s.type==="assign").map(s=>Me(s.pattern)).reduce((s,a)=>({...s,[a]:!0}),e);if(t.type==="fragment")for(const s of t.nodes)Le(s,i,n);else if(!n){const s=a=>{i[a]=!0,t.nodes.push({type:"assign",pattern:{type:"is",nodes:[{type:"label",value:a},{type:"type",value:"any"}]},nodes:[{type:"value",value:!1}]})};for(const a of t.nodes)Le(a,i,s);for(const a of t.nodes)Le(a,i)}}else if(t.type==="for"||t.type==="function"){const i=[...new Set(t.patterns.flatMap(s=>Me(s)))].reduce((s,a)=>({...s,[a]:!0}),e);for(const s of t.nodes)Le(s,i,n)}else if(t.nodes)for(const r of t.nodes)Le(r,e,n);else t.type==="label"&&(t.value in e||n(t.value))},De=(t,e)=>{if(t.type==="block"||t.type==="fragment"){const n=[],r={},i=t.nodes.filter(a=>a.type==="assign").map(a=>({parameters:[...new Set(Me(a.pattern))],node:a})),s=a=>{if(!(a in r)){r[a]=!0;const u=i.find(p=>p.parameters.includes(a));u&&!u.processed?(u.processed=!0,De(u.node,s),n.push(u.node.pattern.type==="is"?{...u.node,nodes:[]}:u.node)):e(a)}};for(const{parameters:a}of i)for(const u of a)s(u);for(const a of t.nodes.filter(u=>u.type!=="assign"))De(a,s);n.push(...t.nodes.filter(a=>a.type==="assign"&&a.pattern.type==="is").map(a=>({type:"push",first:!0,key:a.pattern.nodes[0],nodes:[a.nodes[0]]}))),n.push(...t.nodes.filter(a=>a.type!=="assign")),t.nodes=n}else if(t.type==="for"||t.type==="function"){const n=[...new Set(t.patterns.flatMap(i=>Me(i)))],r=i=>{n.includes(i)||e(i)};for(const i of t.nodes)De(i,r)}else if(t.nodes)for(const n of t.nodes)De(n,e);else t.type==="label"&&e(t.value)},Ci=(t,e)=>{const n=Ti(t);return Le(n,e),De(n,()=>{}),n};function ot(){throw new Error("Cycle detected")}function Tt(){if(Re>1)Re--;else{for(var t,e=!1;je!==void 0;){var n=je;for(je=void 0,bt++;n!==void 0;){var r=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&Hn(n))try{n.c()}catch(i){e||(t=i,e=!0)}n=r}}if(bt=0,Re--,e)throw t}}var T=void 0,je=void 0,Re=0,bt=0,Xe=0;function Un(t){if(T!==void 0){var e=t.n;if(e===void 0||e.t!==T)return e={i:0,S:t,p:T.s,n:void 0,t:T,e:void 0,x:void 0,r:e},T.s!==void 0&&(T.s.n=e),T.s=e,t.n=e,32&T.f&&t.S(e),e;if(e.i===-1)return e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=T.s,e.n=void 0,T.s.n=e,T.s=e),e}}function re(t){this.v=t,this.i=0,this.n=void 0,this.t=void 0}re.prototype.h=function(){return!0};re.prototype.S=function(t){this.t!==t&&t.e===void 0&&(t.x=this.t,this.t!==void 0&&(this.t.e=t),this.t=t)};re.prototype.U=function(t){if(this.t!==void 0){var e=t.e,n=t.x;e!==void 0&&(e.x=n,t.e=void 0),n!==void 0&&(n.e=e,t.x=void 0),t===this.t&&(this.t=n)}};re.prototype.subscribe=function(t){var e=this;return Vn(function(){var n=e.value,r=32&this.f;this.f&=-33;try{t(n)}finally{this.f|=r}})};re.prototype.valueOf=function(){return this.value};re.prototype.toString=function(){return this.value+""};re.prototype.peek=function(){return this.v};Object.defineProperty(re.prototype,"value",{get:function(){var t=Un(this);return t!==void 0&&(t.i=this.i),this.v},set:function(t){if(t!==this.v){bt>100&&ot(),this.v=t,this.i++,Xe++,Re++;try{for(var e=this.t;e!==void 0;e=e.x)e.t.N()}finally{Tt()}}}});function ki(t){return new re(t)}function Hn(t){for(var e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function zn(t){for(var e=t.s;e!==void 0;e=e.n){var n=e.S.n;if(n!==void 0&&(e.r=n),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function Wn(t){for(var e=t.s,n=void 0;e!==void 0;){var r=e.p;e.i===-1?(e.S.U(e),r!==void 0&&(r.n=e.n),e.n!==void 0&&(e.n.p=r)):n=e,e.S.n=e.r,e.r!==void 0&&(e.r=void 0),e=r}t.s=n}function Ae(t){re.call(this,void 0),this.x=t,this.s=void 0,this.g=Xe-1,this.f=4}(Ae.prototype=new re).h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Xe))return!0;if(this.g=Xe,this.f|=1,this.i>0&&!Hn(this))return this.f&=-2,!0;var t=T;try{zn(this),T=this;var e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(n){this.v=n,this.f|=16,this.i++}return T=t,Wn(this),this.f&=-2,!0};Ae.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(var e=this.s;e!==void 0;e=e.n)e.S.S(e)}re.prototype.S.call(this,t)};Ae.prototype.U=function(t){if(this.t!==void 0&&(re.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(var e=this.s;e!==void 0;e=e.n)e.S.U(e)}};Ae.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var t=this.t;t!==void 0;t=t.x)t.t.N()}};Ae.prototype.peek=function(){if(this.h()||ot(),16&this.f)throw this.v;return this.v};Object.defineProperty(Ae.prototype,"value",{get:function(){1&this.f&&ot();var t=Un(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}});function Di(t){return new Ae(t)}function Kn(t){var e=t.u;if(t.u=void 0,typeof e=="function"){Re++;var n=T;T=void 0;try{e()}catch(r){throw t.f&=-2,t.f|=8,Ct(t),r}finally{T=n,Tt()}}}function Ct(t){for(var e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,Kn(t)}function ji(t){if(T!==this)throw new Error("Out-of-order effect");Wn(this),T=t,this.f&=-2,8&this.f&&Ct(this),Tt()}function Ge(t){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32}Ge.prototype.c=function(){var t=this.S();try{!(8&this.f)&&this.x!==void 0&&(this.u=this.x())}finally{t()}};Ge.prototype.S=function(){1&this.f&&ot(),this.f|=1,this.f&=-9,Kn(this),zn(this),Re++;var t=T;return T=this,ji.bind(this,t)};Ge.prototype.N=function(){2&this.f||(this.f|=2,this.o=je,je=this)};Ge.prototype.d=function(){this.f|=8,1&this.f||Ct(this)};function Vn(t){var e=new Ge(t);try{e.c()}catch(n){throw e.d(),n}return e.d.bind(e)}const et=(t,e)=>{const n=ki(t);return{__type:"signal",get:()=>n.value,set:r=>{n.value=e?e(r):r}}},se=(t,e=[])=>{const n=Di(t);return{__type:"signal",get:()=>{for(const r of e)pe(r);return n.value}}},Jn=t=>Vn(()=>{const e=[],n=r=>e.push(Jn(r));return e.push(t(n)),()=>{for(const r of e.filter(i=>i))r()}}),at=t=>t.reduce((e,n)=>{const r=Fe(n);return r===null?e:r.__type==="fragment"?[...e,...r.value]:[...e,r]},[]),Fe=t=>{if((t==null?void 0:t.__type)==="signal")return Fe(t.get());if((t==null?void 0:t.__type)==="fragment"){const e=at(t.value);return e.length===0?null:e.length===1?e[0]:{__type:"fragment",value:e}}return t},_e=t=>{const e=Fe(t);return e===null?null:(e==null?void 0:e.__type)==="fragment"?e.value[0]:e},pe=t=>{const e=_e(t);return(e==null?void 0:e.__type)==="block"?{__type:"block",values:Object.fromEntries(Object.entries(e.values).map(([n,r])=>[n,pe(r)]).filter(([n,r])=>r!==null)),items:pe(at(e.items))}:Array.isArray(e)?e.map(n=>pe(n)):e&&typeof e=="object"?Object.fromEntries(Object.entries(e).map(([n,r])=>[n,pe(r)])):e},Pe=(t,e)=>{if(!t)return!1;const n=(e==null?void 0:e.__type)==="atom"?e.value.value:e;if(t.type==="block"){if(n.__type!=="block")return!1;const r=t.nodes.filter(s=>s.type==="assign").reduce((s,a)=>({...s,[a.key.value]:a.nodes[0]}),{}),i=t.nodes.find(s=>s.type!=="assign");return Object.keys({...r,...n.values}).every(s=>Pe(r[s],n.values[s]))&&n.items.every(s=>Pe(i,s))}if(t.type==="or")return t.nodes.some(r=>Pe(r,n));if(t.type==="and")return t.nodes.every(r=>Pe(r,n));if(t.type==="type"){if(t.value==="any")return!0;if(t.value==="string")return typeof n=="string";if(t.value==="number")return typeof n=="number";if(t.value==="integer")return Number.isInteger(n);if(t.value==="maybe")return typeof n=="boolean"}if(t.type==="compare")return operation[t.operation](n,t.value)},wt=(t,e)=>{if((t==null?void 0:t.__type)!=="block")return et(t,i=>{if(!Pe(e,i))throw new Error;return i});const n=e.nodes.filter(i=>i.type==="assign").reduce((i,s)=>({...i,[s.key.value]:s.nodes[0]}),{}),r=e.nodes.find(i=>i.type!=="assign");return et(t,i=>{if(!Pe(e,i))throw new Error;return{__type:"block",values:Object.fromEntries(Object.entries(i.values).map(([s,a])=>[s,wt(a,n[s])])),items:i.items.map(s=>wt(s,r))}})},xt=(t,e)=>{if(t.type==="label")return{[t.value]:e};if(t.type==="is"){const[n,r]=t.nodes;return{[n.value]:e||wt(null,r)}}return{}},Bi={"-":t=>-t,"...":t=>({__type:"fragment",value:t.items})},Mi={"=":(t,e)=>t===e,"!=":(t,e)=>t!==e,"<=":(t,e)=>t<=e,">=":(t,e)=>t>=e,"<":(t,e)=>t<e,">":(t,e)=>t>e,"+":(t,e)=>t+e,"-":(t,e)=>t-e,"*":(t,e)=>t*e,"/":(t,e)=>t/e,"%":(t,e)=>((t-1)%e+e)%e+1,"^":(t,e)=>t**e},Ke=t=>!(t===!1||t===null),dn=t=>{if(!t||typeof t!="object")throw new Error;return Array.isArray(t)?{__type:"block",values:{},items:t}:t.__type!=="block"?{__type:"block",values:t,items:[]}:t},gn=(t,e)=>{const n={...e},r={};for(const a of t.filter(u=>u.type==="assign")){const u=a.pattern,p=a.nodes[0]&&me(a.nodes[0],n),d=xt(u,p);Object.assign(n,d),Object.assign(r,d)}const i=t.filter(a=>a.type!=="assign"&&a.type!=="push").map(a=>me(a,n)),s=t.filter(a=>a.type==="push").map(a=>{let u=!a.first;const[p,d]=a.nodes.map(v=>me(v,n)),c=n[a.key.value];if(!d)return se(()=>{const v=pe(p);u||c.set(v),u=!1});const h=se(()=>pe(d)&&{});let g={};return se(()=>{const v=_e(h);!u&&v!==g&&c.set(pe(p)),g=v,u=!1})});return{values:r,items:i,pushes:s.length>0&&s}},me=(t,e)=>{if(t.type==="value")return t.value;if(t.type==="label")return e[t.value];if(t.type==="for"){const r=me(t.nodes[0],e);return se(()=>{const i=_e(r);return i===null?null:{__type:"fragment",value:dn(i).items.map((a,u)=>{const p=t.patterns.map((d,c)=>xt(d,c===0?a:u+1));return me(t.nodes[1],p.reduce((d,c)=>({...d,...c}),e))})}})}if(t.type==="function")return{__type:"function",patterns:t.patterns,body:t.nodes[0]};if(t.type==="block"){const{values:r,items:i,pushes:s}=gn(t.nodes,e);return s?se(()=>({__type:"block",values:r,items:i}),s):{__type:"block",values:r,items:i}}if(t.type==="fragment"){const{items:r,pushes:i}=gn(t.nodes,e);return i?se(()=>({__type:"fragment",value:r}),i):{__type:"fragment",value:r}}const n=t.nodes.map(r=>me(r,e));if(t.type==="operation")return se(()=>{if(t.operation==="concat")return n.map(i=>Fe(i)).reduce((i,s)=>s===null?i:s.__type==="fragment"?[...i,...s.value]:[...i,s],[]).join("");const r=n.map(i=>_e(i));return t.operation==="!"?!Ke(r[0]):t.operation==="|"?Ke(r[0])?r[0]:r[1]:t.operation==="&"?Ke(r[0])?r[1]:r[0]:r.some(i=>i===null)?null:(r.length===1?Bi:Mi)[t.operation](...r)});if(t.type==="if")return se(()=>{const[r,i,s=null]=n;return Ke(_e(r))?i:s});if(t.type==="get")return se(()=>{const[r,i]=n.map(a=>_e(a));if(r===null)return null;const s=dn(r);return i in s.values?s.values[i]:Number.isInteger(i)&&at(s.items)[i-1]||null});if(t.type==="call"){const[r,...i]=n;return se(()=>{const s=Fe(r),a=s===null?[]:s.__type==="fragment"?s.value:[s];for(const u of a){if(typeof u=="function")return u.reactiveFunc?u(...i):u(...i.map(d=>Fe(d)));const p=u.patterns.map((d,c)=>xt(d,i[c]));return me(u.body,p.reduce((d,c)=>({...d,...c}),e))}return null})}},D=(t,e=!1)=>{if(e)return pe(t);const n=_e(t);return(n==null?void 0:n.__type)==="block"?{...n,items:at(n.items)}:n},Qn=t=>typeof t=="string"?t:`[ ${Object.entries(t).map(([e,n])=>`${e}: ${Qn(n)}`).join(", ")} ]`,Gi=(t,e)=>me(Ci(Qn(e),t),t),yn=(t,e,n)=>{for(const r in{...t,...e})e[r]!==t&&n(r,e[r]);return e},Yn=(t,e)=>{(t.childNodes.length!==e.length||[...t.childNodes].some((n,r)=>e[r]!==n))&&t.replaceChildren(...e)},Ve=t=>[t.values.top??t.items[0],t.values.right??t.items[3]??t.items[1]??t.items[0],t.values.bottom??t.items[2]??t.items[0],t.values.left??t.items[1]??t.items[0]],qi=t=>t?typeof t=="number"?[t,t,t,t]:[t.values.topLeft??t.values.top??t.values.left??t.items[0],t.values.topRight??t.values.top??t.values.right??t.items[3]??t.items[1]??t.items[0],t.values.bottomRight??t.values.bottom??t.values.right??t.items[2]??t.items[0],t.values.bottomLeft??t.values.bottom??t.values.left??t.items[1]??t.items[0]]:[0,0,0,0],$i=(t,e,n)=>({size:D(t.size)||n.size,line:D(t.line)||n.line,inline:n.inline?"inline":D(t.flow)==="inline"||e.length>0&&e.some(r=>typeof r=="number"||typeof r=="string"||D(r.values.input)!==void 0)?"wrap":void 0}),Ui=t=>{const e=D(t,!0);if(!e||e==="inline")return{};const n=e?typeof e=="object"?e.items:[e]:[],r=e.values||{};return n.includes("grid")?{type:"grid",widths:n.filter(i=>typeof i=="number"||i==="auto"),gap:r.gap}:{type:"flow",direction:n.find(i=>["column","row"].includes(i)),gap:n.find(i=>typeof i=="number"),align:n.find(i=>["start","end","center"].includes(i))}},Hi=t=>D(t.image)?"img":D(t.link)?"a":D(t.input)!==void 0?"input":D(t.tag)||"div",zi=(t,e)=>D(e.flow)||D(e.fill)?t.map(n=>typeof n=="number"||typeof n=="string"?{__type:"block",values:{},items:[n]}:n):t,Wi=({image:t,link:e,input:n})=>{const r={};return t&&(r.src=t),e&&(r.href=e),n&&(r.value=n),r},Ki=({hover:t,click:e,input:n})=>{const r={};return(t==null?void 0:t.__type)==="signal"&&(t!=null&&t.set)&&(r.onmouseover=()=>t.set(!0),r.onmouseleave=()=>t.set(!1)),(e==null?void 0:e.__type)==="signal"&&(e!=null&&e.set)&&(r.onclick=()=>{e.set({})}),(n==null?void 0:n.__type)==="signal"&&(n!=null&&n.set)&&(r.oninput=i=>n.set(i.target.value)),r},Vi=(t,e,n)=>{var i;const r={...((i=t.style)==null?void 0:i.values)||{}};if(e.inline!=="wrap"&&!n.type&&(r.display="flex",r.flexDirection="column"),e.inline==="inline"&&(r.display="inline"),n.type==="flow"&&(r.display="flex",r.flexDirection="column",r.gap=n.gap&&`${n.gap}px`,r.flexDirection=n.direction||"column",r.alignItems=["start","end"].includes(n.align)?`flex-${n.align}`:n.align||"stretch",r.justifyContent=n.align==="center"?"center":null),n.type==="grid"&&(r.display="grid",r.gridTemplateColumns=n.widths.map(s=>typeof s=="string"?s:s<=1?`${s}fr`:`${s}px`).join(" "),r.gap=n.gap&&`${n.gap}px`),t.span)if(typeof t.span=="number")r.gridColumn=`span ${t.span}`;else{const[s,a]=t.span.items;r.gridColumn=`span ${s}`,r.gridRow=`span ${a}`}if(t.font&&(r.fontFamily=t.font),e.size&&(r.fontSize=`${e.size}px`),e.line&&(r.lineHeight=e.line),t.bold!==void 0&&(r.fontWeight=t.bold?"bold":"normal"),t.italic!==void 0&&(r.fontStyle=t.italic?"italic":"normal"),t.underline&&(r.textDecoration="underline"),t.uppercase&&(r.textTransform="uppercase"),t.align&&(t.align.includes("justify")?(r.textAlign="justify",r.textAlignLast=t.align.slice(8)):r.textAlign=t.align),t.indent&&(r.textIndent=`${t.indent}px`),t.color&&(r.color=t.color),t.fill&&(r.background=t.fill),e.inline==="wrap"){const s=(e.line-1)*e.size/2;r.marginTop=`${-s}px`,r.marginBottom=`${-s}px`}return t.pad&&(r.padding=typeof t.pad=="number"?`${t.pad}px`:Ve(t.pad).map(s=>s&&s<1?`${s*100}%`:`${s||0}px`).join(" ")),t.round&&(r.borderRadius=qi(t.round).map(s=>`${s||0}px`).join(" ")),t.width&&(r.width=typeof t.width=="string"?t.width:t.width<=1?`${t.width*100}%`:`${t.width}px`),t.height&&(r.height=t.height<=1?`${t.height*100}%`:`${t.height}px`),t.maxWidth&&(r.maxWidth=t.maxWidth<=1?`${t.maxWidth*100}%`:`${t.maxWidth}px`,r.marginLeft="auto",r.marginRight="auto"),t.border&&(typeof t.border=="number"?r.border=`${t.border}px solid black`:(r.borderWidth=Ve(t.border).map(s=>`${s||0}px`).join(" "),r.borderStyle=typeof(t.border.values.style||"solid")=="string"?t.border.values.style||"solid":Ve(t.border.values.style).join(" "),r.borderColor=typeof(t.border.values.color||"black")=="string"?t.border.values.color||"black":Ve(t.border.values.color).join(" "))),(t.link||t.pointer||t.click!==void 0)&&(r.cursor="pointer",r.userSelect="none"),r},Zn=(t,e,n,r)=>{if(!n)return null;if(typeof n=="number"||typeof n=="string"){const d=`${n}`,c=(e==null?void 0:e.nodeName)==="#text"?e:document.createTextNode(d);return c.textContent=d,c}const i=Ui(n.values.flow),s=Hi(n.values),a=zi(n.items.map(d=>D(d)),n.values),u=$i(n.values,a,r),p=(e==null?void 0:e.nodeName.toLowerCase())===s?e:document.createElement(s);return t(()=>{const d=D(n.values,!0);p.__props=yn(p.__props||{},{...Wi(d),...Ki(n.values)},(c,h)=>{c==="focus"?h&&setTimeout(()=>p.focus()):p[c]=h??null}),p.__style=yn(p.__style||{},Vi(d,u,i),(c,h)=>{p.style[c]=h||null})}),t(d=>{Yn(p,a.map((c,h)=>Zn(d,p.childNodes[h],c,u)).filter(c=>c))}),p},Ji=t=>(e,n)=>{Yn(t,[Zn(e,t.childNodes[0],D(D(n).values.index),{size:16,line:1.5})])};Nr.load({google:{families:["Atkinson Hyperlegible","Atkinson Hyperlegible:italic","Atkinson Hyperlegible:bold","Atkinson Hyperlegible:bolditalic"]}});const Qi=(t,e,n)=>e.reduce((r,i,s)=>r[i]=s===e.length-1?n:r[i]||{},t),vn=Object.assign({"../app/authorSelect.ma":dr,"../app/coll.ma":gr,"../app/colors.ma":yr,"../app/index.ma":vr,"../app/nav.ma":Ir,"../app/render.ma":_r,"../app/renderLine.ma":br,"../app/renderPara.ma":wr,"../app/table.ma":xr,"../app/tabs.ma":Sr}),Yi=Object.keys(vn).reduce((t,e)=>{const n=e.slice(3,-3).split(/[\\\\\\/]/).slice(1);return Qi(t,n,vn[e]),t},{}),tt=Er(),Xn=t=>({__type:"block",values:Object.fromEntries([...t.hash?[["",t.hash.slice(1)]]:[],...new URLSearchParams(t.search)]),items:t.pathname.split(/\//g).filter(e=>e)}),er=et(Xn(tt.location),t=>{const e=`/${t.items.join("/")}`;return e!==location.pathname&&tt.push(e),t});tt.listen(({location:t})=>{er.set(Xn(t)),t.hash?setTimeout(()=>{document.getElementById(t.hash.slice(1)).scrollIntoView(),window.scrollBy(0,-25)}):setTimeout(()=>{window.scroll(0,0)})});document.addEventListener("click",t=>{if(!t.metaKey){const e=t.target.closest("a");e&&e.role!=="button"&&e.host===window.location.host&&(t.preventDefault(),tt.push(e.href))}});const Je=(t,e={})=>{const n=et(null);return fetch(`/.netlify/functions/${t}`,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(r=>r.json()).then(r=>n.set(r)),n},In=(t,e)=>{const n=t.reduce((r,i)=>{var s;return i.count>=e?[...r,i]:((s=r[r.length-1])==null?void 0:s.text)!==" . . . "?[...r,i.text===" "?i:{text:" . . . "}]:r},[]);return n.length===1&&n[0].text===" . . . "?null:(n[0].text===" . . . "&&(n[0].text=". . . "),n[n.length-1].text===" . . . "&&(n[n.length-1].text=" . . ."),n)},Zi=Gi({allParagraphs:(t,e)=>{const n=Je("paragraphs",{author:t});return e?se(()=>{const r=D(n);return r&&r.map(i=>{if(i.type==="lines"){const a=Math.max(...i.lines.flatMap(u=>u.map(p=>p.count)));return{...i,lines:i.lines.map(u=>In(u,a*2/3))}}const s=Math.max(...i.text.map(a=>a.count));return{...i,text:In(i.text,s*2/3)}})}):n},documents:t=>Je("documents",{author:t}),prayers:t=>{const e=Je("prayers",{author:t});return se(()=>{const n=D(e);if(!n)return n;const r={};for(const i of n)r[i.category]=[...r[i.category]||[],i];return console.log(r),r})},documentById:t=>t&&Je("documentById",{id:t}),url:er,includes:(t,e)=>t.items.includes(e),length:t=>Array.isArray(t)?t.length:t.items.length,rgb:(...t)=>`#${t.map(e=>e.toString(16).padStart(2,"0")).join("")}`},Yi),Xi=Ji(document.getElementById("app"));Jn(t=>{Xi(t,Zi)});
