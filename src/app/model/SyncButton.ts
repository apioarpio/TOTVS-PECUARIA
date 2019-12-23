export class SyncButton {

  public loading: boolean = false;
  public label: string = "Sincronizar";
  private _type: string = "link";
  private _icon: string = "po-icon-upload";

  constructor() {

  }

  get icon(): string {
    return this._icon;
  }


  get type(): string {
    return this._type;
  }
}
