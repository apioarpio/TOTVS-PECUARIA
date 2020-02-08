import database from '../config/database';

export default {
    createTM: function (tm) {
        return new Promise((resolve, reject) => {
            const db = database();
            try {
                db.serialize(() => {
                    let stmt = db.prepare(`
                    INSERT INTO tipo_movimento VALUES(
                        $idTm,
                        $descricao,
                        $tipo,
                        $codigoCertificadora,
                        $status,
                        $brincoEletronico,
                        $incluiSisbov,
                        $pesaAnimal,
                        $sanitario,
                        $vinculaLote,
                        $vinculaArea,
                        $tipoSaida,
                        $tipoEntrada,
                        $dataIntegracao
                    )
                `);
                    stmt.run({
                        $idTm: tm['idTm'],
                        $descricao: tm['descricao'],
                        $tipo: tm['tipo'],
                        $codigoCertificadora: tm['codigoCertificadora'],
                        $status: tm['status'],
                        $brincoEletronico: tm['brincoEletronico'],
                        $incluiSisbov: tm['incluiSisbov'],
                        $pesaAnimal: tm['pesaAnimal'],
                        $sanitario: tm['sanitario'],
                        $vinculaLote: tm['vinculaLote'],
                        $vinculaArea: tm['vinculaArea'],
                        $tipoSaida: tm['tipoSaida'],
                        $tipoEntrada: tm['tipoEntrada'],
                        $dataIntegracao: new Date().toLocaleString()
                    }, (err, record) => {
                        if (err) {
                            console.log('erro ao incluir um tipo de operacoes-curral');
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
                console.log('erro ao incluir um tipo de operacoes-curral');
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
                where = `WHERE id_tm = ${cod}`
            }
            if (fields) {
                fieldsFilter = fields;
            }

            db.all(`SELECT ${fieldsFilter} FROM tipo_movimento ${where}`
                , (err, result) => {
                    if (err) {
                        console.log('ERRO', err);
                        reject(err)
                    }
                    resolve(result)
                });
            db.close()
        })

    },
    getTMsByTipo: function (tipoTm) {
        return new Promise((resolve, reject) => {
            if (tipoTm) {
                let query = '';
                if (tipoTm === "entrada") {
                    query = `WHERE tipo_entrada <> ''`
                } else if (tipoTm === "saida") {
                    query = `WHERE tipo_saida <> ''`
                } else if (tipoTm === "interno") {
                    query = `WHERE tipo_entrada = '' AND tipo_saida = ''
                    `
                } else {
                    reject('TM inválido.');
                    return
                }

                const db = database();
                db.serialize(() => {

                    db.all(`SELECT * FROM tipo_movimento ${query}`,
                        (err, tiposMovimento) => {
                            if (err) {
                                console.log(err);
                                reject(err)
                            } else {
                                resolve(tiposMovimento)
                            }
                        })

                });
                db.close()
            } else {
                reject('Tipo não informado')
            }
        })
    }
}
