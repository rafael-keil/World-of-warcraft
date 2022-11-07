import { subirNivel } from "./personagem";

export function receberRecompensasDaMissao(missao, personagem, expansoes) {
  let personagemRetorno = { ...personagem };
  if (
    missao.idExpansao == undefined ||
    missao.idExpansao == expansoes.includes(missao.idExpansao)
  ) {
    personagemRetorno = subirNivel(personagem, missao.niveisRecebidos);
    personagemRetorno = {
      ...personagemRetorno,
      dinheiro: personagem.dinheiro + missao.dinheiroRecebido,
    };
  }
  return personagemRetorno;
}
