import database from '../config/database'

export default {

  create: function (historicoPeso) {

    return new Promise((resolve, reject) => {
      if (!historicoPeso['idAnimal']) {
        reject({codErro: 2, mensagem: 'ID animal não informado'});
        return
      }
      if (!historicoPeso['peso']) {
        reject({codErro: 3, mensagem: 'Peso do animal não informado.'});
        return
      }
      const db = database();
      const dataPesagem = historicoPeso['dataPesagem'] ? historicoPeso['dataPesagem'] : new Date().toLocaleString();
      try {
        db.serialize(() => {
          const stmt = db.prepare(`
                        INSERT INTO historico_peso 
                        VALUES(
                            $idHistorico,
                            $idAnimal,
                            $peso,
                            $integrado,
                            $dataPesagem,
                            $dataIntegracao
                        )
                    `);
          stmt.run({
              $idHistorico: null,
              $idAnimal: historicoPeso['idAnimal'],
              $peso: historicoPeso['peso'],
              $integrado: historicoPeso['integrado'],
              $dataPesagem: dataPesagem,
              $dataIntegracao: ''
            }, function (err) {
              if (err) {
                console.log(err);
                reject({codErro: 1, mensagem: 'Não foi possível salvar o histórico da pesagem.'})
              } else {
                resolve({mensagem: 'Histórico gravado com sucesso.', idHistorico: this.lastID})
              }
            }
          );
          stmt.finalize();
        });
        db.close();
      } catch (e) {
        console.log(e);
        db.close();
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
