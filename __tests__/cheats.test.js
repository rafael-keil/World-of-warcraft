import { cheatsJogador, cheatsPersonagem } from "../src/cheats";
import { criarPersonagem } from "../src/personagem";

let PERSONAGEM, JOGADOR;
beforeAll(() => {
  PERSONAGEM = criarPersonagem("Personagem1", {
    id: 1,
    raca: "Elfo Sangrento",
    danoBase: 4,
    vidaBase: 5,
    vigorBase: 1,
    tipo: "NORMAL",
  });
  JOGADOR = [PERSONAGEM,{...PERSONAGEM, dinheiro:1, nivel: 5}]
});

describe("Cheats de Personagem", () => {
  it("Deve conseguir aplicar o cheat ZORZARTHAS e receber o item Talismã Indexado", () => {
    const equipamentoEsperado = {
      nome: "Talismã Indexado",
      tipo: "VIDA",
      aprimoramento: "2000",
      preco: "",
    };
    const novoPersonagem = cheatsPersonagem("ZORZARTHAS", PERSONAGEM).novoPersonagem;
    expect(novoPersonagem.equipamentos[0]).toEqual(equipamentoEsperado);
  });
  it("Deve conseguir aplicar o cheat DIANDRAKA e receber o item Talismã Indexado", () => {
    const equipamentoEsperado = {
      nome: "Talismã Indexado",
      tipo: "VIDA",
      aprimoramento: "2000",
      preco: "",
    };
    const novoPersonagem = cheatsPersonagem("DIANDRAKA", PERSONAGEM).novoPersonagem;
    expect(novoPersonagem.equipamentos[0]).toEqual(equipamentoEsperado);
  });  
  it("Deve conseguir aplicar o cheat SERGIORGRIM e receber o item Armadura de Flexbox", () => {
    const equipamentoEsperado = {
      nome: "Armadura de Flexbox",
      tipo: "VIGOR",
      aprimoramento: "2000",
      preco: "",
    };
    const novoPersonagem = cheatsPersonagem("SERGIORGRIM", PERSONAGEM).novoPersonagem;
    expect(novoPersonagem.equipamentos[2]).toEqual(equipamentoEsperado);
  });
  it("Deve conseguir aplicar o cheat KEVINERZUL e receber o item Arco do callback infinito", () => {
    const equipamentoEsperado = {
      nome: "Arco do callback infinito",
      tipo: "DANO",
      aprimoramento: "2000",
      preco: "",
    };
    const novoPersonagem = cheatsPersonagem("KEVINERZUL", PERSONAGEM).novoPersonagem;
    expect(novoPersonagem.equipamentos[1]).toEqual(equipamentoEsperado);
  });
  it("Deve conseguir aplicar o cheat FABYOGGSARON e receber o item Talismã do Polimorfismo", () => {
    const equipamentoEsperado = {
      nome: "Talismã do Polimorfismo",
      tipo: "VIDA",
      aprimoramento: "2000",
      preco: "",
    };
    const novoPersonagem = cheatsPersonagem("FABYOGGSARON", PERSONAGEM).novoPersonagem;
    expect(novoPersonagem.equipamentos[0]).toEqual(equipamentoEsperado);
  });
  it("Deve conseguir aplicar o cheat PABLOTHAR e receber o item Talismã do Polimorfismo", () => {
    const equipamentoEsperado = {
      nome: "Talismã do Polimorfismo",
      tipo: "VIDA",
      aprimoramento: "2000",
      preco: "",
    };
    const novoPersonagem = cheatsPersonagem("PABLOTHAR", PERSONAGEM).novoPersonagem;
    expect(novoPersonagem.equipamentos[0]).toEqual(equipamentoEsperado);
  });
  it("Deve conseguir aplicar o cheat VITOREXXAR e receber o item Talismã do Polimorfismo", () => {
    const equipamentoEsperado = {
      nome: "Talismã do Polimorfismo",
      tipo: "VIDA",
      aprimoramento: "2000",
      preco: "",
    };
    const novoPersonagem = cheatsPersonagem("VITOREXXAR", PERSONAGEM).novoPersonagem;
    expect(novoPersonagem.equipamentos[0]).toEqual(equipamentoEsperado);
  });
  it("Deve conseguir aplicar o cheat WILLIDAN e subir +20 níveis do personagem selecionado", () => {
    const nivelEsperado =  21;
    const novoPersonagem = cheatsPersonagem("WILLIDAN", PERSONAGEM).novoPersonagem;
    expect(novoPersonagem.nivel).toBe(nivelEsperado);
  });
  it("Deve conseguir aplicar o cheat GUSTHRALL e dar +2000 de dinheiro para o personagem selecionado", () => {
    const dinheiroEsperado =  2000;    
    const novoPersonagem = cheatsPersonagem("GUSTHRALL", PERSONAGEM).novoPersonagem;
    expect(novoPersonagem.dinheiro).toBe(dinheiroEsperado);
  });
});

describe("Cheats de Jogador", () => {
  it("Deve conseguir aplicar o cheat ANDUINNUNES e dar +20000 de dinheiro para todos os personagens", () => {
    const dinheiroEsperado =  20000;
    const dinheiroEsperado2 =  20001;
    const novoJogador = cheatsJogador("ANDUINNUNES", JOGADOR).novosPersonagens;
    expect(novoJogador[0].dinheiro).toBe(dinheiroEsperado);
    expect(novoJogador[1].dinheiro).toBe(dinheiroEsperado2);
  });

  it("Deve conseguir aplicar o cheat JULICHKING e subir +5 níveis de todos os personagens", () => {
    const nivelEsperado =  6;
    const nivelEsperado2 =  10;
    const novoJogador = cheatsJogador("JULICHKING", JOGADOR).novosPersonagens;
    expect(novoJogador[0].nivel).toBe(nivelEsperado);
    expect(novoJogador[1].nivel).toBe(nivelEsperado2);
  });
});

describe("Cheats foi ativado", () => {
  it("Deve retornar false se não for valido Jogador", () => {
    const novoJogador = cheatsJogador("ANDNUNES", JOGADOR).cheatDeJogadorAtivado;
    expect(novoJogador).toBeFalsy();
  });
  it("Deve retornar true se for valido Jogador", () => {
    const novoJogador = cheatsJogador("JULICHKING", JOGADOR).cheatDeJogadorAtivado;
    expect(novoJogador).toBeTruthy();
  });
  it("Deve retornar false se não for valido personagem", () => {
    const novoPersonagem = cheatsPersonagem("WIDAN", PERSONAGEM).cheatDePersonagemAtivado;
    expect(novoPersonagem).toBeFalsy();
  });
  it("Deve retornar true se for valido Personagem", () => {
    const novoPersonagem = cheatsPersonagem("GUSTHRALL", PERSONAGEM).cheatDePersonagemAtivado;
    expect(novoPersonagem).toBeTruthy();
  });
});