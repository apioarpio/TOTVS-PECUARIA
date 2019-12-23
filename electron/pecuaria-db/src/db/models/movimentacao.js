import database from '../config/database';

export default {

    createMovimentacao: function (movimentacao) {
        return new Promise((resolve, reject) => {
            const db = database();
            try {
                db.serialize(() => {
                    let stmt = db.prepare(
                        `
                            INSERT INTO MOVIMENTACAO VALUES(
                                $ID,
                                $CODTM,
                                $QTDANIMAIS,
                                $OBS,
                                $CODFORNECEDOR,
                                $NUMEROGTA,
                                $SERIEGTA,
                                $DTEMISSAOGTA,
                                $DTVALIDADEGTA,
                                $DATASAIDAGTA,
                                $DATACHEGADAGTA,
                                $DATACADASTRO
                            )
                        `);
                    stmt.run(movimentacao, (err, result) => {
                        if (err) {
                            console.log('erro ao incluir uma movimentacao');
                            console.log(err);
                            reject(err);
                        } else {
                            console.log('movimentacao incluído com sucesso', result);
                            resolve(result)
                        }
                    });
                })
            } catch (e) {
                console.log('CATCH');
                console.log('erro ao incluir um movimentacao');
                console.log(e);
                reject(e)
            }
        });
    },
    getMovimentacoes: function (fields, order) {
        return new Promise((resolve, reject) => {
            const db = database();
            db.all(`SELECT * FROM MOVIMENTACAO`)
                .then(movimentacoes => {
                    resolve(movimentacoes);
                })
                .catch(err => {
                    resolve(err);
                })
        })
    }


}
