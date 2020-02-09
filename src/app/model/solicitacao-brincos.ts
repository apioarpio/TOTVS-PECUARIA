export class SolicitacaoBrincos {

  private _id: number;
  private _idFazenda: number;
  private _sisbovInicial: number;
  private _sisbovFinal: number;
  private _quantidadeSisbov: number;
  private _deletado: boolean;
  private _idFornecedor: number;
  private _status: number;
  private _serie: string;
  private _lojaFornecedor: string;
  private _nota: string;
  private _dataSolicitacao: Date;
  private _dataValidate: Date;
  private _dataAtualizacaoProtheus: Date;

  constructor() {
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get idFazenda(): number {
    return this._idFazenda;
  }

  set idFazenda(value: number) {
    this._idFazenda = value;
  }

  get sisbovInicial(): number {
    return this._sisbovInicial;
  }

  set sisbovInicial(value: number) {
    this._sisbovInicial = value;
  }

  get sisbovFinal(): number {
    return this._sisbovFinal;
  }

  set sisbovFinal(value: number) {
    this._sisbovFinal = value;
  }

  get quantidadeSisbov(): number {
    return this._quantidadeSisbov;
  }

  set quantidadeSisbov(value: number) {
    this._quantidadeSisbov = value;
  }

  get deletado(): boolean {
    return this._deletado;
  }

  set deletado(value: boolean) {
    this._deletado = value;
  }

  get idFornecedor(): number {
    return this._idFornecedor;
  }

  set idFornecedor(value: number) {
    this._idFornecedor = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get serie(): string {
    return this._serie;
  }

  set serie(value: string) {
    this._serie = value;
  }

  get lojaFornecedor(): string {
    return this._lojaFornecedor;
  }

  set lojaFornecedor(value: string) {
    this._lojaFornecedor = value;
  }

  get nota(): string {
    return this._nota;
  }

  set nota(value: string) {
    this._nota = value;
  }

  get dataSolicitacao(): Date {
    return this._dataSolicitacao;
  }

  set dataSolicitacao(value: Date) {
    this._dataSolicitacao = value;
  }

  get dataValidate(): Date {
    return this._dataValidate;
  }

  set dataValidate(value: Date) {
    this._dataValidate = value;
  }

  get dataAtualizacaoProtheus(): Date {
    return this._dataAtualizacaoProtheus;
  }

  set dataAtualizacaoProtheus(value: Date) {
    this._dataAtualizacaoProtheus = value;
  }
}
