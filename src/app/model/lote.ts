export class Lote {

  private _idLote: number;
  private _idFazenda: number;
  private _idArea: number;
  private _nome: string;
  private _tipoLote: string;
  private _status: string;
  private _quantidadeAnimais: number;
  private _ano: number;
  private _mes: number;
  private _sexo: number;
  private _observacao: string;
  private _dataAtualizacao: Date;
  private _integrado: boolean;
  private _deletado: boolean;

  constructor() {

  }

  get idLote(): number {
    return this._idLote;
  }

  set idLote(value: number) {
    this._idLote = value;
  }

  get idFazenda(): number {
    return this._idFazenda;
  }

  set idFazenda(value: number) {
    this._idFazenda = value;
  }

  get idArea(): number {
    return this._idArea;
  }

  set idArea(value: number) {
    this._idArea = value;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(value: string) {
    this._nome = value;
  }

  get tipoLote(): string {
    return this._tipoLote;
  }

  set tipoLote(value: string) {
    this._tipoLote = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get quantidadeAnimais(): number {
    return this._quantidadeAnimais;
  }

  set quantidadeAnimais(value: number) {
    this._quantidadeAnimais = value;
  }

  get ano(): number {
    return this._ano;
  }

  set ano(value: number) {
    this._ano = value;
  }

  get mes(): number {
    return this._mes;
  }

  set mes(value: number) {
    this._mes = value;
  }

  get sexo(): number {
    return this._sexo;
  }

  set sexo(value: number) {
    this._sexo = value;
  }

  get observacao(): string {
    return this._observacao;
  }

  set observacao(value: string) {
    this._observacao = value;
  }

  get dataAtualizacao(): Date {
    return this._dataAtualizacao;
  }

  set dataAtualizacao(value: Date) {
    this._dataAtualizacao = value;
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
}
