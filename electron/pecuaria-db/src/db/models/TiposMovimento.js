import database from '../config/database';

export default {
    createTM: function (tm) {
        return new Promise((resolve, reject) => {
            const db = database();
            try {
                db.serialize(() => {
                    let stmt = db.prepare(`
                    INSERT INTO TIPOSMOVIMENTO VALUES(
                        $CODIGO,
                        $DESCRICAO,
                        $TIPO,
                        $CDCERT,
                        $STATUS,
                        $BRELET,
                        $IDTFSB,
                        $PESANI,
                        $TRASAN,
                        $VCLOTE,
                        $VCAREA,
                        $TPSAID,
                        $TPENTR,
                        $DATASYNC
                    )
                `);
                    stmt.run(tm, (err, record) => {
                        if (err) {
                            console.log('erro ao incluir um tipo de movimentacao');
                            console.log(err);
                            reject(err);
                        } else {
                            console.log('sucesso', record);
                            resolve(record);
                        }
                    });
                    stmt.finalize();
                });
                db.close()
            } catch (e) {
                db.close()
                console.log('erro ao incluir um tipo de movimentacao');
                console.log(e);
                reject(e);
            }
        })
    },
    getTM: function (cod, fields, order) {
        return new Promise((resolve, reject) => {
            const db = database();
            let where = '';
            let fieldsFilter = '*';
            if (cod) {
                where = `WHERE CODIGO = ${cod}`
            }
            if (fields) {
                fieldsFilter = fields;
            }

            db.all(`SELECT ${fieldsFilter} FROM TIPOSMOVIMENTO ${where}`
                , (err, result) => {

                    if (err) {
                        console.log('ERRO', err);
                        reject(err)
                    }
                    console.log(result)
                    resolve(result)
                });
            db.close()
        })

    }
}
