export class TiposMovimento {

  private _codigo: number;
  private _descricao: string;
  private _tipo: number;
  private _cdCert: number;
  private _status: number;
  private _brelet: number;
  private _idTfsb: number;
  private _pesani: number;
  private _trasan: number;
  private _vclote: number;
  private _vcarea: number;
  private _tpsaid: number;
  private _tpentr: number;


  constructor(codigo?: number, descricao?: string, tipo?: number, cdCert?: number, status?: number, brelet?: number, idTfsb?: number, pesani?: number, trasan?: number, vclote?: number, vcarea?: number, tpsaid?: number, tpentr?: number) {
    this._codigo = codigo;
    this._descricao = descricao;
    this._tipo = tipo;
    this._cdCert = cdCert;
    this._status = status;
    this._brelet = brelet;
    this._idTfsb = idTfsb;
    this._pesani = pesani;
    this._trasan = trasan;
    this._vclote = vclote;
    this._vcarea = vcarea;
    this._tpsaid = tpsaid;
    this._tpentr = tpentr;
  }

  get codigo(): number {
    return this._codigo;
  }

  set codigo(value: number) {
    this._codigo = value;
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

  get cdCert(): number {
    return this._cdCert;
  }

  set cdCert(value: number) {
    this._cdCert = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get brelet(): number {
    return this._brelet;
  }

  set brelet(value: number) {
    this._brelet = value;
  }

  get idTfsb(): number {
    return this._idTfsb;
  }

  set idTfsb(value: number) {
    this._idTfsb = value;
  }

  get pesani(): number {
    return this._pesani;
  }

  set pesani(value: number) {
    this._pesani = value;
  }

  get trasan(): number {
    return this._trasan;
  }

  set trasan(value: number) {
    this._trasan = value;
  }

  get vclote(): number {
    return this._vclote;
  }

  set vclote(value: number) {
    this._vclote = value;
  }

  get vcarea(): number {
    return this._vcarea;
  }

  set vcarea(value: number) {
    this._vcarea = value;
  }

  get tpsaid(): number {
    return this._tpsaid;
  }

  set tpsaid(value: number) {
    this._tpsaid = value;
  }

  get tpentr(): number {
    return this._tpentr;
  }

  set tpentr(value: number) {
    this._tpentr = value;
  }

}
