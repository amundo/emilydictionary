let ws = document.querySelector('.WordSection1');
let children = Array.from(ws.children);
//let children = Array.from(document.body.children);

children = children.filter(node => {
  let classes = Array.from(node.classList);
  return !(classes.some(c => c.startsWith('LetterParagraph')))
})


class ArrayOfArrays extends Array {
    add(item) {
        super.push([item]);
    }

    addLast(item) {
        this.last.push(item)
    }

    get last() {
        return this[this.length-1] || []
    }
}

let fragment = document.createDocumentFragment();
let grouped = new ArrayOfArrays;
  
children.forEach(child => { 
  if(child.classList.contains('EntryParagraph')){ 
    grouped.add(child) 
  } else { 
    grouped.addLast(child) 
  }
})

grouped.forEach(([card, ...others]) => {
  others.forEach(other => { 
    card.appendChild(other); 
    fragment.appendChild(card);
  })
})

document.body.innerHTML = '';
document.body.appendChild(fragment);

