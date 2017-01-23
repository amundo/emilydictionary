from __future__ import print_function

from lxml import html
import lxml.html.builder as E

doc = html.parse('dictionary.html')
body = doc.xpath('/html/*')[1]

with open('crappy_version.txt', 'w') as f:
    for item in body.cssselect('div > p.EntryParagraph'):
        stuff = {cls: (item.cssselect('span.{}'.format(cls)) or [E.SPAN("XXX")])[0].text_content() for cls in ("Lexeme", "Glossn", "Definitionn")}
        for k, v in stuff.iteritems():
            print("{}: {}".format(k, v.replace('\n', '')), file=f)
print('\n', file=f)
