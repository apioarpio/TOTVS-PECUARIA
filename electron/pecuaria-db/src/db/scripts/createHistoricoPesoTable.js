import database from '../config/database';

export default () => {

    return new Promise((resolve, reject) => {

        const db = database();

        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS
                historico_peso(
                    id_historico_peso INTEGER PRIMARY KEY AUTOINCREMENT ,
                    id_animal INTEGER NOT NULL,
                    peso INTEGER NOT NULL,
                    data_pesagem DATE NOT NULL
                )
            `, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        });
        db.close()
    })
}
