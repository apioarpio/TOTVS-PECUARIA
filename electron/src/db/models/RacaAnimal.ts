import database from '../config/database'

export default {

    create: function (racaAnimal) {

        return new Promise((resolve, reject) => {
            if (racaAnimal) {

                if (
                    !racaAnimal.hasOwnProperty('idRacaAnimal') &&
                    !racaAnimal.hasOwnProperty('descricao') &&
                    !racaAnimal.hasOwnProperty('tipo') &&
                    !racaAnimal.hasOwnProperty('codigoReduzido') &&
                    !racaAnimal.hasOwnProperty('status') &&
                    !racaAnimal.hasOwnProperty('dataAtualizacao') &&
                    !racaAnimal.hasOwnProperty('deletado')
                ) {
                    console.log('Encerrando a criação de Raça');
                    reject({mensagem: 'Json incompleto.'});
                    return;
                }
                console.log('Criando a raça');
                const db = database();

                db.serialize(() => {
                    const stmt = db.prepare(`INSERT INTO raca_animal values(?,?,?,?,?,?,?,?)`);
                    stmt.run(
                        racaAnimal['idRacaAnimal'],
                        racaAnimal['descricao'],
                        racaAnimal['tipo'],
                        racaAnimal['codigoReduzido'],
                        racaAnimal['status'],
                        racaAnimal['dataAtualizacao'],
                        racaAnimal['deletado'],
                        new Date().toLocaleString()
                        , (err) => {
                            if (err) {
                                console.log(err);
                                reject(false)
                            } else {
                                resolve(true)
                            }
                        }
                    );
                    stmt.finalize();
                });
                db.close();
            } else {
                reject(false);
            }
        })
    },
    getRacasAnimal(idRacaAnimal, fields) {
        return new Promise((resolve, reject) => {

            const db = database();
            let fieldsFilter = '';
            let queryFilter = '';
            if (fields) {
                fields = fields.split(',');
                for (let i = 0; i < fields.length; i++) {
                    console.log(fields[i]);
                    switch (fields[i]) {
                        case 'id':
                            fieldsFilter += ' id_raca_animal';
                            fieldsFilter += i === (fields.length - 1) ? '' : ',';
                            break;
                        case 'descricao':
                            fieldsFilter += ' descricao';
                            fieldsFilter += i === (fields.length - 1) ? '' : ',';
                            break;
                        case 'tipo':
                            fieldsFilter += ' tipo';
                            fieldsFilter += i === (fields.length - 1) ? '' : ',';
                            break;
                        case 'codigoReduzido':
                            fieldsFilter += ' codigo_reduzido';
                            fieldsFilter += i === (fields.length - 1) ? '' : ',';
                            break;
                        case 'status':
                            fieldsFilter += ' status';
                            fieldsFilter += i === (fields.length - 1) ? '' : ',';
                            break;
                        case 'dataAtualizacao':
                            fieldsFilter += ' data_atualizacao';
                            fieldsFilter += i === (fields.length - 1) ? '' : ',';
                            break;
                        case 'dataSincronizacao':
                            fieldsFilter += ' data_sincronizacao';
                            fieldsFilter += i === (fields.length - 1) ? '' : ',';
                            break;
                    }
                }
            } else {
                fieldsFilter = '*';
            }

            if (idRacaAnimal) {
                   queryFilter += `WHERE id_raca_animal = ${idRacaAnimal}`
            }

            console.log(fieldsFilter);

            db.serialize(() => {

                db.all(`SELECT ${fieldsFilter} FROM raca_animal ${queryFilter}`
                    , (err, result) => {
                        if (err) {
                            console.log(err);
                            reject(err)
                        } else {
                            let arrRaca = []
                            for (let raca of result) {
                                arrRaca.push({
                                    id: raca["id_raca_animal"],
                                    descricao: raca["descricao"],
                                    tipo: raca['tipo'],
                                    codigoReduzido: raca['codigo_reduzido'],
                                    status: raca['status'],
                                    dataAtualizacao: raca['data_atualizacao'],
                                    deletado: raca['deletado'],
                                    dataSincronizacao: raca['data_sincronizacao']
                                })
                            }

                            resolve(arrRaca)
                        }
                    })
            });
            db.close();
        })
    }

}
