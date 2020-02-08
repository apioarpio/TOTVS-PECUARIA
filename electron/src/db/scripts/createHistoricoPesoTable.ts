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
                    integrado BOOLEAN NOT NULL,
                    data_pesagem DATE NOT NULL,
                    data_criacao DATE NOT NULL,
                    FOREIGN KEY(id_animal) REFERENCES animal(id_animal)
                )
            `, (err, result) => {
                if (err) {
                    console.log('1',err);
                    reject(err)
                }
                resolve(result)
            })
        });
        db.close()
    })
}
