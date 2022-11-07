export { cheatsJogador, cheatsPersonagem };
import { subirNivel } from "./personagem";
function cheatsPersonagem(cheat, personagem) {
  let novoPersonagem = JSON.parse(JSON.stringify(personagem));
  let ativado = true;
  switch (cheat) {
    case "WILLIDAN":
      novoPersonagem = subirNivel(novoPersonagem, 20);
      break;
    case "GUSTHRALL":
      novoPersonagem.dinheiro += 2000;
      break;
    case "KEVINERZUL":
      novoPersonagem.equipamentos[1] = {
        nome: "Arco do callback infinito",
        tipo: "DANO",
        aprimoramento: "2000",
        preco: "",
      };
      break;
    case "FABYOGGSARON":
    case "PABLOTHAR":
    case "VITOREXXAR":
      novoPersonagem.equipamentos[0] = {
        nome: "Talismã do Polimorfismo",
        tipo: "VIDA",
        aprimoramento: "2000",
        preco: "",
      };
      break;
    case "ZORZARTHAS":
    case "DIANDRAKA":
      novoPersonagem.equipamentos[0] = {
        nome: "Talismã Indexado",
        tipo: "VIDA",
        aprimoramento: "2000",
        preco: "",
      };
      break;
    case "SERGIORGRIM":
      novoPersonagem.equipamentos[2] = {
        nome: "Armadura de Flexbox",
        tipo: "VIGOR",
        aprimoramento: "2000",
        preco: "",
      };
      break;
    default:
      ativado = false;
      break;
  }
  return {cheatDePersonagemAtivado: ativado, novoPersonagem: novoPersonagem}  
}
function cheatsJogador(cheat, personagens) {
  let novosPersonagens = JSON.parse(JSON.stringify(personagens));
  let ativado = true;
  switch (cheat) {
    case "ANDUINNUNES":
      for (let i=0; i<novosPersonagens.length; i++) {
        novosPersonagens[i].dinheiro += 20000;
      }
      break;
    case "JULICHKING":
      for (let i=0; i<novosPersonagens.length; i++) {
        novosPersonagens[i] = subirNivel(novosPersonagens[i],5);        
      }
      break;
    default:
      ativado = false
      break;
  }
  return {cheatDeJogadorAtivado: ativado, novosPersonagens: novosPersonagens};
}
