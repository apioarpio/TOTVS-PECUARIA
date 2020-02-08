import database from '../config/database';

export default () => {
    return new Promise((resolve, reject) => {
        const db = database();
        db.serialize(() => {
            db.run(
                `
                CREATE TABLE IF NOT EXISTS
                contexto_fazenda(
                    id_contexto_fazenda INTEGER PRIMARY KEY AUTOINCREMENT,
                    cod_fazenda INTEGER NOT NULL,
                    cod_estacao INTEGER NOT NULL
                )`, (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err)
                    }
                    resolve(result);
                })
        });
        db.close();
    })
}
