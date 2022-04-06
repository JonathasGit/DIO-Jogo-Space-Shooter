const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');

//movimento e tiro da nave do jogador
// para prever os moviemntos, a cada teclada
function flyShip(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if(event.key === 'ArrowDown') { // Se não for
        event.preventDefault();
        moveDown();
    } else if(event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}


//função de subir a nave
function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top'); //passo o html e volto css algo assim
    if(topPosition === "0px") {
        return
    } else { // se nao cria a position
        let position = parseInt(topPosition);
        position -= 50;
        yourShip.style.top = `${position}px`;
    }
}

