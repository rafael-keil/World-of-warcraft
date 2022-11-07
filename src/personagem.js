export { criarPersonagem, subirNivel };

function criarPersonagem(nome, raca) {
  let personagem = {
    nome: nome,
    // 0: VIDA, 1: DANO, 2: VIGOR
    equipamentos: [
      { id: "", nome: "", tipo: "VIDA", preco: "", aprimoramento: 0 },
      { id: "", nome: "", tipo: "DANO", preco: "", aprimoramento: 0 },
      { id: "", nome: "", tipo: "VIGOR", preco: "", aprimoramento: 0 },
    ],
    dinheiro: 0,
    raca: { ...raca },
    vida: raca.vidaBase,
    vigor: raca.vigorBase,
    dano: raca.danoBase,
    nivel: 1,
  };
  if (raca.tipo === "ALIADA") {
    personagem = subirNivel(personagem,9)
  }
  return personagem;
}

function subirNivel(personagem, qtNiveis = 1) {
  const novoPersonagem = { ...personagem };
  for (let i = 0; i < qtNiveis; i++) {
    novoPersonagem.nivel++;
    if (novoPersonagem.nivel % 2 === 1) {
      novoPersonagem.vida += 2;
      novoPersonagem.vigor += 1;
    }
  }
  return novoPersonagem;
}
