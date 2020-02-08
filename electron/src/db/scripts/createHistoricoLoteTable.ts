import database from '../config/database';

export default () => {
  return new Promise((resolve, reject) => {
    const db = database();

    db.serialize(() => {

      db.run(`
                CREATE TABLE IF NOT EXISTS
                    historico_lote(
                        id_historico_lote INTEGER PRIMARY KEY AUTOINCREMENT,
                        animal INTEGER,
                        lote INTEGER,
                        movimentacaoAnimal INTEGER NOT NULL,
                        lote_origem,
                        integrado BOOLEAN,
                        deletado BOOLEAN,
                        data_operacao DATE NOT NULL,
                        data_integracao DATE,
                        FOREIGN KEY(animal) REFERENCES animal(sisbov),
                        FOREIGN KEY(lote) REFERENCES lote(id_lote),
                        FOREIGN KEY(movimentacaoAnimal) REFERENCES movimentacao_animal(id_mov_animal)
                    )
            `
        , err => {
          if (err) {
            console.log(err);
            reject(err)
          } else {
            resolve(true)
          }
        })

    });
    db.close();

  })
}
