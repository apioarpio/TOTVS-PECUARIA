import database from '../config/database';

export default () => {
    return new Promise((resolve, reject) => {
        const db = database();
        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS
                contexto(
                     cod_estacao INTEGER PRIMARY KEY AUTOINCREMENT,
                     cod_fazenda_atual INTEGER,
                     mac_address TEXT
                )
            `, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(result);
            })
        });
        db.close();
    })
}
