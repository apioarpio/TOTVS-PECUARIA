import database from '../config/database';

export default {

    create: function (historicoArea) {
        return new Promise((resolve, reject) => {

            const db = database();

            db.serialize(() => {
                const stmt = db.prepare(`
                    INSERT INTO historico_area VALUES(
                        $idHistoricoArea,
                        $idAnimal,
                        $idArea,
                        $idMovimentacaoAnimal,
                        $areaOrigem,
                        $integrado,
                        $deletado,
                        $dataOperacao,
                        $dataIntegracao
                    )
                `);
                stmt.run({
                    $idHistoricoArea: null,
                    $idAnimal: historicoArea['idAnimal'],
                    $idArea: historicoArea['idArea'],
                    $idMovimentacaoAnimal: historicoArea['idMovimentacaoAnimal'],
                    $areaOrigem: historicoArea['areaOrigem'],
                    $integrado: historicoArea['integrado'],
                    $deletado: historicoArea['deletado'],
                    $dataOperacao: new Date().toLocaleString(),
                    $dataIntegracao: historicoArea['dataIntegracao']
                }, err => {
                    if (err) {
                        console.log(err);
                        reject(err)
                    } else {
                        resolve(true)
                    }
                })
                stmt.finalize();
            });
            db.close();
        })
    },
    getHistoricoAreaAnimal: function (idAnimal) {
        return new Promise((resolve, reject) => {
            if (idAnimal) {
                const db = database();
                db.serialize(() => {
                    db.all(`
                    SELECT * 
                    FROM historico_area HA 
                    INNER JOIN movimentacao_animal MA ON MA.id_mov_animal = HA.id_mov_animal
                    INNER JOIN movimentacao MOV ON MOV.id_movimentacao = MA.id_movimentacao
                    INNER JOIN area ON area.id_area = HA.id_area
                    WHERE HA.id_animal = ${idAnimal}`, (err, result) => {
                        if (err) {
                            console.log();
                            reject(err)
                        } else {
                            console.log(result);
                            resolve(result)
                        }
                    })
                });
                db.close();
            } else {
                reject('id animal não informado')
            }
        })
    }
}
