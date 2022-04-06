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

//função de descer a nave
function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "510px"){
        return
    } else {
        let position = parseInt(topPosition); // criar denovo a variavel, porque está em outro bloco de código
        position += 50;
        yourShip.style.top = `${position}px`;
    }
}

window.addEventListener('keydown', flyShip); // PAra iniciar o jogo 



//funcionalidade de tiro - 3 funções para isso
//criar o nosso laser   (dentro da nossa area)
function fireLaser() { 
    let laser = createLaserElement();
    playArea.appendChild(laser); 
    moveLaser(laser); //movimento do tiro
}
// criar o elemento = criar a imagem do tiro 
function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));//horizontal
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'imagens/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`; // para ficar no meio da nave
    return newLaser;
}
// movimentar o laser na tela 
function moveLaser(laser) {
    let laserInterval = setInterval(() => { // intervalo para surgir outro laser
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => { //comparando se cada alien foi atingido, se sim, troca o src da imagem
            if(checkLaserCollision(laser, alien)) {
                alien.src = 'img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }
        })

        if(xPosition === 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10);
}