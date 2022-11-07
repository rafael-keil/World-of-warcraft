import { useQuestion } from "./src/services/question/use-question";
import { useLocalStorage } from "./src/services/local-storage/use-local-storage";
import { criarPersonagem } from "./src/personagem";
import { batalha } from "./src/batalha";
import { receberRecompensasDaMissao } from "./src/missoes";
import { comprarItem, comprarExpansao, venderItem } from "./src/loja";
import { cheatsJogador, cheatsPersonagem } from "./src/cheats";
import axios from "axios";

let racas;
let missoes;
let loja;
let personagemSelecionado;

const LocalStorage = useLocalStorage();

async function main() {
  process.stdout.write("\x1Bc");

  await getRaca();
  await getMissoes();
  await getLoja();

  let inicio = await confereInput(
    "O que você deseja fazer?\n1 - Continuar jogo salvo\n2 - Iniciar novo jogo\n3 - Sair",
    "Opção inválida",
    ["1", "2", "3"]
  );

  switch (inicio) {
    case "1":
      if (LocalStorage.getObject("jogador")) menuInicial();
      else {
        await useQuestion(
          "Nenhum jogador encontrado, selecione Iniciar novo jogo.\nAperte 'enter' retornar..."
        );
        main();
      }
      break;
    case "2":
      LocalStorage.setObject("jogador", { personagens: [], expansoes: [] });
      menuInicial();
      break;
  }
}

async function menuInicial() {
  process.stdout.write("\x1Bc");

  const inicial = await confereInput(
    "Menu Inicial\n1 - Criar Personagem\n2 - Selecionar Personagem\n3 - Sair",
    "Opção inválida",
    ["1", "2", "3"]
  );

  switch (inicial) {
    case "1":
      menuCriarPersonagem();
      break;
    case "2":
      menuPersonagens();
      break;
    case "3":
      main();
      break;
  }
}

async function menuCriarPersonagem() {
  process.stdout.write("\x1Bc");

  const nome = await useQuestion("Digite o nome de seu personagem:");

  let initialValue = 0;
  const nivelAlto = LocalStorage.getObject("jogador").personagens.reduce(
    (maior, personagem) => Math.max(maior, personagem.nivel),
    initialValue
  );

  // variavel com raças disponíveis
  let racasDisp = [];

  console.log("Raças disponíveis");
  racas.forEach((racaItem) => {
    if (
      (!racaItem.lvlMinimoParaObter ||
        racaItem.lvlMinimoParaObter <= nivelAlto) &&
      (!racaItem.idExpansao ||
        LocalStorage.getObject("jogador").expansoes.includes(
          racaItem.idExpansao
        ))
    ) {
      console.log(racaItem.id + " - " + racaItem.raca);
      racasDisp = [...racasDisp, racaItem.id.toString()];
    }
  });

  const idRaca = await confereInput(
    "Selecione uma raça:",
    "Raça inválida",
    racasDisp
  );

  const racaPersonagem = racas.find((racaItemF) => {
    return racaItemF.id == parseInt(idRaca);
  });
  const novoPersonagem = criarPersonagem(nome, racaPersonagem);

  LocalStorage.setObject("jogador", {
    personagens: [
      ...LocalStorage.getObject("jogador").personagens,
      novoPersonagem,
    ],
    expansoes: [...LocalStorage.getObject("jogador").expansoes],
  });

  menuInicial();
}

async function menuPersonagens() {
  process.stdout.write("\x1Bc");

  console.log("Personagens criados: \n==================================");

  let personagensDi = [];

  LocalStorage.getObject("jogador").personagens.forEach(
    (personagemItem, index) => {
      console.log(
        "ID: " +
          index +
          " \nNome: " +
          personagemItem.nome +
          " (" +
          personagemItem.raca.raca +
          ") \n" +
          "Vida: " +
          personagemItem.vida +
          "\nVigor: " +
          personagemItem.vigor +
          "\nDano: " +
          personagemItem.dano +
          "\nNivel: " +
          personagemItem.nivel +
          " \n" +
          "Dinheiro: " +
          personagemItem.dinheiro +
          "\nITENS: " +
          "\n  " +
          personagemItem.equipamentos[0].tipo +
          ": " +
          personagemItem.equipamentos[0].nome +
          "\n  " +
          personagemItem.equipamentos[1].tipo +
          ": " +
          personagemItem.equipamentos[1].nome +
          "\n  " +
          personagemItem.equipamentos[2].tipo +
          ": " +
          personagemItem.equipamentos[2].nome +
          "\n=================================="
      );
      personagensDi = [...personagensDi, index.toString()];
    }
  );
  if (personagensDi.length === 0) {
    await useQuestion(
      "Nenhum personagem disponível\nAperte 'enter' criar um..."
    );
    menuCriarPersonagem();
  } else {
    const idPersonagem = await confereInput(
      "Selecione um personagem:",
      "Personagem inválido",
      personagensDi
    );

    personagemSelecionado = parseInt(idPersonagem);
    menuJogar();
  }
}

