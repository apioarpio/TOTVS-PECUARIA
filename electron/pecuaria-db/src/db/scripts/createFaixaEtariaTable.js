import database from '../config/database';

export default () => {

    const db = database();

    return new Promise((resolve, reject) => {

        db.serialize(() => {

            db.run(`
            CREATE TABLE IF NOT EXISTS
             faixa_etaria(
                id_faixa_etaria INTEGER PRIMARY KEY AUTOINCREMENT,
                descricao VARCHAR(255) NOT NULL,
                inicio INTEGER NOT NULL,
                fim INTEGER NOT NULL,
                deletado VARCHAR(1),
                data_sincronizacao DATE NOT NULL
             )
        `, (err) => {
                if (err) {
                    console.log(err);
                    reject({erro: err, mensagem: 'Ocorreu um erro ao criar a tabela de Faixa Etária.'})
                } else {
                    resolve();
                }
            })
        });
        db.close();
    });
}
