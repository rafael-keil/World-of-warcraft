import { criarPersonagem, subirNivel } from "../src/personagem";

let JOGADOR, racaNormal, racaAliada;
beforeAll(() => {
  JOGADOR = {
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
        nivel: 15,
        dinheiro: 0,
        vida: 5,
        vigor: 1,
        dano: 4,
      },
    ],
    expansoes: [5],
  };
  racaNormal ={
    "id": 1,
    "raca": "Elfo Sangrento",
    "danoBase": 4,
    "vidaBase": 5,
    "vigorBase": 1,
    "tipo": "NORMAL"
  }
  racaAliada = {
    "id": 12,
    "raca": "Troll Zandalari",
    "danoBase": 3,
    "vidaBase": 7,
    "vigorBase": 5,
    "tipo": "ALIADA",
    "lvlMinimoParaObter": 15,
    "idExpansao": 5
  }
});


describe("Criacao de personagem", () => {
  it("Personagem recém criado não deve possuir dinheiro", () => {
    const dinheiroEsperado = 0;

    const personagem = criarPersonagem("Personagem 1", racaNormal);
    expect(personagem.dinheiro).toBe(dinheiroEsperado);
  });
  it("Personagem recém criado não deve possuir equipamentos", () => {
    const equipamentosEsperado = [
      { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
      { id: "", nome: "", tipo: "DANO", preco: "", aprimoramento: 0 },
      { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
    ];

    const personagem = criarPersonagem("Personagem 1", racaNormal);
    expect(personagem.equipamentos).toEqual(equipamentosEsperado);
  });
  it("Deve conseguir criar um personagem de raça do tipo NORMAL com sucesso e ele deve estar no nível 1", () => {
    const nivelEsperado = 1;

    const personagem = criarPersonagem("Personagem 1", racaNormal);
    expect(personagem.nivel).toEqual(nivelEsperado);
  });
  it("Deve conseguir criar um personagem com raça aliada se já possuir outro personagem com o lvl mínimo necessário", () => {
    const personagemEsperado = {
      nome: "Personagem 1",
      raca: {
        id: 12,
        raca: "Troll Zandalari",
        danoBase: 3,
        vidaBase: 7,
        vigorBase: 5,
        tipo: "ALIADA",
        lvlMinimoParaObter: 15,
        idExpansao: 5,
      },
      equipamentos: [
        { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
        { id: "", nome: "", tipo: "DANO", preco: "", aprimoramento: 0 },
        { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
      ],
      nivel: 10,
      dinheiro: 0,
      vida: 15,
      vigor: 9,
      dano: 3,
      
    };

    const personagem = criarPersonagem("Personagem 1", racaAliada, JOGADOR);
    expect(personagem).toEqual(personagemEsperado);
  });
  it("Deve conseguir criar um personagem com raça de expansão se já possuir a expansão", () => {
    const personagemEsperado = {
      nome: "Personagem 1",
      raca: {
        id: 12,
        raca: "Troll Zandalari",
        danoBase: 3,
        vidaBase: 7,
        vigorBase: 5,
        tipo: "ALIADA",
        lvlMinimoParaObter: 15,
        idExpansao: 5,
      },
      equipamentos: [
        { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
        { id: "", nome: "", tipo: "DANO", preco: "", aprimoramento: 0 },
        { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
      ],
      nivel: 10,
      dinheiro: 0,
      vida: 15,
      vigor: 9,
      dano: 3,
      
    };

    const personagem = criarPersonagem("Personagem 1", racaAliada, JOGADOR);
    expect(personagem).toEqual(personagemEsperado);
  });
  it("Deve conseguir criar um personagem de raça do tipo ALIADA com sucesso e ele deve estar no nível 10", () => {
    const personagemEsperado = {
      nome: "Personagem 1",
      raca: {
        id: 12,
        raca: "Troll Zandalari",
        danoBase: 3,
        vidaBase: 7,
        vigorBase: 5,
        tipo: "ALIADA",
        lvlMinimoParaObter: 15,
        idExpansao: 5,
      },
      equipamentos: [
        { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
        { id: "", nome: "", tipo: "DANO", preco: "", aprimoramento: 0 },
        { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
      ],
      nivel: 10,
      dinheiro: 0,
      vida: 15,
      vigor: 9,
      dano: 3,
      
    };

    const personagem = criarPersonagem("Personagem 1", racaAliada, JOGADOR);
    expect(personagem).toEqual(personagemEsperado);
  });
  it("Deve receber +2 de vida e +1 de vigor ao subir dois niveis", () => {
    const nivelEsperado = 3
    const vidaEsperada = 7
    const vigorEsperado = 2
    let personagem = criarPersonagem("Personagem 1", racaNormal);
    personagem = subirNivel(personagem)
    personagem = subirNivel(personagem)
    expect(personagem.nivel).toBe(nivelEsperado);
    expect(personagem.vida).toBe(vidaEsperada);
    expect(personagem.vigor).toBe(vigorEsperado);
  });
  it("Deve receber +4 de vida e +2 de vigor ao subir quatro niveis", () => {
    const nivelEsperado = 5
    const vidaEsperada = 9
    const vigorEsperado = 3
    let personagem = criarPersonagem("Personagem 1", racaNormal);
    personagem = subirNivel(personagem, 4) 
    expect(personagem.nivel).toBe(nivelEsperado);
    expect(personagem.vida).toBe(vidaEsperada);
    expect(personagem.vigor).toBe(vigorEsperado);
  });
});