async function menuJogar() {
  process.stdout.write("\x1Bc");

  const jogar = await confereInput(
    "Menu jogar:\n1 - Batalhar\n2 - Realizar Missões\n3 - Loja\n4 - Sair",
    "Opção inválida",
    ["1", "2", "3", "4"],
    personagemSelecionado
  );

  switch (jogar) {
    case "1":
      menuBatalha();
      break;
    case "2":
      menuMissoes();
      break;
    case "3":
      menuLoja();
      break;
    case "4":
      menuInicial();
      break;
  }
}

async function menuBatalha() {
  process.stdout.write("\x1Bc");

  let personagensDisp = [];

  LocalStorage.getObject("jogador").personagens.forEach(
    (personagemItem, index) => {
      const personagemSe =
        LocalStorage.getObject("jogador").personagens[personagemSelecionado];
      if (personagemItem.nome != personagemSe.nome) {
        console.log(
          index +
            " - " +
            personagemItem.nome +
            " (" +
            personagemItem.raca.raca +
            ")"
        );
        personagensDisp = [...personagensDisp, index.toString()];
      }
    }
  );

  if (personagensDisp.length === 0) {
    console.log("Você não tem outro personagem para batalhar");
  } else {
    const idPersonagem = await confereInput(
      "Selecione um personagem para batalhar contra:",
      "Personagem inválido",
      personagensDisp
    );

    const vencedor = batalha(
      LocalStorage.getObject("jogador").personagens[personagemSelecionado],
      LocalStorage.getObject("jogador").personagens[idPersonagem],
      Math.random()
    );

    process.stdout.write("\x1Bc");

    if (vencedor == "Empate") {
      console.log("Foi empate!");
    } else {
      console.log(vencedor.nome + " foi o vencedor!");
      const jogadorNovo = LocalStorage.getObject("jogador").personagens.map(
        (personagemItem) => {
          if (personagemItem.nome == vencedor.nome) {
            return vencedor;
          } else {
            return personagemItem;
          }
        }
      );

      LocalStorage.setObject("jogador", {
        personagens: [...jogadorNovo],
        expansoes: [...LocalStorage.getObject("jogador").expansoes],
      });
    }
  }

  await useQuestion("Aperte 'enter' para continuar...");
  menuJogar();
}

async function menuMissoes() {
  process.stdout.write("\x1Bc");

  let missoesDisp = [];

  console.log("Missões disponíveis");
  missoes.forEach((missoesItem) => {
    if (
      !missoesItem.idExpansao ||
      LocalStorage.getObject("jogador").expansoes.includes(
        missoesItem.idExpansao
      )
    ) {
      console.log(missoesItem);
      missoesDisp = [...missoesDisp, missoesItem.id.toString()];
    }
  });

  const idMissao = await confereInput(
    "Digite o id da missão:",
    "Id inválido",
    missoesDisp,
    personagemSelecionado
  );

  process.stdout.write("\x1Bc");
  console.log("Realizando missão.");
  const personagemNovo = await fazerMissao(
    missoes[idMissao - 1],
    LocalStorage.getObject("jogador").personagens[personagemSelecionado],
    LocalStorage.getObject("jogador").expansoes
  );

  const jogadorNovo = LocalStorage.getObject("jogador").personagens.map(
    (personagemItem) => {
      if (personagemItem.nome == personagemNovo.nome) {
        return personagemNovo;
      } else {
        return personagemItem;
      }
    }
  );

  LocalStorage.setObject("jogador", {
    personagens: [...jogadorNovo],
    expansoes: [...LocalStorage.getObject("jogador").expansoes],
  });
  await useQuestion("Missão realizada!\nAperte 'enter' para retornar...");
  menuJogar();
}

