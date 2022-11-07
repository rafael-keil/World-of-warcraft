import { comprarExpansao, comprarItem, venderItem } from "../src/loja";
let personagem;
let jogador;

beforeEach(() => {
  jogador = {
    personagens: [
      {
        nome: "Personagem base",
        raca: {
          id: 1,
          raca: "Elfo Sangrento",
          danoBase: 4,
          vidaBase: 5,
          vigorBase: 1,
          tipo: "NORMAL",
        },
        equipamentos: [
          { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
          { id: "", nome: "", tipo: "DANO", preco: "", aprimoramento: 0 },
          { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
        ],
        nivel: 1,
        dinheiro: 200000,
        vida: 5,
        vigor: 1,
        dano: 4,
      },
      {
        nome: "Personagem base dois",
        raca: {
          id: 1,
          raca: "Elfo Sangrento",
          danoBase: 4,
          vidaBase: 5,
          vigorBase: 1,
          tipo: "NORMAL",
        },
        equipamentos: [
          { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
          { id: "", nome: "", tipo: "DANO", preco: "", aprimoramento: 0 },
          { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
        ],
        nivel: 27,
        dinheiro: 40000,
        vida: 5,
        vigor: 1,
        dano: 4,
      },
    ],
    expansoes: [1, 2, 3],
  };
  personagem = {
    nome: "Personagem base",
    raca: {
      id: 1,
      raca: "Elfo Sangrento",
      danoBase: 4,
      vidaBase: 5,
      vigorBase: 1,
      tipo: "NORMAL",
    },
    equipamentos: [
      { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
      { id: "", nome: "", tipo: "DANO", preco: "", aprimoramento: 0 },
      { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
    ],
    nivel: 1,
    dinheiro: 200000,
    vida: 5,
    vigor: 1,
    dano: 4,
  };
});

describe("Testes de compra da loja", () => {
  it("Deve conseguir comprar um item do tipo VIGOR com sucesso", () => {
    const resultadoEsperado = {
      nome: "Personagem base",
      raca: {
        id: 1,
        raca: "Elfo Sangrento",
        danoBase: 4,
        vidaBase: 5,
        vigorBase: 1,
        tipo: "NORMAL",
      },
      equipamentos: [
        { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
        { id: "", nome: "", tipo: "DANO", preco: "", aprimoramento: 0 },
        {
          id: 9,
          nome: "Bracelete de vigor P",
          tipo: "VIGOR",
          preco: 40,
          aprimoramento: 3,
        },
      ],
      nivel: 1,
      dinheiro: 199960,
      vida: 5,
      vigor: 1,
      dano: 4,
    };

    const item = {
      id: 9,
      nome: "Bracelete de vigor P",
      tipo: "VIGOR",
      preco: 40,
      aprimoramento: 3,
    };

    const jogadorPosCompra = comprarItem(jogador, personagem, item);

    expect(jogadorPosCompra.personagens[0]).toEqual(resultadoEsperado);
  });

  it("Deve conseguir comprar um item do tipo DANO com sucesso", () => {
    const resultadoEsperado = {
      nome: "Personagem base",
      raca: {
        id: 1,
        raca: "Elfo Sangrento",
        danoBase: 4,
        vidaBase: 5,
        vigorBase: 1,
        tipo: "NORMAL",
      },
      equipamentos: [
        { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
        {
          id: 2,
          nome: "Espada longa",
          tipo: "DANO",
          preco: 90,
          aprimoramento: 7,
        },
        { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
      ],
      nivel: 1,
      dinheiro: 199910,
      vida: 5,
      vigor: 1,
      dano: 4,
    };

    const item = {
      id: 2,
      nome: "Espada longa",
      tipo: "DANO",
      preco: 90,
      aprimoramento: 7,
    };

    const jogadorPosCompra = comprarItem(jogador, personagem, item);

    expect(jogadorPosCompra.personagens[0]).toEqual(resultadoEsperado);
  });

  it("Deve conseguir comprar um item do tipo VIDA com sucesso", () => {
    const resultadoEsperado = {
      nome: "Personagem base",
      raca: {
        id: 1,
        raca: "Elfo Sangrento",
        danoBase: 4,
        vidaBase: 5,
        vigorBase: 1,
        tipo: "NORMAL",
      },
      equipamentos: [
        {
          id: 5,
          nome: "Talismã de vida P",
          tipo: "VIDA",
          preco: 40,
          aprimoramento: 3,
        },
        { id: "", nome: "", tipo: "DANO", preco: "", aprimoramento: 0 },
        { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
      ],
      nivel: 1,
      dinheiro: 199960,
      vida: 5,
      vigor: 1,
      dano: 4,
    };

    const item = {
      id: 5,
      nome: "Talismã de vida P",
      tipo: "VIDA",
      preco: 40,
      aprimoramento: 3,
    };

    const jogadorPosCompra = comprarItem(jogador, personagem, item);

    expect(jogadorPosCompra.personagens[0]).toEqual(resultadoEsperado);
  });

  it("Deve conseguir comprar um item do tipo EXPANSAO com sucesso", () => {
    const resultadoEsperado = {
      personagens: [
        {
          nome: "Personagem base",
          raca: {
            id: 1,
            raca: "Elfo Sangrento",
            danoBase: 4,
            vidaBase: 5,
            vigorBase: 1,
            tipo: "NORMAL",
          },
          equipamentos: [
            { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
            { id: "", nome: "", tipo: "DANO", preco: "", aprimoramento: 0 },
            { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
          ],
          nivel: 1,
          dinheiro: 0,
          vida: 5,
          vigor: 1,
          dano: 4,
        },
        {
          nome: "Personagem base dois",
          raca: {
            id: 1,
            raca: "Elfo Sangrento",
            danoBase: 4,
            vidaBase: 5,
            vigorBase: 1,
            tipo: "NORMAL",
          },
          equipamentos: [
            { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
            { id: "", nome: "", tipo: "DANO", preco: "", aprimoramento: 0 },
            { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
          ],
          nivel: 27,
          dinheiro: 40000,
          vida: 5,
          vigor: 1,
          dano: 4,
        },
      ],
      expansoes: [1, 2, 3, 7],
    };

    const personagemEmJogo = jogador.personagens[0];
    const expansao = {
      id: 20,
      nome: "Battle for Azeroth",
      idExpansao: 7,
      tipo: "EXPANSAO",
      preco: 200000,
    };

    const jogadorPosComprarExpansao = comprarExpansao(
      jogador,
      personagemEmJogo,
      expansao
    );
    expect(jogadorPosComprarExpansao).toEqual(resultadoEsperado);
  });

  it("Nao deve conseguir comprar expansão por nao ter dinheiro suficiente", ()=>{
    const personagemTeste = jogador.personagens[1]
    const expansao = {
      id: 20,
      nome: "Battle for Azeroth",
      idExpansao: 7,
      tipo: "EXPANSAO",
      preco: 200000,
    };
    const jogadorPosTentativaDeCompra = comprarExpansao(jogador, personagem, expansao)
    const personagemPosTentativa = jogadorPosTentativaDeCompra.personagens[1]

    expect(personagemPosTentativa).toEqual(personagemTeste)
  })
});

describe("Testes da loja mais especificos", () => {
  it("Deve conseguir comprar um equipamento de alguma expansão apenas se já tiver obtido a expansão", () => {
    const personagemDahora = jogador.personagens[1]
    const item = {
        "id": 13,
        "nome": "Glaives do Illidan",
        "tipo": "DANO",
        "preco": 200,
        "aprimoramento": 20,
        "lvlMinimo": 10,
        "idExpansao": 1
      }
    const resultadoEsperado = {
        nome: "Personagem base dois",
        raca: {
          id: 1,
          raca: "Elfo Sangrento",
          danoBase: 4,
          vidaBase: 5,
          vigorBase: 1,
          tipo: "NORMAL",
        },
        equipamentos: [
          { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
          {
            "id": 13,
            "nome": "Glaives do Illidan",
            "tipo": "DANO",
            "preco": 200,
            "aprimoramento": 20,
            "lvlMinimo": 10,
            "idExpansao": 1
          },
          { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
        ],
        nivel: 27,
        dinheiro: 39800,
        vida: 5,
        vigor: 1,
        dano: 4,
      }
      const jogadorPosCompra = comprarItem(jogador, personagemDahora, item);

      expect(jogadorPosCompra.personagens[1]).toEqual(resultadoEsperado);

  });

  it("NAO deve conseguir comprar um equipamento de alguma expansão apenas se já tiver obtido a expansão", () => {
    const item = {
        "id": 13,
        "nome": "Glaives do Illidan",
        "tipo": "DANO",
        "preco": 200,
        "aprimoramento": 20,
        "lvlMinimo": 10,
        "idExpansao": 1
      }
    const resultadoEsperado = {
        nome: "Personagem base",
        raca: {
          id: 1,
          raca: "Elfo Sangrento",
          danoBase: 4,
          vidaBase: 5,
          vigorBase: 1,
          tipo: "NORMAL",
        },
        equipamentos: [
          { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
          { id: "", nome: "", tipo: "DANO", preco: "", aprimoramento: 0 },
          { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
        ],
        nivel: 1,
        dinheiro: 200000,
        vida: 5,
        vigor: 1,
        dano: 4,
      }
      const jogadorPosCompra = comprarItem(jogador, personagem, item);

      expect(jogadorPosCompra.personagens[0]).toEqual(resultadoEsperado);
  });

  it("Deve conseguir vender um item e receber metade do preço de volta", () => {
    const personagemParaVenda = {
      nome: "Personagem base",
      raca: {
        id: 1,
        raca: "Elfo Sangrento",
        danoBase: 4,
        vidaBase: 5,
        vigorBase: 1,
        tipo: "NORMAL",
      },
      equipamentos: [
        { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
        {
          id: "88",
          nome: "sei la",
          tipo: "DANO",
          preco: "200",
          aprimoramento: "2",
        },
        { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
      ],
      nivel: 1,
      dinheiro: 2000,
      vida: 5,
      vigor: 1,
      dano: 4,
    };

    const resultadoEsperado = {
      nome: "Personagem base",
      raca: {
        id: 1,
        raca: "Elfo Sangrento",
        danoBase: 4,
        vidaBase: 5,
        vigorBase: 1,
        tipo: "NORMAL",
      },
      equipamentos: [
        { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
        { id: "", nome: "", tipo: "DANO", preco: "", aprimoramento: 0 },
        { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
      ],
      nivel: 1,
      dinheiro: 2100,
      vida: 5,
      vigor: 1,
      dano: 4,
    };

    const itemVendido = {
      id: "88",
      nome: "sei la",
      tipo: "DANO",
      preco: "200",
      aprimoramento: "2",
    };

    const personagemPosVenda = venderItem(personagemParaVenda, itemVendido);

    expect(personagemPosVenda).toEqual(resultadoEsperado);
  });

  it("Deve substituir um item equipado se o item recém comprado for do mesmo tipo que o que já está sendo usado", () => {
    const personagemComItem = {
      nome: "Personagem base",
      raca: {
        id: 1,
        raca: "Elfo Sangrento",
        danoBase: 4,
        vidaBase: 5,
        vigorBase: 1,
        tipo: "NORMAL",
      },
      equipamentos: [
        { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
        {
          id: "88",
          nome: "sei la",
          tipo: "DANO",
          preco: "200",
          aprimoramento: "2",
        },
        { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
      ],
      nivel: 1,
      dinheiro: 2000,
      vida: 5,
      vigor: 1,
      dano: 4,
    };

    const resultadoEsperado = {
      nome: "Personagem base",
      raca: {
        id: 1,
        raca: "Elfo Sangrento",
        danoBase: 4,
        vidaBase: 5,
        vigorBase: 1,
        tipo: "NORMAL",
      },
      equipamentos: [
        { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
        {
          id: 13,
          nome: "Glaives do Illidan",
          tipo: "DANO",
          preco: 200,
          aprimoramento: 20,
        },
        { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
      ],
      nivel: 1,
      dinheiro: 1900,
      vida: 5,
      vigor: 1,
      dano: 4,
    };

    const itemASerComprado = {
      id: 13,
      nome: "Glaives do Illidan",
      tipo: "DANO",
      preco: 200,
      aprimoramento: 20,
    };


    const jogadorPosCompra = comprarItem(jogador, personagemComItem, itemASerComprado);

    expect(jogadorPosCompra.personagens[0]).toEqual(resultadoEsperado);
  });

  it("Deve validar o nível do personagem para permitir a venda de itens com um nível mínimo necessário", () => {
    const personagemParaVenda = {
      nome: "Personagem base",
      raca: {
        id: 1,
        raca: "Elfo Sangrento",
        danoBase: 4,
        vidaBase: 5,
        vigorBase: 1,
        tipo: "NORMAL",
      },
      equipamentos: [
        { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
        {
          id: 13,
          nome: "Glaives do Illidan",
          tipo: "DANO",
          preco: 200,
          aprimoramento: 20,
          lvlMinimo: 10,
          idExpansao: 1,
        },
        { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
      ],
      nivel: 18,
      dinheiro: 2000,
      vida: 5,
      vigor: 1,
      dano: 4,
    };

    const resultadoEsperado = {
      nome: "Personagem base",
      raca: {
        id: 1,
        raca: "Elfo Sangrento",
        danoBase: 4,
        vidaBase: 5,
        vigorBase: 1,
        tipo: "NORMAL",
      },
      equipamentos: [
        { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
        { id: "", nome: "", tipo: "DANO", preco: "", aprimoramento: 0 },
        { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
      ],
      nivel: 18,
      dinheiro: 2100,
      vida: 5,
      vigor: 1,
      dano: 4,
    };

    const itemVendido = {
      id: "88",
      nome: "sei la",
      tipo: "DANO",
      preco: "200",
      aprimoramento: "2",
    };

    const personagemPosVenda = venderItem(personagemParaVenda, itemVendido);

    expect(personagemPosVenda).toEqual(resultadoEsperado);
  });
});

