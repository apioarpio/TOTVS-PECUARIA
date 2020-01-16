export class Area {

  private _idArea: number;
  private _idFazenda: number;
  private _nome: string;
  private _tamanhoHectares: number;
  private _status: number;
  private _caracteristicas: number;
  private _quantidadeAnimais: number;
  private _tipo: string;
  private _dataSincronizacao: Date;
  private _dataAtualizacaoProtheus: Date;
  private _integrado: boolean;
  private _deletado: boolean;

  constructor() {

  }


  get idArea(): number {
    return this._idArea;
  }

  set idArea(value: number) {
    this._idArea = value;
  }

  get idFazenda(): number {
    return this._idFazenda;
  }

  set idFazenda(value: number) {
    this._idFazenda = value;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(value: string) {
    this._nome = value;
  }

  get tamanhoHectares(): number {
    return this._tamanhoHectares;
  }

  set tamanhoHectares(value: number) {
    this._tamanhoHectares = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get caracteristicas(): number {
    return this._caracteristicas;
  }

  set caracteristicas(value: number) {
    this._caracteristicas = value;
  }

  get tipo(): string {
    return this._tipo;
  }

  set tipo(value: string) {
    this._tipo = value;
  }

  get dataSincronizacao(): Date {
    return this._dataSincronizacao;
  }

  set dataSincronizacao(value: Date) {
    this._dataSincronizacao = value;
  }

  get integrado(): boolean {
    return this._integrado;
  }

  set integrado(value: boolean) {
    this._integrado = value;
  }

  get deletado(): boolean {
    return this._deletado;
  }

  set deletado(value: boolean) {
    this._deletado = value;
  }


  get quantidadeAnimais(): number {
    return this._quantidadeAnimais;
  }

  set quantidadeAnimais(value: number) {
    this._quantidadeAnimais = value;
  }

  get dataAtualizacaoProtheus(): Date {
    return this._dataAtualizacaoProtheus;
  }

  set dataAtualizacaoProtheus(value: Date) {
    this._dataAtualizacaoProtheus = value;
  }
}
