export class TiposMovimento {

  private _idTm: number;
  private _descricao: string;
  private _tipo: number;
  private _codigoCertificadora: number;
  private _status: number;
  private _brincoEletronico: number;
  private _incluiSisbov: number;
  private _pesaAnimal: number;
  private _sanitario: number;
  private _vinculaLote: number;
  private _vinculaArea: number;
  private _tipoSaida: number;
  private _tipoEntrada: number;
  private _dataIntegracao: Date;

  constructor() {
  }

  get idTm(): number {
    return this._idTm;
  }

  set idTm(value: number) {
    this._idTm = value;
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

  get codigoCertificadora(): number {
    return this._codigoCertificadora;
  }

  set codigoCertificadora(value: number) {
    this._codigoCertificadora = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get brincoEletronico(): number {
    return this._brincoEletronico;
  }

  set brincoEletronico(value: number) {
    this._brincoEletronico = value;
  }

  get incluiSisbov(): number {
    return this._incluiSisbov;
  }

  set incluiSisbov(value: number) {
    this._incluiSisbov = value;
  }

  get pesaAnimal(): number {
    return this._pesaAnimal;
  }

  set pesaAnimal(value: number) {
    this._pesaAnimal = value;
  }

  get sanitario(): number {
    return this._sanitario;
  }

  set sanitario(value: number) {
    this._sanitario = value;
  }

  get vinculaLote(): number {
    return this._vinculaLote;
  }

  set vinculaLote(value: number) {
    this._vinculaLote = value;
  }

  get vinculaArea(): number {
    return this._vinculaArea;
  }

  set vinculaArea(value: number) {
    this._vinculaArea = value;
  }

  get tipoSaida(): number {
    return this._tipoSaida;
  }

  set tipoSaida(value: number) {
    this._tipoSaida = value;
  }

  get tipoEntrada(): number {
    return this._tipoEntrada;
  }

  set tipoEntrada(value: number) {
    this._tipoEntrada = value;
  }

  get dataIntegracao(): Date {
    return this._dataIntegracao;
  }

  set dataIntegracao(value: Date) {
    this._dataIntegracao = value;
  }
}
