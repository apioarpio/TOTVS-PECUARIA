export class Animal {

  private _id;
  private _sisbov;
  private _manejo;
  private _raca;
  private _nomeRaca;
  private _sexo;
  private _dataNascimento;
  private _dataIncSisbov;
  private _codFAixaEtaria;
  private _peso;
  private _dataPesagem;
  private _codFazenda;
  private _codFornecedor;
  private _numeroSolSisbov;
  private _dataEntrada;
  private _movimentoOrigem;
  private _rfid;
  private _lote;
  private _pasto;
  private _dataLibAbateCertificadora;
  private _dataAbate;
  private _dataLibAbateSanitario;
  private _dataApontamentoMorte;
  private _controleWebservice;
  private _status;
  private _dataLimiteCotaHilton;
  private _cadastro;
  private _dataAtualizacaoAnimal;
  private _fazendaOrigem;
  private _certificadora;
  private _dataCertificadora;
  private _controleTransferencia;
  private _dataSync;
  private _idadeMeses;

  constructor() {

  }

  createAnimal(sisbov, manejo, raca, sexo, dataNascimento, dataIncSisbov, codFAixaEtaria, peso, dataPesagem,
               codFazenda, codFornecedor, numeroSolSisbov, dataEntrada, movimentoOrigem, rfid, lote, pasto, dataLibAbateCertificadora,
               dataAbate, dataLibAbateSanitario, dataApontamentoMorte, controleWebservice, status, dataLimiteCotaHilton, cadastro,
               dataAtualizacaoAnimal, fazendaOrigem, certificadora, dataCertificadora, controleTransferencia) {

    this._sisbov = sisbov;
    this._manejo = manejo;
    this._raca = raca;
    this._sexo = sexo;
    this._dataNascimento = dataNascimento;
    this._dataIncSisbov = dataIncSisbov;
    this._codFAixaEtaria = codFAixaEtaria;
    this._peso = peso;
    this._dataPesagem = dataPesagem;
    this._codFazenda = codFazenda;
    this._codFornecedor = codFornecedor;
    this._numeroSolSisbov = numeroSolSisbov;
    this._dataEntrada = dataEntrada;
    this._movimentoOrigem = movimentoOrigem;
    this._rfid = rfid;
    this._lote = lote;
    this._pasto = pasto;
    this._dataLibAbateCertificadora = dataLibAbateCertificadora;
    this._dataAbate = dataAbate;
    this._dataLibAbateSanitario = dataLibAbateSanitario;
    this._dataApontamentoMorte = dataApontamentoMorte;
    this._controleWebservice = controleWebservice;
    this._status = status;
    this._dataLimiteCotaHilton = dataLimiteCotaHilton;
    this._cadastro = cadastro;
    this._dataAtualizacaoAnimal = dataAtualizacaoAnimal;
    this._fazendaOrigem = fazendaOrigem;
    this._certificadora = certificadora;
    this._dataCertificadora = dataCertificadora;
    this._controleTransferencia = controleTransferencia;

  }

  getAnimalObject(): object {
    return {
      "sisbov": this._sisbov,
      "manejo": this._manejo,
      "raca": this._raca,
      "sexo": this._sexo,
      "dataNascimento": this._dataNascimento,
      "dataIncSisbov": this._dataIncSisbov,
      "codFAixaEtaria": this._codFAixaEtaria,
      "peso": this._peso,
      "dataPesagem": this._dataPesagem,
      "codFazenda": this._codFazenda,
      "codFornecedor": this._codFornecedor,
      "numeroSolSisbov": this._numeroSolSisbov,
      "dataEntrada": this._dataEntrada,
      "movimentoOrigem": this._movimentoOrigem,
      "rfid": this._rfid,
      "lote": this._lote,
      "pasto": this._pasto,
      "dataLibAbateCertificadora": this._dataLibAbateCertificadora,
      "dataAbate": this._dataAbate,
      "dataLibAbateSanitario": this._dataLibAbateSanitario,
      "dataApontamentoMorte": this._dataApontamentoMorte,
      "controleWebservice": this._controleWebservice,
      "status": this._status,
      "dataLimiteCotaHilton": this._dataLimiteCotaHilton,
      "cadastro": this._cadastro,
      "dataAtualizacaoAnimal": this._dataAtualizacaoAnimal,
      "fazendaOrigem": this._fazendaOrigem,
      "certificadora": this._certificadora,
      "dataCertificadora": this._dataCertificadora,
      "controleTransferencia": this._controleTransferencia
    }
  }


  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get manejo() {
    return this._manejo;
  }

  set manejo(value) {
    this._manejo = value;
  }

  get dataNascimento() {
    return this._dataNascimento;
  }

  set dataNascimento(value) {
    this._dataNascimento = value;
  }

  get dataIncSisbov() {
    return this._dataIncSisbov;
  }

  set dataIncSisbov(value) {
    this._dataIncSisbov = value;
  }

  get codFAixaEtaria() {
    return this._codFAixaEtaria;
  }

  set codFAixaEtaria(value) {
    this._codFAixaEtaria = value;
  }

  get codFazenda() {
    return this._codFazenda;
  }

  set codFazenda(value) {
    this._codFazenda = value;
  }

  get codFornecedor() {
    return this._codFornecedor;
  }

  set codFornecedor(value) {
    this._codFornecedor = value;
  }

  get numeroSolSisbov() {
    return this._numeroSolSisbov;
  }

  set numeroSolSisbov(value) {
    this._numeroSolSisbov = value;
  }

  get dataEntrada() {
    return this._dataEntrada;
  }

  set dataEntrada(value) {
    this._dataEntrada = value;
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

  get dataLibAbateCertificadora() {
    return this._dataLibAbateCertificadora;
  }

  set dataLibAbateCertificadora(value) {
    this._dataLibAbateCertificadora = value;
  }

  get dataLimiteCotaHilton() {
    return this._dataLimiteCotaHilton;
  }

  set dataLimiteCotaHilton(value) {
    this._dataLimiteCotaHilton = value;
  }

  get fazendaOrigem() {
    return this._fazendaOrigem;
  }

  set fazendaOrigem(value) {
    this._fazendaOrigem = value;
  }

  get dataCertificadora() {
    return this._dataCertificadora;
  }

  set dataCertificadora(value) {
    this._dataCertificadora = value;
  }

  get controleTransferencia() {
    return this._controleTransferencia;
  }

  set controleTransferencia(value) {
    this._controleTransferencia = value;
  }

  get dataSync() {
    return this._dataSync;
  }

  set dataSync(value) {
    this._dataSync = value;
  }


  get sisbov() {
    return this._sisbov;
  }

  set sisbov(value) {
    this._sisbov = value;
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

  get peso() {
    return this._peso;
  }

  set peso(value) {
    this._peso = value;
  }

  get dataPesagem() {
    return this._dataPesagem;
  }

  set dataPesagem(value) {
    this._dataPesagem = value;
  }

  get movimentoOrigem() {
    return this._movimentoOrigem;
  }

  set movimentoOrigem(value) {
    this._movimentoOrigem = value;
  }

  get rfid() {
    return this._rfid;
  }

  set rfid(value) {
    this._rfid = value;
  }

  get dataAbate() {
    return this._dataAbate;
  }

  set dataAbate(value) {
    this._dataAbate = value;
  }

  get dataLibAbateSanitario() {
    return this._dataLibAbateSanitario;
  }

  set dataLibAbateSanitario(value) {
    this._dataLibAbateSanitario = value;
  }

  get dataApontamentoMorte() {
    return this._dataApontamentoMorte;
  }

  set dataApontamentoMorte(value) {
    this._dataApontamentoMorte = value;
  }

  get controleWebservice() {
    return this._controleWebservice;
  }

  set controleWebservice(value) {
    this._controleWebservice = value;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get cadastro() {
    return this._cadastro;
  }

  set cadastro(value) {
    this._cadastro = value;
  }

  get dataAtualizacaoAnimal() {
    return this._dataAtualizacaoAnimal;
  }

  set dataAtualizacaoAnimal(value) {
    this._dataAtualizacaoAnimal = value;
  }

  get certificadora() {
    return this._certificadora;
  }

  set certificadora(value) {
    this._certificadora = value;
  }


  get nomeRaca() {
    return this._nomeRaca;
  }

  set nomeRaca(value) {
    this._nomeRaca = value;
  }

  get idadeMeses() {
    return this._idadeMeses;
  }

  set idadeMeses(value) {
    this._idadeMeses = value;
  }
}
