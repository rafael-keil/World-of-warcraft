import { getDano, getVida, getVigor } from "../src/equipamentos";

let personagem;

beforeAll(() => {
  personagem = {
    nome: "Thiago",
    raca: 3,
    equipamentos: [
      { aprimoramento: 1 },
      { aprimoramento: 2 },
      { aprimoramento: 3 },
    ],
    nivel: 1,
    dinheiro: 0,
    vida: 5,
    vigor: 5,
    dano: 5,
  };
});

describe("Testes sobre equipamento", () => {
  it("Deve calcular o vigor corretamente com o atributo base de sua raça + equipamentos", () => {
    const esperado = 8;

    const recebido = getVigor(personagem);

    expect(recebido).toEqual(esperado);
  });

  it("Deve calcular o dano corretamente com o atributo base de sua raça + equipamentos", () => {
    const esperado = 7;

    const recebido = getDano(personagem);

    expect(recebido).toEqual(esperado);
  });

  it("Deve calcular a vida corretamente com o atributo base de sua raça + equipamentos", () => {
    const esperado = 6;

    const recebido = getVida(personagem);

    expect(recebido).toEqual(esperado);
  });
});
