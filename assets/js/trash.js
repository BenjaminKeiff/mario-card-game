
const flower = document.querySelector(".flower") 
const star = document.querySelector(".star") 
const up = document.querySelector(".1up") 
const mushroom = document.querySelector(".mushroom") 
const coin10 = document.querySelector(".10coin") 
const coin20 = document.querySelector(".20coins") 
function compare () {
let classes1 = item1.classList;
let classes2 = item2.classList;
if (classes1.length === classes2.length) {
    let areEqual = true;
    for (let i = 0; i < classes1.length; i++) {
      if (classes1[i] !== classes2[i]) {
        areEqual = false;
        break;
      }
    }
    if (areEqual) {
      console.log("Les deux éléments ont les mêmes classes");
    } else {
      console.log("Les deux éléments n'ont pas les mêmes classes");
    }
  } else {
    console.log("Les deux éléments n'ont pas le même nombre de classes");
  }
}


function flipCard (item){
    // item.classList.toggle("turn");
    cardReveal++
    console.log(cardReveal)
    if (cardReveal === 1) {
        compare1.classList.remove()
        compare1 = item
        compare1.classList.add("turn")
        console.log(compare1)
    }
    if (cardReveal === 2) {
        compare1.classList.remove()
        compare2 = item
        compare2.classList.add("turn")
        compare(compare1,compare2)
        console.log(compare2)
        cardReveal = 0
    }
}

function compare(item1,item2) {
        item1.classList.remove()
        item2.classList.remove()
        cardReveal = 0
    }
