import database from '../config/database';

export default {

    create: function (sisbovChip) {
        return new Promise((resolve, reject) => {
            if (sisbovChip) {
                const db = database();

                db.serialize(() => {
                    const stmt = db.prepare(`
                    INSERT INTO sisbov_chip VALUES(
                        $idSolicitacao,
                        $idFazenda,
                        $numeroPedido,
                        $dataSolicitacao,
                        $status,
                        $item,
                        $sisbov,
                        $rfid,
                        $statusSisbov,
                        $dataAtualizacao,
                        $dataIntegracao,
                        $deletado,
                        $recno
                    )
                `)

                    stmt.run({
                        $idSolicitacao: sisbovChip['idSolicitacao'],
                        $idFazenda: sisbovChip['idFazenda'],
                        $numeroPedido: sisbovChip['numeroPedido'],
                        $dataSolicitacao: sisbovChip['dataSolicitacao'],
                        $status: sisbovChip['status'],
                        $item: sisbovChip['item'],
                        $sisbov: sisbovChip['sisbov'],
                        $rfid: sisbovChip['rfid'],
                        $statusSisbov: sisbovChip['statusSisbov'],
                        $dataAtualizacao: sisbovChip['dataAtualizacao'],
                        $dataIntegracao: sisbovChip['dataIntegracao'],
                        $deletado: sisbovChip['deletado'],
                        $recno: sisbovChip['recno']
                    }, err => {
                        console.log(err);
                        err ? reject(err) : resolve()
                    });

                    stmt.finalize()

                });

                db.close();

            }
        })
    },
    get: function (idFazenda) {
        return new Promise((resolve, reject) => {
            if (idFazenda) {
                const db = database();
                db.serialize(() => {
                    db.all(`SELECT * FROM sisbov_chip WHERE id_fazenda = '${idFazenda}'`
                        , (err, result) => {
                            return err ? reject(err) : resolve(result);
                        })
                });
                db.close()
            } else {
                reject()
            }
        })
    }

}
