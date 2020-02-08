import database from '../config/database';

export default () => {
    return new Promise((resolve, reject) => {
        const db = database();
        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS
                    raca_animal(
                        id_raca_animal INTEGER PRIMARY KEY,
                        descricao VARCHAR(255) NOT NULL,
                        tipo INTEGER,
                        codigo_reduzido VARCHAR(2) NOT NULL UNIQUE,
                        status INTEGER,
                        data_atualizacao DATE,
                        deletado VARCHAR(2),
                        data_sincronizacao DATETIME NOT NULL
                    )
            `, (err) => {
                if (err) {
                    console.log(err);
                    reject()
                } else {
                    resolve(true)
                }
            })
        });
        db.close();
    })
}
