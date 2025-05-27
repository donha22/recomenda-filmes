// Variáveis globais para os elementos da interface
let campoIdade;
let campoFantasia;
let botaoRecomendar;
let recomendacaoFilme = "Clique em 'Recomendar Filme' para começar!"; // Mensagem inicial

// ---
// Lista de filmes disponíveis
// Você pode adicionar mais filmes aqui seguindo o mesmo padrão!
// Cada objeto de filme deve ter:
// - nome: O título do filme
// - idadeMinima: A idade mínima recomendada
// - ehFantasia: true se for um filme de fantasia, false caso contrário
let filmes = [
  {
    nome: "O menino que descobriu o vento",
    idadeMinima: 14,
    ehFantasia: false
  },
  {
    nome: "As aventuras de pi",
    idadeMinima: 10, // Ajustado para a lógica original (idade 10-13, fantasia)
    ehFantasia: true
  },
  {
    nome: "Depois da chuva",
    idadeMinima: 10, // Ajustado para a lógica original (idade 10-13, não fantasia)
    ehFantasia: false
  },
  {
    nome: "A viagem de chihiro",
    idadeMinima: 0, // Ajustado para a lógica original (idade < 10, fantasia)
    ehFantasia: true
  },
  {
    nome: "O feitiço do tempo",
    idadeMinima: 0, // Ajustado para a lógica original (idade < 10, não fantasia)
    ehFantasia: false
  },
  {
    nome: "Harry Potter e a Pedra Filosofal",
    idadeMinima: 8,
    ehFantasia: true
  },
  {
    nome: "Toy Story",
    idadeMinima: 0,
    ehFantasia: false
  },
  {
    nome: "Interestelar",
    idadeMinima: 12,
    ehFantasia: false
  },
  {
    nome: "Divertida Mente",
    idadeMinima: 0,
    ehFantasia: false
  },
  {
    nome: "O Senhor dos Anéis: A Sociedade do Anel",
    idadeMinima: 12,
    ehFantasia: true
  }
];

// ---
// Função de configuração inicial do p5.js
function setup() {
  createCanvas(800, 400); // Cria a área de desenho
  background("white"); // Define o fundo inicial como branco

  // Cria e posiciona o rótulo e o campo de entrada para a idade
  let labelIdade = createSpan("Sua idade:");
  labelIdade.position(50, 50);
  campoIdade = createInput("10"); // Valor padrão
  campoIdade.position(150, 50);
  campoIdade.size(50);

  // Cria e posiciona a caixa de seleção para "Gosta de fantasia?"
  campoFantasia = createCheckbox(" Gosta de fantasia?", false); // false = não selecionado por padrão
  campoFantasia.position(50, 100);

  // Cria e posiciona o botão para gerar a recomendação
  botaoRecomendar = createButton('Recomendar Filme');
  botaoRecomendar.position(50, 150);
  // Associa a função 'atualizaRecomendacao' ao evento de clique do botão
  botaoRecomendar.mousePressed(atualizaRecomendacao);
}

// ---
// Função de desenho contínuo do p5.js
function draw() {
  background("white"); // ⚪ Fundo branco (limpa a tela a cada quadro)

  fill(color(76, 0, 115)); // 🟣 Cor do texto (roxo escuro)
  textAlign(CENTER, CENTER); // 🎯 Alinhamento centralizado
  textSize(28); // 🔠 Tamanho ajustado para caber na tela
  
  // Exibe a recomendação atual no centro da tela
  text(recomendacaoFilme, width / 2, height / 2);
}

// ---
// Função para atualizar a recomendação quando o botão é clicado
function atualizaRecomendacao() {
  // Obtém o valor da idade do campo de entrada e converte para número inteiro
  let idade = parseInt(campoIdade.value());
  // Obtém o estado da caixa de seleção (true se marcado, false se não)
  let gostaDeFantasia = campoFantasia.checked();

  // Chama a função 'geraRecomendacao' com os valores obtidos
  // e armazena o resultado na variável global 'recomendacaoFilme'
  recomendacaoFilme = geraRecomendacao(idade, gostaDeFantasia);
}

// ---
// Função principal que gera a recomendação do filme
function geraRecomendacao(idade, gostaDeFantasia) {
  // Converte a idade para um número, caso não seja (ex: se o campo estiver vazio)
  idade = isNaN(idade) ? 0 : idade;

  // 1. Filtra os filmes que a pessoa pode assistir pela idade mínima
  let filmesPorIdade = filmes.filter(filme => filme.idadeMinima <= idade);

  // 2. Tenta encontrar filmes de fantasia se a pessoa gosta de fantasia
  if (gostaDeFantasia) {
    let filmesDeFantasia = filmesPorIdade.filter(filme => filme.ehFantasia);
    if (filmesDeFantasia.length > 0) {
      // Escolhe um filme de fantasia aleatoriamente da lista filtrada
      let filmeAleatorio = random(filmesDeFantasia);
      return `Recomendamos: ${filmeAleatorio.nome}`;
    }
  }

  // 3. Se não encontrou filmes de fantasia adequados OU se a pessoa não gosta de fantasia,
  // tenta recomendar um filme que não seja de fantasia (mas que se encaixe na idade)
  let filmesNaoFantasia = filmesPorIdade.filter(filme => !filme.ehFantasia);
  if (filmesNaoFantasia.length > 0) {
    // Escolhe um filme não-fantasia aleatoriamente
    let filmeAleatorio = random(filmesNaoFantasia);
    return `Que tal: ${filmeAleatorio.nome}`;
  }

  // 4. Se não houver filmes não-fantasia, mas ainda houver filmes por idade (ex: todos são fantasia)
  if (filmesPorIdade.length > 0) {
    // Escolhe qualquer filme restante que se encaixe na idade
    let filmeAleatorio = random(filmesPorIdade);
    return `Você pode gostar de: ${filmeAleatorio.nome}`;
  }

  // 5. Se não houver nenhum filme que se encaixe nos critérios
  return "Nenhuma recomendação encontrada para seus critérios.";
}