async function menuLoja() {
  process.stdout.write("\x1Bc");

  const idLoja = await confereInput(
    "Menu da Loja:\n1 - Comprar Itens\n2 - Comprar expansões\n3 - Vender Itens\n4 - Sair",
    "Opção inválida!",
    ["1", "2", "3", "4"],
    personagemSelecionado
  );

  switch (idLoja) {
    case "1":
      menuCompraItem();
      break;
    case "2":
      menuCompraExpansão();
      break;
    case "3":
      menuVenda();
      break;
    case "4":
      menuJogar();
      break;
  }
}

async function menuCompraItem() {
  process.stdout.write("\x1Bc");

  const personagemAtual =
    LocalStorage.getObject("jogador").personagens[personagemSelecionado];
  let itensDisp = [];

  loja.forEach((lojaItem) => {
    let jaTem = false;
    personagemAtual.equipamentos.forEach((equipItem) => {
      if (lojaItem.id == equipItem.id) {
        jaTem = true;
      }
    });

    if (
      (!lojaItem.idExpansao ||
        LocalStorage.getObject("jogador").expansoes.includes(
          lojaItem.idExpansao
        )) &&
      (!lojaItem.lvlMinimo || personagemAtual.nivel >= lojaItem.lvlMinimo) &&
      !jaTem &&
      lojaItem.tipo != "EXPANSAO"
    ) {
      console.log(lojaItem);
      itensDisp = [...itensDisp, lojaItem.id.toString()];
    }
  });

  const itemComprado = await confereInput(
    "Dinheiro atual: " +
      personagemAtual.dinheiro +
      "\nDigite o ID do item a ser comprado:",
    "Opção inválida",
    itensDisp,
    personagemSelecionado
  );

  process.stdout.write("\x1Bc");

  const jogadorNovo = comprarItem(
    LocalStorage.getObject("jogador"),
    personagemAtual,
    loja[parseInt(itemComprado) - 1]
  );

  if (
    jogadorNovo.personagens[personagemSelecionado].dinheiro ==
    personagemAtual.dinheiro
  ) {
    await useQuestion(
      "Sem dinheiro o suficiente!\nAperte 'enter' para retornar..."
    );
    menuLoja();
  } else {
    LocalStorage.setObject("jogador", jogadorNovo);
    await useQuestion(
      "Compra realizada com sucesso!\nAperte 'enter' para retornar..."
    );
    menuLoja();
  }
}

async function menuCompraExpansão() {
  process.stdout.write("\x1Bc");

  const jogadorAtual = LocalStorage.getObject("jogador");
  let expansaoDisp = [];

  loja.forEach((lojaItem) => {
    let jaTem = false;
    jogadorAtual.expansoes.forEach((expansaoItem) => {
      if (lojaItem.idExpansao == expansaoItem && lojaItem.tipo == "EXPANSAO") {
        jaTem = true;
      }
    });

    if (!jaTem && lojaItem.tipo == "EXPANSAO") {
      console.log(lojaItem);
      expansaoDisp = [...expansaoDisp, lojaItem.id.toString()];
    }
  });

  const itemComprado = await confereInput(
    "Dinheiro atual: " +
      jogadorAtual.personagens[personagemSelecionado].dinheiro +
      "\nDigite o ID a expansão a ser comprada:",
    "Opção inválida",
    expansaoDisp,
    personagemSelecionado
  );

  process.stdout.write("\x1Bc");

  const jogadorNovo = comprarExpansao(
    jogadorAtual,
    jogadorAtual.personagens[personagemSelecionado],
    loja[parseInt(itemComprado) - 1]
  );


  if (
    jogadorNovo.expansoes.includes(loja[parseInt(itemComprado) - 1])
  ) {
    await useQuestion(
      "Sem dinheiro o suficiente!\nAperte 'enter' para retornar..."
    );
    menuLoja();
  } else {
    LocalStorage.setObject("jogador", jogadorNovo);
    await useQuestion("Compra realizada!\nAperte 'enter' para retornar...");
    menuLoja();
  }
}

