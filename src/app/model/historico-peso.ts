export class HistoricoPeso {

  private _id: number;
  private _idAnimal: number;
  private _peso: number;
  private _dataPesagem: Date;

  constructor() {
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get idAnimal(): number {
    return this._idAnimal;
  }

  set idAnimal(value: number) {
    this._idAnimal = value;
  }

  get peso(): number {
    return this._peso;
  }

  set peso(value: number) {
    this._peso = value;
  }

  get dataPesagem(): Date {
    return this._dataPesagem;
  }

  set dataPesagem(value: Date) {
    this._dataPesagem = value;
  }
}
