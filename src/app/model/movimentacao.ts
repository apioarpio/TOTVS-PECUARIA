export class Movimentacao {

  id: number;
  idTm: number;
  descricaoTm: string;
  quantidadeAnimal: number;
  tipo: TipoMovimentacao; // 1 - entrada, 2 - saida, 3 - interno
  observacao: string;
  idFornecedor: number;
  nomeFantasiaFornecedor: string;
  numeroGta: number;
  serieGta: number;
  dataEmissaoGta: Date;
  dataValidadeGta: Date;
  dataSaidaGta: Date;
  dataChegadaGta: Date;
  dataCadastro: Date;

}

enum TipoMovimentacao {
  ENTRADA = 1,
  SAIDA = 2,
  INTERNO = 3
}
