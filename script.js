const botaoPlayPause = document.getElementById('play-pause');
const botaoAvancar = document.getElementById('proximo');
const botaoVoltar = document.getElementById('anterior');
const nomeCapitulo = document.getElementById('capitulo');
const audioCapitulo = document.getElementById('audioCapitulo');

const numeroCapitulos = 10;
let taTocando = false;
let capituloAtual = 1;

function toggleMenu() {
    var menuCapitulo = document.querySelector('.menu-capitulo');
    menuCapitulo.style.maxHeight = menuCapitulo.style.maxHeight === '0px' ? menuCapitulo.scrollHeight + 'px' : '0px';
}

function playCapitulo(caminhoDoAudio, event) {
    var audioPlayer = document.getElementById('audioCapitulo');

    // Pausa o áudio atual se estiver reproduzindo
    if (!audioPlayer.paused) {
        audioPlayer.pause();
        taTocando = false;
        botaoPlayPause.classList.add('bi-play-circle-fill');
        botaoPlayPause.classList.remove('bi-pause-circle-fill');
    }

    // Configura a nova fonte e inicia a reprodução
    audioPlayer.src = caminhoDoAudio;
    audioPlayer.load(); // Recarrega o áudio para iniciar a reprodução
    audioPlayer.play(); // Inicia a reprodução

    taTocando = true;
    botaoPlayPause.classList.remove('bi-play-circle-fill');
    botaoPlayPause.classList.add('bi-pause-circle-fill');

    // Atualiza o nome do capítulo
    trocarNomeFaixa();

    // Impede a propagação do evento de clique para evitar o fechamento do menu
    event.stopPropagation();
}

function pausarFaixa() {
    if (taTocando) {
        audioCapitulo.pause();
        taTocando = false;
        botaoPlayPause.classList.add('bi-play-circle-fill');
        botaoPlayPause.classList.remove('bi-pause-circle-fill');
    }
}

function trocarNomeFaixa() {
    nomeCapitulo.innerText = 'Capítulo ' + capituloAtual;
}

function trocarCapitulo(novoCapitulo) {
    // Atualiza o capítulo
    capituloAtual = novoCapitulo;

    // Atualiza o nome do capítulo
    trocarNomeFaixa();

    // Reproduz o novo capítulo
    playCapitulo(`./books/dom-casmurro/${capituloAtual}.mp3`);
}

function proximaFaixa() {
    if (capituloAtual === numeroCapitulos) {
        capituloAtual = 1;
    } else {
        capituloAtual++;
    }

    // Troca para o próximo capítulo
    trocarCapitulo(capituloAtual);
}

function voltarFaixa() {
    if (capituloAtual === 1) {
        capituloAtual = numeroCapitulos;
    } else {
        capituloAtual--;
    }

    // Troca para o capítulo anterior
    trocarCapitulo(capituloAtual);
}

botaoPlayPause.addEventListener('click', function() {
    if (taTocando) {
        pausarFaixa();
    } else {
        playCapitulo(`./books/dom-casmurro/${capituloAtual}.mp3`, event);
    }
});

botaoAvancar.addEventListener('click', proximaFaixa);
botaoVoltar.addEventListener('click', voltarFaixa);

// Adicione um evento de clique para cada <li> no menu
const menuItens = document.querySelectorAll('.menu-capitulo li');
menuItens.forEach(function(item, index) {
    item.addEventListener('click', function() {
        trocarCapitulo(index + 1);
    });
});