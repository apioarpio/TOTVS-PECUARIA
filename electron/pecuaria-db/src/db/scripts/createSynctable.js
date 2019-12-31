import database from '../config/database'

export default () => {
    return new Promise((resolve, reject) => {
        const db = database();

        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS
                SYNCLOG(
                    id_sync INTEGER PRIMARY KEY AUTOINCREMENT,
                    tabela STRING NOT NULL,
                    registros_salvos INTEGER,
                    data_sync DATE NOT NULL
                )
            `, (err, success) => {
                if (err) {
                    reject(new Error(err))
                }
                resolve(success)
            });
        });
        db.close();
    })
}
