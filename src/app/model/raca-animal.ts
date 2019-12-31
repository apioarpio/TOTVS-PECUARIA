export class RacaAnimal {

  private _idRacaAnimal: number;
  private _descricao: string;
  private _tipo: number;
  private _codigoReduzido: string;
  private _status: number;
  private _dataAtualizacao: Date;
  private _deletado: string;
  private _dataSincornizacao: Date;

  constructor() {

  }

  public createRacaAnimal(idRacaAnimal, descricao, tipo, codigoReduzido, status, dataAtualizacao, deletado): RacaAnimal {
    this.idRacaAnimal = idRacaAnimal;
    this.descricao = descricao;
    this.tipo = tipo;
    this.codigoReduzido = codigoReduzido;
    this.status = status;
    this.dataAtualizacao = dataAtualizacao;
    this.deletado = deletado;
    return this
  }

  public getRacaAnimalObject() {
    return {
      idRacaAnimal: this.idRacaAnimal,
      descricao: this.descricao,
      tipo: this.tipo,
      codigoReduzido: this.codigoReduzido,
      status: this.status,
      dataAtualizacao: this.dataAtualizacao,
      deletado: this.deletado
    }
  }

  get idRacaAnimal(): number {
    return this._idRacaAnimal;
  }

  set idRacaAnimal(value: number) {
    this._idRacaAnimal = value;
  }

  get descricao(): string {
    return this._descricao;
  }

  set descricao(value: string) {
    this._descricao = value;
  }

  get tipo(): number {
    return this._tipo;
  }

  set tipo(value: number) {
    this._tipo = value;
  }

  get codigoReduzido(): string {
    return this._codigoReduzido;
  }

  set codigoReduzido(value: string) {
    this._codigoReduzido = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get dataAtualizacao(): Date {
    return this._dataAtualizacao;
  }

  set dataAtualizacao(value: Date) {
    this._dataAtualizacao = value;
  }

  get deletado(): string {
    return this._deletado;
  }

  set deletado(value: string) {
    this._deletado = value;
  }

  get dataSincornizacao(): Date {
    return this._dataSincornizacao;
  }

  set dataSincornizacao(value: Date) {
    this._dataSincornizacao = value;
  }
}
