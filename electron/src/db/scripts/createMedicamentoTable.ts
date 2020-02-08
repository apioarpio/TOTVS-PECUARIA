import database from '../config/database';

export default () => {

    return new Promise((resolve, reject) => {
        const db = database();
        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS
                    medicamentos (
                        id_medicamento INTEGER PRIMARY KEY AUTOINCREMENT,
                        id_produto INTEGER,
                        descricao VARCHAR(255) NOT NULL,
                        carencia INTEGER NOY NULL,
                        data_atualizacao_protheus DATE,
                        data_integracao DATE NOT NULL,
                        deletado BOOLEAN,
                        integrado BOOLEAN
                    )
            `, err => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    resolve(true)
                }
            })
        });
        db.close();
    })
}
