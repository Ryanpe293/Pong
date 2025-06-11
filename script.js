const canvas = document.getElementById("meu-canvas")
const ctx = canvas.getContext("2d")

//posições inicias das Raquetes
const alturaRaquete = 80;
const larguraRaquete = 10;

//Bola
const raioBola = 7;

//jogador 1
let jogador1 = canvas.height / 2 - alturaRaquete / 2

//cpu
let cpu = canvas.height / 2 - alturaRaquete / 2

//velocidade da bola
let bolaY = canvas.width / 2;
let bolaX = canvas.height / 2;
let velocidadeBolaX = 8;
let velocidadeBolaY = 8;

//movimentação da raquete
document.addEventListener('mousemove', (evento) => {
     let retangulo = canvas.getBoundingClientRect();
     if (evento.clientY - alturaRaquete / 2 < canvas.height && evento.clientY + alturaRaquete / 2  > 150 ){
        jogador1 = evento.clientY - retangulo.top - alturaRaquete / 2;
     }
    
})

//Função para desenhar a raquete
function Raquete(x, y, altura, largura, cor){
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, largura , altura)
     
}

//Função para desenhar a bola
function Ball(x, y, raio, cor){
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.arc(x, y, raio, 0, Math.PI * 2);
    ctx.fill(); 
}

//função iniciar a bola 
function reiniciarBola(){
    bolaY = canvas.width / 2;
    bolaX = canvas.height / 2;
    velocidadeBolaX = -velocidadeBolaX;
    velocidadeBolaY = 4;
}

//função de desenhar os elementos do jogo
function desenhar(){
      const fundo = new Image()
    fundo.src = "https://images.alphacoders.com/779/thumb-1920-779314.jpg"
    
    
    const pattern = ctx.createPattern(fundo, "repeat");
    Raquete(0,0 , canvas.height, canvas.width, pattern);

    //raquete Jogador 1 e cpu
    Raquete(10, jogador1, alturaRaquete, larguraRaquete, 'white');

    Raquete(canvas.width -20, cpu, alturaRaquete, larguraRaquete, 'white');

    Ball(bolaX, bolaY, raioBola, 'white')
}


    var mordidaSom = new Audio();
    mordidaSom.src = 'sons/bip.mp3';
    mordidaSom.volume = 0.4;
    mordidaSom.load();

//função para autualizar o jogo
function autualizarJogo(){
    bolaX += velocidadeBolaX;
    bolaY += velocidadeBolaY;

    //rebater a bola no teto e na base
    if(bolaY + raioBola > canvas.height || bolaY - raioBola < 0){
        velocidadeBolaY = -velocidadeBolaY;
    }

    //movimentação da CPU
    cpu += ((bolaY - (cpu + alturaRaquete /2))) * velocidade;

    //colisão com a raquete do jogador
    if(bolaX - raioBola < 20 && bolaY > jogador1 && bolaY < jogador1 + alturaRaquete){
        velocidadeBolaX = -velocidadeBolaX
        mordidaSom.currentTime = 0.0;
        mordidaSom.play();
    }

    //colisão com a raquete da CPU
    if(bolaX - raioBola > canvas.width - 20 && bolaY > cpu && bolaY < cpu + alturaRaquete){
        velocidadeBolaX = -velocidadeBolaX
        mordidaSom.currentTime = 0.0;
        mordidaSom.play();
    }

    // Pontuação(bola sai da area)
    if(bolaX < 0){
        pCpu += 1;
        reiniciarBola();
    }
    else if(bolaX > canvas.width){
        pP += 1;
        reiniciarBola();
    }

}
var playing = false
function LoopDoJogo(){
    if (inicio){
    autualizarJogo();
    desenhar();
    Pontuacao();
    fimDejogo();
    MusicaOn();
    }
    else{
        musicaOff();
    }
    requestAnimationFrame(LoopDoJogo);
    playing = true
}
var pP = 0;
var pCpu = 0;
function Pontuacao(){
    document.getElementById("pontuacao").innerText = pP;
    document.getElementById("pontuacaoCpu").innerText = pCpu;
}

function fimDejogo(){
    if(pCpu === 5){
        alert("CPU venceu")
        playing = false
        inicio = false
        musicaOff();
    }
    else if(pP === 5){
        alert("Você venceu")
        playing = false
        inicio = false
        musicaOff();
    }
}
var musica = new Audio();
    musica.src = 'sons/musica.mp3'
    musica.load();
    musica.volume = 0.8;

function MusicaOn(){
    musica.loop = true;
    musica.play();

}
function musicaOff(){
    musica.pause();
    musica.currentTime = 0.0;
}
 let velocidade;

//Iniciar o jogo
var inicio = true
function iniciarJogo(){
 let dificuldade = document.getElementById("dificuldade").value;
   

    switch(dificuldade){
        case 'facil' : velocidade = 0.01; break;
        case 'medio': velocidade = 0.07; break;
        case 'dificil': velocidade = 0.1; break;

    }
inicio =true

if(!playing){
LoopDoJogo();

}
pP = 0;
pCpu = 0;
reiniciarBola();

}


