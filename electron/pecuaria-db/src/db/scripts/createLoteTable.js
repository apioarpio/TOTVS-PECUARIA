import database from '../config/database';

export default () => {

    return new Promise((resolve, reject) => {

        const db = database();

        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS
                lote(
                    id_lote INTEGER PRIMARY KEY AUTOINCREMENT ,
                    id_fazenda INTEGER NOT NULL,
                    id_area INTEGER NOT NULL,
                    nome VARCHAR(255) NOT NULL,
                    tipo_lote INTEGER,
                    status INTEGER,
                    quantidade_animais INTEGER,
                    ano INTEGER,
                    mes INTEGER,
                    sexo INTEGER,
                    observacao VARCHAR(255),
                    data_atualizacao DATE,
                    data_sincronizacao DATE,
                    integrado BOOLEAN,
                    deletado BOOLEAN
                )
            `, (err) => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    resolve()
                }
            })
        });

        db.close()

    })

}
