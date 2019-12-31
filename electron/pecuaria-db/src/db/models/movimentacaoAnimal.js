import database from '../config/database';
import historicoPeso from '../models/historicoPeso'

export default {

  /**
   * @description
   * @param idMovimento
   * @param idAnimal
   * @param aparte
   * @param peso
   * @return {Promise<any>}
   */
  create: function (idMovimento, idAnimal, aparte, peso) {
    const that = this;
    const dataCadastro = new Date().toLocaleString();
    return new Promise((resolve, reject) => {
      //verifica se o animal a ser registrado já foi adicionado a esta movimentação.
      that.getAnimaisMovimento(idMovimento, idAnimal)
        .then(result => {
          //rejeita a inserção por já haver um animal cadastrado nesse movimentacao{
          if (result.length > 0) {
            reject({cod: 1, mensagem: 'SISBOV já incluso na movimentação', erro: null});
          } else {
            //cria o histórico para o peso inserido
            historicoPeso.create(idAnimal, peso, dataCadastro)
              .then(historico => {
                const db = database();
                db.serialize(() => {
                  //adiciona o animal na movimentação
                  let stmt = db.prepare('INSERT INTO movimentacao_animal VALUES(?,?,?,?,?,?)');
                  stmt.run(null, idMovimento, idAnimal, historico.idHistorico, aparte, dataCadastro,
                    (err, record) => {
                      if (err) {
                        console.log(err);
                        reject({cod: 2, mensagem: 'Erro no incluir o registro', erro: err});
                      } else {
                        console.log('registro criado com sucesso');
                        resolve({mensagem: 'Registro criado com sucesso.', registro: record});
                      }
                    }
                  );
                  stmt.finalize()
                });
                db.close();
              })
              .catch(err => {
                console.log(err);
                reject({cod: 2, mensagem: 'Erro no incluir o registro', erro: err});
              });
          }
        })
        .catch(err => {
          console.log(err);
          reject({cod: 2, mensagem: 'Erro no incluir o registro', erro: err});
        });
    });
  },
  getAnimaisMovimento: function (idMovimento, idAnimal) {
    return new Promise((resolve, reject) => {
      if (idMovimento) {
        let queryConstraints = ` WHERE MOVA.id_movimentacao = '${idMovimento}' `;
        if (idAnimal) {
          queryConstraints += ` AND MOVA.id_animal = '${idAnimal}'`
        }
        const db = database();
        db.serialize(() => {
          db.all(`
          SELECT * 
          FROM movimentacao_animal MOVA 
          INNER JOIN ANIMAL ON ANIMAL.id_animal = MOVA.id_animal 
          INNER JOIN historico_peso hp on hp.id_animal = ANIMAL.id_animal AND hp.id_historico_peso = MOVA.id_historico_peso
          ${queryConstraints}
          AND hp.data_pesagem = (SELECT MAX(data_pesagem) FROM historico_peso WHERE id_animal = MOVA.id_animal)
          `,
            (err, result) => {
              if (err) {
                reject({cod: 1, erro: err})
              }
              const animaisMovimentacao = [];

              for (let animal of result) {
                animaisMovimentacao.push(
                  {
                    idMovAnimal: animal['id_mov_animal'],
                    idMovimentacao: animal['id_movimentacao'],
                    idAnimal: animal['id_animal'],
                    aparte: animal['aparte'],
                    sisbov: animal['sisbov'],
                    raca: animal['raca'],
                    sexo: animal['sexo'],
                    dataNascimento: animal['data_nascimento'],
                    dataInclusaoSisbov: animal['data_inclusao_sisbov'],
                    codigoFaixaEtaria: animal['codigo_faixa_etaria'],
                    peso: animal['peso']
                  }
                )
              }
              resolve(animaisMovimentacao);
            });
        });
        db.close()
      } else {
        reject({cod: 0, erro: null})
      }
    });
  }
}
