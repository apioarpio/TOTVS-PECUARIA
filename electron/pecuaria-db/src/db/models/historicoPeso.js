import database from '../config/database'

export default {

    create: function (idAnimal, peso, dataPesagem) {

        return new Promise((resolve, reject) => {

            if (!idAnimal) {
                reject({codErro: 2, mensagem: 'ID animal não informado'});
                return
            }
            if (!peso) {
                reject({codErro: 3, mensagem: 'Peso do animal não informado.'});
                return
            }

            const db = database();
            dataPesagem = dataPesagem ? dataPesagem : new Date().toLocaleString();
            try {
                db.serialize(() => {
                    db.run(
                        `
                            INSERT INTO historico_peso VALUES(${null},${idAnimal},${peso},'${dataPesagem}')
                        `, function (err) {
                            if (err) {
                                console.log(err);
                                reject({codErro: 1, mensagem: 'Não foi possível salvar o histórico da pesagem.'})
                            } else {
                                resolve({mensagem: 'Histórico gravado com sucesso.', idHistorico: this.lastID})
                            }
                        }
                    )
                });
                db.close();
            } catch (e) {
                console.log(e);
                reject(e)
            }
        })

    },
    getHistoricoPeso: function (idAnimal) {
        return new Promise((resolve, reject) => {
            const db = database();

            try {

                db.serialize(() => {
                    db.get(`
                    SELECT * 
                    FROM historico_peso 
                    WHERE data_pesagem = (SELECT MAX(data_pesagem) FROM historico_peso WHERE id_animal = ${idAnimal}) 
                    AND id_animal = ${idAnimal}`)
                });
                db.close();

            } catch (e) {
                console.log(e);
                reject({codErro: 1, mensagem: 'Não foi possível consultar o peso'})
            }

        })
    },
    delete: function () {

    }
}
