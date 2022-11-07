export function comprarItem(jogador, personagemJogando, item) {
  let personagemRetorno = { ...personagemJogando };
  const jogadorRetorno = { ...jogador };

  if (
    (!item.idExpansao ||
      (jogador.expansoes.includes(item.idExpansao) &&
        (!item.lvlMinimo || personagemJogando.nivel >= item.lvlMinimo))) &&
    personagemRetorno.dinheiro >= item.preco
  ) {
    personagemRetorno = {
      ...personagemRetorno,
      dinheiro: personagemJogando.dinheiro - item.preco,
    };

    personagemRetorno.equipamentos.forEach((equipamento, index) => {
      if (equipamento.tipo == item.tipo) {
        personagemRetorno = venderItem(personagemRetorno, equipamento);
        personagemRetorno.equipamentos[index] = item;
      }
    });
  }

  jogadorRetorno.personagens.forEach((personagem, index) => {
    if (personagem.nome == personagemJogando.nome) {
      jogadorRetorno.personagens[index] = personagemRetorno;
    }
  });

  return jogadorRetorno;
}

export function comprarExpansao(jogador, personagemJogando, expansao) {
  let personagemRetorno = JSON.parse(JSON.stringify(personagemJogando));
  const jogadorRetorno = { ...jogador };
  if (personagemRetorno.dinheiro >= expansao.preco) {
    personagemRetorno = {
      ...personagemJogando,
      dinheiro: personagemJogando.dinheiro - expansao.preco,
    };
    jogadorRetorno.personagens.forEach((personagem, index) => {
      if (personagem == personagemJogando) {
        jogadorRetorno.personagens[index] = personagemRetorno;
      }
    });

    jogadorRetorno.expansoes.push(expansao.idExpansao);
  }
  return jogadorRetorno;
}

export function venderItem(personagem, item) {
  let personagemRetorno = { ...personagem };

  if (!item.lvlMinimo || personagem.nivel >= item.lvlMinimo) {
    personagemRetorno = {
      ...personagem,
      dinheiro: personagem.dinheiro + item.preco / 2,
    };
    personagemRetorno.equipamentos.forEach((equipamento, index) => {
      if (equipamento.tipo == item.tipo) {
        personagemRetorno.equipamentos[index] = {
          id: "",
          nome: "",
          tipo: equipamento.tipo,
          preco: "",
          aprimoramento: 0,
        };
      }
    });
  }

  return personagemRetorno;
}
