// no inline styles please
document.body.querySelectorAll('*').forEach(el => el.removeAttribute('style'))

// no lang tags , they aren’t terribly useful
document.body.querySelectorAll('*').forEach(el => el.removeAttribute('lang'))

// remove anything which is just a straight tag
let elementsWithNoAttributes = Array.from(document.body.querySelectorAll('*')).filter(el => el.attributes.length == 0);
elementsWithNoAttributes.forEach(el => el.outerHTML = el.innerHTML)

// merge sibling Lexeme (spans)
document.body.querySelectorAll('.Lexeme + .Lexeme').forEach(s => { s.previousElementSibling.textContent += s.textContent; s.remove() })
