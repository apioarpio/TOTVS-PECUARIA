import database from '../config/database';

export default {

    create(historicoLote) {
        return new Promise((resolve, reject) => {
            const db = database();
            db.serialize(() => {
                const stmt = db.prepare(`
                    INSERT INTO historico_lote VALUES(
                        $idHistoricoLote,
                        $animal,
                        $lote,
                        $movimentacaoAnimal,
                        $loteOrigem,
                        $integrado,
                        $deletado,
                        $dataOperacao,
                        $dataIntegracao
                    )
                `);
                stmt.run(
                    {
                        $idHistoricoLote: null,
                        $animal: historicoLote['animal.ts'],
                        $lote: historicoLote['lote'],
                        $movimentacaoAnimal: historicoLote['movimentacaoAnimal'],
                        $loteOrigem: historicoLote['loteOrigem'],
                        $integrado: historicoLote['integrado'],
                        $deletado: false,
                        $dataOperacao: new Date().toLocaleString(),
                        $dataIntegracao: historicoLote['dataIntegracao']
                    }
                    , (err) => {
                        if (err) {

                        } else {
                            resolve(true)
                        }
                    }
                );
                stmt.finalize();
            });
            db.close()
        })
    },
    getHistoricoLote(idAnimal) {
        return new Promise((resolve, reject) => {
            if (idAnimal) {
                const db = database();
                db.serialize(() => {
                    db.all(`
                        SELECT hl.id_historico_lote,
                           A.sisbov,
                           l.id_lote id_lote_atual,
                           l.nome lote_atual,
                           LO.id_lote lote_origem,
                           LO.nome nome_lote_origem,
                           MA.id_mov_animal,
                           ma.data_cadastro
                        FROM historico_lote hl
                            INNER JOIN ANIMAL A on hl.id_animal = A.id_animal
                            INNER JOIN movimentacao_animal MA ON hl.id_mov_animal = MA.id_mov_animal
                            INNER JOIN lote L ON hl.id_lote = L.id_lote
                            INNER JOIN lote LO ON hl.lote_origem = LO.id_lote
                    `, (err, result) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
resolve(result)
                        }
                    })
                });
                db.close()
            } else {
                reject('Identificador do animal não informado.')
            }
        })
    }

}
