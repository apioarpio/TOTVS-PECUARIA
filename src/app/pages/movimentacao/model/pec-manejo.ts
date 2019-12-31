export class PecManejo {

  private _codManejo;
  private _codTM;
  private _descTM;
  private _status;
  private _qtdAnimais;

  constructor() {

  }


  get codManejo() {
    return this._codManejo;
  }

  set codManejo(value) {
    this._codManejo = value;
  }

  get codTM() {
    return this._codTM;
  }

  set codTM(value) {
    this._codTM = value;
  }

  get descTM() {
    return this._descTM;
  }

  set descTM(value) {
    this._descTM = value;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get qtdAnimais() {
    return this._qtdAnimais;
  }

  set qtdAnimais(value) {
    this._qtdAnimais = value;
  }
}
