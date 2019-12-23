export class SyncLog {

  _id: string;

  constructor(
    public tabela: string,
    public registrosTotais: number,
    public registrosSalvos: number,
    public dataSync: string,
    public horaSync: string
  ) {
  }


}
