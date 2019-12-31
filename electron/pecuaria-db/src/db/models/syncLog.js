import database from '../config/database';

export default {

    createLog: function (tabela, registrosSalvos) {

        return new Promise((resolve, reject) => {
            const db = database();
            db.serialize(() => {
                let stmt = db.prepare('INSERT INTO SYNCLOG VALUES(?,?,?,?)');
                stmt.run(
                    null,
                    tabela,
                    registrosSalvos,
                    new Date().toLocaleString(),
                    (err, record) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        resolve(record);
                    }
                );
                stmt.finalize();
            });
            db.close();
        });
    },
    getLastLog: function (tabela) {

        return new Promise((resolve, reject) => {
            const db = database();
            db
                .all(`SELECT * FROM SYNCLOG WHERE TABELA = '${tabela}' AND data_sync = (SELECT MAX(data_sync) FROM SYNCLOG WHERE tabela = '${tabela}') ORDER BY data_sync DESC`
                    , (err, result) => {
                        if (err) {
                            console.log(err);
                            reject(err)
                        }
                        resolve(result)
                    })
            db.close()
        })

    }

}
