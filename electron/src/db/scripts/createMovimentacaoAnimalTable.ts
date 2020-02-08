import database from '../config/database'

export default () => {
    return new Promise((resolve, reject) => {
        const db = database();

        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS
                movimentacao_animal(
                    id_mov_animal INTEGER PRIMARY KEY AUTOINCREMENT,
                    id_movimentacao INTEGER NOT NULL,
                    id_animal INTEGER NOT NULL,
                    id_historico_peso INTEGER NOT NULL,
                    id_historico_area INTEGER,
                    id_historico_lote INTEGER,
                    aparte INTEGER,
                    data_cadastro DATE NOT NULL
                )
            `, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        });
        db.close();
    })
}
