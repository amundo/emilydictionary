let $$ = selector => 
  Array.from(document.querySelectorAll(selector))

let $ = selector => 
  document.querySelectorAll(selector)

document.querySelectorAll('[class^="WordSection"]').forEach(ws => {
  let classes = Array.from(ws.classList)
  let wsc = classes.find(c => c.startsWith('WordSection'));
  if(parseInt(wsc.replace('WordSection','')) > 1){
    ws.remove()
  }
})

$$('span').forEach(s => {if(!(s.classList.length)){s.outerHTML = s.innerHTML}})


/*
// // remove .WordSection* 
document.querySelectorAll('[class^="WordSection"]').forEach(ws => {
  // ws.outerHTML = ws.innerHTML;
  let id = Array.from(ws.classList).find(c => c.startsWith('WordSection'));
  let link =`<p><a href="#${id}">${id}</a></p>`;
  ws.insertAdjacentHTML('beforebegin', link);
})
*/


// double column sections are irrelevant online
$$('.Double-columnSection').forEach(dcs => dcs.remove())

// no inline styles please
// no lang tags , they aren’t terribly useful
let removeStyleAndLangAttributes = () =>  {
  document.querySelectorAll('*').forEach(el => {
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
      if(el.previousElementSibling){
         el.previousElementSibling.innerHTML += el.textContent;
      }
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
	  if(a.previousElementSibling){   
            a.previousElementSibling.innerHTML += a.textContent; a.remove() 
          }
	})
    })
  })

classesToMerge.forEach(mergeLeft);

let removeIfOnlyContainsWhitespace = selector => 
  document.querySelectorAll(selector).forEach(sn => {
    if(sn.textContent.trim().length === 0 ){ sn.remove() }
  })

removeIfOnlyContainsWhitespace('.Sensenumber')

//  let handleLonelyApostrophes = 
$$('.fvernacular')
  .filter(fv => fv.nextSibling && fv.nextSibling.nodeType == 3)
  .forEach(fv => { 
    fv.innerHTML += fv.nextSibling.textContent;  
    fv.nextSibling.remove() 
  })
 
let mergeTablesLeft = () => 
  document.querySelectorAll('.Table')
    .forEach(table => table.previousElementSibling.appendChild(table))

//mergeTablesLeft();

let mergeIndentedParagraphSequencesLeft = () => {
  let eps = document.querySelectorAll('.EntryParagraph');
  eps.forEach(ep => {
    while(ep.nextElementSibling && ep.nextElementSibling.classList.contains('BlockParagraph')){
      ep.appendChild(ip) 
    }
  })
}

//mergeIndentedParagraphSequencesLeft()

/*
let mergeEntryParagraphsRight = () => {
  let eps = Array.from(document.querySelectorAll('.EntryParagraph'));
  eps.forEach(ep => {
    while(ep.nextElementSibling && !ep.nextElementSibling.match('.EntryParagraph') ){
      ep.appendChild(ep.nextElementSibling);
    }
  })
}


mergeEntryParagraphsRight()
*/



