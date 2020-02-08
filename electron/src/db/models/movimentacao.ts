import database from '../config/database';
import ContextoPersistence from './contexto';

export default {

  createMovimentacao: function (movimentacao) {
    return new Promise(async (resolve, reject) => {
      const db = database();
      try {
        const dataAtualFormatada = new Date().toLocaleDateString().replace(/\//g, '');
        let contexto = await ContextoPersistence.getContexto();
        contexto = contexto['contexto'];
        console.log('contexto', contexto['codFazendaAtual']);
        if (!contexto['codFazendaAtual']) {
          reject({mensagem: 'Nenhuma fazenda foi selecionada para trabalho nesta entação'})
        } else {
          //filtros para buscar todas as movimentacoes com base na data atual e a fazenda
          let filtersMovimentacao = {
            dataCadastro: new Date().toLocaleDateString(),
            codFazenda: contexto['codFazendaAtual']
          };
          let movimentacoesSaved = await this.getMovimentacoes(filtersMovimentacao);
          let sequencialDia = movimentacoesSaved.length > 9 ? "0" + (movimentacoesSaved.length + 1) : "00" + (movimentacoesSaved.length + 1);
          let pkMovimentacao = contexto['codEstacao'] + '' + contexto['codFazendaAtual'] + dataAtualFormatada + sequencialDia;
          db.serialize(() => {
            let stmt = db.prepare(
              `
                            INSERT INTO movimentacao VALUES(
                                $idMovimentacao,
                                $idTm,
                                $idFornecedor,
                                $codFazendaAtual,
                                $quantidadeAnimal,
                                $tipo,
                                $observacao,
                                $numeroGta,
                                $serieGta,
                                $dataEmissaoGta,
                                $dataValidadeGta,
                                $dataSaidaGta,
                                $dataChegadaGta,
                                $dataCadastro
                                )
                        `);
            stmt.run({
              $idMovimentacao: pkMovimentacao,
              $idTm: movimentacao['idTm'],
              $idFornecedor: movimentacao['idFornecedor'],
              $codFazendaAtual: contexto['codFazendaAtual'],
              $quantidadeAnimal: movimentacao['quantidadeAnimal'],
              $tipo: movimentacao['tipo'],
              $observacao: movimentacao['observacao'],
              $numeroGta: movimentacao['numeroGta'],
              $serieGta: movimentacao['serieGta'],
              $dataEmissaoGta: movimentacao['dataEmissaoGta'],
              $dataValidadeGta: movimentacao['dataValidadeGta'],
              $dataSaidaGta: movimentacao['dataSaidaGta'],
              $dataChegadaGta: movimentacao['dataChegadaGta'],
              $dataCadastro: movimentacao['dataCadastro']
            }, (err, result) => {
              console.log('teste');
              console.log(err, result);
              if (err) {
                console.log('erro ao incluir uma operacoes-curral');
                console.log(err);
                reject(err);
              } else {
                console.log('operacoes-curral incluído com sucesso', result);
                resolve(result)
              }
            });
          })
        }

      } catch (e) {
        console.log('CATCH');
        console.log('erro ao incluir um operacoes-curral');
        console.log(e);
        reject(e)
      }
    });
  },
  getMovimentacoes: function (filters, fields, order) {
    return new Promise((resolve, reject) => {
      const db = database();
      let fieldsFilter = '*';
      let query = '';
      if (fields) {
        fieldsFilter = fields;
      }
      if (filters) {
        if (filters.id) {
          query += !query ? 'WHERE ' : 'AND ';
          query += `movimentacao.id_movimentacao = ${filters.id} `;
        }
        if (filters.tipo) {
          query += !query ? 'WHERE ' : 'AND ';
          query += `movimentacao.tipo = ${filters.tipo} `;
        }
        if (filters.dataCadastro) {
          query += !query ? 'WHERE ' : 'AND ';
          query += `movimentacao.data_cadastro like '${filters.dataCadastro}%' `;
        }
      }
      console.log(`SELECT ${fieldsFilter} FROM movimentacao INNER JOIN tipo_movimento TM ON TM.id_tm = movimentacao.id_tm ${query}`)
      db.all(`SELECT ${fieldsFilter} FROM movimentacao INNER JOIN tipo_movimento TM ON TM.id_tm = movimentacao.id_tm ${query}`, (err, results) => {
        if (err) {
          console.log('erro')
          reject(err);
        } else {
          resolve(results);
        }
      })
    })
  }


}
