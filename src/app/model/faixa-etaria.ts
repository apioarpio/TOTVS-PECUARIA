export class FaixaEtaria {

  private _id: number;
  private _descricao: string;
  private _inicio: number;
  private _fim: number;
  private _deletado: string;
  private _dataSincronizacao: Date;

  constructor() {
    
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get descricao(): string {
    return this._descricao;
  }

  set descricao(value: string) {
    this._descricao = value;
  }

  get inicio(): number {
    return this._inicio;
  }

  set inicio(value: number) {
    this._inicio = value;
  }

  get fim(): number {
    return this._fim;
  }

  set fim(value: number) {
    this._fim = value;
  }

  get deletado(): string {
    return this._deletado;
  }

  set deletado(value: string) {
    this._deletado = value;
  }

  get dataSincronizacao(): Date {
    return this._dataSincronizacao;
  }

  set dataSincronizacao(value: Date) {
    this._dataSincronizacao = value;
  }
}
