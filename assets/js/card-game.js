const spadeBonus = new Audio('../assets/audio/spadeBonus.mp3');
const world1 = new Audio('../assets/audio/world-1.oga');
const cardFlip = new Audio('../assets/audio/cardFlip.mp3');
const cardSelected = new Audio('../assets/audio/cardSelected.mp3');
const cardFlipRight = new Audio('../assets/audio/cardFlipRight.mp3');
const cardFlipWrong = new Audio('../assets/audio/cardFlipWrong.mp3');
const kingRestored = new Audio('../assets/audio/kingRestored.oga');
const gameOver = new Audio('../assets/audio/gameOver.oga');
const choose = new Audio('../assets/audio/difficulty-choose.mp3')
const tableau = document.querySelector('#tableau');
let cardReveal = 0;
let cardTab = [];
let cardTabName = [];
let tryOut = 0;
const popUp = document.querySelector("#popUp")
const win = document.querySelector("#win");
const loose = document.querySelector("#loose")
const winOrLoose = document.querySelector('#winOrLoose');
const difficulty = document.querySelector('#difficulty');

chooseDifficulty();

function jouerEffetSonore(effect) {
    effect.currentTime = 0; // Réinitialise la lecture à partir du début
    effect.play();
}

function flipCard (card){
    if (cardReveal <= 1) {
        jouerEffetSonore(cardFlip);
        card.classList.toggle("turn");
        const nbrcardsTurn = document.querySelectorAll(".turn")
        let  cardsTurn = nbrcardsTurn.length;
        cardReveal++;
        cardTab.push(card);
        cardTabName.push(card.getAttribute("name"));
        if (cardReveal === 2) {
            compare(cardTab[0],cardTab[1],cardTabName[0],cardTabName[1],cardsTurn);
        }
    }
}

function compare(card1,card2,cardName1,cardName2,cardsTurn) {
        let itm1 = cardName1;
        let itm2 = cardName2;
        setTimeout(()=> {
            let allCards = document.querySelectorAll('.cards');
            if (itm1 === itm2) {
                jouerEffetSonore(cardFlipRight)
                card1.classList.add("turn");
                card2.classList.add("turn");
                if(cardsTurn >= allCards.length){
                    spadeBonus.pause();
                    jouerEffetSonore(kingRestored);
                    winOrLooseWindow("Félicitation","Gagné","win")
                    setTimeout(()=> {
                        document.location.href="./card-game.html"; 
                    }, 10000)   
                }
            }

            else {
                jouerEffetSonore(cardFlipWrong);
                card1.classList.remove("turn");
                card2.classList.remove("turn");
                tryOut++
                if(tryOut === 3) {
                    card1.classList.add("turn");
                    card2.classList.add("turn");
                    spadeBonus.pause();
                    setTimeout(()=> {
                        winOrLooseWindow("Oh non","Perdu","loose");
                        jouerEffetSonore(gameOver);
                        }, 500)   
                    setTimeout(()=> {
                            document.location.href="./card-game.html"; 
                        }, 6000)   
                }
            }
        }, 1500)

        setTimeout(()=> {      
            cardReveal = 0;
            cardTabName = [];
            cardTab = [];
        }, 1500)
}

function shakeTab(tab) {
    for (let i = tab.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tab[i], tab[j]] = [tab[j], tab[i]];
    }
}

function winOrLooseWindow(text1,text2,arg1) {
    tableau.remove();
    popUp.classList.add('active')
    if(arg1 === "win") {
        loose.classList.remove('active')
        win.classList.add('active')
    }
    else if (arg1 === "loose") {
        win.classList.remove('active')
        loose.classList.add('active')
    }
    winOrLoose.innerText = text1+"!!!\n\n Vous avez "+text2+"!";
}

function chooseDifficulty(){
    fondSonore(world1)
    tableau.classList.add('hidden');
    popUp.classList.add('active');
    winOrLoose.innerText = "Bienvenue!!!\n\n Choisissez Votre Difficulté!";
    const choice = document.querySelectorAll('.choice');
    choice.forEach(myChoice => {
        myChoice.addEventListener('mouseover', ()=>{
            jouerEffetSonore(choose);
        })
        myChoice.addEventListener('click', () =>{
            let tab = [];
            tableau.classList.remove('hidden');
            popUp.classList.remove('active'); 

            if (myChoice.getAttribute('name') === "easy") {
                tableau.classList.add('easy');
                tab = tabDifficult('easy');
                shakeTab(tab);
                createTab(tab);
                tabAppear()
                timeDifficulty(2000);
                game();
            }

            else if (myChoice.getAttribute('name') === "medium") {
                tableau.classList.add('easy');
                tab = tabDifficult('medium');
                shakeTab(tab);
                createTab(tab);
                tabAppear()
                timeDifficulty(1000);
                game();
            }

            else if (myChoice.getAttribute('name') === "hard") {
                tab = tabDifficult('hard');
                shakeTab(tab);
                createTab(tab);
                tabAppear()
                timeDifficulty(1000);
                game();
            }

            else {
                tab = tabDifficult('hardcore');
                shakeTab(tab);
                createTab(tab);
                tabAppear()
                timeDifficulty(100);
                game();
            }
            world1.pause()
            fondSonore(spadeBonus)
            difficulty.classList.add('hidden')
        });
    })
}

function timeDifficulty(time){
    setTimeout(() => {
        const nbrcardsTurn = document.querySelectorAll(".cards");
        nbrcardsTurn.forEach(element => {
            element.classList.remove("turn");
        });
    }, time);
}

function fondSonore(musique) {
    musique.loop = true;
    musique.play();
}

function tabDifficult(input){
    if (input === "easy" || input === "medium") {
        return tabCards = ["flower","flower","flower","flower",
        "star","star","mushroom","mushroom","mushroom",
        "mushroom","coins10","coins10"];
    } else {
        return tabCards = ["flower","flower","flower","flower",
        "star","star","star","star","up","up",
        "mushroom","mushroom","mushroom","mushroom",
        "coins20","coins20","coins10","coins10"];
    }
}

function createTab(tab) {
    tab.forEach(element => {
        let popUp = document.createElement("div");
        popUp.setAttribute("name", element);
        popUp.classList.add("cards",element);
        tableau.append(popUp);
    });
}

function game() {
    setTimeout(()=> {
        let allCards = document.querySelectorAll('.cards');
        allCards.forEach((card)=> {
            card.addEventListener('click', () =>{
                if (card.classList[3] != 'turn' && card.classList[2] != 'turn') {
                    flipCard(card);
            }
        });
        card.addEventListener('mouseover', () =>{
            jouerEffetSonore(cardSelected)           
        })
        })
    }, 100) 
}

function tabAppear() {
    const nbrcardsTurn = document.querySelectorAll(".cards");
    nbrcardsTurn.forEach(element => {
        element.classList.add("turn");
    });
}