import database from '../config/database';

export default {

    create: function (lote) {
        return new Promise((resolve, reject) => {
            const db = database();

            db.serialize(() => {
                const stmt = db.prepare(`
                INSERT INTO lote VALUES(
                    $idLote,
                    $idFazenda,
                    $idArea,
                    $nome,
                    $tipoLote,
                    $status,
                    $quantidadeAnimais,
                    $ano,
                    $mes,
                    $sexo,
                    $observacao,
                    $dataAtualizacao,
                    $dataSincronizacao,
                    $integrado,
                    $deletado
            )`);
                stmt.run({
                        $idLote: lote['idLote'],
                        $idFazenda: lote['idFazenda'],
                        $idArea: lote['idArea'],
                        $nome: lote['nome'],
                        $tipoLote: lote['tipoLote'],
                        $status: lote['status'],
                        $quantidadeAnimais: lote['quantidadeAnimais'],
                        $ano: lote['ano'],
                        $mes: lote['mes'],
                        $sexo: lote['sexo'],
                        $observacao: lote['observacao'],
                        $dataSincronizacao: new Date().toLocaleString(),
                        $integrado: false,
                        $deletado: null
                    },
                    (err) => {
                        if (err) {
                            console.log(err)
                            reject();
                        } else {
                            console.log(err)
                            resolve();
                        }
                    }
                );
                stmt.finalize();
            });
            db.close();
        })
    },
    getAll: function (fields, params) {
        return new Promise((resolve, reject) => {
            const db = database();
            let query = '';
            let field = '';
            try {
                db.serialize(() => {
                    if (params) {
                        if (params['idFazenda']) {
                            query += !query ? 'WHERE' : 'AND';
                            query += ` id_fazenda = '${params.idFazenda}'`;
                            if (params['idArea']) {
                                query += !query ? ' WHERE ' : ' AND ';
                                query += ` id_area = ${params.idArea} `
                            }
                            console.log(query)
                            db.all(
                                `SELECT * FROM lote ${query}`,
                                (err, result) => {
                                    if (err) {
                                        console.log(err);
                                        reject(err)
                                    } else {
                                        resolve(result);
                                    }
                                }
                            )
                        } else {
                            reject('Fazenda não informada.')
                        }
                    } else {
                        reject('Parâmetros não informados')
                    }
                })
            } catch (e) {
                console.log(e);
                reject(e);
                db.close()
            }
        })
    },
    getById: function (idLote, idFazenda) {
        return new Promise((resolve, reject) => {
            const db = database();

            db.serialize(() => {
                console.log(idLote);
                console.log(idFazenda);
                db.all(
                    `SELECT * FROM lote WHERE id_lote = '${idLote}' AND id_fazenda = ${idFazenda}`,
                    (err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(result)
                        }
                    })

            });

            db.close();

        })
    }

}
