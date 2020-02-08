import {TiposMovimento} from "./tipos-movimento";

export class Movimentacao {

  id: number;
  tipoMovimento: TiposMovimento;
  descricaoTm: string;
  quantidadeAnimal: number;
  tipo: TipoMovimentacao; // 1 - entrada, 2 - saida, 3 - interno
  observacao: string;
  idFornecedor: number;
  idFazenda: number;
  nomeFantasiaFornecedor: string;
  numeroGta: number;
  serieGta: number;
  dataEmissaoGta: Date;
  dataValidadeGta: Date;
  dataSaidaGta: Date;
  dataChegadaGta: Date;
  dataCadastro: Date;

}

export enum TipoMovimentacao {
  ENTRADA = 1,
  SAIDA = 2,
  INTERNO = 3
}
