import database from '../config/database'

export default () => {
    return new Promise((resolve, reject) => {

        const db = database();

        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS
                TIPOSMOVIMENTO(
                    CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
                    DESCRICAO STRING NOT NULL,
                    TIPO INTEGER,
                    CDCERT INTEGER,
                    STATUS INTEGER,
                    BRELET INTEGER,
                    IDTFSB INTEGER,
                    PESANI INTEGER,
                    TRASAN INTEGER,
                    VCLOTE INTEGER,
                    VCAREA INTEGER,
                    TPSAID INTEGER,
                    TPENTR INTEGER,
                    DATASYNC DATE
                )
            `, (err, success) => {
                if (err)
                    reject(new Error(err));

                resolve(success)
            })
        })
        db.close();
    })
}
