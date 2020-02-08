import database from '../config/database';
import SolicitacaoBrinco from '../models/SolicitacaoBrinco';

export default {


    create: function (solicitacaoBrinco) {
        return new Promise((resolve, reject) => {
            if (solicitacaoBrinco) {
                const db = database();
                db.serialize(() => {

                    const stmt = db.prepare(
                        `INSERT INTO solicitacao_brinco VALUES(
                    $idSolicitacao,
                    $idFazenda,
                    $idFornecedor,
                    $sisbovInicial,
                    $sisbovFinal,
                    $status,
                    $quantidadeSisbov,
                    $nota,
                    $serie,
                    $loja,
                    $dataSolicitacao,
                    $dataValidade,
                    $dataAtualizacao,
                    $dataIntegracao,
                    $deletado
                )`);

                    stmt.run({
                            $idSolicitacao: solicitacaoBrinco['idSolicitacao'],
                            $idFazenda: solicitacaoBrinco['idFazenda'],
                            $idFornecedor: solicitacaoBrinco['idFornecedor'],
                            $sisbovInicial: solicitacaoBrinco['sisbovInicial'],
                            $sisbovFinal: solicitacaoBrinco['sisbovFinal'],
                            $status: solicitacaoBrinco['status'],
                            $quantidadeSisbov: solicitacaoBrinco['quantidadeSisbov'],
                            $nota: solicitacaoBrinco['nota'],
                            $serie: solicitacaoBrinco['serie'],
                            $loja: solicitacaoBrinco['loja'],
                            $dataSolicitacao: solicitacaoBrinco['dataSolicitacao'],
                            $dataValidade: solicitacaoBrinco['dataValidade'],
                            $dataAtualizacao: solicitacaoBrinco['dataAtualizacao'],
                            $dataIntegracao: new Date().toLocaleString(),
                            $deletado: solicitacaoBrinco['deletado'],
                        }, err => {
                            console.log(err);
                            return err ? reject(err) : resolve(true)
                        }
                    );
                    stmt.finalize();
                });
                db.close()
            } else {
                return reject(false)
            }
        })
    },
    get: function (idFazenda) {
        return new Promise((resolve, reject) => {
            if (idFazenda) {
                const db = database();
                db.serialize(() => {
                    db.all(
                        `SELECT * FROM solicitacao_brinco WHERE id_fazenda = '${idFazenda}'`,
                        (err, result) => {
                            return err ? reject(err) : resolve(result);
                        }
                    )
                });
                db.close();
            } else {
                reject();
            }
        })
    },
    getById: function (idSolicitacao, idFazenda) {
        return new Promise((resolve, reject) => {
            if (idSolicitacao && idFazenda) {
                const db = database();
                db.serialize(() => {
                    db.get(
                        `SELECT * FROM solicitacao_brinco WHERE id_solicitacao = '${idSolicitacao}' AND id_fazenda = '${idFazenda}'`,
                        (err, result) => {
                            return err ? reject(err) : resolve(result);
                        }
                    )
                });
                db.close()
            } else {
                reject();
            }
        })
    },
    validaSisbov: function (sisbov, idFazenda) {
        return new Promise((resolve, reject) => {
            if (sisbov && idFazenda) {
                const db = database();
                db.serialize(() => {
                    db.get(`SELECT * FROM solicitacao_brinco WHERE id_fazenda = ${idFazenda} AND (${sisbov} >= sisbov_inicial AND ${sisbov} <= sisbov_final)`,
                        (err, result) => {
                            if (err) {
                                reject(err)
                            } else {
                                resolve(result)
                            }
                        })
                });
                db.close()
            } else {
                reject('Parâmetros não informado.')
            }
        })
    }

}
