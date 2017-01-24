// no inline styles please
// no lang tags , they aren’t terribly useful
let removeStyleAndLangAttributes = () =>  {
  document.body.querySelectorAll('*').forEach(el => {
    el.removeAttribute('style');
    el.removeAttribute('lang');
  })
}

// remove anything which is a tag with no attributes
let unwrapAttributelessTags = () => {
  Array.from(document.body.querySelectorAll('*'))
    .filter(el => el.attributes.length == 0)
    .forEach(el => el.outerHTML = el.innerHTML);
}

// merge siblings of the same class
let mergeLeft = className => {
  let selector = `${className} + ${className}`;
  document.body.querySelectorAll(selector)
    .forEach(s => { 
      s.previousElementSibling.textContent += s.textContent; 
      s.remove() 
  })
}

let mergeApostrophesLeft = () => {
  Array.from(document.querySelectorAll('*'))
    .filter(el => el.textContent.trim() == "'")
    .forEach(el => {
      el.previousElementSibling.innerHTML += el.textContent;
      el.remove();
    })
}

let classesToMerge = ['.Lexeme', '.Glossn', '.Subentry', '.Examplev', '.flabel']

// fix all-alone apostrophes
Array.from(document.body.querySelectorAll('*'))
    .filter(el => el.textContent.trim() == `ꞌ`)
    .forEach(apostrophe => apostrophe.outerHTML = apostrophe.textContent)

mergeApostrophesLeft();
removeStyleAndLangAttributes();
unwrapAttributelessTags();

classesToMerge
  .map(className => Array.from(document.querySelectorAll(className)))
  .forEach(spans => {
    spans.forEach(span => {
      Array.from(span.parentElement.childNodes)
        .filter(node => 
           node.nodeType == 3 && node.textContent.trim() == "'"
        )
        .forEach(a => { 
	  a.previousElementSibling.innerHTML += a.textContent; a.remove() 
	})
    })
  })

classesToMerge.forEach(mergeLeft);

