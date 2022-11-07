import { receberRecompensasDaMissao } from "../src/missoes";

describe("testes das missoes", () => {
  it("Deve conseguir concluir uma missão corretamente e receber seus prêmios", async () => {
    const expansoes = [];
    const personagem = {
      nome: "lele",
      raça: "elfo",
      nivel: 2,
      dinheiro: 10,
    };
    const personagemEsperado = {
      nome: "lele",
      raça: "elfo",
      nivel: 2,
      dinheiro: 20,
    };
    const missao = {
      id: 1,
      descricao: "Limpar os canecos da taberna",
      tempoEstimado: 1,
      niveisRecebidos: 0,
      dinheiroRecebido: 10,
    };

    const personagemPosMissao = receberRecompensasDaMissao(missao, personagem, expansoes);

    expect(personagemPosMissao).toEqual(personagemEsperado);
  });

  it("Deve conseguir concluir uma missão de expansão corretamente e receber seus prêmios se já possuir a expansão", async () => {
    const expansoes = [1, 2, 5];
    const personagem = {
      nome: "lele",
      raça: "elfo",
      nivel: 2,
      dinheiro: 10,
      vida:0,
      vigor:2
    };

    const resultadoEsperado = {
      nome: "lele",
      raça: "elfo",
      nivel: 3,
      dinheiro: 160,
      vida: 2,
      vigor: 3
    };

    const missao = {
      id: 10,
      descricao: "Alimentar a Al'ar",
      tempoEstimado: 2,
      niveisRecebidos: 1,
      dinheiroRecebido: 150,
      idExpansao: 1,
    };

    const personagemPosMissao = receberRecompensasDaMissao(missao, personagem, expansoes);

    expect(personagemPosMissao).toEqual(resultadoEsperado);
  });

  it("NAO Deve conseguir concluir uma missão de expansão corretamente por nao possuir a expansao", async () => {
    const expansoes = [1, 2, 5];
    const personagem = {
      nome: "lele",
      raça: "elfo",
      nivel: 2,
      dinheiro: 10,
      vida:0,
      vigor:2
    };

    const missao = {
      id: 10,
      descricao: "Alimentar a Al'ar",
      tempoEstimado: 2,
      niveisRecebidos: 1,
      dinheiroRecebido: 150,
      idExpansao: 6,
    };

    const personagemPosMissao = receberRecompensasDaMissao(missao, personagem, expansoes);

    expect(personagemPosMissao).toEqual(personagem);
  });

});

