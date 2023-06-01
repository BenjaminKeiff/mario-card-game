const choose = new Audio('../assets/audio/difficulty-choose.mp3')
const cardGame = document.querySelector('#card-game')

cardGame.addEventListener('mouseover', ()=>{
        jouerEffetSonore(choose);
    })

function jouerEffetSonore(effect) {
    effect.currentTime = 0; // Réinitialise la lecture à partir du début
    effect.play();
}