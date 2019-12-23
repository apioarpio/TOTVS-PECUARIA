export class Animal {

  private _filial;
  private _sisbov;
  private _manejo;
  private _raca;
  private _sexo;
  private _dtNasc;
  private _dtSbov;
  private _fxeEra;
  private _peso;
  private _dtPsge;
  private _codFaz;
  private _codFor;
  private _numSol;
  private _dtEntr;
  private _movOri;
  private _cdRfid;
  private _lote;
  private _pasto;
  private _dtLbab;
  private _dtAbat;
  private _dlBab2;
  private _dslmrt;
  private _dtMort;
  private _ctrlws;
  private _status;
  private _dtCtht;
  private _cstrdo;
  private _dtAtua;
  private _fazOri;
  private _certif;
  private _dtCert;
  private _dtDslg;
  private _cotaht;
  private _transf;

  constructor() {

  }

  createAnimal(filial, sisbov, manejo, raca, sexo, dtNasc, dtSbov, fxeEra, peso, dtPsge, codFaz, codFor, numSol, dtEntr,
               movOri, cdRfid, lote, pasto, dtLbab, dtAbat, dlBab2, dslmrt, dtMort, ctrlws, status, dtCtht, cstrdo, dtAtua,
               fazOri, certif, dtCert, dtDslg, cotaht, transf) {

    this._filial = filial;
    this._sisbov = sisbov;
    this._manejo = manejo;
    this._raca = raca;
    this._sexo = sexo;
    this._dtNasc = dtNasc;
    this._dtSbov = dtSbov;
    this._fxeEra = fxeEra;
    this._peso = peso;
    this._dtPsge = dtPsge;
    this._codFaz = codFaz;
    this._codFor = codFor;
    this._numSol = numSol;
    this._dtEntr = dtEntr;
    this._movOri = movOri;
    this._cdRfid = cdRfid;
    this._lote = lote;
    this._pasto = pasto;
    this._dtLbab = dtLbab;
    this._dtAbat = dtAbat;
    this._dlBab2 = dlBab2;
    this._dslmrt = dslmrt;
    this._dtMort = dtMort;
    this._ctrlws = ctrlws;
    this._status = status;
    this._dtCtht = dtCtht;
    this._cstrdo = cstrdo;
    this._dtAtua = dtAtua;
    this._fazOri = fazOri;
    this._certif = certif;
    this._dtCert = dtCert;
    this._dtDslg = dtDslg;
    this._cotaht = cotaht;
    this._transf = transf;

  }

  getAnimalObject(): object {
    return {
      "filial": this._filial,
      "sisbov": this._sisbov,
      "manejo": this._manejo,
      "raca": this._raca,
      "sexo": this._sexo,
      "dtNasc": this._dtNasc,
      "dtSbov": this._dtSbov,
      "fxeEra": this._fxeEra,
      "peso": this._peso,
      "dtPsge": this._dtPsge,
      "codFaz": this._codFaz,
      "codFor": this._codFor,
      "numSol": this._numSol,
      "dtEntr": this._dtEntr,
      "movOri": this._movOri,
      "cdRfid": this._cdRfid,
      "lote": this._lote,
      "pasto": this._pasto,
      "dtLbab": this._dtLbab,
      "dtAbat": this._dtAbat,
      "dlBab2": this._dlBab2,
      "dslmrt": this._dslmrt,
      "dtMort": this._dtMort,
      "ctrlws": this._ctrlws,
      "status": this._status,
      "dtCtht": this._dtCtht,
      "cstrdo": this._cstrdo,
      "dtAtua": this._dtAtua,
      "fazOri": this._fazOri,
      "certif": this._certif,
      "dtCert": this._dtCert,
      "dtDslg": this._dtDslg,
      "cotaht": this._cotaht,
      "transf": this._transf
    }
  }

  get filial() {
    return this._filial;
  }

  set filial(value) {
    this._filial = value;
  }

  get sisbov() {
    return this._sisbov;
  }

  set sisbov(value) {
    this._sisbov = value;
  }

  get manejo() {
    return this._manejo;
  }

  set manejo(value) {
    this._manejo = value;
  }

  get raca() {
    return this._raca;
  }

  set raca(value) {
    this._raca = value;
  }

  get sexo() {
    return this._sexo;
  }

  set sexo(value) {
    this._sexo = value;
  }

  get dtNasc() {
    return this._dtNasc;
  }

  set dtNasc(value) {
    this._dtNasc = value;
  }

  get dtSbov() {
    return this._dtSbov;
  }

  set dtSbov(value) {
    this._dtSbov = value;
  }

  get fxeEra() {
    return this._fxeEra;
  }

  set fxeEra(value) {
    this._fxeEra = value;
  }

  get peso() {
    return this._peso;
  }

  set peso(value) {
    this._peso = value;
  }

  get dtPsge() {
    return this._dtPsge;
  }

  set dtPsge(value) {
    this._dtPsge = value;
  }

  get codFaz() {
    return this._codFaz;
  }

  set codFaz(value) {
    this._codFaz = value;
  }

  get codFor() {
    return this._codFor;
  }

  set codFor(value) {
    this._codFor = value;
  }

  get numSol() {
    return this._numSol;
  }

  set numSol(value) {
    this._numSol = value;
  }

  get dtEntr() {
    return this._dtEntr;
  }

  set dtEntr(value) {
    this._dtEntr = value;
  }

  get movOri() {
    return this._movOri;
  }

  set movOri(value) {
    this._movOri = value;
  }

  get cdRfid() {
    return this._cdRfid;
  }

  set cdRfid(value) {
    this._cdRfid = value;
  }

  get lote() {
    return this._lote;
  }

  set lote(value) {
    this._lote = value;
  }

  get pasto() {
    return this._pasto;
  }

  set pasto(value) {
    this._pasto = value;
  }

  get dtLbab() {
    return this._dtLbab;
  }

  set dtLbab(value) {
    this._dtLbab = value;
  }

  get dtAbat() {
    return this._dtAbat;
  }

  set dtAbat(value) {
    this._dtAbat = value;
  }

  get dlBab2() {
    return this._dlBab2;
  }

  set dlBab2(value) {
    this._dlBab2 = value;
  }

  get dslmrt() {
    return this._dslmrt;
  }

  set dslmrt(value) {
    this._dslmrt = value;
  }

  get dtMort() {
    return this._dtMort;
  }

  set dtMort(value) {
    this._dtMort = value;
  }

  get ctrlws() {
    return this._ctrlws;
  }

  set ctrlws(value) {
    this._ctrlws = value;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get dtCtht() {
    return this._dtCtht;
  }

  set dtCtht(value) {
    this._dtCtht = value;
  }

  get cstrdo() {
    return this._cstrdo;
  }

  set cstrdo(value) {
    this._cstrdo = value;
  }

  get dtAtua() {
    return this._dtAtua;
  }

  set dtAtua(value) {
    this._dtAtua = value;
  }

  get fazOri() {
    return this._fazOri;
  }

  set fazOri(value) {
    this._fazOri = value;
  }

  get certif() {
    return this._certif;
  }

  set certif(value) {
    this._certif = value;
  }

  get dtCert() {
    return this._dtCert;
  }

  set dtCert(value) {
    this._dtCert = value;
  }

  get dtDslg() {
    return this._dtDslg;
  }

  set dtDslg(value) {
    this._dtDslg = value;
  }

  get cotaht() {
    return this._cotaht;
  }

  set cotaht(value) {
    this._cotaht = value;
  }

  get transf() {
    return this._transf;
  }

  set transf(value) {
    this._transf = value;
  }
}
