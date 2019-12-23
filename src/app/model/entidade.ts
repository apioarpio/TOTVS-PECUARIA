export class Entidade {

  private _id: string;
  private _nome: string;
  private _tipoEntidade: string;
  private _uf: string;
  private _municipio: string;
  private _inscricao_estadual: string;
  private _CPF_CNPJ: string;
  private _idSisbov: string;
  private _SIF: string;
  private _clienteFornecedor: string;
  private _dataIntegracao: string;
  private _rev: string;

  constructor() {

  }

  createEntidade(id, nome, tipoEntidade, uf, municipio, inscricaoEstadual, CPF_CNPJ, idSisbov, SIF, clienteFornecedor, dataIntegracao, _rev?) {

    this._id = id;
    this._nome = nome;
    this._tipoEntidade = tipoEntidade;
    this._uf = uf;
    this._municipio = municipio;
    this._inscricao_estadual = inscricaoEstadual;
    this._CPF_CNPJ = CPF_CNPJ;
    this._idSisbov = idSisbov;
    this._SIF = SIF;
    this._clienteFornecedor = clienteFornecedor;
    this._dataIntegracao = dataIntegracao;
    this._rev = _rev;

  }

  getDocument(): object {
    return {
      codigo: this._id,
      nome: this._nome,
      tipo: this._tipoEntidade,
      uf: this._uf,
      codmun: this._municipio,
      idSisBov: this._inscricao_estadual,
      insest: this._CPF_CNPJ,
      cnpj: this._idSisbov,
      codFor: this._SIF,
      sif: this._clienteFornecedor,
      dataIntegracao: this._dataIntegracao,
    }
  }

  getDocumentUpdate(): object {
    return {
      _id: this._id,
      _rev: this._rev,
      nome: this._nome,
      tipoEntidade: this._tipoEntidade,
      uf: this._uf,
      municipio: this._municipio,
      inscricaoEstadual: this._inscricao_estadual,
      cpfCnpj: this._CPF_CNPJ,
      idSisbov: this._idSisbov,
      SIF: this._SIF,
      clienteFornecedor: this._clienteFornecedor,
      dataIntegracao: this._dataIntegracao,
    }
  }

  get id(): string {
    return this._id
  }

  get nome(): string {
    return this._nome;
  }

  set nome(value: string) {
    this._nome = value;
  }

  get tipoEntidade(): string {
    return this._tipoEntidade;
  }

  set tipoEntidade(value: string) {
    this._tipoEntidade = value;
  }

  get uf(): string {
    return this._uf;
  }

  set uf(value: string) {
    this._uf = value;
  }

  get municipio(): string {
    return this._municipio;
  }

  set municipio(value: string) {
    this._municipio = value;
  }

  get inscricao_estadual(): string {
    return this._inscricao_estadual;
  }

  set inscricao_estadual(value: string) {
    this._inscricao_estadual = value;
  }

  get CPF_CNPJ(): string {
    return this._CPF_CNPJ;
  }

  set CPF_CNPJ(value: string) {
    this._CPF_CNPJ = value;
  }

  get idSisbov(): string {
    return this._idSisbov;
  }

  set idSisbov(value: string) {
    this._idSisbov = value;
  }

  get SIF(): string {
    return this.SIF;
  }

  set SIF(value: string) {
    this._SIF = value;
  }

  get clienteFornecedor(): string {
    return this._clienteFornecedor;
  }

  set clienteFornecedor(value: string) {
    this._clienteFornecedor = value;
  }

  get dataIntegracao(): string {
    return this._dataIntegracao;
  }

  set dataIntegracao(value: string) {
    this._dataIntegracao = value;
  }

  get rev(): string {
    return this._rev;
  }

  set rev(value: string) {
    this._rev = value;
  }
}
