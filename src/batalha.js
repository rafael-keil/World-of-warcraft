import { getVida, getDano, getVigor } from "./equipamentos";
import { subirNivel } from "./personagem";
export { batalha, turno };

function batalha(personagem1, personagem2, random) {
  // pegando dados do personagem (base mais item)
  const p1Vida = getVida(personagem1);
  const p1Dano = getDano(personagem1);
  const p1Vigor = getVigor(personagem1);

  const p2Vida = getVida(personagem2);
  const p2Dano = getDano(personagem2);
  const p2Vigor = getVigor(personagem2);

  // caso de impate
  if (p1Vigor >= p2Dano && p2Vigor >= p1Dano) {
    return "Empate";
  }

  // aleatório quem começa
  if (random >= 0.5) {
    return turno(
      personagem1,
      p1Vida,
      p1Dano,
      p1Vigor,
      personagem2,
      p2Vida,
      p2Dano,
      p2Vigor
    );
  } else {
    return turno(
      personagem2,
      p2Vida,
      p2Dano,
      p2Vigor,
      personagem1,
      p1Vida,
      p1Dano,
      p1Vigor
    );
  }
}

function turno(
  personagem1,
  p1Vida,
  p1Dano,
  p1Vigor,
  personagem2,
  p2Vida,
  p2Dano,
  p2Vigor
) {
  // dano da rodada
  p2Vida = p2Vida - (p1Dano - p2Vigor);

  // nova rodada trocando a ordem dos jogadores ou definindo vencedor
  if (p2Vida <= 0) {
    return subirNivel(personagem1);
  } else {
    return turno(
      personagem2,
      p2Vida,
      p2Dano,
      p2Vigor,
      personagem1,
      p1Vida,
      p1Dano,
      p1Vigor
    );
  }
}
