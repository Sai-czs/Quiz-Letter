document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.querySelector('.start-btn');
    const welcomeScreen = document.querySelector('.welcome-screen');
    const quizContainer = document.querySelector('.quiz-container');
 
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            welcomeScreen.style.animation = 'fadeOut 0.8s ease forwards';
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                quizContainer.style.display = 'block';
                quizContainer.style.animation = 'slideIn 0.8s ease forwards';
                document.querySelectorAll('section')[0].style.display = 'block';
            }, 800);
        });
    }
});

let perguntaAtual = 1;
const totalPerguntas = 7;
const respostas = {};

function proximaPergunta(num) {
    const resposta = document.querySelector(`input[name="pergunta${num}"]:checked`);
    if (!resposta) {
        alert("Por favor, selecione uma resposta!");
        return;
    }
    respostas[`pergunta${num}`] = resposta.value;

    document.querySelectorAll('section')[num-1].style.display = 'none';
    
    if (num < totalPerguntas) {
        perguntaAtual++;
        document.querySelectorAll('section')[perguntaAtual-1].style.display = 'block';
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    const resultado = analisarRespostas();
    
    const resultadoHTML = `
    <div class="resultado">
        <h2>Seu resultado:</h2>
        <p>${resultado.mensagem}</p>
        
        <div class="filmes-container">
            ${resultado.filmes.map(filme => `
                <div class="filme">
                    <img src="${filme.imagem}" alt="${filme.nome}" class="poster">
                    <div class="filme-info">
                        <h3>${filme.nome}</h3>
                        <p>${filme.descricao}</p>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="btn-reiniciar-container">
            <button class="btn-reiniciar" onclick="reiniciarQuiz()">↻ Fazer novamente</button>
        </div>
    </div>`;
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.insertAdjacentHTML('beforeend', resultadoHTML);
}

function analisarRespostas() {
    let contagem = { positivo: 0, neutro: 0, negativo: 0 };

    for (const pergunta in respostas) {
        const valor = respostas[pergunta];
        if (['Tranquilo', 'Bem', 'Não', 'Muito bem', 'Orgulhoso'].includes(valor)) {
            contagem.positivo++;
        } else if (['Desanimado', 'Arrastado', 'As vezes', 'Dividido', 'Nada demais'].includes(valor)) {
            contagem.neutro++;
        } else {
            contagem.negativo++;
        }
    }

    if (contagem.negativo > contagem.positivo && contagem.negativo > contagem.neutro) {
        return {
            mensagem: "Você precisa de um abraço...",
            filmes: [
                { 
                    nome: "Brilho Eterno de Uma Mente sem Lembranças",
                    descricao: "O passado provavelmente já deixou VOCÊ no passado. 🤝",
                    imagem: "https://www.cinebelasartes.com.br/wp-content/uploads/2022/06/brilho-eterno-de-uma-mente-sem-lembrancas.jpg" 
                },
                { 
                    nome: "Past Lives", 
                    descricao: "'E se? E se? E se?' É a única coisa que ecoa na sua cabeça. Uma hora você vai perceber que gostou da pessoa que vai embora (Só vendo pra entender).",
                    imagem: "https://movienonsense.com/wp-content/uploads/2023/11/past-lives.jpg?w=1200"
                },
                { 
                    nome: "La La Land", 
                    descricao: "Se for pra se amaldiçoar com memórais, com certeza esse filme é para você.",
                    imagem: "https://upload.wikimedia.org/wikipedia/pt/c/c0/La_La_Land_%28filme%29.png"
                }
            ]
        }; 
    } else if (contagem.neutro > contagem.positivo) {
        return {
            mensagem: "Um tapinha nas costas. Você pode gostar destes filmes:",
            filmes: [
                { 
                    nome: "Perfect Days", 
                    descricao: "Enxergar a mediocridade da vida com outros olhos, talvez seja isso que você precisa no momento.",
                    imagem: "https://m.media-amazon.com/images/M/MV5BNGVmODFkM2MtOTEzMy00MjFjLThjZmYtODMxZmI1MzcyNDkyXkEyXkFqcGc@._V1_.jpg-"
                },
                {   
                    nome: "The Holdovers", 
                    descricao: "Nada melhor do que encontrar sensibilidade e conforto em algo claramente desconfortável e injusto.",
                    imagem: "https://musicart.xboxlive.com/7/ee7e6800-0000-0000-0000-000000000002/504/image.jpg"
                },
                {   
                    nome: "A Real Pain", 
                    descricao: "Talvez você devesse conhecer seu oposto.",
                    imagem: "https://m.media-amazon.com/images/I/61hVfjtsdxL.jpg"
                }
            ]
        };
    } else {
        return {
            mensagem: "Parece que você pratica bem o estoicismo ~que inveja~. Estes filmes combinam com você:",
            filmes: [
                {   
                    nome: "Como Ganhar Milhões Antes que a Vovó Morra", 
                    descricao: "Um pouco de emoção pra você.",
                    imagem: "https://images.justwatch.com/poster/323134598/s718/how-to-make-millions-before-grandma-dies.jpg-"
                },
                {   
                    nome: "As Branquelas", 
                    descricao: "Um pouco de leveza pra você.",
                    imagem: "https://filmesempauta2021.wordpress.com/wp-content/uploads/2022/01/as-branquelas.jpg"
                },
                {   
                    nome: "Anatomia de Uma Queda", 
                    descricao: "Um pouco de tensão pra você.",
                    imagem: "https://br.web.img3.acsta.net/pictures/23/12/19/14/31/0947044.png"
                }
            ]
        };
    } 
}

// reiniciar o quiz NESSE CARAI, NÃO SE PERDEE!!!!!
function reiniciarQuiz() {
    perguntaAtual = 1;
    respostas = {};

    // Esconde todas as seções, exceto a primeira
    document.querySelectorAll('section').forEach((sec, index) => {
        sec.style.display = index === 0 ? 'block' : 'none';
    });

    // Remove o elemento de resultado, se existir
    const resultado = document.querySelector('.resultado');
    if (resultado) {
        resultado.remove();
    }

    // Opcional: Reiniciar outros elementos do quiz, se necessário
}
// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Esconde tudo nessa bosta
    document.querySelectorAll('section').forEach((sec, index) => {
        sec.style.display = index === 0 ? 'block' : 'none';
    });
});