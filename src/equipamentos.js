export { getVida, getDano, getVigor };

function getVida(personagem) {
  return personagem.vida + personagem.equipamentos[0].aprimoramento;
}

function getDano(personagem) {
  return personagem.dano + personagem.equipamentos[1].aprimoramento;
}

function getVigor(personagem) {
  return personagem.vigor + personagem.equipamentos[2].aprimoramento;
}
