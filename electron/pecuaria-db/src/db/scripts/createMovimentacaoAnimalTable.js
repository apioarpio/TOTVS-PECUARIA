import database from '../config/database'

export default () => {
    return new Promise((resolve, reject) => {
        const db = database();

        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS
                movimentacao_animal(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    idMovimento INTEGER NOT NULL,
                    idAnimal INTEGER NOT NULL
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
