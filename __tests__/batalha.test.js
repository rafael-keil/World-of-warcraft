import { batalha } from "../src/batalha";

describe("Testes de batalha", () => {
  it("Deve conseguir finalizar a batalha e obter um vencedor com sucesso", () => {
    const vencedorEsperado = {
      nome: "Thiago",
      raca: 3,
      equipamentos: [
        { aprimoramento: 0 },
        { aprimoramento: 0 },
        { aprimoramento: 0 },
      ],
      nivel: 2,
      dinheiro: 0,
      vida: 15,
      vigor: 10,
      dano: 7,
    };

    const personagem1 = {
      nome: "Rafael",
      raca: 2,
      equipamentos: [
        { aprimoramento: 0 },
        { aprimoramento: 0 },
        { aprimoramento: 0 },
      ],
      nivel: 1,
      dinheiro: 0,
      vida: 10,
      vigor: 5,
      dano: 10,
    };

    const personagem2 = {
      nome: "Thiago",
      raca: 3,
      equipamentos: [
        { aprimoramento: 0 },
        { aprimoramento: 0 },
        { aprimoramento: 0 },
      ],
      nivel: 1,
      dinheiro: 0,
      vida: 15,
      vigor: 10,
      dano: 7,
    };

    const vencedorRecebido = batalha(personagem1, personagem2, 0);
    const vencedorRecebido2 = batalha(personagem1, personagem2, 1);

    expect(vencedorRecebido).toEqual(vencedorEsperado);
    expect(vencedorRecebido).toEqual(vencedorRecebido2);
  });

  it("Deve conseguir declarar empate em uma batalha", () => {
    const vencedorEsperado = "Empate";

    const personagem1 = {
      nome: "Rafael",
      raca: 2,
      equipamentos: [
        { aprimoramento: 0 },
        { aprimoramento: 0 },
        { aprimoramento: 0 },
      ],
      nivel: 1,
      dinheiro: 0,
      vida: 10,
      vigor: 10,
      dano: 4,
    };

    const personagem2 = {
      nome: "Thiago",
      raca: 3,
      equipamentos: [
        { aprimoramento: 0 },
        { aprimoramento: 0 },
        { aprimoramento: 0 },
      ],
      nivel: 1,
      dinheiro: 0,
      vida: 15,
      vigor: 10,
      dano: 7,
    };

    const vencedorRecebido = batalha(personagem1, personagem2, 0);

    expect(vencedorRecebido).toEqual(vencedorEsperado);
  });
});
