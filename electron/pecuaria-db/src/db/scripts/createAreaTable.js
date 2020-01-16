import database from '../config/database';

export default () => {

    return new Promise((resolve, reject) => {

        const db = database();

        db.serialize(() => {

            db.run(`
                CREATE TABLE IF NOT EXISTS
                area(
                    id_area INTEGER PRIMARY KEY AUTOINCREMENT,
                    id_fazenda INTEGER NOT NULL,
                    nome VARCHAR(255),
                    tamanho_hectares FLOAT,
                    quantidade_animais INTEGER,
                    status INTEGER,
                    caracteristicas INTEGER,
                    tipo VARCHAR(5),
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