async function menuVenda() {
  process.stdout.write("\x1Bc");
  const equipamentosId = [];
  const jogadorAtual = LocalStorage.getObject("jogador");
  jogadorAtual.personagens[personagemSelecionado].equipamentos.forEach(
    (equipamento) => {
      if (equipamento.id && equipamento.preco) {
        console.log(equipamento);
        equipamentosId.push(equipamento.id.toString());
      }
    }
  );
  if (equipamentosId.length !== 0) {
    const IdItemASerVendido = await confereInput(
      "Dinheiro atual: " +
        jogadorAtual.personagens[personagemSelecionado].dinheiro +
        "\nDigite o ID do equipamento a ser vendido:",
      "Opção inválida",
      equipamentosId,
      personagemSelecionado
    );

    process.stdout.write("\x1Bc");

    let itemASerVendido;
    jogadorAtual.personagens[personagemSelecionado].equipamentos.forEach(
      (equipamento) => {
        if (equipamento.id.toString() === IdItemASerVendido) {
          itemASerVendido = equipamento;
        }
      }
    );

    jogadorAtual.personagens[personagemSelecionado] = venderItem(
      jogadorAtual.personagens[personagemSelecionado],
      itemASerVendido
    );
    LocalStorage.setObject("jogador", jogadorAtual);
    await useQuestion(
      `Item vendido.\nDinheiro: ${jogadorAtual.personagens[personagemSelecionado].dinheiro} \nEnter pra continuar`
    );
  } else {
    await useQuestion(
      "Não há itens para serem vendidos\nAperte 'enter' para continuar..."
    );
  }

  menuLoja();
}

main();

async function getRaca() {
  const racasParaRetornar = await axios.get(
    "https://gustavobuttenbender.github.io/gus.github/woe/races.json"
  );
  racas = racasParaRetornar.data;
}

async function getMissoes() {
  const retornoMissoes = await axios.get(
    "https://gustavobuttenbender.github.io/gus.github/woe/quests.json"
  );
  missoes = retornoMissoes.data;
}

async function getLoja() {
  const retornoLoja = await axios.get(
    "https://gustavobuttenbender.github.io/gus.github/woe/store.json"
  );
  loja = retornoLoja.data;
}

async function confereInput(
  mensagemInicial,
  mensagemErro,
  condicional,
  personagemSelecionadoCheats
) {
  let input;
  do {
    input = await useQuestion(mensagemInicial);

    const ativouCheats = verificaSeDigitouCheat(
      input,
      personagemSelecionadoCheats
    );
    if (ativouCheats) {
      console.log("Cheat ativado com sucesso");
    } else if (!condicional.includes(input)) {
      console.log(mensagemErro);
    }
  } while (!condicional.includes(input));
  return input;
}

function verificaSeDigitouCheat(input, personagemSelecionadoCheats) {
  const jogador = LocalStorage.getObject("jogador");
  let cheatDeJogadorAtivado,
    novosPersonagens,
    cheatDePersonagemAtivado,
    novoPersonagem;
  if (jogador) {
    // se não existir jogador
    ({ cheatDeJogadorAtivado, novosPersonagens } = cheatsJogador(
      input,
      jogador.personagens
    ));
    if (cheatDeJogadorAtivado) {
      LocalStorage.setObject("jogador", {
        personagens: [...novosPersonagens],
        expansoes: [...LocalStorage.getObject("jogador").expansoes],
      });
    } else if (
      personagemSelecionadoCheats ||
      personagemSelecionadoCheats === 0
    ) {
      const personagem = jogador.personagens[personagemSelecionadoCheats];
      ({ cheatDePersonagemAtivado, novoPersonagem } = cheatsPersonagem(
        input,
        personagem
      ));
      if (cheatDePersonagemAtivado) {
        jogador.personagens[personagemSelecionadoCheats] = novoPersonagem;
        LocalStorage.setObject("jogador", {
          personagens: [...jogador.personagens],
          expansoes: [...LocalStorage.getObject("jogador").expansoes],
        });
      }
    }
  }
  return cheatDePersonagemAtivado || cheatDeJogadorAtivado;
}

async function fazerMissao(missao, personagem, expansoes) {
  let novoPersonagem = { ...personagem };
  if (
    missao.idExpansao == undefined ||
    missao.idExpansao == expansoes.includes(missao.idExpansao)
  ) {
    novoPersonagem = receberRecompensasDaMissao(missao, personagem, expansoes);
    await correrTempoMissao(missao.tempoEstimado);
  }

  return novoPersonagem;
}

function correrTempoMissao(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
