import database from '../config/database';

export default {
    create: function (area) {
        return new Promise((resolve, reject) => {
            const db = database();
            try {
                db.serialize(() => {
                    const stmt = db.prepare(`
                    INSERT INTO area VALUES(
                        $idArea,
                        $idFazenda,
                        $nome,
                        $tamanhoHectares,
                        $quantidadeAnimais,
                        $status,
                        $caracteristicas,
                        $tipo,
                        $dataSincronizacao,
                        $integrado,
                        $deletado
                    )
                `);
                    stmt.run({
                        $idArea: area['idArea'],
                        $idFazenda: area['idFazenda'],
                        $nome: area['nome'],
                        $tamanhoHectares: area['tamanhoHectares'],
                        $quantidadeAnimais: area['quantidadeAnimais'],
                        $status: area['status'],
                        $caracteristicas: area['caracteristicas'],
                        $tipo: area['tipo'],
                        $dataSincronizacao: new Date(),
                        $integrado: null,
                        $deletado: area['deletado']
                    }, err => {
                        if (err) {
                            console.log(err);
                            reject(err)
                        } else {
                            resolve()
                        }
                    });
                    stmt.finalize()
                });
                db.close()
            } catch (e) {
                console.log("ERRO!!!!!!", e);
                reject(e);
                db.close()
            }
        })
    },
    getAll(fields,  params) {
        return new Promise((resolve, reject) => {
            const db = database();

            db.serialize(() => {

                db.all(`SELECT * FROM area`, (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })

            });

            db.close();

        });
    }

}
